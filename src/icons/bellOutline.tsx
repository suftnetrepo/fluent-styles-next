import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const BellOutline = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)

BellOutline.displayName = 'BellOutline'
export { BellOutline }