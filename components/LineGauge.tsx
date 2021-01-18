import React, { useCallback } from 'react'
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native'
//@ts-ignore
import times from 'lodash.times'
interface Props {
	min: number
	max: number
}
function _getIntervalSize(val: number) {
	if (val % 10 == 8) return 'large'
	return 'small'
}
function _renderIntervals(max: number, min: number) {
	let range = max - min + 1
	let values = times(range, (i: number) => i + min)
	return values.map((val: number, i: number) => {
		let intervalSize: 'large' | 'small' = _getIntervalSize(val)
		return (
			<View key={`val-${i}`} style={styles.intervalContainer}>
				<View style={[styles.interval, styles[intervalSize]]} />
				{intervalSize === 'large' ? (
					<Text style={[styles.intervalValue]}>{val}</Text>
				) : null}
			</View>
		)
	})
}
const scale = (
	v: number,
	inputMin: number,
	inputMax: number,
	outputMin: number,
	outputMax: number
) => {
	return Math.round(
		((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
			outputMin
	)
}
const GAUGE_WIDTH = Math.floor(Dimensions.get('window').width)
const INTERVAL_WIDTH = 18
const LineGauge = (props: Props) => {
	const [val, setVal] = React.useState(0)
	const scrollViewRef = React.useRef(null)
	const scrollMax = (props.max - props.min) * INTERVAL_WIDTH
	const scrollMin = 0
	const _handleScroll = useCallback((event) => {
		const x = event.nativeEvent.contentOffset.x
		const tmpValue = scale(x, scrollMin, scrollMax, props.min, props.max)
		setVal(tmpValue)
	}, [])
	const _handleScrollEnd = () => {
		scrollViewRef &&
			//@ts-ignore
			scrollViewRef.current.scrollTo({
				x: val * INTERVAL_WIDTH,
				animate: true,
			})
	}
	return (
		<View style={styles.root}>
			<View>
				<ScrollView
					ref={scrollViewRef}
					style={styles.scrollViewContainer}
					showsHorizontalScrollIndicator={false}
					onScroll={_handleScroll}
					onScrollEndDrag={_handleScrollEnd}
					bounces={false}
					horizontal
					scrollEventThrottle={16}
				>
					<View style={styles.intervals}>
						{_renderIntervals(props.max, props.min)}
					</View>
				</ScrollView>
				<View style={styles.centerline} />
				<View style={styles.ageContainer}>
					<Text style={styles.ageText}>{val}</Text>
					<View style={styles.triangle}></View>
				</View>
					<Image
						style={{
                            position: 'absolute',
                            left: -60,
							width: 100,
							height: 50,
						}}
						source={require('../images/leftRectangle.png')}
					/>
					<Image
						style={{
                            position: 'absolute',
                            right: -60,
							width: 100,
							height: 50,
						}}
						source={require('../images/rightRectangle.png')}
					/>
			</View>
		</View>
	)
}

export default LineGauge

const styles = StyleSheet.create({
	root: {
		paddingVertical: 200,
	},
	scrollViewContainer: {
		display: 'flex',
		flexDirection: 'row',
		height: 50,
	},
	intervals: {
		marginBottom: 30,
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: GAUGE_WIDTH / 2,
		marginHorizontal: -INTERVAL_WIDTH / 2,
	},
	intervalContainer: {
		width: INTERVAL_WIDTH,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'rgb(210, 219, 224)',
	},
	interval: {
		width: 2,
		marginRight: -2,
		backgroundColor: 'rgb(210, 219, 224)',
	},
	intervalValue: {
		position: 'absolute',
		bottom: -20,
		width: 30,
		textAlign: 'center',
		fontSize: 14,
		color: 'rgb(100,107,111)',
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	small: {
		height: 8,
		position: 'relative',
		bottom: 4,
	},
	large: {
		position: 'relative',
		width: 2,
		height: 12,
	},
	centerline: {
		height: 54,
		width: 4,
		backgroundColor: 'rgb(89,205,217)',
		position: 'absolute',
		borderRadius: 2,
		left: GAUGE_WIDTH / 2 - 1,
		top: 0,
		bottom: 0,
	},
	ageContainer: {
		borderRadius: 40,
		height: 80,
		width: 80,
		backgroundColor: 'rgb(234,244,251)',
		position: 'absolute',
		left: GAUGE_WIDTH / 2 - 40,
		top: -90,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ageText: {
		fontSize: 40,
		color: 'rgb(79,89,96)',
	},
	triangle: {
		position: 'absolute',
		width: 15,
		height: 15,
		transform: [
			{
				rotate: '45deg',
			},
		],
		backgroundColor: 'rgb(234,244,251)',
		bottom: -5,
	},
	left: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 20,
	},
	right: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		width: 20,
	},
})
