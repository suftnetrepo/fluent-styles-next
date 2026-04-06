"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalRenderer = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _position = require("../utiles/position.js");
var _styles = require("../utiles/styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
const PortalRenderer = ({
  portals
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
  children: portals.map(({
    id,
    children,
    options
  }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [options.backdrop && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _styles.portalStyles.backdrop,
      pointerEvents: "box-none",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.portalStyles.backdropTouchable,
        pointerEvents: "auto",
        onTouchStart: options.onBackdropPress
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [(0, _position.getPositionStyles)(options.position, options.offset), options.style],
      pointerEvents: "box-none",
      collapsable: false,
      children: children
    })]
  }, id))
});
exports.PortalRenderer = PortalRenderer;
//# sourceMappingURL=PortalRenderer.js.map