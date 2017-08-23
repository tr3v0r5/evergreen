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
	  //let number=Math.floor((Math.random()*4)+1);
	  let number=1;
	  let image;
	  switch (number){
	  case 1:
		  image="https://static.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg";
		  break;
	  case 2:
		  image="https://static.pexels.com/photos/83129/flower-flowers-nature-macro-83129.jpeg";
		  break;
	  case 3:
		  image="https://static.pexels.com/photos/114735/pexels-photo-114735.jpeg";
		  break;
	  case 4:
		  image="https://static.pexels.com/photos/113335/pexels-photo-113335.jpeg";
		  break;
	  case 5:
		  image="https://static.pexels.com/photos/4935/flowerpot-plants-tables.jpg";
		  break;
	  case 6:
		  image="https://static.pexels.com/photos/92038/pexels-photo-92038.jpeg";
		  break;
	  case 7:
		  image="https://static.pexels.com/photos/509651/pexels-photo-509651.jpeg";
		  break;	  	  
	  default:
		  image='https://static.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg';	  	  
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
