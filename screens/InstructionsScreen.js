import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';

import fundo1 from './../assets/fundos/fundo-1.jpg';

const InstructionsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={fundo1}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Instruções do Jogo</Text>
        <Text style={styles.text}>
          Bem-vindo, Herói da Reciclagem!
        </Text>
        <Text style={styles.text}>
          Sua missão é salvar o meio ambiente, separando corretamente o lixo que aparece na tela.
        </Text>
        <Text style={styles.text}>
          - Arraste cada item de lixo para a lixeira correta:
        </Text>
        <Text style={[styles.listText, { color: '#80d6ff' }]}>
          • <Text style={styles.boldText}>Plástico:</Text> na lixeira AZUL
        </Text>
        <Text style={[styles.listText, { color: '#98ee99' }]}>
          • <Text style={styles.boldText}>Papel:</Text> na lixeira VERDE
        </Text>
        <Text style={[styles.listText, { color: '#ffd54f' }]}>
          • <Text style={styles.boldText}>Vidro:</Text> na lixeira AMARELA
        </Text>
        <Text style={[styles.listText, { color: '#ef9a9a' }]}>
          • <Text style={styles.boldText}>Metal:</Text> na lixeira VERMELHA
        </Text>
        <Text style={styles.text}>
          - Você ganha pontos por cada acerto e perde vidas (ou pontos) por cada erro.
        </Text>
        <Text style={styles.text}>
          - Fique de olho no seu cronômetro e na sua pontuação para se tornar o maior herói da reciclagem!
        </Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', // Fundo escuro semi-transparente
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  listText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
    color: '#fff', 
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default InstructionsScreen;