import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const styles = require('../../Styles/style.js');


class SettingsScreen extends Component{
    render(){
      return(
        <View>
          <Text style={styles.genericText}>TODO</Text>
        </View>
      );
    }
  }
module.exports=SettingsScreen;
