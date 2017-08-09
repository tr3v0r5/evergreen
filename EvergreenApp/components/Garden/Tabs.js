import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import WeatherScreen from './WeatherScreen.js';
import SettingsScreen from './UserSettingsComponent.js';
import LoginScreen from '../Login/LoginScreen.js';
import GardenScreen from './GardenScreen.js';
import ZoneDetailScreen from './ZoneDetailScreen.js';
import SensorScreen from '../Sensor/SensorScreen.js';
import Logout from '../Login/LogoutScreen.js';

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

export const Settings=StackNavigator({
	Settings:{
		screen:SettingsScreen,
		navigationOptions: {
			header:null
		}
	},
	Logout:{
		screen:LoginScreen
	},
})

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
    screen: Settings,
    navigationOptions: {
      tabBarLabel: '',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" type='material-community' size={35} color={tintColor} />
    },

  },
},{
  tabBarOptions:{
    showLabel:false,
    activeTintColor:'#27ae60',

    style:{
      backgroundColor:'white'
    },
	tabBarPosition:'top'
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
