import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

const styles = require('../../Styles/style.js');

export class SensorList extends Component{

    render() {

      console.ignoredYellowBox = ['Setting a timer'];//gets rid of pop up using firebase with react

      const { navigate } = this.props.navi

      return (

              <List containerStyle={{marginRight: 10, marginLeft: 10}}>
                {
                  this.props.list.map((item, i) => (
                    <ListItem
                      onPress={() => navigate('Sensor', { sensor: item.id })}
                      key={i}
                      title={item.title}
                      leftIcon={{name: item.icon}}
                      />
                  ))
                }
              </List>
      );
    }
}

module.exports = SensorList;
