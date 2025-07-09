import apiClient from './apiClient'

export const initSignUp = async (phone: string) => {
	try {
		const response = await apiClient.post('/api/v1/auth/sign-up/init', {
			phone,
		})
		return response.data
	} catch (error) {
		// In a real app, you'd want to handle this error more gracefully
		console.error('Sign-up initiation failed:', error)
		throw error
	}
}

export const verifySignUp = async (phone: string, code: string) => {
	try {
		const response = await apiClient.post('/api/v1/auth/sign-up/verify', {
			phone,
			code,
		})
		return response.data
	} catch (error) {
		console.error('Sign-up verification failed:', error)
		throw error
	}
}

export const completeSignUp = async (data: {
	email: string
	fullName: string
	password: string
	phone: string
	profileName: string
}) => {
	try {
		const response = await apiClient.post('/api/v1/auth/sign-up/complete', data)
		return response.data
	} catch (error) {
		console.error('Sign-up completion failed:', error)
		throw error
	}
}
