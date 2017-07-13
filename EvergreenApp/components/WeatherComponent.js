import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import WidgetComponent from './WidgetComponent.js';


import {sliderWidth,itemWidth} from '../Styles/weatherStyles.js'
import styles from '../Styles/weatherStyles.js'
//const styles = require('../Styles/weatherStyles.js');

export default class WeatherComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
        viewport:
        {
          width: Dimensions.get('window').width
        },
        state:'DE',
        city: 'Newark',
        infoArray:[],
        loaded:false
  		};
    }



    componentWillMount(){
      var apiKey='3f766cac24cd2475';
      let temporaryArray = [];

        fetch(`https://api.wunderground.com/api/${apiKey}/forecast10day/q/${this.state.state}/${this.state.city}.json`)
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
            loaded:true
       });
        })
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
		  if(this.props.widget==="large"){
        if(this.state.loaded){
        return(
          <View style = {styles.container}
          onLayout={() => {
               this.setState({
                   viewport: {
                       width: Dimensions.get('window').width
                   }
               });
           }}
          >
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

      return (
  <View style={{flex: 1, paddingTop: 20,justifyContent: 'center'}}>
    <ActivityIndicator size = 'large' />
  </View>
);
}
else{
	return(
	<Text> Ca Marche!!!!</Text>
	)
}
    }
  	}


module.exports = WeatherComponent;
