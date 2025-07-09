import Header from '@/components/common/Header'
import LabeledInput from '@/components/common/LabeledInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { RouteProp, StackNavigationProp } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Animated,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

const newPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

type NewPasswordFormData = z.infer<typeof newPasswordSchema>

type SetNewPasswordScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'SetNewPassword'
>

type SetNewPasswordScreenRouteProp = RouteProp<
	RootStackParamList,
	'SetNewPassword'
>

type Props = {
	navigation: SetNewPasswordScreenNavigationProp
	route: SetNewPasswordScreenRouteProp
}

const SetNewPasswordScreen = ({ navigation, route }: Props) => {
	const { email, code } = route.params
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<NewPasswordFormData>({
		resolver: zodResolver(newPasswordSchema),
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

	const onSubmit = (data: NewPasswordFormData) => {
		console.log({ ...data, email, code })
		// Handle set new password API call
		navigation.navigate('PasswordResetSuccess')
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text style={styles.title}>SET A NEW PASSWORD</Text>
						<Text style={styles.description}>
							Create a new password and ensure it is different from your
							previous ones for security.
						</Text>

						<Controller
							control={control}
							name='password'
							render={({ field: { onChange, onBlur, value } }) => (
								<LabeledInput
									label='Password'
									placeholder='Create a strong password'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry
									error={errors.password}
								/>
							)}
						/>

						<Controller
							control={control}
							name='confirmPassword'
							render={({ field: { onChange, onBlur, value } }) => (
								<LabeledInput
									label='Confirm password'
									placeholder='Create a strong password'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry
									error={errors.confirmPassword}
								/>
							)}
						/>
					</ScrollView>

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
						]}
					>
						<PrimaryButton
							title='UPDATE PASSWORD'
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isLoading}
							style={!isValid || isLoading ? styles.disabledButton : undefined}
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
		paddingTop: 40,
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
		lineHeight: 24,
	},
	buttonContainer: {
		paddingTop: 10,
		marginBottom: 20,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
})

export default SetNewPasswordScreen
