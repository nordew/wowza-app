import Header from '@/components/common/Header'
import OTPInput from '@/components/common/OTPInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type VerifyResetCodeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'VerifyResetCode'
>

type VerifyResetCodeScreenRouteProp = RouteProp<
	RootStackParamList,
	'VerifyResetCode'
>

type Props = {
	navigation: VerifyResetCodeScreenNavigationProp
	route: VerifyResetCodeScreenRouteProp
}

const VerifyResetCodeScreen = ({ route, navigation }: Props) => {
	const { email } = route.params
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

	const onVerify = () => {
		console.log('Verifying code:', code)
		// In a real app, you'd make an API call to verify the code
		console.log('Verification successful', { email, code })
		// For now, let's just simulate a success
		navigation.navigate('SetNewPassword', { email, code })
	}

	const onResend = () => {
		console.log('Resending code to:', email)
		// Handle resend API call
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<View style={styles.mainContent}>
						<Text style={styles.title}>CHECK YOUR EMAIL</Text>
						<Text style={styles.description}>
							We have sent a reset code to{' '}
							<Text style={styles.emailText}>{email}</Text>.{'\n'}
							Please enter the 5-digit code mentioned in the email.
						</Text>
						<OTPInput length={5} onComplete={handleCodeComplete} />
					</View>

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
						]}
					>
						<PrimaryButton
							title='VERIFY CODE'
							onPress={onVerify}
							disabled={!isCodeComplete || isLoading}
							style={
								!isCodeComplete || isLoading ? styles.disabledButton : undefined
							}
						/>
						<View style={styles.resendContainer}>
							<Text style={styles.resendText}>Haven't got the email yet? </Text>
							<TouchableOpacity onPress={onResend}>
								<Text style={styles.resendLink}>Resend email</Text>
							</TouchableOpacity>
						</View>
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
		paddingTop: 40,
	},
	mainContent: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		color: colors.primary,
		textAlign: 'center',
		marginBottom: 20,
	},
	description: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
		lineHeight: 24,
	},
	emailText: {
		fontFamily: 'Inter_700Bold',
		color: colors.primary,
	},
	buttonContainer: {
		paddingTop: 10,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	resendContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
	resendText: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
	},
	resendLink: {
		fontFamily: 'Inter_700Bold',
		color: colors.primary,
		fontSize: 16,
	},
})

export default VerifyResetCodeScreen
