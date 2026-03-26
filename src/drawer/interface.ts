import type { PropsWithChildren, ReactNode } from 'react'
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
  ViewProps,
} from 'react-native'

// ─── Position ─────────────────────────────────────────────────────────────────

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

// ─── Animation style ──────────────────────────────────────────────────────────

/**
 * Controls how the popup enters/exits.
 * - `'slide'`  — slides in from the edge (default for side positions)
 * - `'fade'`   — opacity only
 * - `'scale'`  — scale from center (good for center position)
 * - `'none'`   — instant, no animation
 */
export type PopupAnimation = 'slide' | 'fade' | 'scale' | 'none'

// ─── Color tokens ─────────────────────────────────────────────────────────────

export type PopupColors = {
  /** Popup surface background. */
  background:      string
  /** Semi-transparent overlay behind the popup. */
  overlay:         string
  /** Handle pill (bottom sheet). */
  handle:          string
  /** Header title text. */
  headerTitle:     string
  /** Header subtitle text. */
  headerSubtitle:  string
  /** Header border / divider. */
  headerBorder:    string
  /** Close button icon colour. */
  closeIcon:       string
  /** Close button background. */
  closeIconBg:     string
}

export const POPUP_COLORS_LIGHT: PopupColors = {
  background:     '#ffffff',
  overlay:        'rgba(0,0,0,0.5)',
  handle:         '#d4d4d8',
  headerTitle:    '#18181b',
  headerSubtitle: '#71717a',
  headerBorder:   '#f4f4f5',
  closeIcon:      '#71717a',
  closeIconBg:    '#f4f4f5',
}

export const POPUP_COLORS_DARK: PopupColors = {
  background:     '#1c1c1e',
  overlay:        'rgba(0,0,0,0.7)',
  handle:         '#3f3f46',
  headerTitle:    '#f4f4f5',
  headerSubtitle: '#a1a1aa',
  headerBorder:   '#27272a',
  closeIcon:      '#a1a1aa',
  closeIconBg:    '#27272a',
}

// ─── Common lifecycle callbacks ────────────────────────────────────────────────

export type PopupLifecycle = {
  /** Fires immediately when visibility changes to true. */
  onOpen?:   () => void
  /** Fires after the open animation completes. */
  onOpened?: () => void
  /** Fires immediately when visibility changes to false. */
  onClose?:  () => void
  /** Fires after the close animation completes. */
  onClosed?: () => void
}

// ─── Popup props ──────────────────────────────────────────────────────────────

export interface PopupProps extends PropsWithChildren<{}>, PopupLifecycle {

  // ── Visibility ────────────────────────────────────────────────────────────

  /** Whether the popup is visible. */
  visible: boolean

  // ── Overlay ───────────────────────────────────────────────────────────────

  /** Show a backdrop overlay. @default true */
  overlay?: boolean
  /** Custom overlay colour. Falls back to `colors.overlay`. */
  overlayColor?: ColorValue
  /** Close the popup when the overlay is pressed. @default true */
  closeOnPressOverlay?: boolean
  /** Called when the overlay is pressed. */
  onPressOverlay?: () => void

  // ── Position & animation ──────────────────────────────────────────────────

  /** Where the popup enters from. @default 'bottom' */
  position?: PopupPosition

  /**
   * Animation style.
   * Defaults: `slide` for side positions, `scale` for center.
   */
  animation?: PopupAnimation

  /** Animation duration in ms. @default 280 */
  duration?: number

  /**
   * Spring physics for slide/scale animations.
   * When set, overrides `duration` for the open animation.
   */
  spring?: {
    damping:   number
    stiffness: number
    mass?:     number
  }

  // ── Shape ─────────────────────────────────────────────────────────────────

  /** Round the corners facing the interior of the screen. @default true */
  round?: boolean

  /** Border radius value when `round` is true. @default 20 */
  roundRadius?: number

  // ── Safe area ─────────────────────────────────────────────────────────────

  /** Add padding for the bottom safe area (notch / home bar). @default false */
  safeAreaBottom?: boolean
  /** Add padding for the top safe area (status bar). @default false */
  safeAreaTop?: boolean

