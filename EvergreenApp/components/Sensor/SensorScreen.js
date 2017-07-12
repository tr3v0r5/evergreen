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
		dataReady:false
    };
  }
  //maybe not the most elegant solution but it works for now
  componentDidMount(){

    var that = this;//gets around setState scope issue

    let userID = firebase.auth().currentUser.uid;
	this.getdata()
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
  getdata(){
	var userId='QVw8UfD3b4Tcd1YsxiNCx8x3zyh1';
	var that=this;
	firebase.database().ref('Users/'+userId+'/History').once('value',function(snapshot) {
	console.warn('getdata firebase');
		let data=[];
   		snapshot.forEach(function(childSnap){
   			let date=childSnap.child("date").val();
			let value=childSnap.child('value').val();
			data.push({date:new Date(date),value:value},);
   	 	})
		that.setState({
			data:data,
			dataReady:true
		});
  });
}
  loading(){
  	return(
  		<View>
		<Text style={{color:'#ffffff', fontSize: 20,textAlign: 'center', marginTop: 20 }}>Loading...</Text>
		</View>
  	)
  }
  render(){
    const { params } = this.props.navigation.state;
    console.log(params.sensor);
	console.warn(this.state.dataReady)
    return(
      <View style={styles.container}>
        <View style={styles.dataBlock}>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorTitle}</Text>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorData}</Text>
        </View>
		{this.state.dataReady
			?(<Chart data={this.state.data}/>)				
			:(this.loading())
		}
      </View>
    );
  }
  }
module.exports=SensorScreen;
