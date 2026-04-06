"use strict";

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Info = createIcon(({
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
      d: "M12 16v-4",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round"
    }), /*#__PURE__*/_jsx(Circle, {
      cx: "12",
      cy: "8",
      r: "0.5",
      fill: color,
      stroke: color,
      strokeWidth: strokeWidth
    })]
  })
}));
Info.displayName = 'Info';
export { Info };
//# sourceMappingURL=info.js.map