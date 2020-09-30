import React from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {Button} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const {
  Value,

  Clock,

  Extrapolate,
} = Animated;

export default function SignIn() {
  const navigation = useNavigation();

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

      {/* <Button style={styles.button} title="SIGN IN" type="clear" /> */}
      <View
        style={{
          fontSize: 15,
          marginTop: 10,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          {' '}
          Don't have an account?
        </Text>
        <Button
          title="Sign up"
          type="clear"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 9,
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
