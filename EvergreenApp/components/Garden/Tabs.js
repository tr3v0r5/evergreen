import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import WeatherScreen from './WeatherScreen.js';
import SettingsScreen from './SettingsScreen.js';
import GardenStack from './SecondStack.js'

export const GardenTabs = TabNavigator({
  Home: {
    screen: GardenStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />
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
    showLabel:false,
    activeTintColor:'#27ae60',

    style:{
      backgroundColor:'white'
    },
    tabBarComponent:'TabBarBottom',
  },

});

module.exports = GardenTabs;
