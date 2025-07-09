import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'

type SplashScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Splash'
>

type Props = {
	navigation: SplashScreenNavigationProp
}

const SplashScreen = ({ navigation }: Props) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.replace('Welcome')
		}, 2000) // 2 seconds
	}, [navigation])

	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/images/intro-logo.png')}
				style={styles.logo}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 250,
		height: 250,
		resizeMode: 'contain',
	},
})

export default SplashScreen
