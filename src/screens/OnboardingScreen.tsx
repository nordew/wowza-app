import Paginator from '@/components/common/Paginator'
import onboardingSlides from '@/constants/onboarding'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { colors } from '@/styles/theme'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native'

type OnboardingScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Onboarding'
>

type Props = {
	navigation: OnboardingScreenNavigationProp
}

const OnboardingScreen = ({ navigation }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [textData, setTextData] = useState(onboardingSlides[0])
	const scrollX = useRef(new Animated.Value(0)).current
	const textOpacity = useRef(new Animated.Value(1)).current
	const slidesRef = useRef<FlatList>(null)
	const { width } = useWindowDimensions()

	useEffect(() => {
		if (textData.id !== onboardingSlides[currentIndex].id) {
			Animated.timing(textOpacity, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start(() => {
				setTextData(onboardingSlides[currentIndex])
				Animated.timing(textOpacity, {
					toValue: 1,
					duration: 250,
					useNativeDriver: true,
				}).start()
			})
		}
	}, [currentIndex])

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index)
		}
	}).current

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

	const scrollTo = () => {
		if (currentIndex < onboardingSlides.length - 1) {
			slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
		} else {
			navigation.replace('AuthGateway')
		}
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.sliderContainer}>
					<FlatList
						data={onboardingSlides}
						renderItem={({ item }) => (
							<Image source={item.image} style={[styles.image, { width }]} />
						)}
						horizontal
						showsHorizontalScrollIndicator={false}
						pagingEnabled
						bounces={false}
						keyExtractor={item => item.id}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { x: scrollX } } }],
							{
								useNativeDriver: false,
							}
						)}
						scrollEventThrottle={32}
						onViewableItemsChanged={viewableItemsChanged}
						viewabilityConfig={viewConfig}
						ref={slidesRef}
					/>
				</View>

				<View style={styles.bottomContainer}>
					<Paginator data={onboardingSlides} scrollX={scrollX} />

					<Animated.View style={{ opacity: textOpacity }}>
						<Text style={styles.title}>{textData.title}</Text>
						<Text style={styles.description}>{textData.description}</Text>
					</Animated.View>

					<TouchableOpacity style={styles.button} onPress={scrollTo}>
						<Text style={styles.buttonText}>
							{currentIndex === onboardingSlides.length - 1
								? 'GET STARTED'
								: 'NEXT'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
	},
	sliderContainer: {
		height: '60%',
	},
	image: {
		height: '100%',
		resizeMode: 'cover',
	},
	bottomContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontSize: 22,
		marginTop: 20,
		marginBottom: 10,
		color: colors.primary,
	},
	description: {
		fontFamily: 'Inter_400Regular',
		color: colors.text,
		fontSize: 16,
		marginBottom: 20,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 'auto',
	},
	buttonText: {
		fontFamily: 'Inter_700Bold',
		color: colors.black,
		fontSize: 18,
	},
})

export default OnboardingScreen
