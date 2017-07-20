import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Animated,Text,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import


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

import GardenScreen from './components/Garden/GardenScreen.js';

import SensorScreen from './components/Sensor/SensorScreen.js';

import WeatherScreen from './components/Weather/WeatherScreen.js';

import SettingsScreen from './components/Settings/SettingsScreen.js';

class SplashScreen extends Component{
    render(){
      return(
        <View>
          <Text style={styles.genericText}>TODO</Text>
        </View>
      );
    }
  }

const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Splash: { screen: SplashScreen },
    Garden: { screen: GardenScreen },
	  Weather: { screen: WeatherScreen },
    Sensor: { screen: SensorScreen },
    Settings: { screen: SettingsScreen },
  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
