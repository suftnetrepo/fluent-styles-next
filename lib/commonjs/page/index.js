"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("../safeAreaView/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StyledPage = ({
  children,
  ...props
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyledSafeAreaView, {
    ...props,
    children: children
  });
};
exports.StyledPage = StyledPage;
StyledPage.displayName = 'StyledPage';
//# sourceMappingURL=index.js.map