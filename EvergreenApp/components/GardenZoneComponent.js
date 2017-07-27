import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, ScrollView, Image,TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import * as firebase from 'firebase';

import styles from '../Styles/gardenStyles.js';

export class GardenZoneComponent extends Component{

  	constructor(){
  		super();
  		this.state = {
        uID:'QVw8UfD3b4Tcd1YsxiNCx8x3zyh1',
        name:'',
  		};
    }

    // componentWillReceiveProps(props)
    //   {
    //   this.setState({
    //       name:props.name,
    //       keyRef : props.keyRef
    //   });
    //   }

    onLearnMore = (maga) => {
      this.props.navigation.navigate('GardenDetailScreen');
    };

viewDetails()
{
  const { navigate } = this.props.navigation;
   navigate('GardenDetailScreen');
}


      render(){
        const resizeMode = 'center';
        return(
          <TouchableOpacity
                  activeOpacity={0.7}
                  style = {{padding:10}}
                  onPress={() => this.props.navigation.navigate('GardenDetailScreen')}
                  >
          <Image style = {styles.zoneContainer} source={{ uri: this.props.imageSource }}>
            <Text style = {styles.zoneName}>
              {this.props.name}
                </Text>
                  </Image>
                  </TouchableOpacity>
        );
  	}
  }


module.exports = GardenZoneComponent;
