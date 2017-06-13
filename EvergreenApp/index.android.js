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

export class LoginScreen extends Component {

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

  class SensorData extends Component {
    constructor(props){
      super();
      this.state = {
        moistureData: '' ,
      };
    }
    //maybe not the most elegant solution but it works for now
    componentDidMount(){
      var that = this;
      firebase.database().ref('Sensors/sensor1').on('value', function(snapshot) {
        that.setState({
          moistureData: snapshot.child("sensorData").val(),
        });
      });
    }

    render(){
      return(
        <View style={styles.dataBlock}>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.moistureData}</Text>
        </View>
      );
    }
  }

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(52,180,67)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    dataBlock:{
      backgroundColor: 'blue',
      height: 75,
      width: 75,
    },
  });

  const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen }
  });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
