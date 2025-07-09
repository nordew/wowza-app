import Header from '@/components/common/Header'
import LabeledInput from '@/components/common/LabeledInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Animated,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

type LoginScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Login'
>

type Props = {
	navigation: LoginScreenNavigationProp
}

const LoginScreen = ({ navigation }: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onTouched',
	})

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

	const onSubmit = (data: LoginFormData) => {
		console.log(data)
		// Handle login API call here
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text style={styles.title}>LOGIN TO YOUR PROFILE</Text>

						<Controller
							control={control}
							name='email'
							render={({ field: { onChange, onBlur, value } }) => (
								<LabeledInput
									label='Email'
									placeholder='Enter your email'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									keyboardType='email-address'
									autoCapitalize='none'
									error={errors.email}
								/>
							)}
						/>

						<Controller
							control={control}
							name='password'
							render={({ field: { onChange, onBlur, value } }) => (
								<LabeledInput
									label='Password'
									placeholder='Enter your password'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry
									error={errors.password}
								/>
							)}
						/>
					</ScrollView>

					<View
						style={[
							styles.buttonContainer,
							{
								paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
								marginBottom: 20,
							},
						]}
					>
						<PrimaryButton
							title='LOG IN'
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isLoading}
							style={!isValid || isLoading ? styles.disabledButton : undefined}
						/>
						<TouchableOpacity
							style={styles.forgotPasswordButton}
							onPress={() => navigation.navigate('ForgotPassword')}
						>
							<Text style={styles.forgotPasswordText}>Forgot password?</Text>
						</TouchableOpacity>
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
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		color: colors.primary,
		textAlign: 'center',
		marginBottom: 40,
	},
	buttonContainer: {
		paddingTop: 10,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	forgotPasswordButton: {
		alignSelf: 'center',
		marginTop: 20,
	},
	forgotPasswordText: {
		color: colors.primary,
		fontFamily: 'Inter_700Bold',
		fontSize: 16,
	},
})

export default LoginScreen
