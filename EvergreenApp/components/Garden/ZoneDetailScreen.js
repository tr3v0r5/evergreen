import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity
} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import PlantComponent from './PlantComponent.js';

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
      uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
      plantsArray:[],
      loaded:false
    };
  }


  initPlants()
  {
    const {params} = this.props.navigation.state;
    var plantRef = firebase.database().ref('/Users/' + this.state.uID + '/Garden Zones/'+params.zone + '/Plants');
    var that = this;
    plantRef.on('value', (snapshot) => {
              var plants = [];

              snapshot.forEach((child) => {

              plants.push({
                    name:child.val().Name,
                    imageSource :child.val().ImageSource,
                    keyRef :child.key
                    });
                });

                that.setState({
                  plantsArray:plants,
                  loaded:true
                            });
              });
  }

  componentWillMount()
  {
    this.initPlants();

  }

  makePlants(){
    return this.state.plantsArray.map(function(plant,i){
      var nameVal = plant.name;
      var imageVal = plant.imageSource;
        return(
          <PlantComponent key = {i}  name = {nameVal}
          imageSource = {imageVal}/>
        );
      });
  };


  render() {
    if(this.state.loaded){
      return(
    <View style={{flex:1, backgroundColor:'white'}}>
    <Text style ={{textAlign:'center', fontSize: 30, fontFamily:'HelveticaNeue-Thin', color: '#27ae60'}}>
    Plants
    </Text>

    <View style = {styles.plantGrid}>
      {this.makePlants()}
      </View>
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
