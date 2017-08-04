import { StackNavigator, TabNavigator } from 'react-navigation';
import GardenScreen from './GardenScreen.js';
import ZoneDetailScreen from './ZoneDetailScreen.js';
import SensorScreen from '../Sensor/SensorScreen.js';
export const GardenStack = StackNavigator({
  Main:{
    screen: GardenScreen 
  },
  ZoneDetailScreen:{
    screen: ZoneDetailScreen,
	  navigationOptions:({navigation})=>({
	  }),
  },
  Sensor:{
	  screen:SensorScreen
  }
});
module.exports=GardenStack;