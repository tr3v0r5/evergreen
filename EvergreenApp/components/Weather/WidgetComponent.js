import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';


import styles from '../../Styles/weatherStyles.js'


export class WidgetComponent extends Component
{
  constructor(){
    super();

    this.state = {
      city:'',
      state:'',
      condition:'',
      day: '',
      pop:'',
      temp:'',
      humidity: '',
      wind: '',
    };
  }



  componentWillReceiveProps(props)
    {
    this.chooseStyle(props.condition);
    this.setState({
      city: props.city,
      state: props.state,
      condition: props.condition,
      day: props.day,
      pop: props.pop,
      temp:props.temp,
      humidity:props.humidity,
      wind: props.wind,
    });

    }

  chooseStyle(condition)
  {
    var iconType ='';
    var colorChoice = '#e67e22';

    condition.toUpperCase();

    if((condition == 'CHANCE OF FLURRIES')|| (condition == 'CHANCE OF FREEZING RAIN')
    ||(condition == 'CHANCE OF SLEET') ||(condition == 'FLURRIES') ||(condition == 'SLEET'))
    {
      iconType = 'weather-hail';
      colorChoice = '#8194BF';
    }

    else if((condition == 'CHANCE OF RAIN') || (condition == 'CHANCE RAIN')
    ||(condition == 'RAIN'))
    {
      iconType = 'weather-pouring';
      colorChoice = '#2980b9';
    }

    else if ((condition == 'CHANCE OF SNOW') || (condition == 'SNOW'))
    {
      iconType = 'weather-snowy';
      colorChoice = '#668eab';
    }
    else if((condition == 'CHANCE OF THUNDERSTORMS')||(condition == 'CHANCE OF A THUNDERSTORM')
    ||(condition == 'THUNDERSTORM') || (condition == 'THUNDERSTORMS'))
    {
      iconType = 'weather-lightning';
      colorChoice = '#f1c40f';
    }

    else if ((condition == "CLEAR") || (condition == 'SUNNY'))
    {
      iconType = 'weather-sunny';
      colorChoice = '#e67e22';
    }
    else if((condition == 'CLOUDY') || (condition == 'MOSTLY CLOUDY'))
    {
      iconType = 'weather-cloudy';
      colorChoice = '#878e98';
    }
    else if ((condition == 'MOSTLY SUNNY') || (condition == 'PARTLY CLOUDY')
    ||(condition == 'PARTLY SUNNY')|| (condition == 'OVERCAST'))
    {
      iconType = 'weather-partlycloudy';
      colorChoice = '#748B9D';
    }
    else if ((condition == 'FOG' ) || (condition == 'HAZE'))
    {
      iconType = 'weather-fog';
      colorChoice = '#2a9c9d';
    }

      this.setState({
        icon:iconType,
        color:colorChoice
      });

  }
chooseStyle(condition)
  {
    var iconType ='';
    var colorChoice = '#e67e22';

    condition.toUpperCase();

    if((condition == 'CHANCE OF FLURRIES')|| (condition == 'CHANCE OF FREEZING RAIN')
    ||(condition == 'CHANCE OF SLEET') ||(condition == 'FLURRIES') ||(condition == 'SLEET'))
    {
      iconType = 'weather-hail';
      colorChoice = '#8194BF';
    }

    else if((condition == 'CHANCE OF RAIN') || (condition == 'CHANCE RAIN')
    ||(condition == 'RAIN'))
    {
      iconType = 'weather-pouring';
      colorChoice = '#2980b9';
    }

    else if ((condition == 'CHANCE OF SNOW') || (condition == 'SNOW'))
    {
      iconType = 'weather-snowy';
      colorChoice = '#668eab';
    }
    else if((condition == 'CHANCE OF THUNDERSTORMS')||(condition == 'CHANCE OF A THUNDERSTORM')
    ||(condition == 'THUNDERSTORM') || (condition == 'THUNDERSTORMS'))
    {
      iconType = 'weather-lightning';
      colorChoice = '#f1c40f';
    }

    else if ((condition == "CLEAR") || (condition == 'SUNNY'))
    {
      iconType = 'weather-sunny';
      colorChoice = '#e67e22';
    }
    else if((condition == 'CLOUDY') || (condition == 'MOSTLY CLOUDY'))
    {
      iconType = 'weather-cloudy';
      colorChoice = '#878e98';
    }
    else if ((condition == 'MOSTLY SUNNY') || (condition == 'PARTLY CLOUDY')
    ||(condition == 'PARTLY SUNNY')|| (condition == 'OVERCAST'))
    {
      iconType = 'weather-partlycloudy';
      colorChoice = '#748B9D';
    }
    else if ((condition == 'FOG' ) || (condition == 'HAZE'))
    {
      iconType = 'weather-fog';
      colorChoice = '#2a9c9d';
    }

      this.setState({
        icon:iconType,
        color:colorChoice
      });

  }

  render(){

    return(

      <TouchableOpacity
              activeOpacity={0.7}
              >
      <View style={styles.weatherContainer}>

      <View style={[{backgroundColor:this.state.color},styles.topContainer]}>
      <View style = {styles.iconContainer}>
      <Icon
      name = {this.state.icon}
      type='material-community'
      color='white'
      size ={50}
      />
      </View>

        <Text style = {styles.tempText}>{this.state.temp}  </Text>
        <Text style = {styles.degreeText}> &#8457;</Text>
      </View>

      <View style = {styles.bottomContainer}>
      <Text style = {[{color:this.state.color},styles.conditionText]}> {this.state.condition}</Text>
      <Text> {this.state.city +','+ this.state.state} </Text>
      <Text style = {styles.dayText}>{this.state.day}</Text>

      <View style = {styles.detailContainer}>
      <Icon
      name='water'
      type='material-community'
      color = {this.state.color}
      size = {30}
      />
      <Text style = {styles.detailText,
        {
          marginRight:40,
          marginTop:7
        }
      }>{this.state.humidity} %</Text>
      <Icon
      name='weather-windy'
      type='material-community'
      color = {this.state.color}
      size = {30}
      />
      <Text style = {styles.detailText}>{this.state.wind} mph </Text>
      </View>
      <Text  style = {styles.popText}>{ this.state.pop }% chance of precipitation</Text>
      </View>
      </View>
         </TouchableOpacity>
    );
  }


}

module.exports = WidgetComponent;
