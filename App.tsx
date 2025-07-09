import {
	Inter_400Regular,
	Inter_700Bold,
	useFonts,
} from '@expo-google-fonts/inter'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-gesture-handler'
import AppNavigator from './src/navigation/AppNavigator'
import { colors } from './src/styles/theme'

export default function App() {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	})

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color={colors.primary} />
			</View>
		)
	}

	return <AppNavigator />
}
