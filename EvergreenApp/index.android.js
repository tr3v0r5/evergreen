import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

//firebase config stuff
const firebaseConfig = {
apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
databaseURL: "https://smart-garden-ca02a.firebaseio.com",
authDomain: "smart-garden-ca02a.firebaseapp.com",
storageBucket: "smart-garden-ca02a.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//Screen imports
import {Root} from './components/Navigation.js'

class EvergreenApp extends Component {
  render() {
    return <Root />;
  }
}

AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);