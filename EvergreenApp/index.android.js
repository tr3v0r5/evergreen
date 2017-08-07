import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/Weather/WeatherComponent.js';//Weather screen import


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

import GardenTabs from './components/Garden/GardenTabs.js';


class GardenScreen extends Component {

  static navigationOptions = {
    header:null
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    // console.log(params.userID);/
    return (
      <GardenTabs navi = { navigate } userID = { params.userID } />
    );
  }
}//render


const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen },

  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
