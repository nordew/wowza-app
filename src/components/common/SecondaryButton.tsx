import { colors } from '@/styles/theme'
import React from 'react'
import {
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native'

type SecondaryButtonProps = {
	onPress: () => void
	title: string
	style?: ViewStyle
	textStyle?: TextStyle
}

const SecondaryButton = ({
	onPress,
	title,
	style,
	textStyle,
}: SecondaryButtonProps) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
		paddingVertical: 18,
		borderRadius: 8,
		alignItems: 'center',
		width: '100%',
		borderWidth: 2,
		borderColor: colors.primary,
	},
	buttonText: {
		fontFamily: 'Inter_700Bold',
		color: colors.primary,
		fontSize: 18,
	},
})

export default SecondaryButton
