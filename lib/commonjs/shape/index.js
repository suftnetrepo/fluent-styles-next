"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleShape = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
const StyleShape = exports.StyleShape = (0, _styled.styled)(_reactNative.View, {
  base: {
    position: 'relative'
  },
  variants: {
    cycle: {
      true: {
        borderRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
      },
      false: {}
    },
    size: size => {
      const selected = size ?? 0;
      if (isNaN(Number(selected))) {
        throw new Error('Invalid size value');
      }
      return {
        height: Number(selected),
        width: Number(selected)
      };
    }
  }
});
//# sourceMappingURL=index.js.map