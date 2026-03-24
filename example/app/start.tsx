import React from 'react'
import Navigator from '../app/navigation'
import { GlobalPortalProvider, StyledSafeAreaProvider, PortalManager } from 'fluent-styles'

const Start = () => {
  return (
    <StyledSafeAreaProvider>
       <PortalManager >
          <Navigator />
        </PortalManager>
    </StyledSafeAreaProvider>
  )
}
export default Start
