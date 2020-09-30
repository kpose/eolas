import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />

        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{title: 'Welcome Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
