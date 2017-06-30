import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, Animated,
 LayoutAnimation, UIManager } from 'react-native';
import { Button, List, ListItem, Grid, Row,FormLabel, FormInput, FormValidationMessage, Icon }
from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

export class SignupBox extends Component{
  render(){

    var loginDisplayed = this.props.displayed === true ? {} : {display:'none'};

    return(
      <View style={loginDisplayed}>
       <FormInput onChangeText={(UserName) => this.setState({UserName})}
         containerStyle={styles.textBox}/>
       <FormValidationMessage></FormValidationMessage>
       <FormInput onChangeText={(Password) => this.setState({Password})}
         containerStyle={styles.textBox}
         secureTextEntry={true} />
       <FormValidationMessage>Error message not currently implemented</FormValidationMessage>
     </View>
    );
  }//render()
}//LoginBox
module.exports=SignupBox;
