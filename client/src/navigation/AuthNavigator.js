import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
//import WelcomeScreen from '../screens/WelcomeScreen';
//import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SigninScreen from '../screens/SigninScreen';
//import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SigninScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="SigninScreen" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
