import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SigninScreen from './src/screens/SigninScreen';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import WelcomeScreen from './src/screens/WelcomeScreen';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    return <OnboardingNavigator />;
  } else {
    return <AuthNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
