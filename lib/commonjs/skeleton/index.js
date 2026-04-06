"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSkeleton = exports.SkeletonBone = exports.SKELETON_LIGHT = exports.SKELETON_DARK = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledSkeleton
 *
 * An animated loading placeholder with:
 * - 2 animation types: shimmer | pulse
 * - Primitive shapes: rect | circle | text | rounded
 * - Pre-built layout templates: card | list-item | profile | article | grid
 * - Composable: nest <Skeleton.Row> / <Skeleton.Group> for custom layouts
 * - Speed + colour token overrides
 *
 * Rules:
 * - Stack / StyledText — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */

// ─── CompatNode ───────────────────────────────────────────────────────────────

const {
  width: SCREEN_WIDTH
} = _reactNative.Dimensions.get('window');

// ─── Tokens ───────────────────────────────────────────────────────────────────

const LIGHT_COLORS = exports.SKELETON_LIGHT = {
  base: _fluentStyles.theme.colors.gray[100],
  highlight: _fluentStyles.theme.colors.gray[50],
  shimmer: 'rgba(255,255,255,0.65)'
};
const DARK_COLORS = exports.SKELETON_DARK = {
  base: _fluentStyles.theme.colors.gray[700],
  highlight: _fluentStyles.theme.colors.gray[600],
  shimmer: 'rgba(255,255,255,0.06)'
};

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Animation context ────────────────────────────────────────────────────────
const useShimmerAnim = speed => {
  const anim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(anim, {
      toValue: 1,
      duration: speed,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true
    })).start();
    return () => anim.stopAnimation();
  }, [speed]);
  return anim;
};
const usePulseAnim = speed => {
  const anim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(anim, {
      toValue: 0.45,
      duration: speed / 2,
      useNativeDriver: true
    }), _reactNative.Animated.timing(anim, {
      toValue: 1,
      duration: speed / 2,
      useNativeDriver: true
    })])).start();
    return () => anim.stopAnimation();
  }, [speed]);
  return anim;
};

// ─── Single bone ─────────────────────────────────────────────────────────────

const Bone = ({
  width = '100%',
  height = 16,
  shape = 'rect',
  borderRadius: radiusOverride,
  colors,
  animation,
  speed,
  style
}) => {
  const shimmerAnim = useShimmerAnim(speed);
  const pulseAnim = usePulseAnim(speed);
  const br = radiusOverride ?? (shape === 'circle' ? typeof width === 'number' ? width / 2 : 9999 : shape === 'text' ? 4 : shape === 'rounded' ? 10 : 6);
  const resolvedWidth = typeof width === 'string' ? width : width;
  const resolvedHeight = shape === 'circle' && typeof width === 'number' ? width : height;
  if (animation === 'shimmer') {
    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH]
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      width: resolvedWidth,
      height: resolvedHeight,
      borderRadius: br,
      backgroundColor: colors.base,
      overflow: "hidden",
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          transform: [{
            translateX: shimmerTranslate
          }],
          backgroundColor: colors.shimmer,
          // gradient simulation with opacity
          opacity: 0.9
        }
      })
    });
  }
  if (animation === 'pulse') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: {
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: br,
        backgroundColor: colors.base,
        opacity: pulseAnim,
        ...(style ?? {})
      }
    });
  }

  // none
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    width: resolvedWidth,
    height: resolvedHeight,
    borderRadius: br,
    backgroundColor: colors.base,
    style: style
  });
};

