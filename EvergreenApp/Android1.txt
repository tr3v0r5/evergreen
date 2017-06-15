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

  class GardenScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>working</Text>
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
  });

  const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Garden: { screen: GardenScreen }
  });


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
