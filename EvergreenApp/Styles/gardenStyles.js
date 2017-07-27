import React from 'react';
import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  gardenIcon:{
    position:'absolute',
    right:20,
    marginTop: 30
  },
  gardenHeader:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:99
  },
  gardenText:{
    color:'#27ae60',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize:30,
  },
  gardenGrid:{
    marginTop:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  zoneContainer: {
  width: 150,
  height: 150,
  borderRadius:10,
  backgroundColor:'transparent',
  justifyContent: 'flex-end',

  //alignItems: 'flex-end',
    },
  zoneName:{
        fontFamily: 'HelveticaNeue',
        fontSize:20,
        marginBottom:15,
        padding:10,
        color:'white'
  },
});
