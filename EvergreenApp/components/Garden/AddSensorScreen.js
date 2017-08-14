import React, { Component } from 'react';
import { Text,  View, Alert, Modal, Picker } from 'react-native';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class AddSensorScreen extends Component{

  	constructor(){
  		super();
  		this.state = {
        sensorTitle :'',
        type: '',
        icon: '',
        errorMessage:'',
        modalVisible: false
  		};
    }

    componentWillReceiveProps(props){
       this.setState({
         userID: props.userID,
         zone: props.zone
       })
      this.setModalVisible(props.modalVisible);
    }

    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  validate()
  {
    if(this.state.sensorTitle == '' || this.state.type == '') {

      this.setState({
        errorMessage:'Please fill out all the fields.'
      });

    }else {
      this.addSensor();
    }
  }

  addSensor() {

    var SensorRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Sensors/');

    SensorRef.push().set({
      title: this.state.sensorTitle,
      type: this.state.type,
      icon: this.state.icon,
      data: '',
      id: ''
    });//push to firebase

    this.setState({
      sensorTitle:'',
      type: '',
      icon: '',
      errorMessage:''
    })//reset form

    this.setModalVisible(false);

  }//addPlant

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

                <FormLabel>Enter Sensor Namerr</FormLabel>
                <FormInput
                  onChangeText={(sensor) => this.setState({sensorTitle: sensor})}
                  value={this.state.sensorTitle}
                  />

                <FormLabel>Enter Sensor Type</FormLabel>
                <FormInput
                  onChangeText={(sensor) => this.setState({title: sensor})}
                  value={this.state.title}
                  />

                <FormLabel>Enter Sensor Icon</FormLabel>
                <FormInput
                  onChangeText={(sensor) => this.setState({icon: sensor})}
                  value={this.state.icon}
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


module.exports = AddSensorScreen;
