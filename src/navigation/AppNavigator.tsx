import AuthGatewayScreen from '@/screens/AuthGatewayScreen'
import HomeScreen from '@/screens/HomeScreen'
import OnboardingScreen from '@/screens/OnboardingScreen'
import SignUpScreen from '@/screens/SignUpScreen'
import SplashScreen from '@/screens/SplashScreen'
import WelcomeScreen from '@/screens/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

export type RootStackParamList = {
	Splash: undefined
	Welcome: undefined
	Onboarding: undefined
	AuthGateway: undefined
	SignUp: undefined
	Home: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Splash'>
				<Stack.Screen
					name='Splash'
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Welcome'
					component={WelcomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Onboarding'
					component={OnboardingScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='AuthGateway'
					component={AuthGatewayScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ title: 'Wowza' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
