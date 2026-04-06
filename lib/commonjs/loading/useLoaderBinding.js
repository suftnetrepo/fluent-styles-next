"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoaderBinding = useLoaderBinding;
var _useLoader = require("./useLoader.js");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// adjust path

function useLoaderBinding(loading, options) {
  const loader = (0, _useLoader.useLoader)();
  const loaderIdRef = _react.default.useRef(null);
  (0, _react.useEffect)(() => {
    if (loading) {
      if (loaderIdRef.current == null) {
        loaderIdRef.current = loader.show(options);
      }
    } else {
      if (loaderIdRef.current != null) {
        loader.hide(loaderIdRef.current);
        loaderIdRef.current = null;
      }
    }
    return () => {
      if (!loading && loaderIdRef.current != null) {
        loader.hide(loaderIdRef.current);
        loaderIdRef.current = null;
      }
    };
  }, [loading, loader, options]);
}
//# sourceMappingURL=useLoaderBinding.js.map