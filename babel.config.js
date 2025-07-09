module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin', // This should be listed last
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@': './src',
					},
				},
			],
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
				},
			],
		],
	}
}
