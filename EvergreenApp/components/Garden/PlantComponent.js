import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';
const PlantImg={
  'image1': require('../../assets/PlantComponent/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg'),
  'image2': require('../../assets/PlantComponent/marguerite-daisy-beautiful-beauty.jpg'),
  'image3': require('../../assets/PlantComponent/flower-impala-lily-floral-plant-65653.jpeg'),
  'image4': require('../../assets/PlantComponent/flower-roses-bloom-blossom.jpg'),
  'image5': require('../../assets/PlantComponent/pexels-photo.jpg'),
  'image6': require('../../assets/PlantComponent/rose-blue-flower-rose-blooms-67636.jpeg'),
  'image7': require('../../assets/PlantComponent/sunflower-flowers-bright-yellow-46216.jpeg'),
  'imageErr': require('../../assets/error.jpg')
}

export class PlantComponent extends Component{
	alert(item){
		Alert.alert (
		  'Delete Plant',
		  'Deleting '+item+', once deleted all data within it are erased. Are you sure you want to delete?',
		  [
		    {text: 'Cancel', style: 'cancel'},
			  {text: 'Yes', onPress: () => this.delete()},
		  ],
		  { cancelable: false }
		)
	}
	delete(){
		firebase.database().ref('/Users/'+this.props.user+'/GardenZones/'+this.props.zone+'/Plants/'+this.props.keyref).remove();
	}
      render(){
		  const tumbnail = PlantImg[this.props.imageSource];
        return(
			<View>
          <TouchableOpacity style = {styles.plantContainer}
		  delayLongPress={500}
		  onLongPress={()=>this.alert(this.props.name)}
		  >
          <Image style = {styles.plantImageContainer}
          source={tumbnail}>
                  </Image>
                  <Text style = {styles.plantName}>
                    {this.props.name}
                      </Text>
                      </TouchableOpacity>
					</View>
        );
  	}
  }


module.exports = PlantComponent;
