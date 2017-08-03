
import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity,Dimensions,Animated } from 'react-native';
  import { StackNavigator, TabNavigator } from 'react-navigation';
import {Button, Icon} from 'react-native-elements';
import Svg, {G,Path} from 'react-native-svg'
import * as firebase from 'firebase';
import GardenZoneComponent from './GardenZoneComponent.js';

import styles from '../../Styles/gardenStyles.js';
const dimensionWindow = Dimensions.get('window');

export class GardenScreen extends Component{


  static navigationOptions = {
    header:null
  }



  constructor(props){
    super(props);
    this.state = {
      zonesArray:[],
      loaded:false,
		timer:'something',
fadeAnim: new Animated.Value(1),
		fadeAnim2: new Animated.Value(0),
width:dimensionWindow.width,
		height:dimensionWindow.height
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

    console.warn(this.state.userID+'asfdasdfasdfsdf');

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
                  loaded:true,
				  timer:null
                  });

              });

  }//initZones

  componentDidMount()
  {
	  Animated.timing(
	  		  this.state.fadeAnim,{
	  			  toValue:0,
	  			  duration:2000
	  		  }
	  	  ).start()
		  setTimeout(()=>{
		  		  Animated.timing(
		  			  this.state.fadeAnim2,{
		  				  toValue:1,
		  				  duration:1000
		  			  }
		  		  ).start()
				  
    this.initZones();
},2000);

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
	  if(this.state.timer!=null){
	  	  	return(
	  			<Animated.View style={{alignItems:'center',backgroundColor:'orange',justifyContent: 'center',
	      padding: 10,opacity:this.state.fadeAnim}}>
	  	  		<Svg width={this.state.width} height={this.state.height}>
	  			<G y={this.state.height/8.5} translate='-25,0'>
	  			<Path fill='green' d="M244.8,225.4c0.9-7.4,1-16,0.3-25.6c-0.9-8.4-1.3-13.1-1.3-13.9c-35.6,8.4-53.6,23.2-54,44.3
	  	c-0.1,6.6,1.5,13.4,4.9,20.5c1.7,3.5,3.4,6.4,5.1,8.7c0-12.4,3.6-22,10.8-29.1c2.4-2.3,4.9-4.1,7.5-5.3c2.3-1.1,3.5-1.4,3.7-1
	  	c-6.3,6.1-11.9,18.7-16.7,37.9c-2.4,9.6-4.2,18.5-5.3,26.8h14.6v-29.3C231.8,260.3,242,249,244.8,225.4z"/>
	  			</G>
	  			</Svg>
	  			</Animated.View>
	  	  	)
	  	  }
    else{
      return(
		  <Animated.View style={[styles.containerGarden,{opacity:this.state.fadeAnim2}]}>
        <ScrollView style = {{backgroundColor:'white'}}>
        <View>

        <Icon
        raised
        name='plus'
        type='material-community'
        color='#27ae60'
        containerStyle = {styles.gardenIcon}
        onPress={() => this.props.navigation.navigate('GardenDetailScreen')} />

        <View style = {styles.gardenHeader}>
        <Text style = {styles.gardenText}>Welcome to Your Smart Garden</Text>
        </View>

        <View style = {styles.gardenGrid}>

        {this.makeZones(this.props.navigation)}
        </View>
        </View>
       </ScrollView>
		</Animated.View>
      );
          }

  }
}



module.exports = GardenScreen;
