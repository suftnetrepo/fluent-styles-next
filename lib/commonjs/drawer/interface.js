"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POPUP_COLORS_LIGHT = exports.POPUP_COLORS_DARK = exports.DRAWER_COLORS_LIGHT = exports.DRAWER_COLORS_DARK = void 0;
// ─── Position ─────────────────────────────────────────────────────────────────

// ─── Animation style ──────────────────────────────────────────────────────────

/**
 * Controls how the popup enters/exits.
 * - `'slide'`  — slides in from the edge (default for side positions)
 * - `'fade'`   — opacity only
 * - `'scale'`  — scale from center (good for center position)
 * - `'none'`   — instant, no animation
 */

// ─── Color tokens ─────────────────────────────────────────────────────────────

const POPUP_COLORS_LIGHT = exports.POPUP_COLORS_LIGHT = {
  background: '#ffffff',
  overlay: 'rgba(0,0,0,0.5)',
  handle: '#d4d4d8',
  headerTitle: '#18181b',
  headerSubtitle: '#71717a',
  headerBorder: '#f4f4f5',
  closeIcon: '#71717a',
  closeIconBg: '#f4f4f5'
};
const POPUP_COLORS_DARK = exports.POPUP_COLORS_DARK = {
  background: '#1c1c1e',
  overlay: 'rgba(0,0,0,0.7)',
  handle: '#3f3f46',
  headerTitle: '#f4f4f5',
  headerSubtitle: '#a1a1aa',
  headerBorder: '#27272a',
  closeIcon: '#a1a1aa',
  closeIconBg: '#27272a'
};

// ─── Common lifecycle callbacks ────────────────────────────────────────────────

// ─── Popup props ──────────────────────────────────────────────────────────────

// ─── Drawer ───────────────────────────────────────────────────────────────────

const DRAWER_COLORS_LIGHT = exports.DRAWER_COLORS_LIGHT = {
  background: '#ffffff',
  overlay: 'rgba(0,0,0,0.45)',
  headerBg: '#ffffff',
  headerTitle: '#18181b',
  headerSubtitle: '#71717a',
  headerBorder: '#f4f4f5',
  backIcon: '#71717a',
  footerBg: '#fafafa',
  footerBorder: '#f4f4f5',
  edgeHandle: '#d4d4d8',
  navActiveItemBg: '#eef2ff',
  navActiveText: '#6366f1',
  navText: '#3f3f46',
  navSectionLabel: '#a1a1aa',
  separator: '#f4f4f5'
};
const DRAWER_COLORS_DARK = exports.DRAWER_COLORS_DARK = {
  background: '#18181b',
  overlay: 'rgba(0,0,0,0.65)',
  headerBg: '#18181b',
  headerTitle: '#f4f4f5',
  headerSubtitle: '#a1a1aa',
  headerBorder: '#27272a',
  backIcon: '#a1a1aa',
  footerBg: '#18181b',
  footerBorder: '#27272a',
  edgeHandle: '#3f3f46',
  navActiveItemBg: '#1e1b4b',
  navActiveText: '#818cf8',
  navText: '#e4e4e7',
  navSectionLabel: '#52525b',
  separator: '#27272a'
};

// ─── Nav item (for the built-in nav list) ─────────────────────────────────────
//# sourceMappingURL=interface.js.map