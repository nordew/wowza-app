import { colors } from '@/styles/theme'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface LabeledInputProps extends TextInputProps {
	label: string
	error?: FieldError
}

const LabeledInput = ({ label, error, ...props }: LabeledInputProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.input, error && styles.invalidInput]}
				placeholderTextColor='#666'
				{...props}
			/>
			{error && <Text style={styles.errorText}>{error.message}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: colors.primary,
		borderRadius: 8,
		paddingHorizontal: 15,
		paddingVertical: 15,
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
	},
	invalidInput: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		marginTop: 5,
	},
})

export default LabeledInput
