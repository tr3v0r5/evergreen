import React, {Component} from 'react'
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native'

import Svg, {
    G,
    Line,
    Path,
    Rect,
    Text
} from 'react-native-svg'

// d3 lib
import {
    scaleBand,
    scaleLinear
} from 'd3-scale'

import {
    max,
    ticks
} from 'd3-array'

import {
    line
} from 'd3-shape'

import {
    path
} from 'd3-path'

const colours = {
    black: 'black',
    blue: 'steelblue',
    brown: 'brown'
}

// create the barchart (http://bl.ocks.org/mbostock/3885304)
const data = [
    {frequency: 2, letter: "Fri Jun 09 2017 13:56:48 GMT+0000 (UTC)"},
    {frequency: 5, letter: "Fri Jun 10 2017 13:56:51 GMT+0000 (UTC)"},
    {frequency: 4, letter: "Fri Jun 19 2017 13:56:51 GMT+0000 (UTC)"},
    {frequency: 1, letter: "Fri Jun 29 2017 13:56:51 GMT+0000 (UTC)"},
    {frequency: 2, letter: "Fri Jun 30 2017 13:56:51 GMT+0000 (UTC)"},
    {frequency: 3, letter: "Fri Jun 30 2017 13:57:51 GMT+0000 (UTC)"},
]

class App extends Component {
    render() {
        return (
            <View>
                <BarChart />
            </View>
        )
    }
}

class BarChart extends Component {
    state = {
        barColour: data.map(()=>colours.blue)
    }

    toggleHighlight(i) {
        this.setState({
            barColour: [
                ...this.state.barColour.slice(0, i),
                this.state.barColour[i] === colours.blue ? colours.brown : colours.blue,
                ...this.state.barColour.slice(i+1)
            ]
        })
    }

    render() {
        const screen = Dimensions.get('window')
        const margin = {top: 50, right: 25, bottom: 200, left: 25}
        const width = screen.width - margin.left - margin.right
        const height = screen.height - margin.top - margin.bottom
        const x = scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.letter))
        const maxFrequency = max(data, d => d.frequency)
        const y = scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

        const firstLetterX = x(data[0].letter)
        const secondLetterX = x(data[1].letter)
        const lastLetterX = x(data[data.length - 1].letter)
        const labelDx = (secondLetterX - firstLetterX) / 2
		console.warn(lastLetterX);
        const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]
          const bottomAxisD = line()
              .x(d => d + labelDx)
              .y(() => 0)
             (bottomAxis)
 
         const leftAxis = ticks(0, maxFrequency, 5)
         const leftAxisD = line()
             .x(() => bottomAxis[0] + labelDx)
             .y(d => y(d) - height)
             (leftAxis)
 
		console.warn(bottomAxis[0])
        const notch = 5
        const labelDistance = 9

        const svg = (
            <Svg width={screen.width} height={screen.height}>
                <G translate={margin.left + "," + margin.top}>
                    <G translate={"0," + height}>
                        <G key={-1}>
                            <Path stroke={colours.black} d={bottomAxisD} key="-1"/>
                            {
                                data.map((d, i) => (
                                    <G key={i + 1} translate={x(d.letter) + labelDx+ ",0"}>
                                        <Line stroke={'orange'} y2={5}/>
                                        <Text fill={'blue'} y={9}>{d.letter}</Text>
                                    </G>
                                ))
                            }
                        </G>
						<Path d='M6.5,0L341.5,-1000'
        fill="none"
        stroke="red"
					/>	 
                        <G key={-2}>
                            <Path stroke={colours.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <G key={i + 1} translate={"0," + (y(d) - height)}>
                                        <Line stroke={'red'} x1={5} x2={9}/>
                                        <Text fill={colours.black} x={-9} y={-5}>{d}</Text>
                                    </G>
                                ))
                            }
                        </G>
						
				</G>
                </G>
            </Svg>
        )

        return svg;
    }
}
module.exports=App;