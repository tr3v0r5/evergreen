import React, { Component } from 'react';
import {GardenTabs} from './GardenTabs.js'

export default class HomeScreen extends Component {

  static navigationOptions = {
    header:null
  }

  render() {
    return (
      <GardenTabs />);
  }
}

module.exports= HomeScreen;
