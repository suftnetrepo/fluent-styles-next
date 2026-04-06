"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledSwitch = StyledSwitch;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function StyledSwitch({
  initialValue = false,
  onToggle,
  width = 120,
  height = 60
}) {
  const [isOn, setIsOn] = (0, _react.useState)(initialValue);
  const animValue = (0, _react.useRef)(new _reactNative.Animated.Value(initialValue ? 1 : 0)).current;
  const thumbSize = height - 12;
  const travelDistance = width - thumbSize - 12;
  const handlePress = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onToggle?.(newValue);
    _reactNative.Animated.spring(animValue, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: false,
      tension: 60,
      friction: 8
    }).start();
  };

  // Interpolated values
  const thumbTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, travelDistance + 6]
  });
  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E8E8F0', '#E8E8F0'] // track stays the same as in the design
  });
  const thumbColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CCCCDD', '#4F46E5']
  });
  const thumbScale = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1]
  });
  const shadowOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.35]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
    onPress: handlePress,
    accessibilityRole: "switch",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
      style: [styles.track, {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: trackColor
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [_reactNative.StyleSheet.absoluteFillObject, styles.dotPattern, {
          borderRadius: height / 2
        }]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        style: [styles.thumb, {
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          backgroundColor: thumbColor,
          transform: [{
            translateX: thumbTranslate
          }, {
            scale: thumbScale
          }],
          shadowOpacity
        }]
      })]
    })
  });
}
const styles = _reactNative.StyleSheet.create({
  track: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 220, 0.6)',
    // Subtle inner shadow via elevation
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.06,
    shadowRadius: 3
  },
  dotPattern: {
    // Simulated stipple texture via opacity overlay
    backgroundColor: 'rgba(180, 180, 210, 0.08)'
  },
  thumb: {
    position: 'absolute',
    top: undefined,
    // Shadow for the thumb (iOS)
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 8,
    // Android elevation
    elevation: 4
  }
});
//# sourceMappingURL=_index.js.map