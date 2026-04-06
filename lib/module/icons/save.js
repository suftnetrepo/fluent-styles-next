"use strict";

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Save = createIcon(({
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
      d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M17 21v-8H7v8",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M7 3v5h8",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })]
  })
}));
Save.displayName = 'Save';
export { Save };
//# sourceMappingURL=save.js.map