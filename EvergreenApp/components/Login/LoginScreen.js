import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager, AsyncStorage } from 'react-native';
import { Button, Icon }
from 'react-native-elements';
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
          whichLoginState: '',
      }

      this.loginCheck();

    }//constructor

    async loginCheck(){

      try {
        const UID = await AsyncStorage.getItem('UID');
        if (UID !== null){
          this.props.navigation.navigate('Garden', {userID: UID });
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }

    }//loginCheck

    toggleBox(loginOrSignup){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        whichLoginState: loginOrSignup,
      });
    }

    render() {

      const { navigate } = this.props.navigation;

      console.ignoredYellowBox = ['Setting a timer'];
      console.ignoredYellowBox = ['Warning: checkPropTypes'];//supress react native warnings from firebase

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);//Android only

      if(this.state.whichLoginState === ''){

        return (
          <View style={ styles.container }>
            <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
           <Button
             raised
             iconRight
             title="sign-up"
             onPress = {() => this.toggleBox('SignUp')}
             icon={{name: 'chevron-right', size: 24}}
             buttonStyle={styles.stockButton}
             textStyle={{textAlign: 'center'}}
             />
           <Button
             raised
             iconRight
             title="login  "
             onPress = {() => this.toggleBox('Login')}
             icon={{name: 'chevron-right', size: 24}}
             buttonStyle={ styles.stockButton }
             textStyle={{textAlign: 'center'}}
             />
          </View>
        );

      }else if(this.state.whichLoginState === 'Login'){

        return(
        <View style={styles.container}>
          <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
          <View>
            <LoginBox navi={ this.props.navigation }/>
          </View>
			       <View>
               <Button
                 raised
                 iconRight
                 title="signup"
                 onPress = {() => this.toggleBox('SignUp')}
                 icon={{name: 'chevron-right', size: 24}}
                 buttonStyle={ styles.stockButton }
                 textStyle={{textAlign: 'center'}}
                 />
			       </View>
          </View>
      );

      }else{
        return(
          <View style={styles.container}>
            <Text style={{color:'#ffffff', fontSize:30}}>evergreen</Text>
            <View>
              <SignupBox navi={ this.props.navigation }/>
            </View>
            <Button
              raised
              iconRight
              title="login  "
              onPress = {() => this.toggleBox('Login')}
              icon={{name: 'chevron-right', size: 24}}
              buttonStyle={ styles.stockButton }
              textStyle={{textAlign: 'center'}}
              />
          </View>
        );
      }

    }//render
  }//loginscreen

module.exports=LoginScreen;
