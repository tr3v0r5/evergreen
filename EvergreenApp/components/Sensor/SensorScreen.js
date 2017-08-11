import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import Chart from './ChartComponent.js';

const styles = require('../../Styles/gardenStyles.js');
const styles2 = require('../../Styles/sensorDetailStyle.js');

export class SensorScreen extends Component{
	static navigationOptions={
	  headerStyle:{
	    backgroundColor:'white'
	  }
	}
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

    const { params } = this.props.navigation.state;//gets parameters from last screen
    this.getdata();//sets data state from firebase
    firebase.database().ref("Users/"+ params.userID +"/GardenZones/"+params.zone+"/Sensors/"+ params.sensor)
     .on('value', (snapshot) => {
      this.setState({
        sensorTitle: snapshot.val().title,
        sensorIcon: snapshot.val().icon,
        sensorType: snapshot.val().type,
		  sensorData: snapshot.val().data,
      });
    });
  }//componentDidMount

  getdata(){

	   const { params } = this.props.navigation.state;

	    firebase.database().ref('Users/'+ params.userID +'/History/'+ params.sensor).limitToLast(10)
      .on('value',(snapshot) => {
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
		      <Text style={{color:'#27ae60', fontSize: 20,textAlign: 'center', marginTop: 25 }}>No Data</Text>
		  </View>
  	);
  }//loading

  openOrClose(){

    const { params } = this.props.navigation.state;

    let sensRef = firebase.database().ref('Users/' + params.userID + '/GardenZone/Sensors/' + params.sensor);

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
    } else {
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

    const { params } = this.props.navigation.state;

    return(
      <View style={{backgroundColor:'#ffffff',flex: 1,padding: 10,}}>
        <View style={{flex:1,justifyContent:'space-around'}}>

          <View style={{ flex: 2/10 }}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 2/10}}>
                <Icon raised name={this.state.sensorIcon} color='#aaaaaa' size={30} />
              </View>
              <View style={{flex: 8/10}}>
                <View style={{flex: 5/10}}>
                  <Text style={{color:'#27ae60', fontSize: 30,textAlign: 'center',backgroundColor:"rgba(0,0,0,0)" }}>{this.state.sensorTitle}</Text>
                </View>
                <View style={{flex: 5/10}}>
                  <Text style={{color:'#27ae60', fontSize: 25,textAlign: 'center' }}>Sensor Current Value: {this.state.sensorData}</Text>
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
              (this.state.sensorType === 'valve') ? (
                <Button
                raised
                iconRight
                title="override"
                onPress = {() => this.openOrClose()}
                buttonStyle={styles.stockButton}
                textStyle={{textAlign: 'center'}}/>
            ) : ( <Text></Text> )
            }
          </View>

        </View>
      </View>
      );

    }//render

}//SensorScreen

module.exports=SensorScreen;
