import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert,
 LayoutAnimation } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import * as firebase from 'firebase';

const styles = require('../../Styles/style.js');

export class SignupBox extends Component{

  constructor(){
    super();
    this.state = {
        UserName: '',
        Password: '',
        PasswordCheck: '',
        PasswordErrorMess: '',
    }
  }


  async signup(email, pass, pass2){

    try {

      if ((pass === pass2) == false){

        this.setState({
          PasswordErrorMess: 'Passwords do not match',
        });

      }else{
      //if passwords match then do firebase stuff

        await firebase.auth()
          .createUserWithEmailAndPassword(email, pass);

        //send verification
        let user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {

          alert("verification email sent");

          firebase.database().ref('Users/'+ user.uid).set({

              Sensors: '',
			  GardenZones:'',
			  History:'',
              UserData: '',

          });//this might be a bad way to do this
        }, function(error) {

          console.log(error.toString());

        });//catch promise errors
      }
    }
    catch (error) {

      let err = error.toString();

      this.setState({
        PasswordErrorMess: err,
      });

      console.log(error.toString());

    }//catch firebase errors
  }

  render(){

    const { navigate } = this.props.navi
    // var loginDisplayed = this.props.displayed === true ? {} : {display:'none'};

    return(
      <View style={{alignItems:'center'}}>
       <FormInput onChangeText={(UserName) => this.setState({UserName})}
         containerStyle={styles.textBox}
         placeholder='email'/>
       <FormInput onChangeText={(Password) => this.setState({Password})}
         containerStyle={styles.textBox}
         secureTextEntry={true}
         placeholder='password'/>
       <FormInput onChangeText={(PasswordCheck) => this.setState({PasswordCheck})}
         containerStyle={styles.textBox}
         secureTextEntry={true}
         placeholder='password again'/>
       <FormValidationMessage>{this.state.PasswordCheckErrorMess}</FormValidationMessage>
       <View style={{justifyContent: 'center'}}>
         <Button
           raised
           iconRight
           title="sign-up"
           onPress = {() => this.signup(this.state.UserName, this.state.Password, this.state.PasswordCheck)}
           icon={{name: 'chevron-right', size: 24}}
           buttonStyle={styles.stockButton}
           textStyle={{textAlign: 'center'}}
           />
       </View>
     </View>
    );
  }//render()
}//LoginBox
module.exports=SignupBox;
