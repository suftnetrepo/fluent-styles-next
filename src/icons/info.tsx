import React from 'react'
import Svg, { Path , Circle} from 'react-native-svg'
import { createIcon } from '../utiles/createIcon'
import { StyleShape } from '../shape'

const Info = createIcon(
  ({ size, color, strokeWidth }, props) => (
    <StyleShape cycle>
      <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
        <Path d="M12 16v-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <Circle cx="12" cy="8" r="0.5" fill={color} stroke={color} strokeWidth={strokeWidth} />
      </Svg>
    </StyleShape>
  )
)
Info.displayName = 'Info'

export { Info }