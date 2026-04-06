"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNotification = useNotification;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("../portal/PortalContext.js");
var _index = require("./index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative notification hook — requires a `PortalManager` ancestor.
 *
 * Notifications slide in from the right edge at the top of the screen and
 * auto-dismiss after `duration` ms (default 5000).
 *
 * @example
 * ```tsx
 * const notification = useNotification()
 *
 * notification.show({
 *   title: 'New message from Alex',
 *   body:  'Hey, are you free this afternoon?',
 *   source: 'Messages',
 *   initials: 'AK',
 *   timestamp: 'now',
 *   actionLabel: 'Reply',
 *   onAction: () => navigation.navigate('Chat'),
 * })
 * ```
 */
function useNotification() {
  const {
    mount,
    unmount
  } = (0, _PortalContext.usePortal)();
  const show = (0, _react.useCallback)(options => {
    let id;
    id = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Notification, {
      ...options,
      onDismiss: () => unmount(id)
    }), {
      position: 'top-right',
      offset: {
        x: 16,
        y: 56
      }
    });
    return id;
  }, [mount, unmount]);
  const dismiss = (0, _react.useCallback)(id => unmount(id), [unmount]);
  return {
    show,
    dismiss
  };
}
//# sourceMappingURL=useNotification.js.map