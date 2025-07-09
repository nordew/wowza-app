import { colors } from '@/styles/theme'
import React, { useRef, useState } from 'react'
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputKeyPressEventData,
	View,
} from 'react-native'

type OTPInputProps = {
	length: number
	onComplete: (code: string) => void
}

const OTPInput = ({ length, onComplete }: OTPInputProps) => {
	const [code, setCode] = useState(Array(length).fill(''))
	const inputs = useRef<TextInput[]>([])

	const handleInputChange = (text: string, index: number) => {
		const newCode = [...code]
		newCode[index] = text
		setCode(newCode)

		if (text && index < length - 1) {
			inputs.current[index + 1].focus()
		}

		if (newCode.every(char => char !== '')) {
			onComplete(newCode.join(''))
		}
	}

	const handleKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number
	) => {
		if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
			inputs.current[index - 1].focus()
		}
	}

	return (
		<View style={styles.container}>
			{Array(length)
				.fill(0)
				.map((_, index) => (
					<TextInput
						key={index}
						style={styles.input}
						keyboardType='number-pad'
						maxLength={1}
						onChangeText={text => handleInputChange(text, index)}
						onKeyPress={e => handleKeyPress(e, index)}
						value={code[index]}
						ref={ref => {
							if (ref) {
								inputs.current[index] = ref
							}
						}}
					/>
				))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	input: {
		width: 50,
		height: 60,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 8,
		textAlign: 'center',
		fontSize: 22,
		fontFamily: 'Inter_700Bold',
		color: colors.text,
		marginHorizontal: 8,
	},
})

export default OTPInput
