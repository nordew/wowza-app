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
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'ForgotPassword'
>

type Props = {
	navigation: ForgotPasswordScreenNavigationProp
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
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

	const onSubmit = (data: ForgotPasswordFormData) => {
		console.log(data)
		// Handle forgot password API call here
		navigation.navigate('VerifyResetCode', { email: data.email })
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Header />
				<Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
					<Text style={styles.title}>RESTORE MY PASSWORD</Text>

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

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
						]}
					>
						<PrimaryButton
							title='RESET PASSWORD'
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
		marginBottom: 40,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 20,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
})

export default ForgotPasswordScreen
