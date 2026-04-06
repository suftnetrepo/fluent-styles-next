"use strict";

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

export const POPUP_COLORS_LIGHT = {
  background: '#ffffff',
  overlay: 'rgba(0,0,0,0.5)',
  handle: '#d4d4d8',
  headerTitle: '#18181b',
  headerSubtitle: '#71717a',
  headerBorder: '#f4f4f5',
  closeIcon: '#71717a',
  closeIconBg: '#f4f4f5'
};
export const POPUP_COLORS_DARK = {
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
//# sourceMappingURL=interface.js.map