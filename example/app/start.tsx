import React from "react";
import Navigator from "../app/navigation";
import {
  GlobalPortalProvider,
  StyledSafeAreaProvider,
  PortalManager,
} from "fluent-styles";

const Start = () => {
  return (
    <StyledSafeAreaProvider>
      <GlobalPortalProvider>
        <PortalManager>
          <Navigator />
        </PortalManager>
      </GlobalPortalProvider>
    </StyledSafeAreaProvider>
  );
};
export default Start;
