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
	  sensorIcon: '',
      sensorType: '',
	  dataReady: false,
      dataNotUndefined: true,
    };
  }
  //maybe not the most elegant solution but it works for now
  componentDidMount(){

    var that = this;//gets around setState scope issue

    let userID = firebase.auth().currentUser.uid;
	this.getdata(userID)
    const { params } = this.props.navigation.state;//some dark magic for now
    console.log(params.sensor);
    let SensorRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor);

    SensorRef.on('value', function(snapshot) {
      console.log(snapshot.val().data);
      that.setState({
        sensorData: snapshot.val().data,
        sensorTitle: snapshot.val().title,
		sensorIcon: snapshot.val().icon,
        sensorType: snapshot.val().type,
      });
    });
  }
  getdata(userId){
	//var userId='QVw8UfD3b4Tcd1YsxiNCx8x3zyh1';
	const { params } = this.props.navigation.state;
	var that=this;
	firebase.database().ref('Users/'+userId+'/History/Sensors/'+params.sensor).on('value',function(snapshot) {
	//console.warn('getdata firebase');
		let data=[];
   		snapshot.forEach(function(childSnap){
   			let date=childSnap.key;
			//console.warn(JSON.stringify(date));
			let value=childSnap.child('data').val();
			data.push({date:new Date(date),value:value},);
   	 	})
		if (data==[]){
            this.setState({
               data:data,
               dataNotUndefined: false,
				dataReady:false
            });    
		}
		else{
          if(data != undefined){
            that.setState({
               data:data,
               dataNotUndefined: true,
               dataReady:true
            });
          }else{
            that.setState({
               data:data,
               dataNotUndefined: false,
				dataReady:false
            });
		}
		}
  });
}
  loading(){
  	return(
  		<View>
		<Text style={{color:'#ffffff', fontSize: 20,textAlign: 'center', marginTop: 20 }}>No Data</Text>
		</View>
  	)
  }
  render(){
    const { params } = this.props.navigation.state;
    console.warn(this.state.sensorType);
	//console.warn(this.state.dataReady)
    return(
      <View style={{flex: 1,backgroundColor: 'rgb(52,180,67)',padding: 10,}}>
		<View style={{flex:1,justifyContent:'space-around'}}>
		
				<View style={{ flex: 2/10 }}>
          			<View style={{flexDirection: 'row', flex: 1}}>
            			<View style={{flex: 2/10}}>
              				<Icon raised name={this.state.sensorIcon} color='#aaaaaa' size={30} />
            			</View>
            			<View style={{flex: 6/10}}>
              				
                				<View style={{flex: 5/10}}>
                  					<Text style={{color:'#ffffff', fontSize: 30,textAlign: 'center' }}>{this.state.sensorTitle}</Text>
                				</View>
                				<View style={{flex: 5/10}}>
                  					<Text style={{color:'#ffffff', fontSize: 25,textAlign: 'center' }}>Sensor Current Value: {this.state.sensorData}</Text>
                				</View>
             	 			
            			</View>
          			</View>
		</View>
          	
		
        <View style={{ flex: 6/10}}>
        <Text style={{textAlign:'center'}}>Sensor History</Text>
		<View>
		{
      (this.state.dataReady && this.state.dataNotUndefined ) ? (<Chart data={this.state.data}/>) : (this.loading())
    }
	</View>
    </View>
    <View style={{ flex: 2/10}}>
    {
      (this.state.sensorType === 'valve') ? ( <Text>Override Button if a valve</Text> ) : ( <Text> nothing to see here </Text> )
    }
    </View>
	</View>
  </View>
);
  }
}
module.exports=SensorScreen;
