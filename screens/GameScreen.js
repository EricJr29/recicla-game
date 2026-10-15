import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from 'expo-navigation-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

// Importe as imagens dos lixos, lixeiras e o fundo do jogo
import lixoPlasticoImage from './../assets/images/lixo_plastico.png'; 
import lixoPapelImage from './../assets/images/lixo_papel.png'; 
import lixoVidroImage from './../assets/images/lixo_vidro.png'; 
import lixoMetalImage from './../assets/images/lixo_metal.png'; 
import lixeiraPlasticoImage from './../assets/images/lixeira_plastico.png';
import lixeiraPapelImage from './../assets/images/lixeira_papel.png';
import lixeiraVidroImage from './../assets/images/lixeira_vidro.png';
import lixeiraMetalImage from './../assets/images/lixeira_metal.png';
import fundoGame from './../assets/fundos/fundo-2.jpg'; 
import coracao from './../assets/images/coracao.png';

// Importe as novas imagens do personagem
import personagemFrente from './../assets/personagem/personagem-frente.png';
import personagemCosta from './../assets/personagem/personagem-costa.png';
import personagemDireita from './../assets/personagem/personagem-direita.png';
import personagemEsquerda from './../assets/personagem/personagem-esquerda.png';

const LIXEIRAS = {
  plastico: { width: 50, height: 50, name: 'Plástico', image: lixoPlasticoImage, goalImage: lixeiraPlasticoImage },
  papel: { width: 50, height: 50, name: 'Papel', image: lixoPapelImage, goalImage: lixeiraPapelImage },
  vidro: { width: 50, height: 50, name: 'Vidro', image: lixoVidroImage, goalImage: lixeiraVidroImage },
  metal: { width: 50, height: 50, name: 'Metal', image: lixoMetalImage, goalImage: lixeiraMetalImage },
};

