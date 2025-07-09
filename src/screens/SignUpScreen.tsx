import Header from '@/components/common/Header'
import PrimaryButton from '@/components/common/PrimaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Keyboard,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type SignUpScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'SignUp'
>

type Props = {
	navigation: SignUpScreenNavigationProp
}

const SignUpScreen = ({ navigation }: Props) => {
	const [phone, setPhone] = useState('')
	const [isValid, setIsValid] = useState(false)
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

	const handlePhoneChange = (text: string) => {
		const asYouType = new AsYouType('US')
		const formatted = asYouType.input(text)
		setPhone(formatted)
		setIsValid(isValidPhoneNumber(formatted, 'US'))
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<Text style={styles.title}>SIGN UP</Text>

					<Text style={styles.label}>Your phone number*</Text>
					<View
						style={[
							styles.phoneInputContainer,
							!isValid && phone.length > 0 && styles.invalidInput,
						]}
					>
						<Text style={styles.countryCode}>+1</Text>
						<TextInput
							style={styles.input}
							keyboardType='phone-pad'
							value={phone}
							onChangeText={handlePhoneChange}
							placeholder='(123) 456-7890'
							placeholderTextColor='#666'
							maxLength={14} // (XXX) XXX-XXXX
						/>
					</View>

					{!isValid && phone.length > 0 ? (
						<Text style={styles.errorText}>
							Please enter a valid phone number.
						</Text>
					) : (
						<Text style={styles.note}>
							*We never share this with anyone and it won't be on your profile.
						</Text>
					)}

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
						]}
					>
						<PrimaryButton
							title='CONTINUE'
							onPress={() => {
								/* Handle Continue */
							}}
							disabled={!isValid}
							style={!isValid ? styles.disabledButton : undefined}
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
		marginBottom: 40,
	},
	label: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		marginBottom: 10,
	},
	phoneInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.primary,
		borderRadius: 8,
	},
	invalidInput: {
		borderColor: 'red',
	},
	countryCode: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 18,
		paddingHorizontal: 15,
	},
	input: {
		flex: 1,
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 18,
		paddingVertical: 15,
	},
	note: {
		fontFamily: 'Inter_400Regular',
		color: '#888',
		fontSize: 14,
		marginTop: 15,
	},
	errorText: {
		fontFamily: 'Inter_400Regular',
		color: 'red',
		fontSize: 14,
		marginTop: 10,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
})

export default SignUpScreen
