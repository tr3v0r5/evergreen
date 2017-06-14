import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
var WeatherScreen=React.createClass({
	getInitialState:function(){
		var temp;
		return({
			Temp: temp,
			searchedCity: '11206'
		});
		
	},
	componentDidMount:function(){
		var that=this;
		/*this.setState({
			Temp: 80,
			img: 'Sun'
		});*/
			this.weathercall();
	},

	fetchWeather:function(zip) {
		var apiKey='3f766cac24cd2475';
		let url =`https://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`

	  return fetch(url).then((response) => response.json())
	},
	weathercall:function(){
		this.fetchWeather(this.state.searchedCity).then((response) => {
			let weatherList = response;

		      // Store nextColor, since we'd like to start next time with it.
		      //var current = this.state.nextColor;

		      // Reset animation
		      //this.state.val.setValue(0);

		      this.setState({
				Temp: weatherList.current_observation.temp_f,
		        searchedCity: weatherList.current_observation.display_location.city
		      });
		
		
		  });
	},
    render:function(){
      return(
        <View style={styles.dataBlock}>
          <Text style={{color:'green', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.Temp}</Text>
		  <Text style={{color:'green', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.searchedCity}</Text>
        </View>
      );
    }
})
module.export=WeatherScreen;