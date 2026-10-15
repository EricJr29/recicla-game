import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Button, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import fundo1 from './../assets/fundos/fundo-1.jpg';

const comicImages = {
  hq1: require('../assets/comics/hq1.png'),
  hq2: require('../assets/comics/hq2.png'),
  hq3: require('../assets/comics/hq3.png'),
  hq4: require('../assets/comics/hq4.png'),
  hq5: require('../assets/comics/hq5.png'),
  hq6: require('../assets/comics/hq6.png'),
  hq7: require('../assets/comics/hq7.png'),
  hq8: require('../assets/comics/hq8.png'),
  hq9: require('../assets/comics/hq9.png'),
};

const ComicsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const comicsData = [
    {
      id: '1',
      image: comicImages.hq1,
      description: 'Era uma vez um planeta chamado VerdeLuz, cheio de florestas mágicas, rios brilhantes e animais felizes.',
    },
    {
      id: '2',
      image: comicImages.hq2,
      description: 'Mas, com o tempo, os humanos começaram a jogar lixo de qualquer jeito. O planeta começou a ficar triste e cinzento...',
    },
    {
      id: '3',
      image: comicImages.hq3,
      title: 'Lix, o Guardião Azul',
      description: 'Adora plásticos e transforma garrafas em brinquedos!',
      color: '#42a5f5', // Azul vibrante
    },
    {
      id: '4',
      image: comicImages.hq4,
      title: 'Pap, o Guardião Verde',
      description: 'Cuida do papel e o transforma em novos livros!',
      color: '#66bb6a', // Verde vibrante
    },
    {
      id: '5',
      image: comicImages.hq5,
      title: 'Vidra, a Guardiã Amarela',
      description: 'Recicla vidros e cria janelas que brilham ao sol!',
      color: '#ffc107', // Amarelo vibrante
    },
    {
      id: '6',
      image: comicImages.hq6,
      title: 'Metali, o Guardião Vermelho',
      description: 'Pega latas velhas e faz novos instrumentos musicais!',
      color: '#ef5350', // Vermelho vibrante
    },
    {
      id: '7',
      image: comicImages.hq7,
      description: 'Mas os Guardiões estavam ficando fracos, pois as pessoas esqueceram de separar o lixo. Se eles sumissem, VerdeLuz ficaria sem vida!',
    },
    {
      id: '8',
      image: comicImages.hq8,
      description: 'Então, eles chamaram VOCÊ para ajudar! Sua missão é separar o lixo, dar energia aos Guardiões e salvar VerdeLuz!',
    },
    {
      id: '9',
      image: comicImages.hq9,
      description: '...o planeta vai ficando mais colorido, os animais vão voltando e a natureza vai sorrir de novo!',
    },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <ImageBackground
      source={fundo1}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.title}>A Jornada do Herói da Reciclagem</Text>

        <View>
          <Text style={styles.subtitle}>Um dia, os Guardiões da Reciclagem apareceram!</Text>
          <Text style={styles.subSubtitle}>Eles são pequenos seres coloridos que vivem dentro das lixeiras mágicas!</Text>
        </View>

        {comicsData.map((comic) => (
          <View key={comic.id} style={styles.comicPanel}>
            {comic.title && <Text style={[styles.comicTitle, { color: comic.color }]}>{comic.title}</Text>}
            <Image
              source={comic.image}
              style={[styles.comicImage, { width: screenWidth - 40 }]}
              resizeMode="contain"
            />
            <Text style={styles.comicDescription}>{comic.description}</Text>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            title="Voltar para o Início"
            onPress={() => navigation.goBack()}
            color="#66bb6a"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff', 
    marginTop: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    color: '#fff',
  },
  subSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  comicPanel: {
    marginBottom: 40,
    alignItems: 'center',
  },
  comicImage: {
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#a5d6a7',
  },
  comicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  comicDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#fff',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20,
  },
});

export default ComicsScreen;