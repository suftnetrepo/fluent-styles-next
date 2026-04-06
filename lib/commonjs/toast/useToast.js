"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToast = useToast;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("../portal/PortalContext.js");
var _index = require("./index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative toast hook — requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const toast = useToast()
 *
 * // Convenience shortcuts
 * toast.success('Profile saved')
 * toast.error('Upload failed', 'Max file size is 5 MB')
 *
 * // Full control
 * const id = toast.show({ message: 'Processing…', duration: 0, variant: 'info' })
 * // Later:
 * toast.dismiss(id)
 * ```
 */
function useToast() {
  const {
    mount,
    unmount
  } = (0, _PortalContext.usePortal)();
  // Track all active ids so dismissAll() works
  const activeIds = (0, _react.useRef)(new Set());
  const show = (0, _react.useCallback)(options => {
    let id;
    const handleDismiss = () => {
      unmount(id);
      activeIds.current.delete(id);
    };
    id = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Toast, {
      ...options,
      onDismiss: handleDismiss
    }), {
      position: 'top',
      offset: {
        x: 0,
        y: 56
      }
    });
    activeIds.current.add(id);
    return id;
  }, [mount, unmount]);
  const shortcut = (0, _react.useCallback)(variant => (message, description) => show({
    message,
    description,
    variant
  }), [show]);
  const dismiss = (0, _react.useCallback)(id => {
    unmount(id);
    activeIds.current.delete(id);
  }, [unmount]);
  const dismissAll = (0, _react.useCallback)(() => {
    activeIds.current.forEach(id => unmount(id));
    activeIds.current.clear();
  }, [unmount]);
  return {
    show,
    success: shortcut('success'),
    error: shortcut('error'),
    warning: shortcut('warning'),
    info: shortcut('info'),
    dismiss,
    dismissAll
  };
}
//# sourceMappingURL=useToast.js.map