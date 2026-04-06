"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollapseGroup = exports.CollapseItem = exports.CollapseGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Collapse = require("./Collapse.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Group Context ────────────────────────────────────────────────────────────

const GroupContext = /*#__PURE__*/(0, _react.createContext)(null);

/** Access the parent CollapseGroup context from within a CollapseItem. */
const useCollapseGroup = () => (0, _react.useContext)(GroupContext);

// ─── Helpers ──────────────────────────────────────────────────────────────────
exports.useCollapseGroup = useCollapseGroup;
function normaliseKeys(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// ─── CollapseGroup ────────────────────────────────────────────────────────────

/**
 * Manages open/close state across multiple `CollapseItem` children.
 *
 * @example
 * ```tsx
 * // Accordion — only one panel open at a time
 * <CollapseGroup accordion defaultActiveKey="a" variant="card">
 *   <CollapseItem itemKey="a" title="Item A">…</CollapseItem>
 *   <CollapseItem itemKey="b" title="Item B">…</CollapseItem>
 * </CollapseGroup>
 *
 * // Multi-open, controlled
 * <CollapseGroup activeKey={openKeys} onChange={setOpenKeys}>
 *   <CollapseItem itemKey="x" title="X">…</CollapseItem>
 *   <CollapseItem itemKey="y" title="Y">…</CollapseItem>
 * </CollapseGroup>
 * ```
 */
const CollapseGroup = ({
  children,
  accordion = false,
  activeKey,
  defaultActiveKey,
  onChange,
  style,
  variant,
  size,
  bodyPadding,
  headerDivider,
  lazyRender,
  square,
  colors
}) => {
  // ── Controlled vs uncontrolled ───────────────────────────────────────────
  const isControlled = activeKey !== undefined;
  const [localKeys, setLocalKeys] = (0, _react.useState)(() => normaliseKeys(defaultActiveKey));
  const openKeys = (0, _react.useMemo)(() => new Set(isControlled ? normaliseKeys(activeKey) : localKeys), [isControlled, activeKey, localKeys]);
  const toggle = (0, _react.useCallback)(key => {
    const next = new Set(openKeys);
    if (accordion) {
      // Accordion: close if already open, otherwise open only this one
      const nextArr = next.has(key) ? [] : [key];
      if (!isControlled) setLocalKeys(nextArr);
      onChange?.(nextArr);
    } else {
      next.has(key) ? next.delete(key) : next.add(key);
      const nextArr = Array.from(next);
      if (!isControlled) setLocalKeys(nextArr);
      onChange?.(nextArr);
    }
  }, [accordion, isControlled, openKeys, onChange]);
  const inherited = (0, _react.useMemo)(() => ({
    variant,
    size,
    bodyPadding,
    headerDivider,
    lazyRender,
    square,
    colors
  }), [variant, size, bodyPadding, headerDivider, lazyRender, square, colors]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GroupContext.Provider, {
    value: {
      openKeys,
      toggle,
      inherited
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: style,
      children: children
    })
  });
};
exports.CollapseGroup = CollapseGroup;
// ─── CollapseItem ─────────────────────────────────────────────────────────────

/**
 * A Collapse panel managed by a parent `CollapseGroup`.
 *
 * @example
 * ```tsx
 * <CollapseItem itemKey="shipping" title="Shipping" subtitle="2–5 days">
 *   <Text>We ship worldwide via FedEx…</Text>
 * </CollapseItem>
 * ```
 */
const CollapseItem = exports.CollapseItem = /*#__PURE__*/(0, _react.memo)(({
  itemKey,
  ...props
}) => {
  const ctx = useCollapseGroup();
  if (!ctx) {
    if (__DEV__) console.warn('[CollapseItem] must be rendered inside <CollapseGroup>.');
    return null;
  }
  const {
    openKeys,
    toggle,
    inherited
  } = ctx;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Collapse.Collapse
  // Group-level defaults — item props override these
  , {
    ...inherited,
    ...props,
    // State wired to the group
    collapse: openKeys.has(itemKey),
    onCollapse: () => toggle(itemKey)
  });
});
//# sourceMappingURL=CollapseGroup.js.map