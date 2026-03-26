import type React from 'react'
import type { ColorValue, StyleProp, ViewStyle } from 'react-native'

// ─── Value types ──────────────────────────────────────────────────────────────

export type TabValue = number | string

// ─── Tab item ─────────────────────────────────────────────────────────────────

export type TabItem<T extends TabValue> = {
  /** Unique identifier for this tab. */
  value: T
  /** Display label. */
  label: string
  /**
   * Badge rendered beside the label.
   * - number → shown as-is
   * - string → shown as-is (pass '' to show a dot badge)
   */
  badge?: number | string
  /**
   * Renders an icon above (or instead of) the label.
   * Receives the resolved icon colour and the active state.
   */
  iconRender?: (color: ColorValue, isActive: boolean) => React.ReactElement
  /** Disable this specific tab. */
  disabled?: boolean
}

// ─── Indicator style ──────────────────────────────────────────────────────────

export type IndicatorStyle = 'line' | 'pill' | 'dot'

// ─── Tab bar variant ─────────────────────────────────────────────────────────

export type TabBarVariant =
  | 'default'   // plain text tabs, no bottom bar elevation
  | 'underline' // hairline bottom border on the bar
  | 'card'      // each tab is a card chip
  | 'solid'     // active tab has filled background

// ─── Color tokens ─────────────────────────────────────────────────────────────

export type TabBarColors = {
  /** Bar background. */
  background:       string
  /** Inactive tab label + icon. */
  text:             string
  /** Active tab label + icon. */
  activeText:       string
  /** Underline / pill / dot indicator. */
  indicator:        string
  /** Badge text. */
  badge:            string
  /** Bar bottom border (underline variant). */
  border:           string
  /** Active chip background (solid/card variant). */
  activeChipBg:     string
  /** Active chip text (solid/card variant). */
  activeChipText:   string
  /** Disabled tab. */
  disabled:         string
}

export const TAB_BAR_COLORS_LIGHT: TabBarColors = {
  background:     '#ffffff',
  text:           '#71717a',
  activeText:     '#6366f1',
  indicator:      '#6366f1',
  badge:          '#ef4444',
  border:         '#e4e4e7',
  activeChipBg:   '#eef2ff',
  activeChipText: '#6366f1',
  disabled:       '#d4d4d8',
}

export const TAB_BAR_COLORS_DARK: TabBarColors = {
  background:     '#18181b',
  text:           '#71717a',
  activeText:     '#818cf8',
  indicator:      '#818cf8',
  badge:          '#ef4444',
  border:         '#27272a',
  activeChipBg:   '#1e1b4b',
  activeChipText: '#818cf8',
  disabled:       '#3f3f46',
}

// ─── Tab bar props ────────────────────────────────────────────────────────────

export interface TabBarProps<T extends TabValue> {

  // ── Data ──────────────────────────────────────────────────────────────────

  /** Tab options. Memoize this array to avoid spurious re-renders. */
  options: TabItem<T>[]

  // ── State ─────────────────────────────────────────────────────────────────

  /** Controlled active value. */
  value?: T
  /** Uncontrolled initial value. Defaults to options[0].value. */
  defaultValue?: T
  /** Called when the active tab changes. */
  onChange?: (value: T) => void

  // ── Indicator ─────────────────────────────────────────────────────────────

  /**
   * Indicator style shown on the active tab.
   * - `'line'` — animated bottom line (classic underline)
   * - `'pill'` — animated pill that slides behind the active tab
   * - `'dot'`  — small dot below the label
   * - `false`  — no indicator (default)
   */
  indicator?: false | IndicatorStyle

  /**
   * Explicit indicator width in px.
   * - Omit → matches label text width (line) or tab width (pill).
   * - `0`  → stretches to tab width.
   */
  indicatorWidth?: number

  /**
   * Indicator height in px.
   * - line default: 3
   * - pill: auto (covers whole tab)
   * - dot: 6
   */
  indicatorHeight?: number

  /** Indicator colour override. Falls back to `colors.indicator`. */
  indicatorColor?: ColorValue

  /** Border radius of the indicator shape. */
  indicatorRadius?: number

  // ── Layout ────────────────────────────────────────────────────────────────

  /**
   * - `'center'` — tabs divide the bar equally (no scroll).
   * - `'scroll'` — tabs are natural width; bar scrolls horizontally.
   */
  tabAlign?: 'center' | 'scroll'

  /**
   * Fixed height for the bar.
   * Defaults: 48 with icons, 44 with indicator, 40 plain.
   */
  height?: number

  // ── Appearance ────────────────────────────────────────────────────────────

  /**
   * Visual style preset.
   * @default 'default'
   */
  variant?: TabBarVariant

  /** Scale factor for the active label (pop / bulge effect). @default 1 */
  labelBulge?: number | boolean

  /** Show a persistent bottom border on the bar. @default false */
  showBorder?: boolean

  /** Padding inside each tab. @default 12 */
  tabPaddingHorizontal?: number

  /** Gap between icon and label. @default 4 */
  iconLabelGap?: number

  /** Font size for tab labels. @default 14 */
  fontSize?: number

  /** Font size for labels when tabs also have icons. @default 11 */
  iconFontSize?: number

  // ── Theming ───────────────────────────────────────────────────────────────

  /** Explicit text/icon colour for inactive tabs. */
  textColor?: ColorValue
  /** Explicit text/icon colour for active tab. */
  activeTextColor?: ColorValue

  /** Fine-grained colour token overrides. */
  colors?: Partial<TabBarColors>

  // ── Style overrides ───────────────────────────────────────────────────────

  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>

  testID?: string
}
