import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const BackArrow = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M19 12H5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
        <Path d="M12 19l-7-7 7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)

export { BackArrow }