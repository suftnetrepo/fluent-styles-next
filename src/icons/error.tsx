import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Error = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <Path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </Svg>
    </StyleShape>
  )
)
Error.displayName = 'Error'
export { Error }