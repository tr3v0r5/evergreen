import React,{Component} from "react";
import {View,Text,AsyncStorage, Button} from 'react-native';
import * as firebase from 'firebase';
import {FormLabel, FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../../Styles/settingStyles.js';
import otherstyles from '../../Styles/gardenStyles.js';

var setup=React.createClass({
	getInitialState:function(){
   	 return{
         firstName:'',
         lastName:'',
		 zipCode: '',
		 zipError:''
   		};
   },
	componentWillMount:function(){
		this.init();
	},
	init: function(){
	    const {params}=this.props.navigation.state;
		var that=this;
	    var zoneRef = firebase.database().ref('/Users/' + params.userID + '/UserData');

	    zoneRef.on('value', (snapshot) => {
             var fname= snapshot.val().fname
             var lname = snapshot.val().lname
             var zip = snapshot.val().zip
             that.setState({
               firstName:fname,
               lastName:lname,
               zipCode: zip,
				 userID:params.userID
                         });

              });
          },
	navigate:function(){
		if ((this.state.zipCode).length!=5){
			this.setState({
				zipError:'ZipCode needs to be 5 digits'
			})
		}
		else{
	    firebase.database().ref('/Users/' + this.state.userID + '/UserData').set({
	            fname: this.state.firstName,
	            lname:this.state.lastName,
	            zip:this.state.zipCode
	          }).then(	
				  this.props.navigation.navigate('Garden'));
	}
		  },
    render:function(){
		return (
		<View style={styles.userContainer}>
		<Text style = {otherstyles.gardenText}>Let's get you setup here</Text>		
        <View style = {styles.userContainer} >

        	<FormLabel>First Name</FormLabel>
        	<FormInput
        		onChangeText={(first) => this.setState({firstName:first})}
        		value={this.state.firstName}
				onEndEditing={()=>this.setting()}
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
        		onChangeText={(zip) => this.setState({zipCode:zip})}
        		value={this.state.zipCode}
          	  	keyboardType = {'numeric'}
				placeholder='Required'
         	   />
			<FormValidationMessage>{this.state.zipError}</FormValidationMessage>
        	<Button
			   onPress={this.navigate} 
         	   title='Done!'
				/>
		  
		</View>
			   </View>
			)
		}




});
module.exports = setup;