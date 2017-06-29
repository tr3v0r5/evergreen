import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


//styling import
const styles = require('../../Styles/style.js');


import WeatherComponent from '../WeatherComponent.js';//Weather screen import


export class WeatherScreen extends Component{
	  render() {
	      return (
	        <View style={styles.container}>
	          <Text style={styles.genericText}>Weather Data</Text>
	          <WeatherComponent />
	        </View>
	      );
	  }
  }
  module.exports=WeatherScreen;
