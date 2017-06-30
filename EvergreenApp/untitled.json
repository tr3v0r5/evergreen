
import React,{Component, PropTypes} from 'react';
import {
   ART,
   Dimensions,
   StyleSheet,
   View,
	Text,
 } from 'react-native';
 import * as scale from 'd3-scale';
 import * as shape from 'd3-shape';
 import * as d3Array from 'd3-array';
 
 const d3 = {
   scale,
   shape,
 };
 const {
   Group,
   Shape,
   Surface,
 } = ART;
 const PaddingSize = 20;

 const data=[{date: new Date(2007, 3, 24), value: 93.24},
 {date: new Date(2007, 3, 25), value: 95.35},
 {date: new Date(2007, 3, 26), value: 98.84},
 {date: new Date(2007, 3, 27), value: 99.92},
 {date: new Date(2007, 3, 30), value: 99.80},
 {date: new Date(2007, 4,  1), value: 99.47}];
 
 const lastDatum = data[data.length - 1];
 
 const dimensionWindow = Dimensions.get('window');
 
 const TickWidth = PaddingSize * 2;
 
var ChartComponent=React.createClass({
	
	getInitialState:function(){
 
   defaultProps = {
     width: Math.round(dimensionWindow.width * 0.9),
     height: Math.round(dimensionWindow.height * 0.5),
   };
 
   return{
     graphWidth: 0,
     graphHeight: 0,
     linePath: '',
	 data:data,
   };
},
   componentWillMount:function() {
     this.computeNextState(this.props);
   },
 
   componentWillReceiveProps:function(nextProps) {
     this.computeNextState(nextProps);
   },
 
   computeNextState:function(nextProps) {
     const {
       data,
       width,
       height,
     } = nextProps;
	 
 
     const graphWidth = width - PaddingSize * 2;
     const graphHeight = height - PaddingSize * 2;
	 console.warn(this.state.data);
	 
     const lineGraph = this.draw.createLineGraph({
       data:this.state.data,
       width: graphWidth,
       height: graphHeight,
     });
 
     this.setState({
       graphWidth,
       graphHeight,
       linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
     });
     if (!this.previousGraph) {
       this.previousGraph = lineGraph;
     }
   },

   draw:{
	   
	   /**
	    * Create an x-scale.
	    * @param {number} start Start time in seconds.
	    * @param {number} end End time in seconds.
	    * @param {number} width Width to create the scale with.
	    * @return {Function} D3 scale instance.
	    */
	   createScaleX:function(start, end, width) {
		   console.warn('In xCreate');
	     return d3.scale.scaleTime()
	       .domain([new Date(start * 1000), new Date(end * 1000)])
	       .range([0, width]);
	   },

	   /**
	    * Create a y-scale.
	    * @param {number} minY Minimum y value to use in our domain.
	    * @param {number} maxY Maximum y value to use in our domain.
	    * @param {number} height Height for our scale's range.
	    * @return {Function} D3 scale instance.
	    */
	   createScaleY:function(minY, maxY, height) {
		   console.warn('In yCreate');
	     return d3.scale.scaleLinear()
	       .domain([minY, maxY]).nice()
	       // We invert our range so it outputs using the axis that React uses.
	       .range([height, 0]);
	   },

	   /**
	    * Creates a line graph SVG path that we can then use to render in our
	    * React Native application with ART.
	    * @param {Array.<Object>} options.data Array of data we'll use to create
	    *   our graphs from.
	    * @param {function} xAccessor Function to access the x value from our data.
	    * @param {function} yAccessor Function to access the y value from our data.
	    * @param {number} width Width our graph will render to.
	    * @param {number} height Height our graph will render to.
	    * @return {Object} Object with data needed to render.
	    */
	   createLineGraph:function({
	     data,
	     width,
	     height,
	   }) {
	  	 console.warn('In createline');

	     const scaleX = this.createScaleX(
	       data[0].date,
	       lastDatum.date,
	       width
	     );

	     // Collect all y values.
	     /*const allYValues = data.reduce((all, datum) => {
	       all.push(yAccessor(datum));
	       return all;
	     }, []);
	     // Get the min and max y value.
	     const extentY = d3Array.extent(allYValues);*/
	     const scaleY = this.createScaleY(0, 99.92, height);

	     const lineShape = d3.shape.line()
	     .x(function (d){return scaleX(d.date);})
	       .y(function (d){return scaleY(d.value);});

	     return {
	       data,
	       scale: {
	         x: scaleX,
	         y: scaleY,
	       },
	       path: lineShape(data),
	       ticks: data.map((datum) => {
	         const time = data.date;
	         const value = data.value;

	         return {
	           x: scaleX(time),
	           y: scaleY(value),
	           datum,
	         };
	       }),
	     };
	   }
   },


 
   render:function() {
     const {
       graphWidth,
       graphHeight,
       linePath,
      ticks,
      scale,
     } = this.state;
     const {
       x: scaleX,
     } = scale;
	 const tickXFormat = scaleX.tickFormat(null, '%b %d');
     return (
       <View style={styles.container}>
         <Surface width={graphWidth} height={graphHeight}>
           <Group x={0} y={0}>
             <Shape
               d={linePath}
               stroke={'orange'}
               strokeWidth={1}
             />
           </Group>
         </Surface>
	         <View key={'ticksX'}>
	           {ticks.map((tick, index) => {
	             const tickStyles = {};
	             tickStyles.width = TickWidth;
	             tickStyles.left = tick.x - (TickWidth / 2);

	             return (
	               <Text key={index} style={[styles.tickLabelX, tickStyles]}>
	                 {tickXFormat(new Date(tick.datum.time * 1000))}
	               </Text>
	             );
	           })}
	         </View>

	         <View key={'ticksY'} style={styles.ticksYContainer}>
	           {ticks.map((tick, index) => {
	             const value = function (d){return scaleY(d.value);};

	             const tickStyles = {};
	             tickStyles.width = TickWidth;
	             tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

	             tickStyles.top = (tick.y + 2) - Math.round(TickWidth * 0.65);

	             return (
	               <View key={index} style={[styles.tickLabelY, tickStyles]}>
	                 <Text style={styles.tickLabelYText}>
	                   {value}&deg;
	                 </Text>
	               </View>
	             );
	           })}
	         </View>

	         <View key={'ticksYDot'} style={styles.ticksYContainer}>
	           {ticks.map((tick, index) => (
	             <View
	               key={index}
	               style={[styles.ticksYDot, {
	                 left: tick.x,
	                 top: tick.y,
	               }]}
	             />
	           ))}
	         </View>
       </View>
     );
   }
 })
 
 //////////////////////////////////////////////////
 
 
 //////////////////////////////////////////////////
 
 const styles = StyleSheet.create({
   container: {
   },
   tickLabelX: {
     position: 'absolute',
     bottom: 0,
     fontSize: 12,
     textAlign: 'center',
   },

   ticksYContainer: {
     position: 'absolute',
     top: 0,
     left: 0,
   },

   tickLabelY: {
     position: 'absolute',
     left: 0,
     backgroundColor: 'transparent',
   },

   tickLabelYText: {
     fontSize: 12,
     textAlign: 'center',
   },

   ticksYDot: {
     position: 'absolute',
     width: 2,
     height: 2,
     backgroundColor: 'black',
     borderRadius: 100,
   },
 });
 module.exports=ChartComponent;