import type { PropsWithChildren, ReactNode } from 'react'
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
  ViewProps,
} from 'react-native'

// ─── Shared ───────────────────────────────────────────────────────────────────

export type CollapseSize    = 'sm' | 'md' | 'lg'
export type CollapseVariant = 'cell' | 'card' | 'ghost' | 'bordered'

// ─── Color tokens ─────────────────────────────────────────────────────────────

export type CollapseColors = {
  /** Main sheet/card background. */
  background:        string
  /** Border colour (card + bordered variants). */
  border:            string
  /** Shadow colour (card variant). */
  shadow:            string
  /** Title text. */
  titleColor:        string
  /** Subtitle / secondary text. */
  subtitleColor:     string
  /** Chevron icon. */
  iconColor:         string
  /** Header background tint when `activeHeader` is true and panel is open. */
  activeHeaderBg:    string
  /** Hairline divider colour. */
  divider:           string
  /** Body content text (used when body is plain text). */
  bodyText:          string
}

export const COLLAPSE_LIGHT: CollapseColors = {
  background:     '#ffffff',
  border:         '#e5e5ea',
  shadow:         '#000000',
  titleColor:     '#1c1c1e',
  subtitleColor:  '#8e8e93',
  iconColor:      '#aeaeb2',
  activeHeaderBg: '#f2f2f7',
  divider:        '#e5e5ea',
  bodyText:       '#3a3a3c',
}

export const COLLAPSE_DARK: CollapseColors = {
  background:     '#1c1c1e',
  border:         '#3a3a3c',
  shadow:         '#000000',
  titleColor:     '#f2f2f7',
  subtitleColor:  '#aeaeb2',
  iconColor:      '#636366',
  activeHeaderBg: '#2c2c2e',
  divider:        '#3a3a3c',
  bodyText:       '#aeaeb2',
}

// ─── Single Collapse ──────────────────────────────────────────────────────────

export interface CollapseProps extends PropsWithChildren<{}>, Pick<ViewProps, 'testID'> {

  // ── Header content ──────────────────────────────────────────────────────

  /** Plain string or any ReactNode rendered as the header title. */
  title?:    ReactNode
  /** Secondary line rendered below the title. */
  subtitle?: ReactNode
  /** Left-side slot: icon, avatar, badge, etc. */
  leading?:  ReactNode
  /** Right-side slot rendered beside the chevron. */
  trailing?: ReactNode

  // ── Style overrides ──────────────────────────────────────────────────────

  style?:         StyleProp<ViewStyle>
  headerStyle?:   StyleProp<ViewStyle>
  titleStyle?:    StyleProp<TextStyle>
  subtitleStyle?: StyleProp<TextStyle>
  iconStyle?:     StyleProp<ViewStyle>
  iconColor?:     ColorValue
  iconSize?:      number
  hideIcon?:      boolean
  bodyStyle?:     StyleProp<ViewStyle>

  // ── Custom render fns ────────────────────────────────────────────────────

  /** Fully replaces the header row. Receives current open state. */
  renderHeader?:      (open: boolean) => ReactNode
  /** Replaces the right-hand portion of the header (chevron + trailing). */
  renderHeaderRight?: (open: boolean, chevron: ReactNode) => ReactNode
  /** Replaces `children` as the body content. */
  renderBody?:        () => ReactNode

  // ── State ────────────────────────────────────────────────────────────────

  /** Controlled open state. */
  collapse?:        boolean
  /** Uncontrolled initial open state. */
  defaultCollapse?: boolean
  /** Called when the header is pressed with the new open state. */
  onCollapse?:      (open: boolean) => void
  /** Called when the open/close animation finishes. */
  onAnimationEnd?:  (open: boolean) => void

  // ── Appearance ───────────────────────────────────────────────────────────

  /**
   * Visual style variant.
   * - `cell`     — flat list row, no border/shadow (default)
   * - `card`     — elevated card with rounded corners
   * - `bordered` — outlined box, no elevation
   * - `ghost`    — transparent; bare content only
   */
  variant?: CollapseVariant

  /** Spacing scale for padding. @default 'md' */
  size?: CollapseSize

  /** Add padding inside the body. @default true */
  bodyPadding?: boolean
  /** Show a hairline divider below the header. @default true for cell/bordered */
  headerDivider?: boolean
  /** Show a hairline divider at the bottom of the body. */
  bodyDivider?: boolean
  /** Square corners (card variant). @default false */
  square?: boolean
  /** Tint header background when panel is open. @default false */
  activeHeader?: boolean

  // ── Behaviour ────────────────────────────────────────────────────────────

  /** Only render body children after the first expand. @default true */
  lazyRender?: boolean
  /** Unmount body children when collapsed. @default false */
  destroyOnClose?: boolean
  /** Disable header press interaction. @default false */
  disabled?: boolean

  // ── Theming ──────────────────────────────────────────────────────────────

  /** Animation speed in ms. @default 260 */
  duration?: number
  /** Color token overrides. */
  colors?: Partial<CollapseColors>
}

// ─── Collapse Group ───────────────────────────────────────────────────────────

export interface CollapseGroupProps {
  children: ReactNode

  /** Currently open panel keys (controlled). String or array. */
  activeKey?: string | string[]
  /** Default open keys (uncontrolled). */
  defaultActiveKey?: string | string[]
  /**
   * Called when any panel toggles.
   * Receives the full list of currently-open keys.
   */
  onChange?: (keys: string[]) => void

  /** Only one panel open at a time. @default false */
  accordion?: boolean

  // Forwarded to every CollapseItem
  variant?:       CollapseVariant
  size?:          CollapseSize
  bodyPadding?:   boolean
  headerDivider?: boolean
  lazyRender?:    boolean
  square?:        boolean
  colors?:        Partial<CollapseColors>

  style?: StyleProp<ViewStyle>
}

// ─── Collapse Item (inside CollapseGroup) ─────────────────────────────────────

export interface CollapseItemProps
  extends Omit<CollapseProps, 'collapse' | 'defaultCollapse' | 'onCollapse' | 'variant' | 'size' | 'colors'> {
  /** Unique key used by CollapseGroup to track open state. */
  itemKey: string
}
