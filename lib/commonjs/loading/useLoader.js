"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoader = useLoader;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("../portal/PortalContext.js");
var _index = require("./index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative loader hook.
 * Requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const loader = useLoader()
 *
 * // Manual control
 * const id = loader.show({ label: 'Saving…', variant: 'spinner' })
 * await saveData()
 * loader.hide(id)
 *
 * // Automatic via wrap()
 * const result = await loader.wrap(() => fetchData(), { label: 'Loading…' })
 * ```
 */
function useLoader() {
  const {
    mount,
    unmount
  } = (0, _PortalContext.usePortal)();

  // Tracks the last shown loader id so callers who didn't store the id can
  // still call hide() without arguments in simple single-loader flows.
  const lastIdRef = (0, _react.useRef)(null);
  const show = (0, _react.useCallback)((options = {}) => {
    // Loader has no onDismiss callback, so no idBox dance needed here.
    const id = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Loader, {
      ...options,
      overlay: options.overlay ?? true
    }), {
      position: 'center'
    });
    lastIdRef.current = id;
    return id;
  }, [mount]);
  const hide = (0, _react.useCallback)(id => {
    unmount(id);
    if (lastIdRef.current === id) lastIdRef.current = null;
  }, [unmount]);
  return {
    show,
    hide
  };
}
//# sourceMappingURL=useLoader.js.map