import { colors } from '@/styles/theme'
import React from 'react'
import {
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native'

type PrimaryButtonProps = {
	onPress: () => void
	title: React.ReactNode
	style?: ViewStyle
	textStyle?: TextStyle
	disabled?: boolean
}

const PrimaryButton = ({
	onPress,
	title,
	style,
	textStyle,
	disabled,
}: PrimaryButtonProps) => {
	return (
		<TouchableOpacity
			style={[styles.button, style]}
			onPress={onPress}
			disabled={disabled}
		>
			{typeof title === 'string' ? (
				<Text style={[styles.buttonText, textStyle]}>{title}</Text>
			) : (
				title
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 18,
		borderRadius: 8,
		alignItems: 'center',
		width: '100%',
	},
	buttonText: {
		fontFamily: 'Inter_700Bold',
		color: colors.black,
		fontSize: 18,
	},
})

export default PrimaryButton
