"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circular = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const STROKE_WIDTH = 2;
const AnimatedCircle = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Circle);
const useSvgLoop = (animatedValue, initValue, config) => {
  (0, _react.useEffect)(() => {
    animatedValue.setValue(initValue);
    const animation = _reactNative.Animated.timing(animatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      easing: _reactNative.Easing.linear,
      useNativeDriver: false
    });
    const loop = _reactNative.Animated.loop(animation);
    loop.start();
    return () => loop.stop();
  }, [animatedValue, initValue, config.duration, config.toValue]);
};
const Circular = ({
  size = 32,
  color = '#888888',
  duration = 800,
  style,
  ...restProps
}) => {
  const animatedRotation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animatedCircle1 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animatedCircle2 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const circle1Props = (0, _react.useMemo)(() => {
    const center = Math.floor(size / 2);
    const radius = Math.floor(center - STROKE_WIDTH / 2);
    return {
      cy: center,
      cx: center,
      r: radius
    };
  }, [size]);
  const circle2Props = (0, _react.useMemo)(() => {
    const center = Math.floor(size / 2);
    const radius = Math.floor(center - STROKE_WIDTH / 2 - center / 2);
    return {
      cy: center,
      cx: center,
      r: radius
    };
  }, [size]);
  const half1Circle = (0, _react.useMemo)(() => circle1Props.r * Math.PI, [circle1Props.r]);
  const half2Circle = (0, _react.useMemo)(() => circle2Props.r * Math.PI, [circle2Props.r]);
  (0, _react.useEffect)(() => {
    animatedRotation.setValue(0);
    const rotation = _reactNative.Animated.loop(_reactNative.Animated.timing(animatedRotation, {
      toValue: 1,
      duration,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true
    }));
    rotation.start();
    return () => rotation.stop();
  }, [animatedRotation, duration]);
  useSvgLoop(animatedCircle1, half1Circle, {
    toValue: -half1Circle * 2,
    duration: duration * 1.5
  });
  useSvgLoop(animatedCircle2, half2Circle, {
    toValue: -half2Circle * 2,
    duration: duration * 2.5
  });
  const iconStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    transform: [{
      rotateZ: animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '270deg']
      })
    }]
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    ...restProps,
    style: [iconStyle, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.Svg, {
      width: "100%",
      height: "100%",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedCircle, {
        ...circle1Props,
        stroke: color,
        strokeWidth: STROKE_WIDTH,
        strokeDasharray: `${half1Circle},${half1Circle * 2}`,
        strokeLinecap: "round",
        strokeDashoffset: animatedCircle1,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedCircle, {
        ...circle2Props,
        stroke: color,
        strokeWidth: STROKE_WIDTH,
        strokeDasharray: `${half2Circle},${half2Circle * 2}`,
        strokeLinecap: "round",
        strokeDashoffset: animatedCircle2,
        fill: "none"
      })]
    })
  });
};
exports.Circular = Circular;
//# sourceMappingURL=circular.js.map