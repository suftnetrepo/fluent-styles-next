"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalPortalProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PortalInstance = require("./PortalInstance.js");
var _PortalRenderer = require("./PortalRenderer.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Subscribes to the global `portal` singleton and renders whatever portals
 * it currently holds.
 *
 * ### Usage
 * Wrap your app root (or the root of the navigable area) with this provider.
 * You can then call `portal.show(...)` / `portal.hide(...)` from anywhere —
 * including non-React code such as navigation helpers or async service
 * callbacks.
 *
 * This component deliberately has **no** React context value; it exists purely
 * to drive re-renders when the singleton changes.  If you also need the
 * declarative `usePortal()` hook, use `PortalManager` instead (or nest both).
 *
 * @example
 * ```tsx
 * // App root
 * export default function App() {
 *   return (
 *     <GlobalPortalProvider>
 *       <Navigation />
 *     </GlobalPortalProvider>
 *   )
 * }
 *
 * // Anywhere – including outside React
 * import { portal } from '@/portal'
 *
 * function showNetworkError() {
 *   const id = portal.show(
 *     <ErrorBanner message="No internet connection" />,
 *     { position: 'top', backdrop: false },
 *   )
 *   setTimeout(() => portal.hide(id), 4000)
 * }
 * ```
 */

const GlobalPortalProvider = ({
  children
}) => {
  const [portals, setPortals] = (0, _react.useState)(() => _PortalInstance.portal.getPortals());
  (0, _react.useEffect)(() => {
    // Sync state whenever the singleton changes.
    const unsubscribe = _PortalInstance.portal.subscribe(() => {
      setPortals(_PortalInstance.portal.getPortals());
    });
    return unsubscribe;
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_PortalRenderer.PortalRenderer, {
      portals: portals
    })]
  });
};
exports.GlobalPortalProvider = GlobalPortalProvider;
//# sourceMappingURL=GlobalPortalProvider.js.map