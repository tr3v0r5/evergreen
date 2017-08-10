import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Button,ScrollView, Dimensions
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import UserSettingsComponent from './UserSettingsComponent.js'
import * as firebase from 'firebase';

export default class SettingsScreen extends Component{

  static navigationOptions = {
<<<<<<< HEAD:EvergreenApp/components/Settings/SettingsScreen.js
    header: <Text style={{backgroundColor:'white',
    paddingTop:30, textAlign:'center',
=======
    header: <Text style={{paddingTop:30, textAlign:'center',
>>>>>>> 186f0919022974e3070080ba75c4c4e65d0c3353:EvergreenApp/components/SettingsScreen.js
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
