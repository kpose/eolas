import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Done</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('SignUp')}
      onDone={() => navigation.navigate('SignUp')}
      pages={[
        {
          backgroundColor: '#447f9e',
          image: <Image source={require('../assets/onboarding1.png')} />,
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#2378a8',
          image: <Image source={require('../assets/onboarding2.png')} />,
          title: 'Share Your Thoughts',
          subtitle: 'Share Your Thoughts With Similar Kind Of People',
        },
        {
          backgroundColor: '#036da8',
          image: <Image source={require('../assets/onboarding3.png')} />,
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
