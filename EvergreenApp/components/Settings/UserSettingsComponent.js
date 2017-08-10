import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, TextInput, View, Alert, ScrollView, Dimensions
} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import * as firebase from 'firebase';


import styles from '../../Styles/settingStyles.js'

export default class UserSettingsComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
        uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
        firstName:'',
        lastName:'',
        zipCode:''
  		};
    }

    initInfo() {
        var that = this;
           firebase.database().ref('/Users/' + this.state.uID + '/UserData').once('value')
           .then(function(snapshot) {
             var fname= snapshot.val().fname
             var lname = snapshot.val().lname
             var zip = snapshot.val().zip
             that.setState({
               firstName:fname,
               lastName:lname,
               zipCode: zip
                         });

              });
          }

    changeUserInfo(first, last, zip){
      firebase.database().ref('/Users/' + this.state.uID + '/UserData').set({
          fname: this.state.firstName,
          lname:this.state.lastName,
          zip:this.state.zipCode
        });
        alert('You have successfully changed your information!');
    }

    componentWillMount(){
      this.initInfo();
    }


      render(){
        return(

          <View style = {styles.userContainer} >

          <FormLabel>First Name</FormLabel>
          <FormInput
          onChangeText={(first) => this.setState({firstName:first})}
          value={this.state.firstName}
           />

          <FormLabel>Last Name</FormLabel>
          <FormInput
          onChangeText={(last) => this.setState({lastName:last})}
          value={this.state.lastName}
          />

          <FormLabel>Zip Code</FormLabel>
          <FormInput
          onChangeText={(zip) => this.setState({zipCode:''+zip})}
          value={this.state.zipCode}
            keyboardType = {'numeric'}
           />

           <Button
           title='SUBMIT'
           onPress={this.changeUserInfo.bind(this)}/>

          </View>

        );
  	}
  }


module.exports = UserSettingsComponent;
