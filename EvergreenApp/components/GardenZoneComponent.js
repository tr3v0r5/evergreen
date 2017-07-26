import React, { Component } from 'react';
import { ActivityIndicator, Text, TextInput, View, Alert, ScrollView, Image
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../Styles/gardenStyles.js'
const remote = 'http://www.alpinenurseries.com.au/alpine/wp-content/uploads/2015/02/Rhapiolepis-Snow-Maiden-HD.jpg';
export default class GardenZoneComponent extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
        uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
        name:'HILDA',
        imageSource:'https://static.pexels.com/photos/507595/pexels-photo-507595.jpeg'
  		};
    }

    componentWillReceiveProps(props)
      {
      this.setState({
          name:props.name
      });
      }



      render(){
        const resizeMode = 'center';
        return(
          <Image style = {styles.zoneContainer} source={{ uri: this.state.imageSource }}>
            <Text style = {styles.zoneName}>
              {this.state.name}
                </Text>
                  </Image>
        );
  	}
  }


module.exports = GardenZoneComponent;
