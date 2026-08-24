"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledImageBackground = exports.StyledImage = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _react = _interopRequireDefault(require("react"));
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StyledImageBackground = exports.StyledImageBackground = (0, _styled.styled)(_reactNative.ImageBackground, {
  base: {
    position: 'relative',
    borderWidth: 0,
    resizeMode: 'cover'
  },
  variants: {
    ..._viewStyleVariants.viewStyleVariants
  }
});
const StyledImage = ({
  height = 100,
  width = 100,
  ref,
  ...props
}) => {
  const {
    cycle,
    size,
    ...rest
  } = props;
  const sizeStyle = cycle ? {
    height: Number(size),
    width: Number(size),
    borderRadius: 9999
  } : {
    height: height,
    width: width
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
    ...rest,
    style: [props.style, sizeStyle],
    ref: ref
  });
};
exports.StyledImage = StyledImage;
//# sourceMappingURL=index.js.map