  // ── Render strategy ───────────────────────────────────────────────────────

  /** Only mount children after the first open. @default true */
  lazyRender?: boolean
  /** Unmount children when closed (resets to lazy state). @default false */
  destroyOnClose?: boolean

  // ── Header ────────────────────────────────────────────────────────────────

  /** Optional header title. Enables the built-in header. */
  title?: ReactNode
  /** Optional subtitle rendered below the title. */
  subtitle?: ReactNode
  /** Show a drag handle pill above the header. @default true for bottom */
  showHandle?: boolean
  /** Show a close (×) button in the header. @default false */
  showClose?: boolean
  /** Called when the close button is pressed. */
  onClose?: () => void

  // ── Style overrides ───────────────────────────────────────────────────────

  style?:         StyleProp<ViewStyle>
  overlayStyle?:  StyleProp<ViewStyle>
  headerStyle?:   StyleProp<ViewStyle>
  titleStyle?:    StyleProp<TextStyle>
  subtitleStyle?: StyleProp<TextStyle>

  // ── Theming ───────────────────────────────────────────────────────────────

  colors?: Partial<PopupColors>

  // ── Android back button ───────────────────────────────────────────────────

  /** Return true to handle the back button (Android). */
  onRequestClose?: () => boolean

  testID?: ViewProps['testID']
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export type DrawerSide = 'left' | 'right'

export type DrawerColors = {
  /** Drawer surface background. */
  background:       string
  /** Semi-transparent backdrop. */
  overlay:          string
  /** Header background (can differ from surface). */
  headerBg:         string
  /** Header title text. */
  headerTitle:      string
  /** Header subtitle text. */
  headerSubtitle:   string
  /** Hairline border below the header. */
  headerBorder:     string
  /** Back/close chevron icon. */
  backIcon:         string
  /** Footer background. */
  footerBg:         string
  /** Footer border. */
  footerBorder:     string
  /** Vertical edge handle strip (drag affordance). */
  edgeHandle:       string
  /** Active nav item background. */
  navActiveItemBg:  string
  /** Active nav item label. */
  navActiveText:    string
  /** Inactive nav item label. */
  navText:          string
  /** Nav section label. */
  navSectionLabel:  string
  /** Separator / divider. */
  separator:        string
}

export const DRAWER_COLORS_LIGHT: DrawerColors = {
  background:      '#ffffff',
  overlay:         'rgba(0,0,0,0.45)',
  headerBg:        '#ffffff',
  headerTitle:     '#18181b',
  headerSubtitle:  '#71717a',
  headerBorder:    '#f4f4f5',
  backIcon:        '#71717a',
  footerBg:        '#fafafa',
  footerBorder:    '#f4f4f5',
  edgeHandle:      '#d4d4d8',
  navActiveItemBg: '#eef2ff',
  navActiveText:   '#6366f1',
  navText:         '#3f3f46',
  navSectionLabel: '#a1a1aa',
  separator:       '#f4f4f5',
}

export const DRAWER_COLORS_DARK: DrawerColors = {
  background:      '#18181b',
  overlay:         'rgba(0,0,0,0.65)',
  headerBg:        '#18181b',
  headerTitle:     '#f4f4f5',
  headerSubtitle:  '#a1a1aa',
  headerBorder:    '#27272a',
  backIcon:        '#a1a1aa',
  footerBg:        '#18181b',
  footerBorder:    '#27272a',
  edgeHandle:      '#3f3f46',
  navActiveItemBg: '#1e1b4b',
  navActiveText:   '#818cf8',
  navText:         '#e4e4e7',
  navSectionLabel: '#52525b',
  separator:       '#27272a',
}

// ─── Nav item (for the built-in nav list) ─────────────────────────────────────

export type DrawerNavItem = {
  /** Unique key. */
  key:        string
  /** Display label. */
  label:      string
  /** Optional emoji / icon node shown to the left. */
  icon?:      React.ReactNode
  /** Optional trailing badge count. */
  badge?:     number | string
  /** Section this item belongs to. Items in the same section are grouped. */
  section?:   string
  /** Mark this item as the currently active route. */
  active?:    boolean
  /** Disable interaction. */
  disabled?:  boolean
  onPress?:   () => void
}

export interface DrawerProps extends PopupLifecycle {

