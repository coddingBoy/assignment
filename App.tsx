import * as React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import Progress from './components/Progress'
import LineGauge from './components/LineGauge'

function HomeScreen({ navigation }: { navigation: any }) {
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Text
				style={{
					marginTop: 20,
					marginHorizontal: 18,
					fontSize: 24,
				}}
			>
				how old are you?
			</Text>
			<LineGauge max={100} min={0} />
			<View style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<TouchableOpacity
					style={{
						backgroundColor: 'rgb(89,205,217)',
						height: 56,
						borderRadius: 28,
						width: 200,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() => {
						navigation.navigate('Details')
					}}
				>
					<Text style={{
						fontSize: 22,
						color: '#fff'
					}}>continue</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
function DetailsScreen() {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>Details Screen</Text>
		</View>
	)
}

const Stack = createStackNavigator()
const headerLeft = () => {
	const a = useNavigation()
	return (
		<TouchableOpacity
			onPress={() => {
				a.goBack()
			}}
		>
			<Image
				source={require('./images/back.png')}
				style={{
					marginLeft: 10,
					width: 20,
					height: 10,
				}}
			/>
		</TouchableOpacity>
	)
}
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: 'My home',
						headerStyle: {
							backgroundColor: '#fff',
							height: 100,
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						headerLeft,
						headerTitle: (props) => (
							<Progress index={1} total={8} />
						),
					}}
				/>
				<Stack.Screen
					name="Details"
					component={DetailsScreen}
					options={{
						title: 'My home',
						headerStyle: {
							backgroundColor: '#fff',
							height: 100,
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						headerLeft,
						headerTitle: (props) => (
							<Progress index={2} total={8} />
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
