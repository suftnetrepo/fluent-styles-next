import React from 'react'
import Svg, { Path , Circle} from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Warning = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M12 9v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <Circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth={strokeWidth} />
      </Svg>
    </StyleShape>
  )
)
Warning.displayName = 'Warning'

export { Warning }