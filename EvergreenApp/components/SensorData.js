import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
const styles = require('../Styles/style.js');


export class SensorData extends Component {
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
module.exports = SensorData;
