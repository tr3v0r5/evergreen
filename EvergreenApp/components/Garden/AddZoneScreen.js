import React, { Component } from 'react';
import { Text,  View, Alert, Modal } from 'react-native';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class AddZoneScreen extends Component{

  	constructor(){
  		super();
  		this.state = {
        zoneName :'',
        errorMessage:'',
        modalVisible: false
  		};
    }

    componentWillReceiveProps(props){
      this.setState({userID: props.userID})
      this.setModalVisible(props.modalVisible);
    }

    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  validate()
  {
    if(this.state.zoneName == '')
    {
      this.setState({
        errorMessage:'Please enter a value for the name of the Zone.'
      })
    }
    else
    {
      this.addZone();
    }
  }

    addZone()
    {
      var zoneRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones');

      zoneRef.push().set({
        ImageSource:'https://static.pexels.com/photos/113335/pexels-photo-113335.jpeg',
        Name:this.state.zoneName
      });

      this.setState({
        zoneName:'',
        errorMessage:''
      })
      this.setModalVisible(false);
    }

      render(){
        return(
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >

            <Icon
            name='close'
            type='material-community'
            color='gray'
            containerStyle = {styles.gardenIcon}
            onPress={() => this.setModalVisible(false)}
            />

          <View style = {styles.addContainer}>
          <FormLabel>Enter Zone Name</FormLabel>
          <FormInput
          onChangeText={(zone) => this.setState({zoneName:zone})}
          value={this.state.zoneName}
           />

           <Button
           title='SUBMIT'
           onPress={this.validate.bind(this)}/>
           </View>
            <FormValidationMessage>
            {this.state.errorMessage}
            </FormValidationMessage>
             </Modal>
        );
  	}
  }


module.exports = AddZoneScreen;
