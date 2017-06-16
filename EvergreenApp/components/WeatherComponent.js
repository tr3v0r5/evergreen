import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
const styles = require('../Styles/style.js');

class WeatherScreen extends Component{

	constructor(){
		super();
		var temp;
		this.state = {
			Temp: temp,
			searchedCity: '',
			zip:''
		};
	}

	fetchWeather(zip) {

		var apiKey='3f766cac24cd2475';
		let url =`https://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`
	  return fetch(url).then((response) => response.json())

	}

	weathercall(){
		var that = this;
		this.fetchWeather(state.zip).then((response) => {
			let weatherList = response;
		    that.setState({
				Temp: weatherList.current_observation.temp_f,
		    searchedCity: weatherList.current_observation.display_location.city
		      });
		  });
	}

	render(){
		var text;
		var that=this;
    return(
		 <View>
		 	<TextInput
		  	style={{height: 40, borderColor: 'gray', borderWidth: 1}}
		  	placeholder="Zipcode"
		  	onChangeText={(zip)=>this.setState({zip})}
		    onSubmitEditing={this.weathercall}
				value={this.state.zip}
		    clearButtonMode={"always"}
		    clearTextOnFocus={true}
		    enablesReturnKeyAutomatically={true}
		    returnKeyLabel={"search"}
			/>

      	<View style={styles.dataBlock}>
      		<Text style={{color:'#FFFFFF', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.Temp}</Text>
		  		<Text style={{color:'#FFFFFF', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.searchedCity}</Text>
        </View>
		  </View>
      );
    }
}

module.exports = WeatherScreen;
