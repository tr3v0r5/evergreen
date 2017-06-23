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
    height: 20,
    width: 20,
  },
  extraTop:{
    marginTop: 20,
  },
  textBox:{
    height: 50,
    backgroundColor:'white',
    width: 200,
    marginTop: 20,
 },
  genericText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  stockButton:{
    backgroundColor: '#1666e5',
    borderRadius: 3,
    marginTop: 20,
    width: 200
  },
  sensorList:{
    flex:1
  },
  weatherWidget:{
    width: 200,
    height: 50,
    backgroundColor: 'blue'
  },
  containerGarden:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'rgb(52,180,67)',
    alignItems: 'center',
    padding: 10,
  },
});

module.exports = styles;
