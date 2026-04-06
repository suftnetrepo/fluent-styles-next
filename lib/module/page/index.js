"use strict";

import React from 'react';
import { StyledSafeAreaView } from "../safeAreaView/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const StyledPage = ({
  children,
  ...props
}) => {
  return /*#__PURE__*/_jsx(StyledSafeAreaView, {
    ...props,
    children: children
  });
};
StyledPage.displayName = 'StyledPage';
export { StyledPage };
//# sourceMappingURL=index.js.map