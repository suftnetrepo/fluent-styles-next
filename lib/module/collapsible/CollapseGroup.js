"use strict";

import React, { createContext, useCallback, useContext, useMemo, useState, memo } from 'react';
import { View } from 'react-native';
import { Collapse } from "./Collapse.js";

// ─── Group Context ────────────────────────────────────────────────────────────
import { jsx as _jsx } from "react/jsx-runtime";
const GroupContext = /*#__PURE__*/createContext(null);

/** Access the parent CollapseGroup context from within a CollapseItem. */
export const useCollapseGroup = () => useContext(GroupContext);

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  const [localKeys, setLocalKeys] = useState(() => normaliseKeys(defaultActiveKey));
  const openKeys = useMemo(() => new Set(isControlled ? normaliseKeys(activeKey) : localKeys), [isControlled, activeKey, localKeys]);
  const toggle = useCallback(key => {
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
  const inherited = useMemo(() => ({
    variant,
    size,
    bodyPadding,
    headerDivider,
    lazyRender,
    square,
    colors
  }), [variant, size, bodyPadding, headerDivider, lazyRender, square, colors]);
  return /*#__PURE__*/_jsx(GroupContext.Provider, {
    value: {
      openKeys,
      toggle,
      inherited
    },
    children: /*#__PURE__*/_jsx(View, {
      style: style,
      children: children
    })
  });
};
export { CollapseGroup };

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
export const CollapseItem = /*#__PURE__*/memo(({
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
  return /*#__PURE__*/_jsx(Collapse
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