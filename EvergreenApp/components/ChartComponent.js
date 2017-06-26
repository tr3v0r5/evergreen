import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native';
import Chart,{LineChart} from 'react-native-chart';
import * as firebase from 'firebase';
import * as d3scale from 'd3-scale';
import Graph from 'react-native-line-plot';
import Svg, { Circle, Rect, G,Line } from 'react-native-svg';
import Axis from 'd3-axis';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	chart: {
		width: 200,
		height: 200,
	},
});



const dataPoint=[
	[0,0],[1,1],[2,2],[3,3],
];

const ChartComponent=React.createClass({
	
	getInitialState:function(){
		console.warn('intital');
		var apple;
		/*firebase.database().ref('History/Moisture').on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			      //var key = childSnapshot.key;
			      // childData will be the actual contents of the child
			      var moisture = childSnapshot.child("Moisture").val();
				  var time=childSnapshot.child("Time").val();
				  var pinapple=moisture;
				  var apple=Date.parse(time);
			      dataPoint.push([apple,pinapple]);
		  
			  });
			  apple=dataPoint;
			  console.warn('in intial' + apple);
		  });*/
		  return {
			  xscale:0,
			  yscale:0,
			  data:dataPoint
		  };
		
		
	},
	componentDidMount:function(){
		let that=this;
		console.warn('didmount');
			    /*firebase.database().ref('History/Moisture').on('value', function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
					      //var key = childSnapshot.key;
					      // childData will be the actual contents of the child
					      var moisture = childSnapshot.child("Moisture").val();
						  var time=childSnapshot.child("Time").val();
						  var pinapple=moisture;
						  var apple=Date.parse(time);
					      dataPoint.push([apple,pinapple]);
				  
					  });
					  that.setState({
						  data:dataPoint
					  })
			});*/
	},
	componentWillUpdate:function(){
		console.warn('in will update');
		//this.axis();	
	},
	axis:function(){
		let that=this;
		//console
	    firebase.database().ref('History/Moisture').on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			      //var key = childSnapshot.key;
			      // childData will be the actual contents of the child
			      var moisture = childSnapshot.child("Moisture").val();
				  var time=childSnapshot.child("Time").val();
				  var pinapple=moisture;
				  var apple=Date.parse(time);
			      dataPoint.push([apple,pinapple]);
				  
			  });
			  that.setState({
				  data:dataPoint
			  })
	});
	},
	/*xyscale:function(){
		let x = d3scale.scaleTime()
		            .domain([0,styles.chart.width])
					.range(this.minDate(),this.maxDate());
		let y = d3scale.scaleLinear()
        			.domain([0,styles.chart.height])
					.range(this.minVal(),this.maxVal())
		this.setState({
			xscale:x,
			yscale:y
		})
	},
	minVal:function(){
		let values=dataPoint.map(pair=>pair[1]);
		return(Math.min(values));
	},
	maxVal:function(){
		let values=dataPoint.map(pair=>pair[1]);
		return(Math.max(values));
	},
	minDate:function(){
		let dateTimes=dataPoint.map(pair=>pair[0].getTime());
		return(new Date(Math.min(...dateTimes)));
	},
	maxDate:function(){
		let dateTimes=dataPoint.map(pair=>pair[0].getTime());
		return(new Date(Math.max(...dateTimes)));
		
	},
	getData:function(data){
		this.setState({
			data:data
		})
	},
	addto:function(datapoint){
		dataPoint.push(datapoint);
		data=dataPoint;
		this.getData(data);
	},*/
	render:function() {
		console.warn(this.state.data);
		console.warn('im here render');
		return (
			<View style={styles.container}>
			
			<Chart style={styles.chart}
	        data={dataPoint}
			type="line"
			verticalGridStep={2}
			horizontalGridStep={5}
			color={'blue'}
			showDataPoint={true}
			lineWidth={5}
			yLabels={'0','1','2','3','4','5','6','7','8','9','10','11'}
			/>
			</View>
		);
	}
})

module.exports=ChartComponent;