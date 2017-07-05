import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
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

      //navigate to garden screen
      if((user != null)&&(user.emailVerified)){//the first part of this is wrong currently
          this.props.navi.navigate('Garden');

      }//if
      else{
        this.setState({
          PasswordErrorMess: 'sorry wrong password or email verification incomplete',
        });
      }//else

    }
    catch (error) {

      let err = error.toString();

      this.setState({
        PasswordErrorMess: err,
      });

      console.log(err);

    }
  }

  render(){

    // var loginDisplayed = this.props.displayed === true ? {} : {display:'none'};
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
