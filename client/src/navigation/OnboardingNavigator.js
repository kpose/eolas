import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import SigninScreen from '../screens/SigninScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

function OnboardingNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="SigninScreen" component={SigninScreen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default OnboardingNavigator;
