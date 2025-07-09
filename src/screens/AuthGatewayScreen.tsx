import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef } from 'react'
import {
	Animated,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type AuthGatewayScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'AuthGateway'
>

type Props = {
	navigation: AuthGatewayScreenNavigationProp
}

const AuthGatewayScreen = ({ navigation }: Props) => {
	const slideAnim = useRef(new Animated.Value(30)).current
	const fadeAnim = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()

	useEffect(() => {
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start()
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' />
			<View style={styles.topContainer}>
				<Image
					source={require('@/assets/images/login.jpg')}
					style={styles.image}
				/>
			</View>
			<Animated.View
				style={[
					styles.bottomContainer,
					{
						paddingBottom: insets.bottom,
						paddingLeft: insets.left + 20,
						paddingRight: insets.right + 20,
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }],
					},
				]}
			>
				<Text style={styles.title}>CREATE AN ACCOUNT OR LOG IN</Text>
				<Text style={styles.description}>
					Join our community to start connecting
				</Text>

				<PrimaryButton
					title='SIGN UP'
					onPress={() => navigation.navigate('SignUp')}
					style={{ marginBottom: 15 }}
				/>
				<SecondaryButton
					title='LOG IN'
					onPress={() => navigation.navigate('Login')}
				/>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	topContainer: {
		height: '50%',
	},
	image: {
		height: '100%',
		width: '100%',
		resizeMode: 'cover',
	},
	bottomContainer: {
		height: '50%',
		paddingTop: 40,
		justifyContent: 'center',
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 21,
		marginBottom: 10,
		color: colors.primary,
	},
	description: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		marginBottom: 30,
	},
})

export default AuthGatewayScreen
