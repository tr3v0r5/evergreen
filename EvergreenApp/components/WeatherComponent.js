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
			zip:'19711'
		};
	}

	fetchWeather(zip) {

		var apiKey='3f766cac24cd2475';
		let url =`https://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`
	  return fetch(url).then((response) => response.json())

	}

	weathercall(){
		var that = this;
		this.fetchWeather(this.state.zip).then((response) => {
			let weatherList = response;
		    that.setState({
				Temp: weatherList.current_observation.temp_f,
		    searchedCity: weatherList.current_observation.display_location.city
		      });
		  });
	}

	render(){
    return(
		 <View>
		 	<TextInput
				ref={'textInput'}
				style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
		  	placeholder="Zipcode"
		  	onChangeText={(zip)=>this.setState({zip})}
		    onSubmitEditing={() => this.weathercall()}
				value={this.state.zip}
		    clearButtonMode={"always"}
		    clearTextOnFocus={true}
		    enablesReturnKeyAutomatically={true}
		    returnKeyLabel={"search"}
			/>

		<View style={styles.weatherWidget}>
      		<Text style={{color:'#FFFFFF', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.Temp}</Text>
		  		<Text style={{color:'#FFFFFF', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.searchedCity}</Text>
        </View>
		  </View>
      );
    }
}

module.exports = WeatherScreen;
