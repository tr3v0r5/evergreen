import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
import SensorData from './components/SensorData.js';
import LoginBox from './components/LoginBox.js';
import WidgetComponent from './components/WidgetComponent.js';



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
        else{Alert.alert('Sorry wrong password or Email verification incomplete');}

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

      //const { navigate } = this.props.navigation;
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

  //fake list for styling listing modules
  const SensorList = [
    {
      name: "Sensor1"
    },
    {
      name: "Sensor2"
    },
  ];

  class GardenScreen extends Component {
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

  export default  class WeatherScreen extends Component{
    	  render() {
    	      return (
    	          <WeatherComponent />
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


// skip this line if using Create React Native App
AppRegistry.registerComponent('WeatherScreen', () => WeatherScreen);
