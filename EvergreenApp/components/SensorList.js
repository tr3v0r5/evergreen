import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
const styles = require('../Styles/style.js');

export class SensorList extends Component{
  render(){
    return(
      <View style={styles.sensorList}>
        <Text>TODO</Text>
      </View>
    );
  }
}

module.exports = SensorList;
