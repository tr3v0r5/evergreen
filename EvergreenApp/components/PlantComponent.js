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
          <View>
          <Image source={{ uri: this.props.imageSource }}>
                  </Image>
                  <Text >
                    {this.props.name}
                      </Text>
                      </View>
        );
  	}
  }


module.exports = PlantComponent;
