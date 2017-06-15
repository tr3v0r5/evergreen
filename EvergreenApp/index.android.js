/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
var SensorData = require('./components/SensorData.js');
var LoginBox = require('./components/LoginBox.js');

class LoginScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
          <LoginBox/>
          <Button
          style={{marginTop: 20}}
          title="login"
          onPress = {() => navigate('Garden')}
          />
        <Button
          style={{marginTop: 20}}
          title="weather"
          onPress = {() => navigate('Weather')}
          />
        </View>
      );
    }
  }

  const firebaseConfig = {
  apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
  authDomain: "smart-garden-ca02a.firebaseapp.com",
  databaseURL: "https://smart-garden-ca02a.firebaseio.com",
  storageBucket: "smart-garden-ca02a.appspot.com",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  class GardenScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>Sensor Data</Text>
          <SensorData />
        </View>
      );
    }
  }
  var WeatherScreen=React.createClass({
	  render:function() {
	      return (
	        <View style={styles.container}>
	          <Text style={{color:'#ffffff', fontSize:30}}>Weather Data</Text>
	          <WeatherComponent />
	        </View>
	      );
	  }

  })



  const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen },
	Weather:{screen: WeatherScreen }
  });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
