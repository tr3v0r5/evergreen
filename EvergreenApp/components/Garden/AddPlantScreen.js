import React, { Component } from 'react';
import { Text,  View, Alert, ScrollView, Image,TouchableOpacity, Modal
} from 'react-native';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class AddPlantScreen extends Component{

  	constructor(){
  		super();
  		this.state = {
        plantName :'',
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
    if(this.state.plantName == '')
    {
      this.setState({
        errorMessage:'Please enter a value for the name of the Plant.'
      })
    }
    else
    {
      this.addPlant();
    }
  }

    addPlant()
    {
      var plantRef = firebase.database().ref('/Users/' + this.state.userID + '/Garden Zones/'+this.state.zone+'/Plants/');

      plantRef.push().set({
        ImageSource:'https://static.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg',
        Name:this.state.plantName
      });

      this.setState({
        plantName:'',
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
          <FormLabel>Enter Plant Name</FormLabel>
          <FormInput
          onChangeText={(plant) => this.setState({plantName:plant})}
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


module.exports = AddPlantScreen;
