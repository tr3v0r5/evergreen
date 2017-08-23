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
  pickimg(){
	  let number=Math.floor((Math.random()*4)+1);
	  let image;
	  switch (number){
	  case 1:
		  image='image1';
		  break;
	  case 2:
		  image='image2';
		  break;
	  case 3:
		  image='image3';
		  break;
	  case 4:
		  image='image4';
		  break;
	  case 5:
		  image='image5';
		  break;
	  case 6:
		  image='image6';
		  break;
	  case 7:
		  image='image7';
		  break;
	  default:
		  image='imageErr';
	  }
	  return image;
  }

    addZone()
    {
      var zoneRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones');
	  var image=this.pickimg();
      zoneRef.push().set({
        ImageSource:image,
        Name:this.state.zoneName
      });

      this.setState({
        zoneName:'',
        errorMessage:''
      })
      this.setModalVisible(false);
    }
	closeModal() {
	    this.setModalVisible(false);
	  }

      render(){
        return(
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}

            >

            <Icon
            name='close'
            type='material-community'
            color='gray'
            containerStyle = {[styles.gardenIcon,{zIndex:2}]}
            onPress={()=>this.setModalVisible(false)}
			focus
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
