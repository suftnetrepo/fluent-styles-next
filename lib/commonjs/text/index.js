"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledText = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _theme = require("../utiles/theme.js");
const StyledText = exports.StyledText = (0, _styled.styled)(_reactNative.Text, {
  base: {
    fontSize: _theme.theme.fontSize.normal,
    color: _theme.theme.colors.gray[800],
    fontWeight: _theme.theme.fontWeight.normal
  },
  variants: {
    fontSize: selected => {
      const size = selected || _theme.theme.fontSize.normal;
      if (isNaN(Number(size))) {
        // throw new Error('Invalid fontSize value');
      }
      return {
        fontSize: Number(size)
      };
    },
    fontWeight: selected => {
      const weight = selected || _theme.theme.fontWeight.normal;
      if (isNaN(Number(weight))) {
        // throw new Error('Invalid fontWeight value');
      }
      return {
        fontWeight: weight
      };
    },
    color: selected => {
      const colorValue = selected || _theme.theme.colors.gray[800];
      return {
        color: colorValue
      };
    },
    textAlign: selected => {
      const align = selected || 'left';
      const validAlignments = ['auto', 'left', 'right', 'center', 'justify'];
      if (!validAlignments.includes(align)) {
        // throw new Error('Invalid textAlign value');
      }
      return {
        textAlign: align
      };
    },
    fontFamily: selected => {
      if (!selected) return {};
      return {
        fontFamily: selected
      };
    },
    link: {
      true: {
        color: _theme.theme.colors.blue[800],
        textDecorationLine: 'underline'
      }
    }
  }
});
//# sourceMappingURL=index.js.map