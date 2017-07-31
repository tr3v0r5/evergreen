import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput,
   View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

//User Components imports
import WeatherComponent from '../Weather/WeatherComponent.js';
import SensorList from './SensorList.js'

const styles = require('../../Styles/style.js');

export class GardenScreen extends Component {

  //navigation options
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      userSensors:[],
    }
  }//constructor

  async logout(){
    /* needs to eventually include firebase logout fuction for when navigating
    from LoginBox */

    try {
      await AsyncStorage.setItem('UID', '' );
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log('AsyncStorage write error: '+ error)
    }
  }//tempary logout function


  componentDidMount(){

    const { params } = this.props.navigation.state;//get uid from last screen

    firebase.database().ref("Users/"+ params.userID +"/Current/Sensors/").orderByChild('title')
      .on('value', snapshot => {
        list = [];//intialize list and reset for each database change

        snapshot.forEach(function(sensor){
          list.push(sensor.val());
        });//returns the all contents of child nodes in one list

        this.setState({
          userSensors: list,
        });//component state equal to state

      });//on

}//componentDidMount

    render() {

      const { navigate } = this.props.navigation;// from react-navigation to changes screens
      const { params } = this.props.navigation.state;

      console.ignoredYellowBox = ['Setting a timer'];//gets rid of pop up using firebase with react

      return (
        <View style={styles.containerGarden}>

          <View style={{flexDirection: 'row', flex:1}}>
            <View style={{flexDirection:'column',flex:1 }}>
              <Text style={{ fontSize:30, color:'white' }}>Welcome to your Smart Garden</Text>
              <Text style={{ paddingTop: 15 },styles.genericText}>Sensor Data</Text>
              <SensorList
                navi={ this.props.navigation }
                list={ this.state.userSensors }
                userID={ params.userID }
                />
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigate('Weather')}>
		            <WeatherComponent/>
		        </TouchableOpacity>
          </View>

          <View>
            <Button
              raised
              iconRight
              title="logout  "
              onPress = {() => this.logout()}
              icon={{name: 'chevron-right', size: 24}}
              buttonStyle={styles.stockButton}
              textStyle={{textAlign: 'center'}}
              />
            <Button
              raised
              iconRight
              title="add sensor  "
              onPress = {() => navigate('SensorAdd')}
              icon={{name: 'playlist-add', size: 24}}
              buttonStyle={styles.stockButton}
              textStyle={{textAlign: 'center'}}
              />
          </View>

        </View>
      );
    }
  }

module.exports=GardenScreen;
