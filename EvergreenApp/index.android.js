import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';

//styling import
const styles = require('./Styles/style.js');


//firebase config stuff
const firebaseConfig = {
apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
databaseURL: "https://smart-garden-ca02a.firebaseio.com",
authDomain: "smart-garden-ca02a.firebaseapp.com",
storageBucket: "smart-garden-ca02a.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//Screen imports
import LoginScreen from './components/Login/LoginScreen.js';
import Gardentab from './components/Garden/Tabs.js'

const EvergreenApp = StackNavigator({
  Login: { screen: LoginScreen },
  Garden:{
	  screen: Gardentab
  },
}, {headerMode:'none'}
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);