// ─── Templates ────────────────────────────────────────────────────────────────
exports.SkeletonBone = Bone;
const CardTemplate = p => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  gap: 12,
  padding: 16,
  borderRadius: 14,
  backgroundColor: _fluentStyles.palettes.white,
  borderWidth: 1,
  borderColor: _fluentStyles.theme.colors.gray[100],
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "100%",
    height: 140,
    shape: "rounded",
    borderRadius: 10
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "70%",
    height: 16,
    shape: "text"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "50%",
    height: 13,
    shape: "text"
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    horizontal: true,
    gap: 8,
    marginTop: 4,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: 32,
      height: 32,
      shape: "circle"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      flex: 1,
      gap: 6,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "60%",
        height: 12,
        shape: "text"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "40%",
        height: 11,
        shape: "text"
      })]
    })]
  })]
});
const ListItemTemplate = p => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  horizontal: true,
  gap: 14,
  alignItems: "center",
  paddingVertical: 12,
  paddingHorizontal: 4,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: 48,
    height: 48,
    shape: "circle"
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    flex: 1,
    gap: 8,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: "65%",
      height: 14,
      shape: "text"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: "45%",
      height: 12,
      shape: "text"
    })]
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: 48,
    height: 12,
    shape: "text"
  })]
});
const ProfileTemplate = p => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  alignItems: "center",
  gap: 14,
  paddingVertical: 24,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: 80,
    height: 80,
    shape: "circle"
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    alignItems: "center",
    gap: 8,
    width: "100%",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: 140,
      height: 18,
      shape: "text"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: 100,
      height: 13,
      shape: "text"
    })]
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    horizontal: true,
    gap: 24,
    justifyContent: "center",
    children: [0, 1, 2].map(i => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      alignItems: "center",
      gap: 6,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: 40,
        height: 18,
        shape: "text"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: 52,
        height: 12,
        shape: "text"
      })]
    }, i))
  })]
});
const ArticleTemplate = p => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  gap: 12,
  paddingVertical: 8,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "100%",
    height: 200,
    shape: "rounded",
    borderRadius: 12
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "30%",
    height: 11,
    shape: "text"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "90%",
    height: 20,
    shape: "text"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...p,
    width: "80%",
    height: 20,
    shape: "text"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    gap: 8,
    marginTop: 4,
    children: [100, 90, 95, 60].map((w, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
      ...p,
      width: `${w}%`,
      height: 13,
      shape: "text"
    }, i))
  })]
});
const GridTemplate = p => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  gap: 12,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    horizontal: true,
    gap: 12,
    children: [0, 1].map(i => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      flex: 1,
      gap: 8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "100%",
        height: 120,
        shape: "rounded",
        borderRadius: 10
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "70%",
        height: 13,
        shape: "text"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "50%",
        height: 12,
        shape: "text"
      })]
    }, i))
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    horizontal: true,
    gap: 12,
    children: [0, 1].map(i => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      flex: 1,
      gap: 8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "100%",
        height: 120,
        shape: "rounded",
        borderRadius: 10
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "80%",
        height: 13,
        shape: "text"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
        ...p,
        width: "55%",
        height: 12,
        shape: "text"
      })]
    }, i))
  })]
});

// ─── Main export ─────────────────────────────────────────────────────────────
const StyledSkeleton = ({
  width,
  height = 16,
  shape = 'rect',
  borderRadius,
  template,
  repeat = 1,
  animation = 'shimmer',
  speed = 1400,
  skeletonTheme = 'light',
  colors: overrides,
  style,
  children
}) => {
  const c = {
    ...(skeletonTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS),
    ...overrides
  };
  const boneProps = {
    colors: c,
    animation,
    speed
  };

  // Template mode
  if (template) {
    const TemplateMap = {
      'card': CardTemplate,
      'list-item': ListItemTemplate,
      'profile': ProfileTemplate,
      'article': ArticleTemplate,
      'grid': GridTemplate
    };
    const Template = TemplateMap[template];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      gap: 14,
      children: Array.from({
        length: repeat
      }).map((_, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Template, {
        ...boneProps
      }, i))
    });
  }

  // Primitive mode
  if (children) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      children: children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Bone, {
    ...boneProps,
    width: width ?? '100%',
    height: height,
    shape: shape,
    borderRadius: borderRadius,
    style: style
  });
};

// ─── Convenience sub-components ──────────────────────────────────────────────
exports.StyledSkeleton = StyledSkeleton;
StyledSkeleton.displayName = 'StyledSkeleton';
var _default = exports.default = StyledSkeleton;
//# sourceMappingURL=index.js.map