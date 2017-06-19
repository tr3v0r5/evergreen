import React, {Component} from 'react'
import { StyleSheet, View} from 'react-native';
import Chart from 'react-native-chart';


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

const data = [
	[0, 1],
	[10, 3],
	[11, 7],
	[50, 9],
];

class ChartComponent extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Chart
					style={styles.chart}
					data={data}
					verticalGridStep={5}
					horizontalGridStep={5}
					type="line"
					showDataPoint={true}
					color={'blue'}
					lineWidth={5}
				 />
			</View>
		);
	}
}
module.exports=ChartComponent;