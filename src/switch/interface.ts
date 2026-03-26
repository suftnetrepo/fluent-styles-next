import type { ReactNode } from 'react'
import type { ColorValue, StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native'

// ─── Size presets ─────────────────────────────────────────────────────────────

export type SwitchSize = 'sm' | 'md' | 'lg'

export const SWITCH_SIZES: Record<SwitchSize, {
  trackWidth:  number
  trackHeight: number
  thumbSize:   number
  fontSize:    number
  thumbInset:  number  // gap between thumb and track edge
}> = {
  sm: { trackWidth: 40, trackHeight: 22, thumbSize: 16, fontSize: 10, thumbInset: 3 },
  md: { trackWidth: 52, trackHeight: 28, thumbSize: 22, fontSize: 11, thumbInset: 3 },
  lg: { trackWidth: 64, trackHeight: 34, thumbSize: 28, fontSize: 12, thumbInset: 3 },
}

// ─── Color tokens ─────────────────────────────────────────────────────────────

export type SwitchColors = {
  /** Track background when ON. */
  activeTrack:    string
  /** Track background when OFF. */
  inactiveTrack:  string
  /** Track border when OFF (subtle outline). */
  inactiveBorder: string
  /** Thumb (knob) background. */
  thumb:          string
  /** Shadow colour for the thumb. */
  thumbShadow:    string
  /** Label text colour when track is active. */
  activeLabelText:   string
  /** Label text colour when track is inactive. */
  inactiveLabelText: string
  /** Loading spinner colour. */
  loadingColor:   string
}

export const SWITCH_COLORS_DEFAULT: SwitchColors = {
  activeTrack:       '#6366f1',
  inactiveTrack:     '#e4e4e7',
  inactiveBorder:    '#d4d4d8',
  thumb:             '#ffffff',
  thumbShadow:       '#000000',
  activeLabelText:   '#ffffff',
  inactiveLabelText: '#a1a1aa',
  loadingColor:      '#ffffff',
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SwitchProps<ActiveValueT = boolean, InactiveValueT = boolean>
  extends Pick<ViewProps, 'testID'> {

  // ── State ───────────────────────────────────────────────────────────────

  /** Controlled value. */
  value?: ActiveValueT | InactiveValueT
  /** Uncontrolled default. @default inactiveValue */
  defaultValue?: ActiveValueT | InactiveValueT

  /** Value emitted when the switch is ON.  @default true */
  activeValue?: ActiveValueT
  /** Value emitted when the switch is OFF. @default false */
  inactiveValue?: InactiveValueT

  // ── Callbacks ───────────────────────────────────────────────────────────

  /** Called when the switch changes state. */
  onChange?: (v: ActiveValueT | InactiveValueT) => void
  /** Called on every press, before state changes. */
  onPress?: () => void
  /**
   * Guard called before the state changes.
   * Return `false` (or a Promise resolving `false`) to cancel.
   */
  beforeChange?: (
    next: ActiveValueT | InactiveValueT,
  ) => boolean | Promise<boolean>

  // ── Appearance ──────────────────────────────────────────────────────────

  /** Size preset. @default 'md' */
  size?: SwitchSize
  /**
   * Manual pixel size override — sets track height; width and thumb scale
   * proportionally from the `md` preset ratios.
   */
  customSize?: number

  /** Override the ON track colour. */
  activeColor?: ColorValue
  /** Override the OFF track colour. */
  inactiveColor?: ColorValue

  /** Content rendered inside the track when ON (string or ReactNode). */
  activeLabel?: ReactNode
  /** Content rendered inside the track when OFF (string or ReactNode). */
  inactiveLabel?: ReactNode

  /** Style for the track label text (when label is a string). */
  labelStyle?: StyleProp<TextStyle>

  /** Additional style applied to the outer wrapper. */
  style?: StyleProp<ViewStyle>

  // ── State flags ─────────────────────────────────────────────────────────

  /** Show a spinner on the thumb and block interaction. @default false */
  loading?: boolean
  /** Block interaction and dim the component. @default false */
  disabled?: boolean

  // ── Token overrides ──────────────────────────────────────────────────────

  /** Fine-grained colour overrides. */
  colors?: Partial<SwitchColors>
}
