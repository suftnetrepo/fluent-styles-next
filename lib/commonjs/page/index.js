"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("../safeAreaView/index.js");
var _reactNative = require("react-native");
var _index2 = require("../header/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Page = ({
  children,
  statusBarProps,
  showStatusBar = true,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor,
  hideStatusBarOnAndroid,
  hideStatusBarOnIOS,
  translucentStatusBar,
  ...props
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.StyledSafeAreaView, {
    ...props,
    children: [showStatusBar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.StatusBar, {
      hidden: hideStatusBarOnAndroid || hideStatusBarOnIOS,
      barStyle: statusBarStyle,
      backgroundColor: statusBarBackgroundColor,
      translucent: translucentStatusBar,
      ...statusBarProps
    }), children]
  });
};
const StyledPage = exports.StyledPage = Page;
StyledPage.Header = _index2.StyledHeader;
StyledPage.displayName = 'StyledPage';
//# sourceMappingURL=index.js.map