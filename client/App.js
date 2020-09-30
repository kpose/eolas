import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
