import AuthGatewayScreen from '@/screens/AuthGatewayScreen'
import ForgotPasswordScreen from '@/screens/ForgotPasswordScreen'
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import OnboardingScreen from '@/screens/OnboardingScreen'
import PasswordResetSuccessScreen from '@/screens/PasswordResetSuccessScreen'
import SetNewPasswordScreen from '@/screens/SetNewPasswordScreen'
import SetupProfileScreen from '@/screens/SetupProfileScreen'
import SignUpScreen from '@/screens/SignUpScreen'
import SplashScreen from '@/screens/SplashScreen'
import VerifyNumberScreen from '@/screens/VerifyNumberScreen'
import VerifyResetCodeScreen from '@/screens/VerifyResetCodeScreen'
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
	VerifyNumber: { phone: string }
	SetupProfile: { phone: string }
	Login: undefined
	ForgotPassword: undefined
	VerifyResetCode: { email: string }
	SetNewPassword: { email: string; code: string }
	PasswordResetSuccess: undefined
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
					name='VerifyNumber'
					component={VerifyNumberScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='SetupProfile'
					component={SetupProfileScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ForgotPassword'
					component={ForgotPasswordScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='VerifyResetCode'
					component={VerifyResetCodeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='SetNewPassword'
					component={SetNewPasswordScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='PasswordResetSuccess'
					component={PasswordResetSuccessScreen}
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
