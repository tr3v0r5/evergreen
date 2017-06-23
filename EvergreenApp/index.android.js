import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated
} from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput,FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
import SensorData from './components/SensorData.js';
import LoginBox from './components/LoginBox.js';
//import SensorList from './components/SensorList.js';

//firebase config stuff
const firebaseConfig = {
apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
databaseURL: "https://smart-garden-ca02a.firebaseio.com",
authDomain: "smart-garden-ca02a.firebaseapp.com",
storageBucket: "smart-garden-ca02a.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


class LoginScreen extends Component {

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
              <FormInput onChangeText={(UserName) => this.setState({UserName})}
                containerStyle={styles.textBox}/>
              <FormValidationMessage></FormValidationMessage>
              <FormInput onChangeText={(Password) => this.setState({Password})}
                containerStyle={styles.textBox}/>
              <FormValidationMessage>Error message</FormValidationMessage>

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
            onPress = {() => this.toggleBox()}
            icon={{name: 'chevron-right', size: 24}}
            buttonStyle={styles.stockButton}
            textStyle={{textAlign: 'center'}}
            />
        </View>
      );
    }
    }

  }


class GardenScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      userSensors:[]
    }
  }

  componentDidMount(){
    //firebase read in user data
    let userID = firebase.auth().currentUser.uid;
    let listSensorsRef = firebase.database().ref("Users/"+ userID +"Current/Sensors/");
  }

    render() {
      return (
        <View style={styles.containerGarden}>
          <View>
            <Text style={styles.genericText}>Sensor Data</Text>
              <List>
                <ListItem><SensorData sensor='1' /></ListItem>
                <ListItem><SensorData sensor='2' /></ListItem>
                <ListItem><SensorData sensor='3' /></ListItem>
              </List>
            </View>
          <WeatherComponent />
        </View>
      );
    }
  }

class WeatherScreen extends Component{
	  render() {
	      return (
	        <View style={styles.container}>
	          <Text style={styles.genericText}>Weather Data</Text>
	          <WeatherComponent />
	        </View>
	      );
	  }
  }

class SensorScreen extends Component{
    render(){
      return(
        <View>
          <Text style={styles.genericText}>TODO</Text>
        </View>
      );
    }
  }

class SplashScreen extends Component{
    render(){
      return(
        <View>
          <Text style={styles.genericText}>TODO</Text>
        </View>
      );
    }
  }

const EvergreenApp = StackNavigator({
    Login: { screen: LoginScreen },
    Splash: { screen: SplashScreen },
    Garden: { screen: GardenScreen },
	  Weather:{ screen: WeatherScreen },
    Sensor: { screen: SensorScreen },
  }, { headerMode: 'screen' }
);


AppRegistry.registerComponent('EvergreenApp', () => EvergreenApp);
