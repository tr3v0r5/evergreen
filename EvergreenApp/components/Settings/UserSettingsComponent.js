import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, TextInput, View, Alert, ScrollView, Dimensions
	,AsyncStorage} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import * as firebase from 'firebase';
import styles from '../../Styles/settingStyles.js';

export default class UserSettingsComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
			userID:'',
        	firstName:'',
        	lastName:'',
        	zipCode:''
  		};
    }

    async initInfo() {
	    try {
	      const UID = await AsyncStorage.getItem('UID');
	      this.setState({
	        userID: UID
	      });
	    } catch (error) {
	      // Error retrieving data
	      console.log(error);
	    }
		//console.warn(this.state.userID)
		var that=this;
	    var zoneRef = firebase.database().ref('/Users/' + this.state.userID + '/UserData');

	    zoneRef.on('value', (snapshot) => {
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

      async logout(){
        /* needs to eventually include firebase logout fuction for when navigating
          from LoginBox */

        try {
			var uid = await AsyncStorage.setItem('UID', '' )
			this.props.navigation.navigate('Login')

          } catch (error) {
            console.log('AsyncStorage write error: '+ error)
          }

      }//tempary logout function


    changeUserInfo(first, last, zip){
      firebase.database().ref('/Users/' + this.state.userID + '/UserData').set({
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
           title='submit'
           onPress={this.changeUserInfo.bind(this)}/>

          <Button
            raised
            iconRight
            title="logout  "
            onPress = {() => this.logout()}
            icon={{name: 'chevron-right', size: 24}}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
          </View>
        )};
  }


module.exports = UserSettingsComponent;
