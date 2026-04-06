"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalManager = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("./PortalContext.js");
var _PortalRenderer = require("./PortalRenderer.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Provides the **declarative** portal API to its React subtree via context.
 *
 * Place `PortalManager` at (or near) the root of your component tree so that
 * any descendant can call `usePortal()` to imperatively mount floating UI.
 *
 * ### When to use `PortalManager` vs `GlobalPortalProvider`
 * | Scenario | Recommended provider |
 * |---|---|
 * | React-component consumers using `usePortal()` | `PortalManager` |
 * | Non-React code / navigation handlers | `GlobalPortalProvider` |
 * | Both | Wrap with `GlobalPortalProvider`; it re-exports the hook too |
 *
 * @example
 * ```tsx
 * // App root
 * export default function App() {
 *   return (
 *     <PortalManager>
 *       <Navigation />
 *     </PortalManager>
 *   )
 * }
 *
 * // Somewhere deep in the tree
 * function MyScreen() {
 *   const { mount, unmount } = usePortal()
 *   const idRef = useRef<number>()
 *
 *   const open = () => {
 *     idRef.current = mount(<Modal />, { backdrop: true })
 *   }
 *   const close = () => idRef.current && unmount(idRef.current)
 *
 *   return <Button onPress={open} title="Open" />
 * }
 * ```
 */

let _nextId = 0;
const PortalManager = ({
  children
}) => {
  const [portals, setPortals] = (0, _react.useState)([]);
  const mount = (0, _react.useCallback)((node, options = {}) => {
    const id = _nextId++;
    setPortals(prev => [...prev, {
      id,
      children: node,
      options
    }]);
    return id;
  }, []);
  const update = (0, _react.useCallback)((id, node, options) => {
    setPortals(prev => prev.map(portal => portal.id === id ? {
      ...portal,
      children: node,
      options: options ?? portal.options
    } : portal));
  }, []);
  const unmount = (0, _react.useCallback)(id => {
    setPortals(prev => prev.filter(portal => portal.id !== id));
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_PortalContext.PortalContext.Provider, {
    value: {
      mount,
      update,
      unmount
    },
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_PortalRenderer.PortalRenderer, {
      portals: portals
    })]
  });
};
exports.PortalManager = PortalManager;
//# sourceMappingURL=PortalManager.js.map