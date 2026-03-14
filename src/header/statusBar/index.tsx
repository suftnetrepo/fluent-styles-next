
import React, { memo } from 'react'
import type { StatusBarProps } from 'react-native'
import { StatusBar } from 'react-native'

const StyledStatusBar: React.FC<StatusBarProps> = props => {
  return ( <StatusBar {...props} barStyle={'dark-content'} backgroundColor="transparent" translucent />)
}

export { StatusBarProps }; 
export default memo(StyledStatusBar)
