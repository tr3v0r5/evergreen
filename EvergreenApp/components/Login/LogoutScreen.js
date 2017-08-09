import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import {Root} from '../Garden/Tabs.js'

export class LogoutScreen extends Component {
  render() {
    return <Root />;
  }
}
module.exports = LogoutScreen;