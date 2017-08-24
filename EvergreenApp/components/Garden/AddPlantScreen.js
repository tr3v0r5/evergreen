import React, { Component } from 'react';
import { Text,  View, Alert, Modal } from 'react-native';
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
  pickImg(){
	  //"https://static.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg"
	  let number=Math.floor((Math.random()*7)+1);
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
  addPlant() {

    var plantRef = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Plants/');
	var image=this.pickImg();
    plantRef.push().set({
      ImageSource:image,
      Name:this.state.plantName
    });

    this.setState({
      plantName:'',
      errorMessage:''
    })
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
            containerStyle = {[styles.gardenIcon,{zIndex:2}]}
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
