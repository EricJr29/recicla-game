import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe as telas que você criou
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import ComicsScreen from './screens/ComicsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Comics" component={ComicsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}