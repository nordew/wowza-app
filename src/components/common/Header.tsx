import LeftArrowIcon from '@/assets/images/left-arrow.svg'
import { colors } from '@/styles/theme'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
	Image,
	ImageBackground,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()

	return (
		<ImageBackground
			source={require('@/assets/images/header-bg.jpg')}
			style={[
				styles.container,
				{ paddingTop: insets.top, height: 80 + insets.top },
			]}
			resizeMode='cover'
		>
			<StatusBar barStyle='dark-content' />
			<View style={styles.headerContent}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<LeftArrowIcon width={24} height={24} />
				</TouchableOpacity>
				<Image
					source={require('@/assets/images/header-logo.png')}
					style={styles.logo}
				/>
				<View style={{ width: 40 }} />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
	},
	headerContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	backButton: {
		padding: 10,
	},
	logo: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
})

export default Header
