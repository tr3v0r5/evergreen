import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import HomeScreen from './components/HomeScreen.js';


//styling import
const styles = require('./Styles/style.js');

//component import
import SensorData from './components/SensorData.js';
import LoginBox from './components/LoginBox.js';

//firebase config stuff
const firebaseConfig = {
apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
databaseURL: "https://smart-garden-ca02a.firebaseio.com",
authDomain: "smart-garden-ca02a.firebaseapp.com",
storageBucket: "smart-garden-ca02a.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


  export default class App extends Component{
                  render() {
                      return (
                          <HomeScreen />
                      );
                  }
                }


console.disableYellowBox = true;

// skip this line if using Create React Native App
//AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
