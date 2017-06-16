import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const styles = require('../Styles/style.js');

export class LoginBox extends Component{
render(){
  return(
    <View>
      <TextInput
        style={ styles.textBox }
        placeholder="user name"
        onChangeText={(text) => this.setState({text})}
        />
      <TextInput
        style={ styles.textBox }
        placeholder="password"
        onChangeText={(text) => this.setState({text})}
        />
    </View>
    );
  }
}
module.exports = LoginBox;
