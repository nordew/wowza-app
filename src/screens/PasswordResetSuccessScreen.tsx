import PrimaryButton from '@/components/common/PrimaryButton'
import SuccessCheckIcon from '@/components/icons/SuccessCheckIcon'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PasswordResetSuccessScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'PasswordResetSuccess'
>

type Props = {
	navigation: PasswordResetSuccessScreenNavigationProp
}

const PasswordResetSuccessScreen = ({ navigation }: Props) => {
	const insets = useSafeAreaInsets()

	const handleBackToLogin = () => {
		navigation.navigate('Login')
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<SuccessCheckIcon size={80} />
				<Text style={styles.title}>SUCCESS</Text>
				<Text style={styles.message}>
					Congratulations!{'\n'}Your password has been changed.
				</Text>
			</View>
			<View
				style={[
					styles.buttonContainer,
					{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
				]}
			>
				<PrimaryButton title='BACK TO LOGIN' onPress={handleBackToLogin} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		justifyContent: 'space-between',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		color: colors.primary,
		textAlign: 'center',
		marginTop: 30,
		marginBottom: 10,
	},
	message: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		paddingTop: 10,
		marginBottom: 20,
	},
})

export default PasswordResetSuccessScreen
