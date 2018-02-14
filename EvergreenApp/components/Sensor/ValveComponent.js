import React, { Component } from 'react';
import {Picker} from 'react-native';
import * as firebase from 'firebase';

export class ValveComponent extends Component{

    constructor(props){
      super();
    }//constructor
    componentWillReceiveProps(props){
        this.setState({
          userID: props.userID,
          zone: props.zone
        })
       this.setModalVisible(props.modalVisible);
    }
    addSchedule(){
        var schedule = firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Schedule/').push().key;
        firebase.database().ref('/Users/' + this.state.userID + '/GardenZones/'+ this.state.zone +'/Schedule/'+schedule).set({
            time: this.state.time,
            don: this.state.dayornight,
            data: 0,
              id: schedule
          });//push to firebase under it's garden GardenZones
    }
    render() {
        return (
          <View style={styles.container}>
            <DatePickerIOS
              date={this.state.date}
              mode="time"
              timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
              onDateChange={this.onDateChange.bind(this)}
            />
          </View>
        );
    }
}