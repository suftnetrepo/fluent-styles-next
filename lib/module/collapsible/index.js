"use strict";

/**
 * @module Collapse
 *
 * ─── Single panel ────────────────────────────────────────────────────────────
 * ```tsx
 * import Collapse from './collapse'
 *
 * <Collapse title="Details" subtitle="Tap to expand" variant="card">
 *   <Text>Content here</Text>
 * </Collapse>
 * ```
 *
 * ─── Group / accordion ───────────────────────────────────────────────────────
 * ```tsx
 * import { CollapseGroup, CollapseItem } from './collapse'
 *
 * <CollapseGroup accordion variant="card">
 *   <CollapseItem itemKey="a" title="Section A">…</CollapseItem>
 *   <CollapseItem itemKey="b" title="Section B">…</CollapseItem>
 * </CollapseGroup>
 * ```
 *
 * ─── Theming ─────────────────────────────────────────────────────────────────
 * Components auto-follow device dark/light mode via `useColorScheme`.
 * Override any token with the `colors` prop:
 * ```tsx
 * <Collapse
 *   title="Custom"
 *   colors={{ background: '#0f172a', titleColor: '#e2e8f0', border: '#1e293b' }}
 * >…</Collapse>
 * ```
 */

export { Collapse } from "./Collapse.js";
export { CollapseGroup, CollapseItem, useCollapseGroup } from "./CollapseGroup.js";
export { COLLAPSE_DARK, COLLAPSE_LIGHT } from "./interface.js";
export { S as CollapseStyles, PADDING, FONT_SIZE } from "./style.js";
//# sourceMappingURL=index.js.map