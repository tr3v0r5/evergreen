import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Chart from '../ChartComponent.js';

const styles = require('../../Styles/style.js');
const styles2 = require('../../Styles/sensorDetailStyle.js');

export class SensorScreen extends Component{

  constructor(props){
    super();
    this.state = {
      sensorData: '' ,
      sensorTitle: '',
      sensorIcon: '',
      sensorType: '',
		  dataReady: false,
      dataNotUndefined: true,
    };
  }//constructor

  componentDidMount(){

    let userID = firebase.auth().currentUser.uid;

    this.getdata(userID);//sets data state from firebase

    const { params } = this.props.navigation.state;//gets parameters from last screen

    firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor).on('value', (snapshot) => {
      console.log(snapshot.val());
      this.setState({
        sensorTitle: snapshot.val().title,
        sensorIcon: snapshot.val().icon,
        sensorType: snapshot.val().type,
      });
    });
  }//componentDidMount

  getdata(userId){

	   const { params } = this.props.navigation.state;

	    firebase.database().ref('Users/'+userId+'/History/Sensors/'+params.sensor).on('value',(snapshot) => {
        let data=[];
        snapshot.forEach((childSnap) => {
          let date = childSnap.key;
			    let value = childSnap.val().data;
          data.push({date:new Date(date),value:value},);
        });

        if (data.length > 1 && data != undefined){
            this.setState({
               data:data,
               dataReady: true
            });
		    }else {
          this.setState({
            data: data,
            dataReady: false,
          });
          console.log('this should stop the chart');
        }

      });//on
  }//getData

  loading(){
  	return(
  		<View>
		      <Text style={{color:'#ffffff', fontSize: 20,textAlign: 'center', marginTop: 25 }}>No Data</Text>
		  </View>
  	);
  }//loading

  render(){
    console.log(this.state.data);
    const { params } = this.props.navigation.state;

    return(
      <View style={styles.container}>
        <View style={{ flex: 2/10 }}>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Icon raised name={this.state.sensorIcon} color='#aaaaaa' size={30} />
            <Text style={{color:'#ffffff', fontSize: 30,textAlign: 'center' }}>{this.state.sensorTitle}</Text>
          </View>
          <Text style={{color:'#ffffff', fontSize: 25,textAlign: 'center',marginTop: 10, marginBottom: 20 }}>Sensor Current Value: {this.state.sensorData}</Text>
        </View>
        <View style={{ flex: 6/10}}>
        <Text>Sensor History</Text>
        {
          (this.state.dataReady) ? (<Chart data={this.state.data}/>) : (this.loading())
        }
        </View>
        <View style={{ flex: 2/10}}>
        {
          (this.state.sensorType === 'valve') ? (
            <Button
            raised
            title="override"
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
          ) : ( <Text> nothing to see here </Text> )
        }
        </View>
      </View>
    );

  }//render

}//SensorScreen

module.exports=SensorScreen;
