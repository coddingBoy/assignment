import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
interface Props {
	index: number
	total: number
}
const Progress = (props: Props) => {
	return (
		<View style={styles.root}>
			<View style={styles.progressBarContainer}>
				<View
					style={[
						styles.progressBar,
						{ width: Dimensions.get('window').width * 0.7 * (props.index/props.total) },
					]}
				></View>
			</View>
			<Text style={styles.text}>
				{props.index}/{props.total}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		marginLeft: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	progressBarContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: 10,
		borderRadius: 5,
        backgroundColor: '#eee',
        overflow: 'hidden'
	},
	progressBar: {
        backgroundColor: 'rgb(89,205,217)',
		height: 10,
		borderRadius: 5,
    },
	text: {
		marginLeft: 10,
	},
})
export default Progress
