import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const styles = require('../../Styles/style.js');

export class SensorList extends Component{

    render() {

      console.ignoredYellowBox = ['Setting a timer'];//gets rid of pop up using firebase with react

      const { navigate } = this.props.navi

      return (
		  	<View style={{ flex:1 }}>
		  		<ScrollView>
              <List containerStyle={{marginRight: 10, marginLeft: 10,marginTop:5}}>
                {
                  this.props.list.map((item, i) => (
                    <ListItem
                      onPress={() => navigate('Sensor', { sensor: item.id })}
                      key={i}
                      title={item.title}
                      leftIcon={{name:item.icon}}
                      />
                  ))
                }
              </List>
					</ScrollView>
				</View>
      );
    }
}

module.exports = SensorList;
