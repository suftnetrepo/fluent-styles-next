"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _interface = require("./interface.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Spinner (pure RN, no external deps) ──────────────────────────────────────
const Spinner = ({
  size,
  color
}) => {
  const rotate = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotate, {
      toValue: 1,
      duration: 700,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true
    })).start();
    return () => rotate.stopAnimation();
  }, [rotate]);
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const r = size / 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      borderWidth: Math.max(1.5, size * 0.1),
      borderColor: color,
      borderTopColor: 'transparent',
      transform: [{
        rotate: spin
      }]
    }
  });
};

// ─── Switch ───────────────────────────────────────────────────────────────────

function SwitchInner(props) {
  const {
    value,
    defaultValue,
    activeValue = true,
    inactiveValue = false,
    onChange,
    onPress,
    beforeChange,
    size = 'md',
    customSize,
    activeColor,
    inactiveColor,
    activeLabel,
    inactiveLabel,
    labelStyle,
    style,
    loading = false,
    disabled = false,
    colors: colorOverrides,
    testID
  } = props;

  // ── Resolved colors ────────────────────────────────────────────────────────
  const colors = (0, _react.useMemo)(() => ({
    ..._interface.SWITCH_COLORS_DEFAULT,
    ...colorOverrides,
    ...(activeColor ? {
      activeTrack: activeColor
    } : {}),
    ...(inactiveColor ? {
      inactiveTrack: inactiveColor
    } : {})
  }), [colorOverrides, activeColor, inactiveColor]);

  // ── Resolved dimensions ────────────────────────────────────────────────────
  const dims = (0, _react.useMemo)(() => {
    const preset = _interface.SWITCH_SIZES[size];
    if (customSize) {
      const ratio = customSize / _interface.SWITCH_SIZES.md.trackHeight;
      return {
        trackWidth: Math.round(_interface.SWITCH_SIZES.md.trackWidth * ratio),
        trackHeight: customSize,
        thumbSize: Math.round(_interface.SWITCH_SIZES.md.thumbSize * ratio),
        fontSize: Math.round(_interface.SWITCH_SIZES.md.fontSize * ratio),
        thumbInset: Math.max(2, Math.round(_interface.SWITCH_SIZES.md.thumbInset * ratio))
      };
    }
    return preset;
  }, [size, customSize]);

  // ── Controlled / uncontrolled state ───────────────────────────────────────
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = (0, _react.useState)(defaultValue ?? inactiveValue);
  const currentValue = isControlled ? value : localValue;
  const isOn = currentValue === activeValue;

  // Stable ref so callbacks always read latest
  const isOnRef = (0, _react.useRef)(isOn);
  isOnRef.current = isOn;

  // ── Pending state (while beforeChange Promise resolves) ───────────────────
  const [pending, setPending] = (0, _react.useState)(false);
  const isBlocked = loading || disabled || pending;

  // ── Animations ────────────────────────────────────────────────────────────
  const THUMB_OFF = dims.thumbInset;
  const THUMB_ON = dims.trackWidth - dims.thumbSize - dims.thumbInset;
  const thumbAnim = (0, _react.useRef)(new _reactNative.Animated.Value(isOn ? THUMB_ON : THUMB_OFF)).current;
  const trackAnim = (0, _react.useRef)(new _reactNative.Animated.Value(isOn ? 1 : 0)).current;
  const scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const runAnimation = (0, _react.useCallback)(toOn => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(thumbAnim, {
      toValue: toOn ? THUMB_ON : THUMB_OFF,
      useNativeDriver: true,
      damping: 18,
      stiffness: 260,
      mass: 0.8
    }), _reactNative.Animated.timing(trackAnim, {
      toValue: toOn ? 1 : 0,
      duration: 220,
      easing: _reactNative.Easing.out(_reactNative.Easing.quad),
      useNativeDriver: false // background colour can't use native driver
    })]).start();
  }, [thumbAnim, trackAnim, THUMB_ON, THUMB_OFF]);

  // Sync animation when controlled value changes
  (0, _react.useEffect)(() => {
    runAnimation(isOn);
  }, [isOn, runAnimation]);

  // ── Press + micro-bounce on thumb ─────────────────────────────────────────
  const handlePress = (0, _react.useCallback)(async () => {
    onPress?.();
    if (isBlocked) return;
    const nextValue = isOnRef.current ? inactiveValue : activeValue;

    // Thumb squeeze on press-in
    _reactNative.Animated.sequence([_reactNative.Animated.timing(scaleAnim, {
      toValue: 0.88,
      duration: 80,
      useNativeDriver: true
    }), _reactNative.Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 14,
      stiffness: 300
    })]).start();
    if (beforeChange) {
      setPending(true);
      try {
        const allowed = await beforeChange(nextValue);
        if (!allowed) return;
      } finally {
        setPending(false);
      }
    }
    if (!isControlled) setLocalValue(nextValue);
    onChange?.(nextValue);
  }, [onPress, isBlocked, inactiveValue, activeValue, scaleAnim, beforeChange, isControlled, onChange]);

  // ── Track background interpolation ────────────────────────────────────────
  const trackBg = trackAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.inactiveTrack, colors.activeTrack]
  });

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelNode = isOn ? activeLabel : inactiveLabel;
  const labelColor = isOn ? colors.activeLabelText : colors.inactiveLabelText;

  // ── Spinner size = 55% of thumb ───────────────────────────────────────────
  const spinnerSize = Math.round(dims.thumbSize * 0.55);

  // ─────────────────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
    onPress: handlePress,
    disabled: isBlocked,
    accessibilityRole: "switch",
    accessibilityState: {
      checked: isOn,
      disabled: isBlocked,
      busy: loading
    },
    testID: testID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.root, disabled && styles.disabled, style],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [styles.track, {
          width: dims.trackWidth,
          height: dims.trackHeight,
          borderRadius: dims.trackHeight / 2,
          backgroundColor: trackBg,
          borderWidth: isOn ? 0 : _reactNative.StyleSheet.hairlineWidth,
          borderColor: colors.inactiveBorder
        }],
        children: labelNode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.label_wrap, isOn ? {
            left: dims.thumbInset + 2,
            right: dims.thumbSize + dims.thumbInset
          } : {
            left: dims.thumbSize + dims.thumbInset,
            right: dims.thumbInset + 2
          }],
          children: typeof labelNode === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.label_text, {
              fontSize: dims.fontSize,
              color: labelColor
            }, labelStyle],
            numberOfLines: 1,
            children: labelNode
          }) : labelNode
        }) : null
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [styles.thumb, {
          width: dims.thumbSize,
          height: dims.thumbSize,
          borderRadius: dims.thumbSize / 2,
          top: dims.thumbInset,
          backgroundColor: colors.thumb,
          shadowColor: colors.thumbShadow,
          transform: [{
            translateX: thumbAnim
          }, {
            scale: scaleAnim
          }]
        }],
        children: (loading || pending) && /*#__PURE__*/(0, _jsxRuntime.jsx)(Spinner, {
          size: spinnerSize,
          color: isOn ? colors.activeTrack : colors.loadingColor
        })
      })]
    })
  });
}

// memo + cast to preserve generics through memo wrapper
const Switch = exports.Switch = /*#__PURE__*/(0, _react.memo)(SwitchInner);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = _reactNative.StyleSheet.create({
  root: {
    position: 'relative',
    alignSelf: 'flex-start'
  },
  disabled: {
    opacity: 0.45
  },
  track: {
    overflow: 'hidden',
    justifyContent: 'center'
  },
  label_wrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  label_text: {
    fontWeight: '600',
    textAlign: 'center'
  },
  thumb: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow (iOS)
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    // Elevation (Android)
    elevation: 3
  }
});
//# sourceMappingURL=Switch.js.map