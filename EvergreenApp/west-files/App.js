import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import HomeScreen from './components/HomeScreen.js';


  export default class App extends Component{
                  render() {
                      return (
                          <HomeScreen />
                      );
                  }
                }

/*
  const EvergreenApp = StackNavigator({
    Garden: {screen: GardenScreen}
  }, { headerMode: 'screen' }
);
*/
console.disableYellowBox = true;

// skip this line if using Create React Native App
//AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
