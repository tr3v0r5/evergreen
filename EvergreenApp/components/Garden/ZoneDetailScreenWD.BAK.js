import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity
} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import PlantComponent from './PlantComponent.js';
import AddPlantScreen from './AddPlantScreen.js';

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
      userID:'',
      zone:'',
      plantsArray:[],
      loaded:false,
      modal: <AddPlantScreen/>
    };
  }



  async initPlants()
  {

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

    var plantRef = firebase.database().ref('/Users/' + this.state.userID + '/Garden Zones/'+ this.state.zone + '/Plants');
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
