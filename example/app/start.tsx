import React from "react";
import Navigator from "../app/navigation";
import {
  GlobalPortalProvider,
  PortalManager,
} from "fluent-styles";

const Start = () => {
  return (
    <GlobalPortalProvider>
        <PortalManager>
          <Navigator />
        </PortalManager>
      </GlobalPortalProvider>
  );
};
export default Start;
