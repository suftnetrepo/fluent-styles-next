"use strict";

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Warning = createIcon(({
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
      d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M12 9v4",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round"
    }), /*#__PURE__*/_jsx(Circle, {
      cx: "12",
      cy: "17",
      r: "0.5",
      fill: color,
      stroke: color,
      strokeWidth: strokeWidth
    })]
  })
}));
Warning.displayName = 'Warning';
export { Warning };
//# sourceMappingURL=warning.js.map