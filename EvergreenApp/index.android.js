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

export default class LoginScreen extends Component {

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

  // class sensorData extends Component {
  //   render(){
  //     return(
  //       <div style={styles.dataBlock}>
  //         <p style={{color:'#ffffff'}}>{this.props.data}</p>
  //       </div>
  //     );
  //   }
  // }

  class GardenScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
        sensorData: '' ,
      };
    }
//need to add snapshot and updating
    componentDidMount(){
      firebase.database().ref('Sensors/sensor1').on('value', function(snapshot) {
        this.setState({
          sensorData: snapshot.child("sensorData").val(),
        });
      });
    }

    render() {

      return (
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>working</Text>
          <Text>{this.state.sensorData}</Text>
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
      display: 'inline-block',
      height: 50,
      width: 50,
      textAlign: 'center',
    },
  });

  const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen }
  });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
