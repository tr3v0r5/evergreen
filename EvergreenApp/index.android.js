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
const styles = require('./Styles/style.js');

//component import
var SensorData = require('./components/SensorData.js');

class LoginScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
        <TextInput
            style={{height: 30, backgroundColor:'white', width: 200, textAlign: 'center'}}
            placeholder="login"
            onChangeText={(text) => this.setState({text})}
            />
          <Button
            title="login"
            onPress = {() => navigate('Garden')}
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



  const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen }
  });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
