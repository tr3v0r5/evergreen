import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert,
 LayoutAnimation, UIManager, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';

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
          this.props.navigation.navigate('Garden', { userID: UID });
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
	skip(){
		this.props.navigation.navigate('Garden');
	}

    render() {

      const { navigate } = this.props.navigation;

      console.ignoredYellowBox = ['Setting a timer'];
      console.ignoredYellowBox = ['Warning: checkPropTypes'];//supress react native warnings from firebase

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);//Android only

      if(this.state.whichLoginState === ''){

        return (
          <View style={ styles.container }>
            <Text style={{color:'rgb(52,180,67)', fontSize:30}}>Sage Smart Garden</Text>
            <Button
             iconRight
             title="login"
             onPress = {() => this.toggleBox('Login')}
             icon={{name: 'chevron-right', size: 24}}
             buttonStyle={ styles.stockButton }
             textStyle={{textAlign: 'center'}}
             />
           <Button
             iconRight
             title="If you do not have an account click here to sign-up"
             onPress = {() => this.toggleBox('SignUp')}
             buttonStyle={styles.smallButton}
             textStyle={{textAlign: 'center',fontSize:10,color:"#e77777"}}
             />
          </View>
        );

      } else if(this.state.whichLoginState === 'Login'){

        return(
        <View style={styles.container}>
          <Text style={{color:'rgb(52,180,67)', fontSize:30}}>Sage Smart Garden</Text>
          <View>
            <LoginBox navi={ this.props.navigation }/>
          </View>
			       <View>
               <Button
                 iconRight
                 title="If you do not have an account click here to sign-up"
                 onPress = {() => this.toggleBox('SignUp')}
                 buttonStyle={styles.smallButton}
                 textStyle={{textAlign: 'center',fontSize:10,color:"#e77777"}}
                 />
			       </View>
          </View>
      );

      }else{
        return(
          <View style={styles.container}>
            <Text style={{color:'rgb(52,180,67)', fontSize:30}}>Sage Smart Garden</Text>
            <View>
              <SignupBox navi={ this.props.navigation }/>
            </View>
            <Button
              title="If you already have an account click here to login"
              onPress = {() => this.toggleBox('Login')}
              buttonStyle={ styles.smallButton }
              textStyle={{textAlign: 'center',fontSize:10,color:"#e77777"}}
              />
          </View>
        );
      }

    }//render
  }//loginscreen

module.exports=LoginScreen;