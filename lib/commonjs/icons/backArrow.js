"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackArrow = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _createIcon = require("../utiles/createIcon.js");
var _index = require("../shape/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BackArrow = exports.BackArrow = (0, _createIcon.createIcon)(({
  size,
  color,
  strokeWidth
}, props) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyleShape, {
  cycle: true,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    ...props,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M19 12H5",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      fill: "none"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M12 19l-7-7 7-7",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })]
  })
}));
BackArrow.displayName = 'BackArrow';
//# sourceMappingURL=backArrow.js.map