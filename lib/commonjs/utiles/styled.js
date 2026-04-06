"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const styled = (Component, {
  base,
  variants
} = {}) => {
  return /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    const styles = {
      ...(base || {})
    };
    const options = props;
    if (variants) {
      Object.keys(variants).forEach(category => {
        const variantSelected = options[category];
        const variantValue = variants[category];
        if (typeof variantValue === "function") {
          const style = variantValue(variantSelected, options);
          if (style) {
            Object.assign(styles, style);
          }
        } else if (variantValue && variantValue[variantSelected]) {
          const value = variantValue[variantSelected];
          Object.assign(styles, typeof value === "function" ? value(variantSelected, options) : value);
        }
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...props,
      style: styles,
      ref: ref
    });
  });
};
exports.styled = styled;
//# sourceMappingURL=styled.js.map