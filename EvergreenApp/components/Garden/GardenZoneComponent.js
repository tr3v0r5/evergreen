import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class GardenZoneComponent extends Component{

  	constructor(){
  		super();
  		this.state = {
        name:'',
  		};
    }

      render(){
        const resizeMode = 'center';

        return(
          <TouchableOpacity
                  activeOpacity={0.7}
                  style = {{padding:10}}
                  onPress={() => this.props.navi.navigate('ZoneDetailScreen',{zone:this.props.keyRef})}
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
