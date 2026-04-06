"use strict";

import { theme } from "../utiles/theme.js";
import { Stack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StyledSeperator = /*#__PURE__*/React.forwardRef(({
  leftLabel,
  leftLabelProps,
  rightLabel,
  rightLabelProps,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsxs(Stack, {
    horizontal: true,
    justifyContent: "space-between",
    alignItems: "center",
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/_jsx(StyledText, {
      marginHorizontal: 4,
      fontSize: theme.fontSize.medium,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.gray[500],
      ...leftLabelProps,
      children: leftLabel
    }), rightLabel && /*#__PURE__*/_jsx(StyledText, {
      marginHorizontal: 4,
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors.gray[500],
      ...rightLabelProps,
      children: rightLabel
    })]
  });
});
StyledSeperator.displayName = "StyledSeperator";
export { StyledSeperator };
//# sourceMappingURL=index.js.map