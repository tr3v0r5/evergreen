/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated
} from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
import SensorData from './components/SensorData.js';
import LoginBox from './components/LoginBox.js';
import SensorList from './components/SensorList.js';

class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LoginBox/>
      );
    }
  }

  class GardenScreen extends Component {
    render() {
      return (
        <View style={styles.containerGarden}>
          <Text style={styles.genericText}>Sensor Data</Text>
          <SensorData />
          <WeatherComponent />
        </View>
      );
    }
  }

  class WeatherScreen extends Component{
	  render() {
	      return (
	        <View style={styles.container}>
	          <Text style={styles.genericText}>Weather Data</Text>
	          <WeatherComponent />
	        </View>
	      );
	  }
  }

  class SensorScreen extends Component{
    render(){
      return(
        <View>
          <Text style={styles.genericText}>TODO</Text>
        </View>
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
	  Weather:{ screen: WeatherScreen },
    Sensor: { screen: SensorScreen },
  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
