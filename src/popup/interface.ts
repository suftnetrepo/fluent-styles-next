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
