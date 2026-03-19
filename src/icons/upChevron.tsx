import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const ChevronUp = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M18 15l-6-6-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)

ChevronUp.displayName = 'ChevronUp'

export { ChevronUp }