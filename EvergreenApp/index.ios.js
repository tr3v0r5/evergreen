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

// import GardenScreen from './components/Garden/GardenScreen.js';

// import SensorScreen from './components/Sensor/SensorScreen.js';
//
// import WeatherScreen from './components/Weather/WeatherScreen.js';
//
// import SettingsScreen from './components/Settings/SettingsScreen.js';
//
// import SensorAddScreen from './components/SensorAdd/SensorAddScreen.js';

import GardenTabs from './components/Garden/GardenTabs.js';


class GardenScreen extends Component {

  static navigationOptions = {
    header:null
  }

  render() {
    return (
      <GardenTabs />
    );
  }
}


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

  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);