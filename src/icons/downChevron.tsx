import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const ChevronDown = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)

ChevronDown.displayName = 'ChevronDown'

export { ChevronDown }