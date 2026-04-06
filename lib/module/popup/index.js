"use strict";

/**
 * @module Popup
 *
 * ─── Bottom sheet (default) ──────────────────────────────────────────────────
 * ```tsx
 * import { Popup } from './popup'
 *
 * <Popup visible={open} onClose={() => setOpen(false)} title="Options" showClose>
 *   <Text>Content here</Text>
 * </Popup>
 * ```
 *
 * ─── Positions ───────────────────────────────────────────────────────────────
 * ```tsx
 * <Popup visible={open} position="top"    onClose={close}>…</Popup>
 * <Popup visible={open} position="left"   onClose={close}>…</Popup>
 * <Popup visible={open} position="right"  onClose={close}>…</Popup>
 * <Popup visible={open} position="center" onClose={close}>…</Popup>
 * ```
 *
 * ─── Animation styles ────────────────────────────────────────────────────────
 * ```tsx
 * <Popup animation="slide" />  // default for side positions
 * <Popup animation="scale" />  // default for center
 * <Popup animation="fade"  />
 * <Popup animation="none"  />  // instant
 * ```
 *
 * ─── Spring physics ──────────────────────────────────────────────────────────
 * ```tsx
 * <Popup spring={{ damping: 20, stiffness: 300 }}>…</Popup>
 * ```
 *
 * ─── Color overrides ─────────────────────────────────────────────────────────
 * ```tsx
 * <Popup colors={{ background: '#0f172a', headerTitle: '#f8fafc' }}>…</Popup>
 * ```
 */

export { Popup } from "./Popup.js";
export { POPUP_COLORS_LIGHT, POPUP_COLORS_DARK } from "./interface.js";
export { getBorderRadius, getPositionStyle, resolveAnimation, animatedStyle } from "./helpers.js";
//# sourceMappingURL=index.js.map