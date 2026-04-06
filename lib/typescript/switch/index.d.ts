/**
 * @module Switch
 *
 * ─── Basic ───────────────────────────────────────────────────────────────────
 * ```tsx
 * import { Switch } from './switch'
 *
 * // Uncontrolled
 * <Switch defaultValue onChange={v => console.log(v)} />
 *
 * // Controlled
 * <Switch value={isOn} onChange={setIsOn} />
 * ```
 *
 * ─── Sizes ───────────────────────────────────────────────────────────────────
 * ```tsx
 * <Switch size="sm" />
 * <Switch size="md" />   // default
 * <Switch size="lg" />
 * <Switch customSize={40} />  // arbitrary pixel height
 * ```
 *
 * ─── Labels ──────────────────────────────────────────────────────────────────
 * ```tsx
 * <Switch activeLabel="ON" inactiveLabel="OFF" />
 * <Switch activeLabel={<Icon name="check" />} inactiveLabel={<Icon name="x" />} />
 * ```
 *
 * ─── Custom values (non-boolean) ─────────────────────────────────────────────
 * ```tsx
 * <Switch
 *   activeValue="yes"
 *   inactiveValue="no"
 *   defaultValue="no"
 *   onChange={(v: 'yes' | 'no') => console.log(v)}
 * />
 * ```
 *
 * ─── Guard (beforeChange) ────────────────────────────────────────────────────
 * ```tsx
 * <Switch
 *   beforeChange={async next => {
 *     const ok = await confirmDialog()
 *     return ok
 *   }}
 * />
 * ```
 *
 * ─── Colors ──────────────────────────────────────────────────────────────────
 * ```tsx
 * <Switch
 *   colors={{ activeTrack: '#22c55e', thumb: '#fff' }}
 *   // or per-prop shortcuts:
 *   activeColor="#22c55e"
 *   inactiveColor="#f4f4f5"
 * />
 * ```
 */
export { Switch } from './Switch';
export type { SwitchProps, SwitchColors, SwitchSize } from './interface';
export { SWITCH_COLORS_DEFAULT, SWITCH_SIZES } from './interface';
//# sourceMappingURL=index.d.ts.map