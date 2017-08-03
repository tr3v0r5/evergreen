import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity, AsyncStorage } from 'react-native';
import {Button, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import GardenZoneComponent from './GardenZoneComponent.js';

import styles from '../../Styles/gardenStyles.js';

export class GardenScreen extends Component{


  static navigationOptions = {
    header:null
  }

  async userLoad(){
    /*rather then figuring out how to pass user credentials down through
    three navigation stack objects we check wether the user is logged in on the
    loginScreen and then load the actual user ID here*/

    try {
      const UID = await AsyncStorage.getItem('UID');
      this.setState({
        userID: UID
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

  }//loginCheck

  constructor(props){
    super(props);
    this.state = {
      userID:'',
      zonesArray:[],
      loaded:false
    };
  }//constructor

  async initZones(){

    try {
      const UID = await AsyncStorage.getItem('UID');
      this.setState({
        userID: UID
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }

    var zoneRef = firebase.database().ref('/Users/' + this.state.userID + '/Garden Zones');

    zoneRef.on('value', (snapshot) => {
              var zones = [];

              snapshot.forEach((child) => {

              zones.push({
                    name:child.val().Name,
                    imageSource :child.val().ImageSource,
                    keyRef :child.key
                    });
              });

              this.setState({
                  zonesArray:zones,
                  loaded:true
                  });

              });

  }//initZones

  componentWillMount(){

    this.initZones();

  }//componentWillMount

  makeZones(navigation){

    let userID = this.state.userID;

    return this.state.zonesArray.map(function(zone,i){
      var nameVal = zone.name;
      var imageVal = zone.imageSource;
      var keyVal = zone.keyRef
        return(
          <GardenZoneComponent
           key = {i}
           name = {nameVal}
           keyRef = {keyVal}
           imageSource = {imageVal}
           navi = {navigation}
           userID = {userID}
            />
        );
      });

  }//makeZones


  render() {
    if(this.state.loaded){
      return(
        <ScrollView style = {{backgroundColor:'white'}}>
        <View>

          <View style = {styles.gardenHeader} >
            <Text style = {styles.gardenText}>Welcome to Your Smart Garden</Text>
          </View>

          <View style = {styles.gardenGrid}>
            {this.makeZones(this.props.navigation)}
          </View>

        </View>
       </ScrollView>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20,justifyContent: 'center'}}>
        <ActivityIndicator size = 'large' />
      </View>
    );
  }
}//render


module.exports = GardenScreen;
