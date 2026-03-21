import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Delete = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M3 6h18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <Path d="M8 6V4h8v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M19 6l-1 14H6L5 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M10 11v6M14 11v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </Svg>
    </StyleShape>
  )
)
Delete.displayName = 'Delete'
export { Delete }