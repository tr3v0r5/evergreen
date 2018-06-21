import React, { Component } from 'react';
import { Text,  View, Alert, Modal, Picker } from 'react-native';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class AddSensorScreen extends Component{

  	constructor(){
  		super();
  		this.state = {
        sensorId:'',
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

  async validate()
  {
    if(this.state.sensorTitle == '' || this.state.type == '') {

      this.setState({
        errorMessage:'Please fill out all the fields.'
      });

    }else {

      switch (this.state.type) {
        case "moisture":
          await this.setState({icon: 'opacity'});
          this.addSensor();
          break;

        case "valve":
          await this.setState({icon: 'highlight'});
          this.addSensor();
          break;

        default:
          this.setState({icon: 'error'});
          this.addSensor();
      }//Depending on which the type of the sensor it's icon set here


    }
  }

  addSensor() {

    var gardenSensorRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Sensors/').push().key;
    // var SensorRef = firebase.database().ref('/Users/' + this.state.userID + '/Sensors/Configured/' );

    firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Sensors/'+this.state.sensorId).set({
      title: this.state.sensorTitle,
      type: this.state.type,
      icon: this.state.icon,
      data: 0,
		id: this.state.sensorId
    });//push to firebase under its garden GardenZones

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
            containerStyle = {{zIndex:2,position:'absolute',
            right:20,
            marginTop: 30}}
            onPress={() => this.setModalVisible(false)}
            />

              <View style = {styles.addContainer}>

              <FormLabel style={{marginTop:20}}>Pick Module Type</FormLabel>
                <Picker
                  selectedValue={this.state.type}
                  style={{margin:15, backgroundColor: '#f2f2f2'}}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                  <Picker.Item label="Moisture" value="moisture" />
                  <Picker.Item label="Valve" value="valve" />
                  <Picker.Item label="None" value="" />
                </Picker>

                <FormLabel>Enter Module Name</FormLabel>
                <FormInput
                  onChangeText={(sensor) => this.setState({sensorTitle: sensor})}
                  value={this.state.sensorTitle}
                  placeholder="e.g Water Valve, Moisture Sensor"
                  />
                <FormLabel>Enter 6-digit Id on Module</FormLabel>
                <FormInput
                  onChangeText={(id) => this.setState({sensorId: id})}
                  value={this.state.sensorId}
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