const TRASH_TYPES = ['plastico', 'papel', 'vidro', 'metal'];

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [trashItems, setTrashItems] = useState([]);
  const [gameAreaDimensions, setGameAreaDimensions] = useState({ width: 0, height: 0 });
  const [currentGoal, setCurrentGoal] = useState(null);

  const [heroImageSource, setHeroImageSource] = useState(personagemFrente); 
  const heroPosition = useSharedValue({ x: 0, y: 0 });
  const heroSize = 70;
  const step = 30;

  const isHandlingCollision = useRef(false);

  useEffect(() => {
    async function setupScreen() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      await NavigationBar.setVisibilityAsync('hidden');
    }
    setupScreen();

    return () => {
      ScreenOrientation.unlockAsync();
      NavigationBar.setVisibilityAsync('visible');
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      Alert.alert(
        "Fim de Jogo!",
        `Sua pontuação final é: ${score}`,
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );
    }
  }, [timeLeft, score, navigation]);

  useEffect(() => {
    if (lives <= 0) {
      Alert.alert(
        "Fim de Jogo!",
        `Suas vidas acabaram. Pontuação final: ${score}`,
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );
    }
  }, [lives, score, navigation]);

  const setupRound = useCallback(() => {
    if (gameAreaDimensions.width > 0 && gameAreaDimensions.height > 0) {
      const randomGoal = TRASH_TYPES[Math.floor(Math.random() * TRASH_TYPES.length)];
      setCurrentGoal(LIXEIRAS[randomGoal]);
      
      const trashSize = 40;
      const marginX = 150;
      const marginY = 50; 

      const cornerPositions = [
        { x: -gameAreaDimensions.width / 2 + trashSize / 2 + marginX, y: -gameAreaDimensions.height / 2 + trashSize / 2 + marginY },
        { x: gameAreaDimensions.width / 2 - trashSize / 2 - marginX, y: -gameAreaDimensions.height / 2 + trashSize / 2 + marginY },
        { x: -gameAreaDimensions.width / 2 + trashSize / 2 + marginX, y: gameAreaDimensions.height / 2 - trashSize / 2 - marginY },
        { x: gameAreaDimensions.width / 2 - trashSize / 2 - marginX, y: gameAreaDimensions.height / 2 - trashSize / 2 - marginY },
      ];
      
      const shuffledPositions = cornerPositions.sort(() => 0.5 - Math.random());

      const newTrashItems = TRASH_TYPES.map((type, index) => ({
        id: type,
        type: type,
        position: shuffledPositions[index],
      }));

      setTrashItems(newTrashItems);
      heroPosition.value = withTiming({ x: 0, y: 0 }, { duration: 100 });
      setTimeout(() => {
        isHandlingCollision.current = false;
        }, 200);
    }
  }, [gameAreaDimensions, heroPosition]);

  useEffect(() => {
    setupRound();
  }, [gameAreaDimensions, setupRound]);
  
  const moveHero = (direction) => {
    let newHeroImage = heroImageSource;
    if (gameAreaDimensions.width === 0) return;

    let newX = heroPosition.value.x;
    let newY = heroPosition.value.y;

    const halfHeroSize = heroSize / 2;

    switch (direction) {
      case 'up':
        newY -= step;
        newHeroImage = personagemCosta;
        break;
      case 'down':
        newY += step;
        newHeroImage = personagemFrente;
        break;
      case 'left':
        newX -= step;
        newHeroImage = personagemEsquerda;
        break;
      case 'right':
        newX += step;
        newHeroImage = personagemDireita;
        break;
    }
    
    const minX = -gameAreaDimensions.width / 2 + halfHeroSize;
    const maxX = gameAreaDimensions.width / 2 - halfHeroSize;
    const minY = -gameAreaDimensions.height / 2 + halfHeroSize;
    const maxY = gameAreaDimensions.height / 2 - halfHeroSize;

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
    
    heroPosition.value = withTiming({ x: newX, y: newY }, { duration: 100 });
    setHeroImageSource(newHeroImage);
  };

  const handleCollision = useCallback((currentPosition) => {
    if (isHandlingCollision.current) return;
  
    const heroRect = {
      x: currentPosition.x - heroSize / 2,
      y: currentPosition.y - heroSize / 2,
      width: heroSize,
      height: heroSize,
    };
  
    const trashSize = 40;
    
    let collidedItem = null;
    for (const trash of trashItems) {
      const trashRect = {
        x: trash.position.x - trashSize / 2,
        y: trash.position.y - trashSize / 2,
        width: trashSize,
        height: trashSize,
      };
  
      if (
        heroRect.x < trashRect.x + trashRect.width &&
        heroRect.x + heroRect.width > trashRect.x &&
        heroRect.y < trashRect.y + trashRect.height &&
        heroRect.y + heroRect.height > trashRect.y
      ) {
        collidedItem = trash;
        break;
      }
    }
  
    if (collidedItem) {
      runOnJS(() => {
        isHandlingCollision.current = true;
        if (currentGoal && collidedItem.type === currentGoal.name.toLowerCase().replace('á', 'a')) {
          setScore(prevScore => prevScore + 10);
        } else {
          setLives(prevLives => prevLives - 1);
        }
        setupRound();
      })();
    }
  }, [trashItems, setupRound, currentGoal]);
  

  useAnimatedReaction(
    () => heroPosition.value,
    (currentPosition) => {
      runOnJS(handleCollision)(currentPosition);
    },
    [handleCollision]
  );
  
  const animatedHeroStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: heroPosition.value.x },
        { translateY: heroPosition.value.y },
      ],
    };
  });

  return (
    <ImageBackground 
      source={fundoGame} 
      style={styles.backgroundImage} 
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.hudContainer}>
          <View style={styles.hudItem}>
              <Text style={styles.hudText}>Vidas:</Text>
              <View style={styles.livesContainer}>
                {[...Array(3)].map((_, index) => (
                  <Image
                    key={index}
                    source={coracao}
                    style={[styles.heartIcon, { opacity: index < lives ? 1 : 0.3 }]}
                  />
                ))}
              </View>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudText}>Pontuação:</Text>
            <Text style={styles.hudValue}>{score}</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudText}>Tempo:</Text>
            <Text style={styles.hudValue}>{timeLeft}</Text>
          </View>
        </View>

        <View 
          style={styles.gameArea}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            setGameAreaDimensions({ width, height });
          }}
        >
          <Animated.Image
            source={heroImageSource}
            style={[styles.hero, animatedHeroStyle]}
            resizeMode="contain"
          />
          
          {trashItems.map(item => (
            <Image
              key={item.id}
              source={LIXEIRAS[item.type].image}
              style={[
                styles.imageItem,
                {
                  transform: [
                    { translateX: item.position.x },
                    { translateY: item.position.y },
                  ],
                },
              ]}
            />
          ))}
        </View>
        
      </SafeAreaView>

      <View style={styles.controlsContainer}>
        <View style={styles.controlsLeft}>
          <TouchableOpacity style={styles.controlButton} onPress={() => moveHero('up')}>
            <Text style={styles.controlText}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => moveHero('down')}>
            <Text style={styles.controlText}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlsRight}>
          <TouchableOpacity style={styles.controlButton} onPress={() => moveHero('left')}>
            <Text style={styles.controlText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => moveHero('right')}>
            <Text style={styles.controlText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      {currentGoal && (
        <View style={styles.goalContainer}>
            <Text style={styles.goalText}>Lixo a ser coletado:</Text>
            <Image
                source={currentGoal.goalImage}
                style={styles.goalImage}
            />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  hudContainer: {
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(56, 142, 60, 0.8)',
    zIndex: 10,
  },
  hudItem: {
    alignItems: 'center',
  },
  hudText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  hudValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginHorizontal: 2,
  },
  goalContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 5,
  },
  goalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  goalImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    width: 70,
    height: 70,
    position: 'absolute',
  },
  controlsContainer: {
    height: 100,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 15,
    paddingHorizontal: 10,
  },
  controlsLeft: {
    alignItems: 'center',
  },
  controlsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  controlText: {
    color: 'white',
    fontSize: 20,
  },
  imageItem: {
    width: 50,
    height: 50,
    position: 'absolute',
    resizeMode: 'contain',
  }
});

export default GameScreen;