import { StackNavigator, TabNavigator } from 'react-navigation';
import GardenScreen from './GardenScreen.js';
import ZoneDetailScreen from './ZoneDetailScreen.js';

export const GardenStack = StackNavigator({
  Main:{
    screen: GardenScreen 
  },
  ZoneDetailScreen:{
    screen: ZoneDetailScreen,
	  navigationOptions:({navigation})=>({
	  }),
  }
});
module.exports=GardenStack;