  // ── Visibility ────────────────────────────────────────────────────────────

  visible:  boolean

  // ── Side ─────────────────────────────────────────────────────────────────

  /** Which edge the drawer slides from. @default 'left' */
  side?:    DrawerSide

  // ── Dimensions ───────────────────────────────────────────────────────────

  /**
   * Drawer width.
   * - number  → fixed pixels
   * - string  → percentage of screen width (e.g. `'80%'`)
   * @default '78%'
   */
  width?:   number | string

  // ── Overlay ───────────────────────────────────────────────────────────────

  /** Show a backdrop behind the drawer. @default true */
  overlay?:             boolean
  /** Custom overlay colour. Falls back to `colors.overlay`. */
  overlayColor?:        string
  /** Close when the user taps the overlay. @default true */
  closeOnPressOverlay?: boolean
  onPressOverlay?:      () => void

  // ── Animation ────────────────────────────────────────────────────────────

  /** Animation duration in ms. @default 300 */
  duration?: number
  /** Spring physics — overrides `duration` for the open stroke. */
  spring?:   { damping: number; stiffness: number; mass?: number }

  // ── Pan gesture (swipe to close) ─────────────────────────────────────────

  /**
   * Enable swipe-to-close gesture.
   * User swipes toward the originating edge to dismiss. @default true
   */
  swipeToClose?:         boolean
  /**
   * How far (px) from the leading edge the gesture must start to be captured.
   * Only applies when `swipeToClose=true`. @default 40
   */
  swipeEdgeWidth?:       number
  /**
   * Fraction of drawer width that counts as "enough" to dismiss
   * when the user lifts their finger. @default 0.4
   */
  swipeThreshold?:       number

  // ── Header ────────────────────────────────────────────────────────────────

  /** Drawer title. Renders the built-in header. */
  title?:              React.ReactNode
  /** Secondary line below the title. */
  subtitle?:           React.ReactNode
  /** Show a back / close chevron button. @default true when title is set */
  showBack?:           boolean
  /** Custom content for the header right slot. */
  headerRight?:        React.ReactNode
  onClose?:            () => void

  // ── Built-in nav list ─────────────────────────────────────────────────────

  /**
   * When supplied, renders a styled navigation list above `children`.
   * Sections are auto-grouped by the `section` field on each item.
   */
  navItems?:           DrawerNavItem[]

  // ── Footer ────────────────────────────────────────────────────────────────

  /** Pinned content at the bottom of the drawer (profile row, logout, etc.). */
  footer?:             React.ReactNode

  // ── Safe area ─────────────────────────────────────────────────────────────

  /** Respect top safe area (status bar). @default true */
  safeAreaTop?:        boolean
  /** Respect bottom safe area (home bar). @default true */
  safeAreaBottom?:     boolean

  // ── Render strategy ───────────────────────────────────────────────────────

  /** Mount children only after first open. @default true */
  lazyRender?:         boolean
  /** Unmount children when closed. @default false */
  destroyOnClose?:     boolean

  // ── Body ─────────────────────────────────────────────────────────────────

  children?:           React.ReactNode

  // ── Style overrides ───────────────────────────────────────────────────────

  style?:              StyleProp<ViewStyle>
  headerStyle?:        StyleProp<ViewStyle>
  titleStyle?:         StyleProp<TextStyle>
  subtitleStyle?:      StyleProp<TextStyle>
  footerStyle?:        StyleProp<ViewStyle>
  bodyStyle?:          StyleProp<ViewStyle>
  overlayStyle?:       StyleProp<ViewStyle>

  // ── Theming ───────────────────────────────────────────────────────────────

  colors?:             Partial<DrawerColors>

  // ── Android back ─────────────────────────────────────────────────────────

  onRequestClose?:     () => boolean

  testID?:             string
}
