import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../Styles/gardenStyles.js';

export class PlantComponent extends Component{

  	constructor(){
  		super();
  		this.state = {
        uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
  		};
    }


      render(){
        return(
          <TouchableOpacity style = {styles.plantContainer}>
          <Image style = {styles.plantImageContainer}
          source={{ uri: this.props.imageSource }}>
                  </Image>
                  <Text style = {styles.plantName}>
                    {this.props.name}
                      </Text>
                      </TouchableOpacity>
        );
  	}
  }


module.exports = PlantComponent;
