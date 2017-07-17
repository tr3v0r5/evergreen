import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Chart from '../ChartComponent.js';

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

    var that = this;//gets around setState scope issue(later should be changed to an arrow function)

    let userID = firebase.auth().currentUser.uid;

    this.getdata(userID)

    const { params } = this.props.navigation.state;//some dark magic for now
    console.log(params.sensor);
    let SensorRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor);

    //changed to an arrow function
    SensorRef.on('value', (snapshot) => {
      console.log(snapshot.val().data);
      this.setState({
        sensorData: snapshot.val().data,
        sensorTitle: snapshot.val().title,
      });
    });
  }//componentDidMount

  getdata(userId){
	//var userId='QVw8UfD3b4Tcd1YsxiNCx8x3zyh1';
	const { params } = this.props.navigation.state;

  // changed to an arrow function
	firebase.database().ref('Users/'+userId+'/History/Sensors/'+params.sensor).on('value',(snapshot) => {
	//console.warn('getdata firebase');

    let data=[];
//changed to an Arrow function
    snapshot.forEach((childSnap) => {
   	  let date=childSnap.key;
			//console.warn(JSON.stringify(date));
			let value=childSnap.child('data').val();
			data.push({date:new Date(date),value:value},);
    });

    if (data!=[]){
			this.setState({
				data:data,
				dataReady:true
			});
		}
  });//on
}//getData
  loading(){
  	return(
  		<View>
		<Text style={{color:'#ffffff', fontSize: 20,textAlign: 'center', marginTop: 20 }}>No Data</Text>
		</View>
  	)
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
		{this.state.dataReady
			?(<Chart data={this.state.data}/>)
			:(this.loading())
		}
      </View>
    );
  }
  }
module.exports=SensorScreen;
