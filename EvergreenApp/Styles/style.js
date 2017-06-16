import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(52,180,67)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  dataBlock:{
    backgroundColor: 'blue',
    height: 75,
    width: 75,
  },
  extraTop:{
    marginTop: 20,
  },
  textBox:{
    height: 30,
    backgroundColor:'white',
    width: 200,
    textAlign: 'center',
    marginTop: 20,
    paddingTop: 6,
 },
  genericText:{
    color: '#ffffff',
    fontSize: 30,
  },
  stockButton:{
    backgroundColor: '#1666e5',
    borderRadius: 3,
    marginTop: 20,
    width: 200
  },
  sensorList:{
    flex:1
  }
});

module.exports = styles;
