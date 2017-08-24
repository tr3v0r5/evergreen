import React from 'react';
import { StyleSheet} from 'react-native';

var plantHeightandWidth = 70;


export default StyleSheet.create({
  gardenIcon:{
    position:'absolute',
    right:20,
    marginTop: 30
  },
  gardenHeader:{
    justifyContent:'center',
    alignItems:'center',
	  marginTop:20
  },
  gardenText:{
    color:'#27ae60',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize:30,
	  textAlign:'center'
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
    },
  zoneName:{
        fontFamily: 'HelveticaNeue',
        fontSize:20,
        marginBottom:15,
        padding:10,
        color:'white'
  },
  plantContainer:{
    padding:10
  },
  plantImageContainer:{
    width:plantHeightandWidth,
    height:plantHeightandWidth,
    borderRadius: plantHeightandWidth/2,
  },
  plantName:{
    fontFamily:'HelveticaNeue-Thin',
    textAlign:'center'
  },
  plantGrid:{
    marginLeft:10,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  plantAddIcon:{
    display: 'flex',
    alignSelf: 'flex-start',
  }
});
