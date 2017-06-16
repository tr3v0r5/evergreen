/////////////////////////////////////////////////////////////
 /**
  * Sample React Native App
  * https://github.com/facebook/react-native
  * @flow
  */

 import React, { Component } from 'react';
 import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
 } from 'react-native';
 //import Svg from 'react-native-svg';
 import { StackNavigator } from 'react-navigation';
 import * as firebase from 'firebase';
 import WeatherComponent from './components/WeatherComponent.js';//Weather screen import
 import ChartComponent from './components/ChartComponent.js';
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
           <Button
             title="weather"
             onPress = {() => navigate('Weather')}
             />
			 <Button
			 title="Chart"
			 onPress={()=>navigate('Chart')}
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
   var WeatherScreen=React.createClass({
 	  render:function() {
 	      return (
 	        <View style={styles.container}>
 	          <Text style={{color:'#ffffff', fontSize:30}}>Weather Data</Text>
 	          <WeatherComponent />
 	        </View>
 	      );
 	  }
	  
   })
  var ChartScreen=React.createClass({
	   render:function(){
		   return (<View style={styles.container}>
 	          <Text style={{color:'#ffffff', fontSize:30}}>Chart</Text>
 	          <ChartComponent />
 	        </View>);
	   }
   })



   const EvergreenApp = StackNavigator({
     Login: { screen: LoginScreen },
     Garden: { screen: GardenScreen },
	   Weather: { screen: WeatherScreen},
	   Chart:{screen: ChartScreen}
   });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);