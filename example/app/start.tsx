import React from 'react'
import Navigator from '../app/navigation'
import { StyledSafeAreaProvider } from 'fluent-styles'

const Start = () => {
  return (
    <StyledSafeAreaProvider>
       <Navigator />
    </StyledSafeAreaProvider>
  )
}
export default Start
