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
export { getBorderRadius, getPositionStyle, resolveAnimation, animatedStyle } from '../popup/helpers';
/**
 * Uncomment the lines above (remove the comment markers) to add Drawer exports.
 * They are commented out here to avoid breaking the existing popup exports
 * before you integrate the file.
 */
export { Drawer } from './Drawer';
export type { DrawerProps, DrawerColors, DrawerSide, DrawerNavItem } from './interface';
export { DRAWER_COLORS_LIGHT, DRAWER_COLORS_DARK } from './interface';
//# sourceMappingURL=index.d.ts.map