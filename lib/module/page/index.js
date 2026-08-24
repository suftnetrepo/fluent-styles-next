"use strict";

import React from 'react';
import { StyledSafeAreaView } from "../safeAreaView/index.js";
import { StatusBar } from 'react-native';
import { StyledHeader } from "../header/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Page = ({
  children,
  statusBarProps,
  showStatusBar = true,
  statusBarStyle,
  statusBarBackgroundColor,
  hideStatusBarOnAndroid,
  hideStatusBarOnIOS,
  translucentStatusBar,
  ...props
}) => {
  return /*#__PURE__*/_jsxs(StyledSafeAreaView, {
    ...props,
    children: [showStatusBar && /*#__PURE__*/_jsx(StatusBar, {
      hidden: hideStatusBarOnAndroid || hideStatusBarOnIOS,
      barStyle: statusBarStyle,
      backgroundColor: statusBarBackgroundColor,
      translucent: translucentStatusBar,
      ...statusBarProps
    }), children]
  });
};
const StyledPage = Page;
StyledPage.Header = StyledHeader;
StyledPage.displayName = 'StyledPage';
export { StyledPage };
//# sourceMappingURL=index.js.map