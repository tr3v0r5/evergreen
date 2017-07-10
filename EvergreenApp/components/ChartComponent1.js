
import React,{Component, PropTypes} from 'react';
import { ART, Dimensions, StyleSheet, View,
 } from 'react-native';
import Svg, { G, Line, Path, Rect, Text } from 'react-native-svg'
import Axis from 'd3-axis';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import { max, ticks } from 'd3-array';
import * as firebase from 'firebase';
 //import Path from 'd3-path';
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

 const dimensionWindow = Dimensions.get('window');

 export class ChartComponent extends Component{

	constructor(props){

    super(props);

    let width = Math.round(dimensionWindow.width * 0.9);
		let height = Math.round(dimensionWindow.height * 0.5);

    this.state = {
       graphWidth: 0,
       graphHeight: 0,
       linePath: '',
	     bottomaxis:'',
	     leftaxis:'',
	     lefttick:'',
	     data:[],
	     width: width,
	     height: height,
    };

  }//constructor


  componentDidMount(){
    let data = this.getdata();
    this.setGraphState( data )
  }


  setGraphState( data ) {//async load data before loading the graph

   const graphWidth = this.state.width - PaddingSize * 2;
   const graphHeight = this.state.height - PaddingSize * 2;

   console.log('inside of setGraphState');

   const lineGraph = this.createLineGraph( data , graphWidth, graphHeight );// keeps executing without waiting for data

   this.setState({
     data: lineGraph.data,
     graphWidth,
     graphHeight,
     linePath: lineGraph.path,
     ticks: lineGraph.ticks,
     scale: lineGraph.scale,
     bottomaxis: lineGraph.bottomaxis,
     leftaxis: lineGraph.leftaxis,
     lefttick: lineGraph.lefttick,
     apple: lineGraph.apple,
     chartCreated: false,
   });


 }//setGraphState

  getdata(){
    console.log('inside getdata');
	  var data = [];
    var that = this;
    firebase.database().ref('Users/QVw8UfD3b4Tcd1YsxiNCx8x3zyh1/History').on('value', function(snapshot){
        data = [];
        snapshot.forEach((childSnap) => {
 	        let archiveEntry = childSnap.val();
          data.push({date:new Date(archiveEntry.date),value:archiveEntry.value});
         });
         console.log(data);
         return data;
       });

  }//getdata

	   /**
	    * Create an x-scale.
	    * @param {number} start Start time in seconds.
	    * @param {number} end End time in seconds.
	    * @param {number} width Width to create the scale with.
	    * @return {Function} D3 scale instance.
	    */

	   createScaleX( data, start, end, width ) {

	     return d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.date))
	   }//createScaleX

	   /**
	    * Create a y-scale.
	    * @param {number} minY Minimum y value to use in our domain.
	    * @param {number} maxY Maximum y value to use in our domain.
	    * @param {number} height Height for our scale's range.
	    * @return {Function} D3 scale instance.
	    */

	   createScaleY( minY, maxY, height ) {

	     return d3.scale.scaleLinear()
	       .domain([minY, maxY]).nice(5)
         // We invert our range so it outputs using the axis that React uses.
	       .range([height, 0]);
	   }//createScaleY

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

     createLineGraph( data, width, height ) {


		     const lastDatum = data[data.length - 1];

         console.log('inside of createLineGraph');

         const scaleX = this.createScaleX(
			        data,
	            data[0].date,
	            lastDatum.date,
	            width
	        );

	       const scaleY = this.createScaleY( 0, 110, height);

	       const lineShape = d3.shape.line().x((d) => scaleX(d.date)).y((d) => scaleY(d.value));

//////////////////////////////// For Axis ///////////////////////////////////////////////

		     let maxFrequency = max( data, d => d.value) + 10;

         let apple = (scaleX(data[1].date) - scaleX(data[0].date))/2;

         var firstTime = scaleX(data[0].date);

         var secondtime = scaleX(data[1].date)

         var lasttime = scaleX(data[data.length - 1].date)

         let leftAxis = ticks(0, maxFrequency, 10);

         let bottomAxis = [firstTime - apple, lasttime + apple];

		     const leftAxisD = d3.shape.line()
				     .x(() => bottomAxis[0] + apple)
            	.y(d => scaleY(d) - height)(leftAxis)

	 	     const bottomAxisD = d3.shape.line()
		   		    .x(d => d + apple)
            	.y(() => 0)(bottomAxis)

//////////////////////////////////////////////////////////////////////////////////////////



       return {
	       data:data,
	       scale: {
	         x: scaleX,
	         y: scaleY,
	       },
	       path: lineShape(data),
		     bottomaxis: bottomAxisD,
		     leftaxis: leftAxisD,
		     lefttick: leftAxis,
		     apple: apple
	     };

       this.setState({
         chartCreated: true,
       });

	   }//createLineGraph

   render() {

     console.ignoredYellowBox = ['Setting a timer'];
     console.ignoredYellowBox = ['Warning: checkPropTypes'];//supress react native warnings from firebase

     if(this.state.chartCreated){
       return (
		 <View style={styles.container}>
		 	<Svg width={this.state.width+20} height={this.state.height+20}>
    	 		<G translate="20,-20">
        			<G translate={"0," + this.state.graphHeight}>
            			<G key={-1}>
                			<Path stroke={'black'} d={this.state.bottomaxis} key="-1"/>
                				{
                    				this.state.data.map((d, i) => (
                        				<G key={i + 1} translate={this.state.scale.x(d.date) + (this.state.apple)+ ",0"}>
                            				<Line stroke={'red'} y2={5}/>
											<G rotate="50">
										<Text fill={'black'} y={-2}>{d.date.toLocaleDateString()}</Text>
										<Text fill={'black'} y={10} x={-7}>{d.date.toLocaleTimeString()}</Text>
											</G>
                        				</G>
                    				))
                				}
            			</G>

            			<G key={-2}>
                			<Path stroke={'black'} d={this.state.leftaxis} key="-1"/>
                				{
                   				 	this.state.lefttick.map((d, i) => (
                        				<G key={i + 1} translate={"0," + (this.state.scale.y(d) - this.state.graphHeight)}>
                            				<Line stroke={'red'} x1={5} x2={9}/>
                            				<Text fill={'blue'} x={-10} y={-5}>{d}</Text>
                        				</G>
                    				))
                				}
            			</G>

						<G translate={this.state.apple+","+-this.state.graphHeight}>
								<Path d={this.state.linePath}
									stroke='red'
									fill='none'
								/>
						</G>
        			</G>
    			</G>
			</Svg>
       </View>
     );
   } else {
     return(
       <View>

       </View>
     );
   }

   }//render



 }//ChartComponent


 const styles = StyleSheet.create({
   container: {
	   backgroundColor:'white'
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
