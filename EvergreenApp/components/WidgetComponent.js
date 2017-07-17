import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';


import styles from '../Styles/weatherStyles.js'


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
      wind: ''
    };
  }

componentWillReceiveProps(props)
  {
  this.setState({
    city: props.city,
    state: props.state,
    condition: props.condition,
    day: props.day,
    pop: props.pop,
    temp:props.temp,
    humidity:props.humidity,
    wind: props.wind
  });
  }

  render(){
    return(

      <TouchableOpacity
              activeOpacity={0.7}
              >
      <View style={styles.weatherContainer}>

      <View style={styles.topContainer}>
      <View style = {styles.iconContainer}>
      <Icon
      name='white-balance-sunny'
      type='material-community'
      color='white'
      size ={50}
      />
      </View>

        <Text style = {styles.tempText}>{this.state.temp}  </Text>
        <Text style = {styles.degreeText}> &#8457;</Text>
      </View>

      <View style = {styles.bottomContainer}>
      <Text style = {styles.conditionText}> {this.state.condition}</Text>
      <Text> {this.state.city +', '+ this.state.state} </Text>
      <Text style = {styles.dayText}>{this.state.day}</Text>

      <View style = {styles.detailContainer}>
      <Icon
      name='water'
      type='material-community'
      color = '#e67e22'
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
      color = '#e67e22'
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
