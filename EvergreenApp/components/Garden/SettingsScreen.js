import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import UserSettingsComponent from './UserSettingsComponent.js'
import * as firebase from 'firebase';



export default class SettingsScreen extends Component{
  constructor(props){
    super(props);
  }


  render() {
    return (
      <ScrollableTabView
      style={{paddingTop: 15, }}
      renderTabBar={() => <DefaultTabBar backgroundColor = 'white'/>}
      tabBarActiveTextColor = 'white'
      tabBarInactiveTextColor= 'white'
      tabBarUnderlineStyle={{backgroundColor:'#27ae60',height:2,}}
      tabBarTextStyle = {{color:'#27ae60', fontFamily: 'HelveticaNeue-Thin',fontSize:15}}
    >
    <UserSettingsComponent tabLabel = 'User Settings'/>
      <Text tabLabel='TODO'></Text>
    </ScrollableTabView>

    );
  }
}



module.exports = SettingsScreen;
