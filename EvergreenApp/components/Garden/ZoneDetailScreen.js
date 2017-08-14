import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

import AddPlantScreen from './AddPlantScreen.js';
import PlantComponent from './PlantComponent.js';
import Sensor from '../Sensor/SensorScreen.js'

import styles from '../../Styles/gardenStyles.js';

export default class ZoneDetailScreen extends Component{

  static navigationOptions={
    headerStyle:{
      backgroundColor:'white'
    }
  }

  constructor(props){
    super(props);
    this.state = {
      plantsArray:[],
		  userSensors:[],
      loaded:false,
      userID: '',
      zone: '',
      modal: <AddPlantScreen/>
    };
  }//constructor

  async initPlants() {

    const {params} = this.props.navigation.state;

    try {
      const userVal = await params.userID;
      const zoneVal = await params.zone
      this.setState({
        userID: params.userID,
        zone: params.zone
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    var plantRef = firebase.database().ref('/Users/' + params.userID + '/GardenZones/' + params.zone + '/Plants');

    plantRef.on('value', (snapshot) => {
              var plants = [];

              snapshot.forEach((child) => {

              plants.push({
                    name:child.val().Name,
                    imageSource: child.val().ImageSource,
                    keyRef: child.key
                    });
                });

                this.setState({
                  plantsArray: plants,
                  loaded: true
                            });
              });
  }//initPlants

  initSensorArray(){

	  const { params } = this.props.navigation.state;//get uid from last screen

	      firebase.database().ref("Users/"+ params.userID +"/GardenZones/"+params.zone+"/Sensors/").orderByChild('title')
	        .on('value', snapshot => {
	          list = [];//intialize list and reset for each database change

	          snapshot.forEach(function(sensor){
	            list.push(sensor.val());
	          });//returns the all contents of child nodes in one list

	          this.setState({
	            userSensors: list,
	          });//component state equal to state

	        });//on
  }//initSensorArray

  componentDidMount(){

     this.initPlants();
     this.initSensorArray();

  }//componentDidMount

  makePlants(){
    return this.state.plantsArray.map(function(plant,i){
      var nameVal = plant.name;
      var imageVal = plant.imageSource;
        return(
          <PlantComponent key = {i}  name = {nameVal}
          imageSource = {imageVal}/>
        );
      });
  }//makePlants

  makeSensorList(){
	  const {params} = this.props.navigation.state;
	  const { navigate } = this.props.navigation;

      return this.state.userSensors.map((item, i) => (
              <ListItem
                onPress={() => navigate('Sensor', { sensor: item.id, userID: params.userID, zone: params.zone })}
                key={i}
                title={item.title}
                leftIcon={{name:item.icon}}
                />
                ))//create list of sensors from array
  }//makeSensorList

  render() {

    const {params} = this.props.navigation.state;

    if(this.state.loaded){
      return(
        <View style={{flex:1, backgroundColor:'white'}}>
          {this.state.modal}
          <Text style ={{textAlign:'center', fontSize: 30, fontFamily:'HelveticaNeue-Thin', color: '#27ae60'}}>
            Plants
          </Text>

          <Icon
          raised
          name='plus'
          type='material-community'
          color='#27ae60'
          containerStyle = {[styles.gardenIcon,{marginTop:10}]}
          onPress={() =>
            this.setState({
              modal: <AddPlantScreen userID = {this.state.userID}
                zone = {this.state.zone} modalVisible={true}/>
            })}
          />

          <View style = {styles.plantGrid}>
            {this.makePlants()}
          </View>
          <Text style ={{textAlign:'center', fontSize: 30, fontFamily:'HelveticaNeue-Thin', color: '#27ae60'}}>
            Sensors
          </Text>

            <ScrollView>
              <List containerStyle={{marginRight: 10, marginLeft: 10,marginTop:5}}>
                {this.makeSensorList()}
              </List>
		          </ScrollView>
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20,justifyContent: 'center'}}>
        <ActivityIndicator size = 'large' />
      </View>
    );
  }
}



module.exports = ZoneDetailScreen;
