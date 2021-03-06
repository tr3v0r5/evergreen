import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, Text, TextInput, View, Alert, ScrollView, Dimensions
	,AsyncStorage} from 'react-native';
import { Button, FormLabel, FormInput,FormValidationMessage } from 'react-native-elements'
import * as firebase from 'firebase';
import styles from '../../Styles/settingStyles.js';

export default class UserSettingsComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
			userID:'',
        	firstName:'',
        	lastName:'',
        	zipCode:'',
			zipError:''
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
		if (this.state.zipCode==null ||(this.state.zipCode).length!=5 ){
			this.setState({
				zipError:'ZipCode needs to be 5 digits'
			})
		}
		else{
			let fname=this.state.firstName;
			let lname=this.state.lastName;
			if(fname==undefined){
				fname=null;
			}
			if(lname==undefined){
				lname=null
			}	
	    firebase.database().ref('/Users/' + this.state.userID + '/UserData').set({
	            fname: fname,
			lname:lname,
	            zip:this.state.zipCode
	          })
			  alert('You have successfully changed your information!');
		  }
        
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
		  placeholder='Optional'
           />

          <FormLabel>Last Name</FormLabel>
          <FormInput
          onChangeText={(last) => this.setState({lastName:last})}
          value={this.state.lastName}
		  placeholder='Optional'
          />

          <FormLabel>Zip Code</FormLabel>
          <FormInput
          onChangeText={(zip) => this.setState({zipCode:''+zip})}
          value={this.state.zipCode}
            keyboardType = {'numeric'}
			placeholder='Required'
           />
		<FormValidationMessage>{this.state.zipError}</FormValidationMessage>
          <Button
			raised
           title='submit'
           onPress={this.changeUserInfo.bind(this)}/>

          <Button
            raised
            title="logout  "
            onPress = {() => this.logout()}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
          </View>
        )};
  }


module.exports = UserSettingsComponent;
