"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YStack = exports.XStack = exports.Stack = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
/**
 * Stack-specific layout variants for flex direction
 * Supports dual-level customization:
 * - Variant level: horizontal={[true, { gap: 10 }]}
 * - Component level: horizontal={true} gap={15}
 */

/**
 * Base Stack component - flexible layout container
 * Default: neutral layout (no flex direction preset)
 * Use horizontal or vertical variants to set flex direction
 */
const Stack = exports.Stack = (0, _styled.styled)(_reactNative.View, {
  base: {
    position: 'relative'
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column'
      },
      false: {}
    },
    horizontal: {
      true: {
        flexDirection: 'row'
      },
      false: {}
    }
  }
});
const XStack = exports.XStack = (0, _styled.styled)(_reactNative.View, {
  base: {
    position: 'relative',
    flexDirection: 'row'
  }
});
const YStack = exports.YStack = (0, _styled.styled)(_reactNative.View, {
  base: {
    position: 'relative',
    flexDirection: 'column'
  }
});
//# sourceMappingURL=index.js.map