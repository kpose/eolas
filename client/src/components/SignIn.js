import React from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

export default function SignIn() {
  /* this.textInputZindex = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  this.textInputY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  this.textInputOpacity = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  }); */

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        style={styles.textInput}
        placeholderTextColor="black"
      />

      <TextInput
        placeholder="Enter your password"
        style={styles.textInput}
        placeholderTextColor="black"
      />

      <Animated.View style={styles.button}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> SIGN IN</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingLeft: 10,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});
