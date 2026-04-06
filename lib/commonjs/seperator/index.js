"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledSeperator = void 0;
var _theme = require("../utiles/theme.js");
var _index = require("../stack/index.js");
var _index2 = require("../text/index.js");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StyledSeperator = exports.StyledSeperator = /*#__PURE__*/_react.default.forwardRef(({
  leftLabel,
  leftLabelProps,
  rightLabel,
  rightLabelProps,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    horizontal: true,
    justifyContent: "space-between",
    alignItems: "center",
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      marginHorizontal: 4,
      fontSize: _theme.theme.fontSize.medium,
      fontWeight: _theme.theme.fontWeight.semiBold,
      color: _theme.theme.colors.gray[500],
      ...leftLabelProps,
      children: leftLabel
    }), rightLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      marginHorizontal: 4,
      fontSize: _theme.theme.fontSize.small,
      fontWeight: _theme.theme.fontWeight.normal,
      color: _theme.theme.colors.gray[500],
      ...rightLabelProps,
      children: rightLabel
    })]
  });
});
StyledSeperator.displayName = "StyledSeperator";
//# sourceMappingURL=index.js.map