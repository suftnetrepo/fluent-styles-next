import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Checkmark = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </StyleShape>
  )
)

Checkmark.displayName = 'Checkmark'

export { Checkmark }