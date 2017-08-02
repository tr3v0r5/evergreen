import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import UserSettingsComponent from './UserSettingsComponent.js'
import * as firebase from 'firebase';

export default class SettingsScreen extends Component{

  static navigationOptions = {
    header: <Text style={{paddingTop:30, textAlign:'center',
    color:'#27ae60',
    fontFamily:'HelveticaNeue-Thin',
    fontSize:30}}>
    Settings</Text>
  }

  constructor(props){
    super(props);
    this.state = {
      uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
    };
  }


  render() {
    return (
      <ScrollableTabView
      style={{paddingTop: 1,backgroundColor:'white' }}
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
