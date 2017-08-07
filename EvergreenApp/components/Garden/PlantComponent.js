import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../../Styles/gardenStyles.js';

export class PlantComponent extends Component{

  	constructor(){
  		super();
    }


      render(){
        return(
			<View>
          <TouchableOpacity style = {styles.plantContainer}>
          <Image style = {styles.plantImageContainer}
          source={{ uri: this.props.imageSource }}>
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
