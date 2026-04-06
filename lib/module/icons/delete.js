"use strict";

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Delete = createIcon(({
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
      d: "M3 6h18",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M8 6V4h8v2",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M19 6l-1 14H6L5 6",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/_jsx(Path, {
      d: "M10 11v6M14 11v6",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round"
    })]
  })
}));
Delete.displayName = 'Delete';
export { Delete };
//# sourceMappingURL=delete.js.map