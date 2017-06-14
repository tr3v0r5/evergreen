import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
        <TextInput
            style={{height: 30, backgroundColor:'white', width: 200, textAlign: 'center'}}
            placeholder="login"
            onChangeText={(text) => this.setState({text})}
            />
          <Button
            title="login"
            onPress = {() => navigate('Weat')}
            />
        </View>
      );
    }
  }

  class GardenScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>working</Text>
        </View>
      );
    }
  }


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


/*class WeatherScreen extends Component{
	constructor(prop){
	super(prop);
	var temp;
	this.state={
		Temp: temp,
		img: ''
	}
}
	componentDidMount(){
		var that=this;
		this.setState({
			Temp: 90,
			img: 'Sun'
		});
		
	}
    render(){
      return(
        <View style={styles.dataBlock}>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.Temp}</Text>
        </View>
      );
    }
}*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(52,180,67)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

const EvergreenApp = StackNavigator({
  Login: { screen: LoginScreen },
  Garden: { screen: GardenScreen },
Weat: { screen: WeatherScreen}
});

AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);