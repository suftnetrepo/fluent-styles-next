"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animatedStyle = animatedStyle;
exports.getBorderRadius = getBorderRadius;
exports.getPositionStyle = getPositionStyle;
exports.hiddenValue = hiddenValue;
exports.resolveAnimation = resolveAnimation;
exports.visibleValue = visibleValue;
var _reactNative = require("react-native");
// ─── Resolve default animation per position ───────────────────────────────────

function resolveAnimation(animation, position) {
  if (animation) return animation;
  return position === 'center' ? 'scale' : 'slide';
}

// ─── Animated value: "hidden" end-state ───────────────────────────────────────
// For slide: off-screen offset (px).  For fade/scale: target opacity/scale.

function hiddenValue(animation, position) {
  if (animation === 'fade') return 0; // opacity 0
  if (animation === 'scale') return 0.88; // scale 0.88
  if (animation === 'none') return 0;

  // slide — return the off-screen offset in the axis of motion
  const {
    width,
    height
  } = _reactNative.Dimensions.get('window');
  switch (position) {
    case 'top':
      return -height;
    case 'bottom':
      return height;
    case 'left':
      return -width;
    case 'right':
      return width;
    default:
      return 0;
  }
}
function visibleValue(animation) {
  if (animation === 'fade') return 1;
  if (animation === 'scale') return 1;
  return 0; // slide: 0 offset = on-screen
}

// ─── Build animated style from current value ──────────────────────────────────

function animatedStyle(animation, position, value // Animated.Value
) {
  switch (animation) {
    case 'fade':
      return {
        opacity: value
      };
    case 'scale':
      return {
        opacity: value,
        // cross-fade opacity in parallel
        transform: [{
          scale: value
        }]
      };
    case 'slide':
      {
        const isY = position === 'top' || position === 'bottom';
        return {
          transform: [isY ? {
            translateY: value
          } : {
            translateX: value
          }]
        };
      }
    case 'none':
    default:
      return {};
  }
}

// ─── Border radius: round the corners facing the screen interior ──────────────

function getBorderRadius(position, round, radius) {
  if (!round || position === 'center') return {};
  const r = radius;
  switch (position) {
    case 'bottom':
      return {
        borderTopLeftRadius: r,
        borderTopRightRadius: r
      };
    case 'top':
      return {
        borderBottomLeftRadius: r,
        borderBottomRightRadius: r
      };
    case 'left':
      return {
        borderTopRightRadius: r,
        borderBottomRightRadius: r
      };
    case 'right':
      return {
        borderTopLeftRadius: r,
        borderBottomLeftRadius: r
      };
    default:
      return {
        borderRadius: r
      };
  }
}

// ─── Absolute position style for the popup surface ────────────────────────────

function getPositionStyle(position) {
  const fill = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  switch (position) {
    case 'bottom':
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      };
    case 'top':
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
      };
    case 'left':
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0
      };
    case 'right':
      return {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0
      };
    case 'center':
      return {
        ...fill,
        alignItems: 'center',
        justifyContent: 'center'
      };
    default:
      return fill;
  }
}
//# sourceMappingURL=helpers.js.map