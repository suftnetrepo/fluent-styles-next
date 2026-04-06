"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledDivider = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _theme = require("../utiles/theme.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
const StyledDivider = exports.StyledDivider = (0, _styled.styled)(_reactNative.View, {
  base: {
    flexDirection: 'row',
    flex: 1,
    height: 1,
    backgroundColor: _theme.theme.colors.gray[100]
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        flex: 1
      },
      false: {}
    },
    horizontal: {
      true: {
        flexDirection: 'row',
        flex: 1
      },
      false: {}
    },
    ..._viewStyleVariants.viewStyleStringVariants,
    ..._viewStyleVariants.viewStyleVariants
  }
});
//# sourceMappingURL=index.js.map