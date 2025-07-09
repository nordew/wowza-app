import { colors } from '@/styles/theme'
import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const SuccessCheckIcon = ({ size = 80 }: { size?: number }) => {
	return (
		<Svg width={size} height={size} viewBox='0 0 80 80' fill='none'>
			<Circle cx='40' cy='40' r='40' fill={colors.primary} />
			<Path
				d='M26 41.5L36.5 52L54.5 34'
				stroke={colors.background}
				strokeWidth='5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default SuccessCheckIcon
