"use strict";

import React from 'react';
import { View } from 'react-native';
import { getPositionStyles } from "../utiles/position.js";
import { portalStyles } from "../utiles/styles.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Renders a list of `PortalNode` objects into the component tree.
 *
 * Shared between `PortalManager` (declarative) and `GlobalPortalProvider`
 * (imperative) so neither duplicates this logic.
 *
 * ### Pointer event model
 *
 * | Layer              | pointerEvents      | Effect                          |
 * |--------------------|--------------------|---------------------------------|
 * | Position wrapper   | box-none           | Wrapper transparent to touches; |
 * |                    |                    | children still receive them.    |
 * | Backdrop (colour)  | box-none           | Colour layer is transparent.    |
 * | Backdrop (touch)   | auto               | Captures backdrop taps.         |
 * | Portal content     | (default: auto)    | Children handle their own input.|
 *
 * The `center` position wrapper fills the entire screen (needed for flexbox
 * centering) but uses `box-none` so it never blocks the app behind it.
 */
export const PortalRenderer = ({
  portals
}) => /*#__PURE__*/_jsx(_Fragment, {
  children: portals.map(({
    id,
    children,
    options
  }) => /*#__PURE__*/_jsxs(React.Fragment, {
    children: [options.backdrop && /*#__PURE__*/_jsx(View, {
      style: portalStyles.backdrop,
      pointerEvents: "box-none",
      children: /*#__PURE__*/_jsx(View, {
        style: portalStyles.backdropTouchable,
        pointerEvents: "auto",
        onTouchStart: options.onBackdropPress
      })
    }), /*#__PURE__*/_jsx(View, {
      style: [getPositionStyles(options.position, options.offset), options.style],
      pointerEvents: "box-none",
      collapsable: false,
      children: children
    })]
  }, id))
});
//# sourceMappingURL=PortalRenderer.js.map