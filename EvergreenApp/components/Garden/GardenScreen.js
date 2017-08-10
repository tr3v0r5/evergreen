
import React, { PureComponent, Component } from 'react';
import {ActivityIndicator , Text, TextInput, View, Alert, ScrollView,
  Image,TouchableOpacity,Dimensions,Animated,AsyncStorage } from 'react-native';
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
		timer:'something', //used to make the end of fade in animation
fadeAnim: new Animated.Value(1),//opacity value for splashscreen
		fadeAnim2: new Animated.Value(0),//opacity value for gardenscreem
width:dimensionWindow.width,//width of screen
		height:dimensionWindow.height//height of screen
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

    //console.warn(this.state.userID+'asfdasdfasdfsdf');

    var zoneRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones');

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
	  	  ).start()//decrease splashscreen opacity from 1 to 0
		  setTimeout(()=>{
		  		  Animated.timing(
		  			  this.state.fadeAnim2,{
		  				  toValue:1,
		  				  duration:1000
		  			  }
		  		  ).start()//increase gardenscreen opacity from 0 to 1

    this.initZones();
},2000);//delays actual garden screen

  }//componentDidMount

  makeZones(navigation){
	  var x= this.state.userID;
	  var list= this.state.userSensors;
	  //console.warn(list);
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
           userID = {x}
            />
        );
      });

  }//makeZones


  render() {
	  console.warn(JSON.stringify(this.props.navigation));
	  if(this.state.timer!=null){
	  	  	return(
	  			<Animated.View style={{alignItems:'center',backgroundColor:'white',justifyContent: 'center',
	      padding: 10,opacity:this.state.fadeAnim}}>
	  	  		<Svg width='560' height='681' preserveAspectRatio="xMidYMid meet">
	  			<G translate='100,520' scale=".065,-.065" >
	  			<Path fill='green' d="M5438 6707 c-175 -174 -379 -312 -613 -413 -224 -97 -393 -138 -1015
-249 -505 -89 -624 -113 -875 -171 -1097 -253 -1887 -655 -2327 -1185 -302
-364 -443 -728 -530 -1373 -20 -140 -23 -206 -23 -506 0 -302 3 -366 23 -510
81 -599 266 -1154 547 -1646 93 -161 256 -400 362 -529 l98 -120 365 -2 365
-2 -77 29 c-196 73 -387 197 -522 341 -185 196 -364 543 -470 906 -135 468
-182 982 -135 1488 18 191 102 472 198 664 267 529 780 1000 1446 1326 286
139 553 240 944 355 261 76 487 152 614 206 98 41 133 44 148 10 8 -16 8 -29
1 -43 -20 -36 -334 -192 -592 -293 -802 -314 -1002 -407 -1300 -605 -195 -129
-371 -276 -570 -475 -163 -163 -249 -274 -332 -427 -167 -308 -268 -764 -268
-1215 l0 -167 43 -34 c133 -108 333 -168 607 -183 116 -6 136 -4 284 26 454
91 884 248 1258 458 1166 654 1991 1886 2376 3552 72 310 132 672 132 797 0
61 -3 74 -19 83 -11 5 -24 10 -30 10 -6 0 -57 -46 -113 -103z"/>
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

  }//rneder
}



module.exports = GardenScreen;
