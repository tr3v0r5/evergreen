import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export class LoginBox extends Component{
render(){
  return(
    <View>
      <TextInput
        style={{height: 30, backgroundColor:'white', width: 200, textAlign: 'center', marginTop: 20, paddingTop: 5}}
        placeholder="user name"
        onChangeText={(text) => this.setState({text})}
        />
      <TextInput
        style={{height: 30, backgroundColor:'white', width: 200, textAlign: 'center', marginTop: 20, paddingTop: 5}}
        placeholder="password"
        onChangeText={(text) => this.setState({text})}
        />
    </View>
    );
  }
}
module.exports = LoginBox;
