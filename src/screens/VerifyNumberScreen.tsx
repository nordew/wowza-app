import { verifySignUp } from '@/api/authService'
import Header from '@/components/common/Header'
import OTPInput from '@/components/common/OTPInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Animated,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type VerifyNumberScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'VerifyNumber'
>

type VerifyNumberScreenRouteProp = RouteProp<RootStackParamList, 'VerifyNumber'>

type Props = {
	navigation: VerifyNumberScreenNavigationProp
	route: VerifyNumberScreenRouteProp
}

const VerifyNumberScreen = ({ route, navigation }: Props) => {
	const { phone } = route.params
	const [code, setCode] = useState('')
	const [isCodeComplete, setIsCodeComplete] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const fadeAnim = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			delay: 200,
			useNativeDriver: true,
		}).start()
	}, [])

	const handleCodeComplete = (completedCode: string) => {
		setCode(completedCode)
		setIsCodeComplete(true)
	}

	const handleVerify = async () => {
		if (!isCodeComplete) return

		setIsLoading(true)
		try {
			await verifySignUp(phone, code)
			navigation.navigate('SetupProfile', { phone })
		} catch (error) {
			Alert.alert(
				'Verification Failed',
				'The code you entered is incorrect. Please try again.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<Text style={styles.title}>VERIFY YOUR NUMBER</Text>
					<Text style={styles.description}>
						Enter the code we've sent by text to {phone}.
					</Text>

					<OTPInput length={5} onComplete={handleCodeComplete} />

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
						]}
					>
						<PrimaryButton
							title={
								isLoading ? (
									<ActivityIndicator color={colors.black} />
								) : (
									'CONTINUE'
								)
							}
							onPress={handleVerify}
							disabled={!isCodeComplete || isLoading}
							style={!isCodeComplete ? styles.disabledButton : undefined}
						/>
					</View>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		color: colors.primary,
		textAlign: 'center',
		marginBottom: 10,
	},
	description: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
})

export default VerifyNumberScreen
