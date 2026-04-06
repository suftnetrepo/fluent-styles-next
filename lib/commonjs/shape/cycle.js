"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCycle = exports.CycleBase = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Cycle component - Circular container with size variants
 * 
 * A specialized layout component that creates circular containers
 * with predefined size variants. Uses borderRadius: 50% to create perfect circles.
 * 
 * Size variants (width & height):
 * - sm: 32px (small circles, icons)
 * - md: 48px (medium circles, avatars)
 * - lg: 64px (large circles, featured items)
 * - xl: 80px (extra large circles, hero sections)
 */

/**
 * Size definitions for cycle component
 * Maps size variants to width/height values
 */
const sizes = {
  sm: {
    width: 32,
    height: 32
  },
  md: {
    width: 48,
    height: 48
  },
  lg: {
    width: 64,
    height: 64
  },
  xl: {
    width: 80,
    height: 80
  }
};

/**
 * Base Cycle component with size variants
 * Circular container with centered content
 * Default size: md (48px)
 */
const CycleBase = exports.CycleBase = (0, _styled.styled)(_reactNative.View, {
  base: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: _theme.theme.colors.gray[200],
    backgroundColor: _theme.theme.colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48
  },
  variants: {
    size: {
      sm: sizes.sm,
      md: sizes.md,
      lg: sizes.lg,
      xl: sizes.xl
    }
  }
});
/**
 * Wrapper component for Cycle with size variants
 * 
 * @example
 * // Small cycle with icon
 * <StyledCycle size="sm">
 *   <Icon name="star" />
 * </StyledCycle>
 * 
 * @example
 * // Medium cycle (default) with avatar
 * <StyledCycle>
 *   <Avatar uri={image} />
 * </StyledCycle>
 * 
 * @example
 * // Large cycle with custom styling
 * <StyledCycle 
 *   size="lg" 
 *   backgroundColor={theme.colors.primary[500]}
 *   borderColor={theme.colors.primary[600]}
 * >
 *   <Text fontSize={20} fontWeight="bold">C</Text>
 * </StyledCycle>
 * 
 * @example
 * // Extra large cycle with gradient background
 * <StyledCycle size="xl">
 *   <LinearGradient colors={['#FF6B6B', '#FFD93D']}>
 *     <Text color="white">Logo</Text>
 *   </LinearGradient>
 * </StyledCycle>
 */
const StyledCycle = exports.StyledCycle = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...rest
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(CycleBase, {
  ref: ref,
  ...rest,
  children: children
}));
StyledCycle.displayName = 'StyledCycle';
//# sourceMappingURL=cycle.js.map