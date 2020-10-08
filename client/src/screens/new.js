import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import PropTypes from 'prop-types';
import axios from 'axios';

class SigninScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    console.log('hi');
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.labelValue,
    });
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Eolas</Text>

        <FormInput
          onChangeText={this.setState({})}
          labelValue={this.state.email}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          name="email"
          autoCorrect={false}
        />

        <FormInput
          labelValue={this.state.password}
          onChangeText={this.handleChange}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
          name="password"
        />

        <FormButton
          buttonTitle="Sign In"
          //onPress={() => navigate('HomeScreen')}
          onPress={this.handleSubmit}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <SocialButton
          buttonTitle="Sign In with Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {}}
        />

        <SocialButton
          buttonTitle="Sign In with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {}}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>
            Don't have an account? Create Here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SigninScreen;

SigninScreen.propTypes = {
  //name: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    //fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    //fontFamily: 'Lato-Regular',
  },
});
