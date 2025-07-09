import { API_BASE_URL } from '@env'
import axios from 'axios'

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request Interceptor for logging
apiClient.interceptors.request.use(
	config => {
		console.log('--- Request ---')
		console.log(
			'URL:',
			config.baseURL ? config.baseURL + config.url : config.url
		)
		console.log('Method:', config.method?.toUpperCase())
		if (config.data) {
			console.log('Data:', JSON.stringify(config.data, null, 2))
		}
		console.log('-----------------')
		return config
	},
	error => {
		console.error('Request Error:', error)
		return Promise.reject(error)
	}
)

// Response Interceptor for logging
apiClient.interceptors.response.use(
	response => {
		console.log('--- Response ---')
		console.log('Status:', response.status)
		console.log('Data:', JSON.stringify(response.data, null, 2))
		console.log('------------------')
		return response
	},
	error => {
		console.log('--- Response Error ---')
		if (error.response) {
			console.log('Status:', error.response.status)
			console.log('Data:', JSON.stringify(error.response.data, null, 2))
		} else if (error.request) {
			console.log('No response received:', error.request)
		} else {
			console.log('Error setting up request:', error.message)
		}
		console.log('----------------------')
		return Promise.reject(error)
	}
)

export default apiClient
