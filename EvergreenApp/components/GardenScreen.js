import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity
} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import GardenZoneComponent from './GardenZoneComponent.js';

import styles from '../Styles/gardenStyles.js';

export default class GardenScreen extends Component{

  static navigationOptions = {
    header:null
  }

  constructor(props){
    super(props);
    this.state = {
      uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
      zonesArray:[],
      loaded:false
    };
  }


  initZones()
  {
    var zoneRef = firebase.database().ref('/Users/' + this.state.uID + '/Garden Zones');
    var that = this;
    zoneRef.on('value', (snapshot) => {
              var zones = [];

              snapshot.forEach((child) => {

              zones.push({
                    name:child.val().Name,
                    imageSource :child.val().ImageSource,
                    keyRef :child.key
                    });
                });

                that.setState({
                  zonesArray:zones,
                  loaded:true
                            });
              });
  }

  componentWillMount()
  {
    this.initZones();

  }

  makeZones(navigation){
    return this.state.zonesArray.map(function(zone,i){
      var nameVal = zone.name;
      var imageVal = zone.imageSource;
      var keyVal = zone.keyRef
        return(
          <GardenZoneComponent
           key = {i}  name = {nameVal} keyRef = {keyVal}
          imageSource = {imageVal} navi = {navigation}/>
        );
      });
  };


  render() {
    if(this.state.loaded){
      return(
        <ScrollView style = {{backgroundColor:'white'}}>
        <View>

        <Icon
        raised
        name='plus'
        type='material-community'
        color='#27ae60'
        containerStyle = {styles.gardenIcon}
        onPress={() => this.props.navigation.navigate('GardenDetailScreen')} />

        <View style = {styles.gardenHeader}
        onPress={() => alert('MAGA')}
        >
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
}



module.exports = GardenScreen;
