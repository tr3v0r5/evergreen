import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
	,AsyncStorage} from 'react-native';
import { FormLabel, FormInput,FormValidationMessage } from 'react-native-elements'	
import Carousel from 'react-native-snap-carousel';
import WidgetComponent from './WidgetComponent.js';
import * as firebase from 'firebase';


import {sliderWidth,itemWidth} from '../../Styles/weatherStyles.js'
import styles from '../../Styles/weatherStyles.js'

export default class WeatherScreen extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
        viewport:
        {
          width: Dimensions.get('window').width
        },
        zip:'',
        city: '',
        state:'',
        infoArray:[],
        loaded:false,
  		};
    }

async setZipCode() {
    try {
      const UID = await AsyncStorage.getItem('UID');
      this.setState({
        userID: UID
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
	
    var that = this;
		 firebase.database().ref('/Users/' + this.state.userID + '/UserData').on('value',(snapshot)=> {
         var zip = snapshot.val().zip
		 let apiKey = 'AIzaSyDnBNddRo5XOIX61hmASkzVIqf05fgw2Dg'; 
		 fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`)
		     .then((response)=> response.json())
		     .then((responseData)=> {
		       var cityVal=responseData.results[0].address_components[1].long_name;
		       var stateVal=responseData.results[0].address_components[3].short_name;
			   
		       this.setInfo(cityVal,stateVal,zip);
			   });
			   }); 
         
      }


 /*setCityandState() {
    let apiKey = 'AIzaSyDnBNddRo5XOIX61hmASkzVIqf05fgw2Dg';
    let zipCode = this.state.zipCode;
	console.warn(zipCode);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`)
    .then((response)=> response.json())
    .then((responseData)=> {
      var cityVal=responseData['results'][0]['address_components'][1]['long_name'];
      var stateVal=responseData['results'][0]['address_components'][3]['short_name'];

      this.setState({
        city: cityVal,
        state: stateVal
                  });
                })
            }*/

	setInfo(city,state,zip){
    let apiKey='3f766cac24cd2475';
    let temporaryArray = [];
    fetch(`https://api.wunderground.com/api/${apiKey}/forecast10day/q/${zip}.json`)
    .then((response)=> response.json())
    .then((responseData)=> {

    for(var i = 0; i < 5;i++)
          {
          temporaryArray.push({
            condition : responseData.forecast.simpleforecast.forecastday[i].conditions.toUpperCase(),
            day : responseData.forecast.simpleforecast.forecastday[i].date.pretty,
            pop: responseData.forecast.simpleforecast.forecastday[i].pop,
            temp: responseData.forecast.simpleforecast.forecastday[i].high.fahrenheit,
            humidity: responseData.forecast.simpleforecast.forecastday[i].avehumidity,
            wind : responseData.forecast.simpleforecast.forecastday[i].avewind.mph
              });
          }

    this.setState({
      infoArray:temporaryArray,
      loaded:true,
		state:state,
		city:city,
                });
            })
        }


    componentDidMount(){

		this.setZipCode();
		//this.setInfo(); 
        /*.then(getLoc =>this.setZipCode())
        .then(getLoc =>{
          this.setCityandState()
          .then(getInfo => this.setCityandState())
          .then(getInfo =>{
            this.setInfo();
          })
        })*/

      }

	  enter(){
  		if (this.state.zipCode==null ||(this.state.zipCode).length!=5 ){
  			this.setState({
  				zipError:'ZipCode needs to be 5 digits'
  			})
  		}
		else{
		    firebase.database().ref('/Users/' + this.state.userID + '/UserData').set({
				zip:this.state.zipCode
		          });
		}
	  }
    makeWidgets(){
      let cityVar = this.state.city;
      let stateVar = this.state.state;

      return this.state.infoArray.map(function(info,i){
          return(
            <WidgetComponent key = {i}  city = {cityVar} state = {stateVar} condition = {info.condition}
             day = {info.day} pop= {info.pop} temp = {info.temp}
            humidity = {info.humidity} wind = {info.wind}/>
          );
        });
    };

      render(){
        if(this.state.loaded){
        return(
          <View style = {styles.carouselContainer}
          onLayout={() => {
               this.setState({
                   viewport: {
                       width: Dimensions.get('window').width
                   }
               });
           }}
          >
          <View style = {styles.headerContainer}>
          <Text style = {styles.headerText}> 5 Day Weather Forecast </Text>
          </View>
           <Carousel
           sliderWidth={this.state.viewport.width}
           itemWidth={itemWidth}
           inactiveSlideScale={0.94}
           inactiveSlideOpacity={0.6}
           enableMomentum={false}
              >
              {this.makeWidgets()}
              </Carousel>
          </View>
        );
      }
	  else if (this.state.zip==''){
	  return (
		  <View style={{flex: 1, paddingTop: 20,justifyContent:'center',alignItems:'center'}}>  
	  	<Text> Please enter zipcode</Text>
          <FormLabel>Zip Code</FormLabel>
          <FormInput
          onChangeText={(zip) => this.setState({zipCode:''+zip})}
          value={this.state.zipCode}
            keyboardType = {'numeric'}
			placeholder='Required'
			onEndEditing={()=>this.enter()}
           />
		<FormValidationMessage>{this.state.zipError}</FormValidationMessage>
		  </View>
	  )
  }
     else{ return (
  <View style={{flex: 1, paddingTop: 20,justifyContent: 'center'}}>
    <ActivityIndicator size = 'large' />
		  
  </View>
);
}
    }
  	}


module.exports = WeatherScreen;
