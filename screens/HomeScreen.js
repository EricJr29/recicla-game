import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import fundoHome from './../assets/fundos/fundo-1.jpg'; 

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={fundoHome} 
      style={styles.backgroundImage} 
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herói da Reciclagem</Text>
        <Text style={styles.subtitle}>Sua jornada para um planeta mais limpo começa agora!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonGame]}
            onPress={() => navigation.navigate('Game')}
          >
            <Text style={styles.buttonText}>Começar o Jogo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonInstructions]}
            onPress={() => navigation.navigate('Instructions')}
          >
            <Text style={styles.buttonText}>Instruções</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonComics]}
            onPress={() => navigation.navigate('Comics')}
          >
            <Text style={styles.buttonText}>A Jornada do Herói</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', // Adiciona um overlay escuro para melhorar a leitura do texto
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '85%', // Aumenta um pouco mais o tamanho
    paddingVertical: 20, // Aumenta o padding para um botão maior
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonGame: {
    backgroundColor: '#66bb6a',
  },
  buttonInstructions: {
    backgroundColor: '#42a5f5',
  },
  buttonComics: {
    backgroundColor: '#ffc107',
  },
});

export default HomeScreen;