"use strict";

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Error = createIcon(({
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
    children: [/*#__PURE__*/_jsx(Circle, {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: color,
      strokeWidth: strokeWidth,
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M15 9l-6 6M9 9l6 6",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round"
    })]
  })
}));
Error.displayName = 'Error';
export { Error };
//# sourceMappingURL=error.js.map