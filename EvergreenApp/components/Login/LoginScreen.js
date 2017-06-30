import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const styles = require('../../Styles/style.js');

import LoginBox from './LoginBox.js';
import SignupBox from './SignupBox.js';

export class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

    constructor(){
      super();
      this.state = {
          UserName: '',
          Password: '',
          isLoginDisplayed: false,
          fadeAnim: new Animated.Value(0),
      }
    }

    async signup(email, pass){

      try {
        await firebase.auth()
          .createUserWithEmailAndPassword(email, pass);

          //send verification
          let user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function() {
            alert("verification email sent");
            firebase.database().ref('Users/'+ user.uid).set({
                Current: '',
                History: '',
            });//this might be a bad way to do this
          }, function(error) {
            console.log(error.toString());
          });

      }
      catch (error) {
        console.log(error.toString());
      }
    }

    async login(email, pass){
      try {
        await firebase.auth()
          .signInWithEmailAndPassword(email, pass);

        let user = firebase.auth().currentUser;
        //navigate to garden screen

        if((user != null)&&(user.emailVerified)){
            this.props.navigation.navigate('Garden');
        }
        else{
          Alert.alert('sorry wrong password or email verification incomplete');
        }


      }
      catch (error) {
        console.log(error.toString());
      }
    }

    toggleBox(){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        isLoginDisplayed: true,
      });
    }

    // componentWillUpdate(){
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // }

    render() {
      //if-else is used to change the functionality of buttons
      //in-line if-else is used to change the styling to get the LayoutAnimation functioning

      const { navigate } = this.props.navigation;

      var loginDisplayed = this.state.isLoginDisplayed === true ? {} : {display:'none'};

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);//Android only

      if(this.state.isLoginDisplayed){

        return (
          <View style={styles.container}>
            <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
            <View style={loginDisplayed}>
             <FormInput onChangeText={(UserName) => this.setState({UserName})}
               containerStyle={styles.textBox}/>
             <FormValidationMessage></FormValidationMessage>
             <FormInput onChangeText={(Password) => this.setState({Password})}
               containerStyle={styles.textBox}
               secureTextEntry={true} />
             <FormValidationMessage>Error message not currently implemented</FormValidationMessage>
           </View>
            <Button
              raised
              iconRight
              title="sign-up"
              onPress = {() => this.signup(this.state.UserName, this.state.Password)}
              icon={{name: 'chevron-right', size: 24}}
              buttonStyle={styles.stockButton}
              textStyle={{textAlign: 'center'}}
              />
            <Button
              raised
              iconRight
              title="login  "
              onPress = {() => this.login(this.state.UserName, this.state.Password)}
              icon={{name: 'chevron-right', size: 24}}
              buttonStyle={styles.stockButton}
              textStyle={{textAlign: 'center'}}
              />
          </View>
        );
      }else{
        return(
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
           <View style={loginDisplayed}>
            <FormInput onChangeText={(UserName) => this.setState({UserName})}
              containerStyle={styles.textBox}/>
            <FormValidationMessage></FormValidationMessage>
            <FormInput onChangeText={(Password) => this.setState({Password})}
              containerStyle={styles.textBox}
              secureTextEntry={true} />
            <FormValidationMessage>Error message</FormValidationMessage>
          </View>
          <Button
            raised
            iconRight
            title="sign-up"
            onPress = {() => this.toggleBox()}
            icon={{name: 'chevron-right', size: 24}}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
          <Button
            raised
            iconRight
            title="login  "
            onPress = {() => this.toggleBox()}
            icon={{name: 'chevron-right', size: 24}}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
        </View>
      );
    }//else
      }//render
  }//loginscreen

module.exports=LoginScreen;
