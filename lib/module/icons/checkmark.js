"use strict";

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { createIcon } from "../utiles/createIcon.js";
import { StyleShape } from "../shape/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Checkmark = createIcon(({
  size,
  color,
  strokeWidth
}, props) => /*#__PURE__*/_jsx(StyleShape, {
  cycle: true,
  children: /*#__PURE__*/_jsx(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    ...props,
    children: /*#__PURE__*/_jsx(Path, {
      d: "M20 6L9 17l-5-5",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })
  })
}));
Checkmark.displayName = 'Checkmark';
export { Checkmark };
//# sourceMappingURL=checkmark.js.map