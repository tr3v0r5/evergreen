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

    let userID = firebase.auth().currentUser.uid;

    let listSensorsRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor);

    listSensorsRef.on('value', function(snapshot) {
      that.setState({
        moistureData: snapshot.child("sensorData").val(),
      });
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    return(
      <View style={styles.dataBlock}>
        <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.moistureData}</Text>
      </View>
    );
  }
}
module.exports = SensorData;
