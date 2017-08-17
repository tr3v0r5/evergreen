import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import * as firebase from 'firebase';

const styles = require('../../Styles/style.js');

export class LoginBox extends Component{

  constructor(){
    super();
    this.state = {
        UserName: '',
        Password: '',
        PasswordErrorMess: '',
    }
  }

  async login(email, pass){

    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass);

      let user = firebase.auth().currentUser;

      //if the user token exists and has verified the email
      if((user !== null)&&(user.emailVerified)){
          //Write to AsyncStorage Here
          try {
            await AsyncStorage.setItem('UID', user.uid );
          } catch (error) {
            console.log('AsyncStorage write error: '+ error)
          }
		  var that=this;
		  firebase.database().ref('/Users/' + this.state.userID+"/UserData").once('value').then(function(snapshot){ 
			  var userdata= snapshot.val();
			  console.warn(userdata);
          //After AsyncWrite move to next screen
		  if (userdata==null){
		  that.props.navi.navigate('Setup',{ userID: user.uid });

		  }
		  else{
		  console.warn('here');
          that.props.navi.navigate('Garden',{ userID: user.uid });
	  }
		  })

      } else{
        this.setState({
          PasswordErrorMess: 'sorry wrong password or email verification incomplete',
        });

      }//if-else

    } catch (error) {

      let err = error.toString();
      this.setState({
        PasswordErrorMess: err,
      });
      console.log(err);

    }//try-catch

  }//login

  render(){

    const { navigate } = this.props.navi

    return(
      <View style={{alignItems:'center'}}>
       <FormInput onChangeText={(UserName) => this.setState({UserName})}
         containerStyle={styles.textBox}
         placeholder='email'/>
       <FormInput onChangeText={(Password) => this.setState({Password})}
         containerStyle={styles.textBox}
         secureTextEntry={true}
         placeholder='password'/>
       <FormValidationMessage>{this.state.PasswordErrorMess}</FormValidationMessage>
       <View>
         <Button
           raised
           iconRight
           title="login  "
           onPress = {() => this.login(this.state.UserName,this.state.Password)}
           icon={{name: 'chevron-right', size: 24}}
           buttonStyle={styles.stockButton}
           textStyle={{textAlign: 'center'}}
           />
       </View>
   </View>
    );
  }//render()

}//LoginBox
module.exports=LoginBox;