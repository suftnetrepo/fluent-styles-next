"use strict";

/**
 * @module TabBar
 *
 * ─── Basic (center-aligned, no indicator) ────────────────────────────────────
 * ```tsx
 * import { TabBar } from './tab-bar'
 *
 * const TABS = [
 *   { value: 'home',    label: 'Home'    },
 *   { value: 'explore', label: 'Explore' },
 *   { value: 'profile', label: 'Profile' },
 * ]
 *
 * <TabBar options={TABS} defaultValue="home" onChange={console.log} />
 * ```
 *
 * ─── With animated underline indicator ───────────────────────────────────────
 * ```tsx
 * <TabBar options={TABS} indicator="line" value={tab} onChange={setTab} />
 * ```
 *
 * ─── Scrollable (many tabs) ──────────────────────────────────────────────────
 * ```tsx
 * <TabBar options={manyTabs} tabAlign="scroll" indicator="line" />
 * ```
 *
 * ─── With icons ──────────────────────────────────────────────────────────────
 * ```tsx
 * const ICON_TABS = [
 *   { value: 'home', label: 'Home', iconRender: (color) => <HomeIcon color={color} /> },
 * ]
 * <TabBar options={ICON_TABS} indicator="dot" />
 * ```
 *
 * ─── Pill indicator ──────────────────────────────────────────────────────────
 * ```tsx
 * <TabBar options={TABS} indicator="pill" variant="solid" />
 * ```
 *
 * ─── Color overrides ─────────────────────────────────────────────────────────
 * ```tsx
 * <TabBar
 *   options={TABS}
 *   indicator="line"
 *   colors={{ activeText: '#22c55e', indicator: '#22c55e' }}
 * />
 * ```
 */

export { TabBar } from "./TabBar.js";
export { TAB_BAR_COLORS_LIGHT, TAB_BAR_COLORS_DARK } from "./interface.js";
//# sourceMappingURL=index.js.map