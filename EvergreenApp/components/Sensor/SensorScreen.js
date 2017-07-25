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

  openOrClose(){

    let userID = firebase.auth().currentUser.uid;
    const { params } = this.props.navigation.state;

    let sensRef = firebase.database().ref('Users/' + userID + '/Current/Sensors/' + params.sensor);

    var data, title, icon, type, id;

    sensRef.once('value', function(snapshot){
      data = snapshot.val().data;
      title = snapshot.val().title;
      icon = snapshot.val().icon;
      type = snapshot.val().type;
      id = snapshot.val().id;
    });

    if(data == 1){
      sensRef.set({
        data: 0,
        title: title,
        icon: icon,
        id: id,
        type: type,
      });
    }else{
      sensRef.set({
        data: 1,
        title: title,
        icon: icon,
        id: id,
        type: type,
      });
    }

  }//openOrClose

  render(){
    // console.log(this.state.data);
    const { params } = this.props.navigation.state;

    return(
      <View style={styles.container}>
        <View style={{ flex: 2/10 }}>
          <View style={{flexDirection: 'row', flex: 1, marginTop: 20}}>
            <View style={{flex: 4/10}}>
              <Icon raised name={this.state.sensorIcon} color='#aaaaaa' size={30} />
            </View>
            <View style={{flex: 6/10}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flex: 5/10}}>
                  <Text style={{color:'#ffffff', fontSize: 30,textAlign: 'center', flex: 5/10 }}>{this.state.sensorTitle}</Text>
                </View>
                <View style={{flex: 5/10}}>
                  <Text style={{color:'#ffffff', fontSize: 25,textAlign: 'center', flex: 5/10 }}>Sensor Current Value: {this.state.sensorData}</Text>
                </View>
              </View>
            </View>
          </View>

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
            onPress = {() => this.openOrClose()}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
          ) : ( <Text> </Text> )
        }
        </View>
      </View>
    );

  }//render

}//SensorScreen

module.exports=SensorScreen;
