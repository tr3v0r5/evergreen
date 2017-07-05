import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Chart from '../ChartComponent1.js';

const styles = require('../../Styles/style.js');

export class SensorScreen extends Component{
  constructor(props){
    super();
    this.state = {
      sensorData: '' ,
      sensorTitle: '',
    };
  }
  //maybe not the most elegant solution but it works for now
  componentDidMount(){

    var that = this;//gets around setState scope issue

    let userID = firebase.auth().currentUser.uid;

    const { params } = this.props.navigation.state;//some dark magic for now

    console.log(params.sensor);
    let SensorRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor);

    SensorRef.on('value', function(snapshot) {
      console.log(snapshot.val().data);
      that.setState({
        sensorData: snapshot.val().data,
        sensorTitle: snapshot.val().title,
      });
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    console.log(params.sensor);
    return(
      <View style={styles.container}>
        <View style={styles.dataBlock}>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorTitle}</Text>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorData}</Text>
        </View>
		<Chart />
      </View>
    );
  }
  }
module.exports=SensorScreen;
