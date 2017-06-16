/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
var SensorData = require('./components/SensorData.js');
var LoginBox = require('./components/LoginBox.js');
// var SensorList = require('./componets/SensorList.js');

class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
          <LoginBox/>
          <Button
          raised
          title="login"
          onPress = {() => navigate('Garden')}
          buttonStyle={styles.stockButton}
          textStyle={{textAlign: 'center'}}
          />
        <Button
          raised
          title="weather"
          onPress = {() => navigate('Weather')}
          icon={{name: 'cloud', size: 32}}
          buttonStyle={styles.stockButton}
          textStyle={{textAlign: 'center'}}
          />
        </View>
      );
    }
  }

  const firebaseConfig = {
  apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
  databaseURL: "https://smart-garden-ca02a.firebaseio.com",
  authDomain: "smart-garden-ca02a.firebaseapp.com",
  storageBucket: "smart-garden-ca02a.appspot.com",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  class GardenScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.genericText}>Sensor Data</Text>
          <SensorData />
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
    Splash: {screen: SplashScreen },
    Garden: { screen: GardenScreen },
	  Weather:{ screen: WeatherScreen },
    Sensor: { screen: SensorScreen },
  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
