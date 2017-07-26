import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import UserSettingsComponent from './UserSettingsComponent.js'
import * as firebase from 'firebase';



export default class SettingsScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
    };
  }


  render() {
    return (
      <ScrollableTabView
      style={{paddingTop: 20, }}
      renderTabBar={() => <DefaultTabBar backgroundColor = '#27ae60'/>}
      tabBarActiveTextColor = 'white'
      tabBarInactiveTextColor= 'white'
      tabBarUnderlineStyle={{backgroundColor:'transparent',height:2,}}
    >
    <UserSettingsComponent tabLabel = 'User Settings'/>
      <Text tabLabel='Tab #1'>My</Text>
    </ScrollableTabView>

    );
  }
}



module.exports = SettingsScreen;
