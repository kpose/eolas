import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{...StyleSheet.absoluteFill}}>
        <ImageBackground
          source={require('../../assets/bg.jpg')}
          style={styles.imageBackground}></ImageBackground>
      </View>

      <View
        style={{
          height: height / 2.3,
          justifyContent: 'center',
          /* backgroundColor: 'red' */
        }}>
        <View style={styles.button}>
          <Text style={styles.text}> SIGN IN </Text>
        </View>

        <View style={{...styles.button, backgroundColor: 'yellow'}}>
          <Text style={{...styles.text, color: 'white'}}> SIGN UP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  imageBackground: {
    flex: 1,
    //resizeMode: 'cover',
    height: null,
    width: null,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
