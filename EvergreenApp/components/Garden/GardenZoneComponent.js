import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class GardenZoneComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
        name:'',
  		};
    }
	alert(){
		Alert.alert (
		  'Delete Zone',
		  'Deleting this zone will delete all data within it, including flower names, sensors, and sensor data. Are you sure you want to delete?',
		  [
		    {text: 'Cancel', style: 'cancel'},
		    {text: 'Yes', onPress: () => this.delete(this.props.keyRef)},
		  ],
		  { cancelable: false }
		)
	}
	delete(zone){
		firebase.database().ref('/Users/'+this.props.userID+'/GardenZones/'+zone).remove();
	}
	

      render(){
        const resizeMode = 'center';

        return(
          <TouchableOpacity
                  activeOpacity={0.7}
                  style = {{padding:10}}
				  delayLongPress={1000}
                  onPress={() => this.props.navi.navigate('ZoneDetailScreen',{zone:this.props.keyRef,userID:this.props.userID,list:this.props.list})}
				  onLongPress={()=>this.alert()}
                  >
          <Image style = {styles.zoneContainer} source={{ uri: this.props.imageSource }}>
            <Text style = {styles.zoneName}>
              {this.props.name}
                </Text>
			  <Text>
			  </Text>
                  </Image>

         </TouchableOpacity>
        );
  	}
  }


module.exports = GardenZoneComponent;
