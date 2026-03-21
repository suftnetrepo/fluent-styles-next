import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Success = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <Path d="M8 12l3 3 5-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)
Success.displayName = 'Success'
export { Success }