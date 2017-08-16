import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import WeatherScreen from './Weather/WeatherScreen.js';
import SettingsScreen from './Settings/UserSettingsComponent.js';
import LoginScreen from './Login/LoginScreen.js';
import GardenScreen from './Garden/GardenScreen.js';
import ZoneDetailScreen from './Garden/ZoneDetailScreen.js';
import SensorScreen from './Sensor/SensorScreen.js';


export const GardenStack = StackNavigator({
  Main:{
    screen: GardenScreen
  },
  ZoneDetailScreen:{
    screen: ZoneDetailScreen,
	  navigationOptions:({navigation})=>({
	  }),
  },
  Sensor:{
	  screen:SensorScreen
  }
});

export const GardenTabs = TabNavigator({
  Home: {
    screen: GardenStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />,
    },
  },
  Weather: {
    screen: WeatherScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="onedrive" type='material-community' size={35} color={tintColor} />
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: '',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" type='material-community' size={35} color={tintColor} />
    },

  },
},{
  tabBarOptions:{
    iconStyle: {
      width: 50,
      height: 35,
     },
    lazyLoad: true,
    showLabel:false,
    activeTintColor:'#27ae60',
    inactiveTintColor: 'grey',
    showIcon: true,
    style:{
      backgroundColor:'white',
      height: 50,
      margin: 0,
      padding: 0,
    },
  },

});
export const Root = StackNavigator({
  Login: { screen: LoginScreen },
  Garden:{
	  screen: GardenTabs
  },
},
{headerMode:'none'}

);
