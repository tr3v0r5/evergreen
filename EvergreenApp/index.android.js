import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated
} from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import WeatherComponent from './components/WeatherComponent.js';//Weather screen import

//styling import
const styles = require('./Styles/style.js');

//component import
// import SensorData from './components/SensorData.js';
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
                containerStyle={styles.textBox}
                secureTextEntry={true} />
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
              title="login  "
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
    let listSensorsRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/");

    var list = [];

    var that = this;

    listSensorsRef.on('value',function(snapshot) {
      list = []//resets the list so that each time it gets redrawn the old list doesnt stay
      snapshot.forEach(function(sensor){
        list.push(sensor.val());
      });//returns the all contents of child nodes in one list

      that.setState({
        userSensors: list,
      });
    });


  }//componentDidMount


    render() {


      const { navigate } = this.props.navigation;
      console.ignoredYellowBox = ['Setting a timer'];//gets rid of pop up using firebase with react

      return (
        <View style={styles.containerGarden}>
          <View style={{flexDirection: 'row', flex:1}}>
            <View style={{flexDirection:'column',flex:1}}>
              <Text style={{fontSize:30, color:'white'}}>Welcome to your Smart Garden</Text>
              <Text style={{paddingTop: 15},styles.genericText}>Sensor Data</Text>
              <List containerStyle={{marginRight: 10, marginLeft: 10}}>
                {
                  this.state.userSensors.map((item, i) => (
                    <ListItem
                      onPress={() => navigate('Sensor', { sensor: item.id })}
                      key={i}
                      title={item.title}
                      leftIcon={{name: item.icon}}
                      />
                  ))
                }
              </List>
            </View>
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
  constructor(props){
    super();
    this.state = {
      sensorData: '' ,
      sensorTitle: '',
    };
  }
  //maybe not the most elegant solution but it works for now
  componentDidMount(){

    var that = this;//gets around setState scope issue

    let userID = firebase.auth().currentUser.uid;

    const { params } = this.props.navigation.state;//some dark magic for now

    console.log(params.sensor);
    let SensorRef = firebase.database().ref("Users/"+ userID +"/Current/Sensors/"+ params.sensor);

    SensorRef.on('value', function(snapshot) {
      console.log(snapshot.val().data);
      that.setState({
        sensorData: snapshot.val().data,
        sensorTitle: snapshot.val().title,
      });
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    console.log(params.sensor);
    return(
      <View style={styles.container}>
        <View style={styles.dataBlock}>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorTitle}</Text>
          <Text style={{color:'#ffffff', fontSize: 12,textAlign: 'center', marginTop: 20 }}>{this.state.sensorData}</Text>
        </View>
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
