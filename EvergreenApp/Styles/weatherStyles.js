import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage)
{
  const value = (percentage * viewportWidth)/ 100;
  return Math.round(value);
}

const slideHeight = viewportHeight *0.65;
const slideWidth = wp(60);
const horizontalMargin = wp(3);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + horizontalMargin*3;


export default StyleSheet.create({
  headerContainer:
  {
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20
  },
  headerText:
  {
    color:'#27ae60',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize:30,
  },
  carouselContainer:
  {
    flex:1,
    marginTop: 80
  },
  weatherContainer:
  {
    width:itemWidth,
    height:slideHeight,
    flexDirection: 'column',

    shadowColor:'#000000',
    shadowOffset:
    {
      width:0,
      height:3
    },
    shadowRadius:5,
    shadowOpacity: 0.7
  },
  iconContainer:
  {
    marginTop:0,
    marginLeft:180,
    padding:10
  },
  topContainer:
  {
    backgroundColor:'white',
    flex:2,
    flexDirection: 'column',
    alignItems: 'center',

  },
  tempText:
  {
    fontFamily: 'HelveticaNeue-Thin',
    fontSize:70,
    marginLeft:10,
    marginTop: -10
 },
 degreeText:
 {
   fontFamily: 'HelveticaNeue-Thin',
   fontSize:20,
   marginLeft:65,
   marginTop: -10
 },
  dayText:
  {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 10,
    color: '#34495e',
    marginBottom:10
  },
  bottomContainer:
  {
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth:2,
    borderTopColor:'#ecf0f1'
  //backgroundColor: '#ecf0f1'
  },
  conditionText:
  {
    fontFamily: 'HelveticaNeue-Light',
  fontSize: 20
  },
  detailContainer:
  {
    borderTopColor:'#34495e',
    borderTopWidth: 1,
    flexDirection:'row'
  },
  detailText:
  {
    color:'#34495e',
    marginTop:7,
    marginLeft:5
  },
  popText:
  {
    marginTop:30,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 15,
    color: '#34495e',
  }
});
