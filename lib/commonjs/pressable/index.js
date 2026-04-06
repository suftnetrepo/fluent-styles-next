"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPressable = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
const StyledPressable = exports.StyledPressable = (0, _styled.styled)(_reactNative.Pressable, {
  base: {
    position: 'relative'
  },
  variants: {
    ..._viewStyleVariants.viewStyleStringVariants
  }
});
//# sourceMappingURL=index.js.map