
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Alert, Image,
Animated } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
const styles = require('../Styles/style.js');


const firebaseConfig = {
  apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
  databaseURL: "https://smart-garden-ca02a.firebaseio.com",
  authDomain: "smart-garden-ca02a.firebaseapp.com",
  storageBucket: "smart-garden-ca02a.appspot.com",
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);


export class FirebaseLogin extends Component {

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

      console.log(user.emailVerified);

    }
    catch (error) {
      console.log(error.toString());
    }
  }

  toggleBox(){
    this.setState({
      isLoginDisplayed: true,
    });
  }

  componentDidMount(){
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 3000,              // Make it take a while
      }
    ).start();
  }

  render() {

    const { navigate } = this.props.navigation;
    let { fadeAnim } = this.state;

    if(this.state.isLoginDisplayed){
      return (
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
          <Animated.View style={{opacity: fadeAnim,}}>
            <TextInput
              style={ styles.textBox }
              placeholder="user name"
              onChangeText={(UserName) => this.setState({UserName})}
              />
            <TextInput
              style={ styles.textBox }
              placeholder="password"
              onChangeText={(Password) => this.setState({Password})}
              />
          </Animated.View>
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
            title="login"
            onPress = {() => this.login(this.state.UserName, this.state.Password)}
            icon={{name: 'chevron-right', size: 24}}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
        </View>
      );
    } else {
    return(
      <View style={styles.container}>
        <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
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
          title="login"
          onPress = {() => this.login(this.state.UserName, this.state.Password)}
          icon={{name: 'chevron-right', size: 24}}
          buttonStyle={styles.stockButton}
          textStyle={{textAlign: 'center'}}
          />
      </View>
    );
  }
  }
}
module.exports = FirebaseLogin;
