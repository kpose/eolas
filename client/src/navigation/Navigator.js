import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SigninScreen from '../screens/SigninScreen';

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

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'Signin Screen'}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Signup Screen'}}
        />

        <Stack.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{title: 'Signin Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
