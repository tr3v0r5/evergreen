import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import WeatherComponent from './WeatherComponent.js';
import SettingsScreen from './SettingsScreen.js';
import GardenZoneComponent from './GardenZoneComponent.js';


export const GardenTabs = TabNavigator({
  Home: {
    screen: GardenZoneComponent,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />
    },
  },
  Weather: {
    screen: WeatherComponent,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: '',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
},{
  tabBarOptions:{
    showLabel:false,
    activeTintColor:'#27ae60',
  }

});
