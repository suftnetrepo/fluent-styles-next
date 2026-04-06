"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PETAL_COUNT = 8;
const PETALS = new Array(PETAL_COUNT).fill(0);
const A_OPACITY = 1 / PETAL_COUNT;
const A_ROTATE = 360 / PETAL_COUNT;
const useLoop = (animatedValue, config) => {
  (0, _react.useEffect)(() => {
    const animation = _reactNative.Animated.timing(animatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      easing: config.easing,
      useNativeDriver: true
    });
    const loop = _reactNative.Animated.loop(animation);
    loop.start();
    return () => loop.stop();
  }, [animatedValue, config.duration, config.toValue, config.easing]);
};
const Spinner = ({
  size = 32,
  color = '#888888',
  duration = 800,
  style,
  ...restProps
}) => {
  const animatedValue = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  useLoop(animatedValue, {
    toValue: 1,
    duration,
    easing: _reactNative.Easing.linear
  });
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    ...restProps,
    style: [styles.icon, {
      width: size,
      height: size,
      transform: [{
        rotateZ: rotate
      }]
    }, style],
    children: PETALS.map((_, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.petal, {
        opacity: A_OPACITY * (i + 1),
        transform: [{
          rotate: `${A_ROTATE * i}deg`
        }]
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.inner, {
          backgroundColor: color
        }]
      })
    }, i))
  });
};
exports.Spinner = Spinner;
const styles = _reactNative.StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  petal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center'
  },
  inner: {
    width: 2,
    height: '30%',
    borderRadius: 1
  }
});
//# sourceMappingURL=spinner.js.map