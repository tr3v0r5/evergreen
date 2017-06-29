import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import WeatherComponent from '../WeatherComponent.js';//Weather screen import

const styles = require('../../Styles/style.js');

export class GardenScreen extends Component {

  static navigationOptions = {
    header: null
  };


  constructor(props){
    super(props);
    this.state = {
      userSensors:[]
    }
  }


  componentDidMount(){
    //firebase read in user data
    let userID = firebase.auth().currentUser.uid;
    let listSensorsRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/");

    var list = [];

    var that = this;

    listSensorsRef.on('value',function(snapshot) {
      list = []//resets the list so that each time it gets redrawn the old list doesnt stay
      snapshot.forEach(function(sensor){
        list.push(sensor.val());
      });//returns the all contents of child nodes in one list

      that.setState({
        userSensors: list,
      });
    });


  }//componentDidMount


    render() {


      const { navigate } = this.props.navigation;
      console.ignoredYellowBox = ['Setting a timer'];//gets rid of pop up using firebase with react

      return (
        <View style={styles.containerGarden}>
          <View style={{flexDirection: 'row', flex:1}}>
            <View style={{flexDirection:'column',flex:1}}>
              <Text style={{fontSize:30, color:'white'}}>Welcome to your Smart Garden</Text>
              <Text style={{paddingTop: 15},styles.genericText}>Sensor Data</Text>
              <List containerStyle={{marginRight: 10, marginLeft: 10}}>
                {
                  this.state.userSensors.map((item, i) => (
                    <ListItem
                      onPress={() => navigate('Sensor', { sensor: item.id })}
                      key={i}
                      title={item.title}
                      leftIcon={{name: item.icon}}
                      />
                  ))
                }
              </List>
            </View>
          </View>
          <WeatherComponent />
        </View>
      );
    }
  }
module.exports=GardenScreen;
