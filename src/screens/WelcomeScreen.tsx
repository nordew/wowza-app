import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

type WelcomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Welcome'
>

type Props = {
	navigation: WelcomeScreenNavigationProp
}

const WelcomeScreen = ({ navigation }: Props) => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>WELCOME!</Text>
					<Text style={styles.body}>
						Turn your video reviews into real cash!
					</Text>
					<Text style={styles.body}>
						With Wowza you can earn money by simply sharing your honest opinions
						about products and services.
					</Text>
					<Text style={styles.body}>
						Whether you're reviewing your latest gadget, a trendy outfit, or
						your favourite restaurant, your insights matter - and they pay!
					</Text>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('Onboarding')}
				>
					<Text style={styles.buttonText}>NEXT</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 24,
		color: colors.primary,
		marginBottom: 20,
	},
	body: {
		fontFamily: 'Inter_400Regular',
		fontSize: 16,
		color: colors.text,
		textAlign: 'center',
		marginBottom: 15,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 120,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'Inter_700Bold',
		color: colors.black,
		fontSize: 18,
	},
})

export default WelcomeScreen
