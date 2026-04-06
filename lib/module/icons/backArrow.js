"use strict";

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BackArrow = createIcon(({
  size,
  color,
  strokeWidth
}, props) => /*#__PURE__*/_jsx(StyleShape, {
  cycle: true,
  children: /*#__PURE__*/_jsxs(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    ...props,
    children: [/*#__PURE__*/_jsx(Path, {
      d: "M19 12H5",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M12 19l-7-7 7-7",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })]
  })
}));
BackArrow.displayName = 'BackArrow';
export { BackArrow };
//# sourceMappingURL=backArrow.js.map