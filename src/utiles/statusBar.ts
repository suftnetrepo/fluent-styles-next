import { Dimensions, Platform, StatusBar } from 'react-native'

// ============================================================================
// CONSTANTS
// ============================================================================

const STATUSBAR_DEFAULT_HEIGHT = 20
const STATUSBAR_X_HEIGHT = 44
const STATUSBAR_IP12_HEIGHT = 47
const STATUSBAR_IP12MAX_HEIGHT = 47

const X_WIDTH = 375
const X_HEIGHT = 812

const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const IP12_WIDTH = 390
const IP12_HEIGHT = 844

const IP12MAX_WIDTH = 428
const IP12MAX_HEIGHT = 926

// ============================================================================
// STATE
// ============================================================================

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window')

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT
let isIPhoneX_v = false
let isIPhoneXMax_v = false
let isIPhone12_v = false
let isIPhone12Max_v = false
let isIPhoneWithMonobrow_v = false

// ============================================================================
// PLATFORM DETECTION
// ============================================================================

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhoneX_v = true
    statusBarHeight = STATUSBAR_X_HEIGHT
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhoneXMax_v = true
    statusBarHeight = STATUSBAR_X_HEIGHT
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhone12_v = true
    statusBarHeight = STATUSBAR_IP12_HEIGHT
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhone12Max_v = true
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT
  }
}

// ============================================================================
// DEVICE DETECTION EXPORTS
// ============================================================================

/**
 * Check if running on iPhone X
 */
export const isIPhoneX = (): boolean => isIPhoneX_v

/**
 * Check if running on iPhone X Max
 */
export const isIPhoneXMax = (): boolean => isIPhoneXMax_v

/**
 * Check if running on iPhone 12
 */
export const isIPhone12 = (): boolean => isIPhone12_v

/**
 * Check if running on iPhone 12 Max
 */
export const isIPhone12Max = (): boolean => isIPhone12Max_v

/**
 * Check if running on iPhone with notch/monobrow
 */
export const isIPhoneWithMonobrow = (): boolean => isIPhoneWithMonobrow_v

// ============================================================================
// ENVIRONMENT DETECTION
// ============================================================================

/**
 * Get Expo root if running in Expo environment
 */
const getExpoRoot = (): any => (global as any).Expo || (global as any).__expo || (global as any).__exponent

/**
 * Check if running in Expo environment
 */
export const isExpo = (): boolean => getExpoRoot() !== undefined

// ============================================================================
// STATUS BAR HEIGHT HELPERS
// ============================================================================

/**
 * Get the status bar height for current platform
 * Handles different iOS models (iPhone X, 12, etc.) and Android
 *
 * @param skipAndroid - Skip adding status bar height on Android
 * @param skipIos - Skip adding status bar height on iOS (default: true)
 * @returns Status bar height in pixels
 *
 * @example
 * ```tsx
 * const height = getStatusBarHeight(false, false)  // Get height for iOS and Android
 * const iosOnly = getStatusBarHeight(true, false)  // Only iOS height
 * ```
 */
export function getStatusBarHeight(
  skipAndroid: boolean = false,
  skipIos: boolean = true
): number {
  return Platform.select({
    ios: skipIos ? 0 : statusBarHeight,
    android: skipAndroid ? 0 : StatusBar.currentHeight || STATUSBAR_DEFAULT_HEIGHT,
    default: 0,
  }) || 0
}
