"use strict";

import { Dimensions, Platform, StatusBar } from 'react-native';

// ============================================================================
// TYPES
// ============================================================================

// ============================================================================
// STATUS BAR HEIGHT CONSTANTS
// ============================================================================

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_ANDROID_FALLBACK_HEIGHT = 24;
const STATUSBAR_NOTCH_HEIGHT = 44;
const STATUSBAR_DYNAMIC_ISLAND_HEIGHT = 47;

// ============================================================================
// APPLE DEVICE DIMENSIONS
// Normalized sizes: width is always the smaller side, height is the larger side
// ============================================================================

// iPhone X / XS / 11 Pro
const IPHONE_X = {
  width: 375,
  height: 812
};

// iPhone XR / XS Max / 11 / 11 Pro Max
const IPHONE_XR_XS_MAX = {
  width: 414,
  height: 896
};

// iPhone 12 / 12 Pro / 13 / 13 Pro / 14
const IPHONE_12_13_14 = {
  width: 390,
  height: 844
};

// iPhone 12 Pro Max / 13 Pro Max / 14 Plus
const IPHONE_12_PRO_MAX_13_PRO_MAX_14_PLUS = {
  width: 428,
  height: 926
};

// iPhone 14 Pro
const IPHONE_14_PRO = {
  width: 393,
  height: 852
};

// iPhone 14 Pro Max
const IPHONE_14_PRO_MAX = {
  width: 430,
  height: 932
};

// iPhone 15 / 15 Pro
const IPHONE_15_15_PRO = {
  width: 393,
  height: 852
};

// iPhone 15 Plus
const IPHONE_15_PLUS = {
  width: 430,
  height: 932
};

// iPhone 15 Pro Max
const IPHONE_15_PRO_MAX = {
  width: 430,
  height: 932
};

// iPhone 16 / possible same logical size as 15/14 Pro family in RN layouts
const IPHONE_16_FAMILY_SMALL = {
  width: 393,
  height: 852
};
const IPHONE_16_FAMILY_LARGE = {
  width: 430,
  height: 932
};

// ============================================================================
// DEVICE GROUPS
// ============================================================================

const NOTCH_DEVICES = [IPHONE_X, IPHONE_XR_XS_MAX, IPHONE_12_13_14, IPHONE_12_PRO_MAX_13_PRO_MAX_14_PLUS, IPHONE_14_PRO, IPHONE_14_PRO_MAX, IPHONE_15_15_PRO, IPHONE_15_PLUS, IPHONE_15_PRO_MAX, IPHONE_16_FAMILY_SMALL, IPHONE_16_FAMILY_LARGE];
const DYNAMIC_ISLAND_DEVICES = [IPHONE_14_PRO, IPHONE_14_PRO_MAX, IPHONE_15_15_PRO, IPHONE_15_PLUS, IPHONE_15_PRO_MAX, IPHONE_16_FAMILY_SMALL, IPHONE_16_FAMILY_LARGE];
const IPHONE_X_FAMILY_DEVICES = [IPHONE_X, IPHONE_XR_XS_MAX];
const IPHONE_12_FAMILY_DEVICES = [IPHONE_12_13_14, IPHONE_12_PRO_MAX_13_PRO_MAX_14_PLUS];

// ============================================================================
// SCREEN HELPERS
// ============================================================================

/**
 * Returns raw screen info from the window dimensions.
 */
export function getScreenInfo() {
  const {
    width,
    height
  } = Dimensions.get('window');
  return {
    width,
    height,
    shortSide: Math.min(width, height),
    longSide: Math.max(width, height),
    isLandscape: width > height,
    isPortrait: height >= width
  };
}

/**
 * Returns normalized device size so comparisons work in both portrait and landscape.
 */
function getNormalizedDeviceSize() {
  const {
    shortSide,
    longSide
  } = getScreenInfo();
  return {
    width: shortSide,
    height: longSide
  };
}

/**
 * Checks whether current device matches the provided size.
 */
function matchesDeviceSize(target) {
  const current = getNormalizedDeviceSize();
  return current.width === target.width && current.height === target.height;
}

/**
 * Checks whether current device matches one of the sizes in a group.
 */
function matchesAnyDeviceSize(group) {
  return group.some(matchesDeviceSize);
}

// ============================================================================
// PLATFORM HELPERS
// ============================================================================

/**
 * Returns true when running on iOS.
 */
export function isIos() {
  return Platform.OS === 'ios';
}

/**
 * Returns true when running on Android.
 */
export function isAndroid() {
  return Platform.OS === 'android';
}

/**
 * Returns true when running on tvOS / Apple TV.
 */
export function isTv() {
  return !!Platform.isTV;
}

/**
 * Returns true when running on an iPad.
 */
export function isPad() {
  return Platform.OS === 'ios' && !!Platform.isPad;
}

/**
 * Returns true when running on a tablet.
 * For iOS it checks iPad.
 * For Android it uses shortest side heuristic.
 */
export function isTablet() {
  if (Platform.OS === 'ios') {
    return !!Platform.isPad;
  }
  if (Platform.OS === 'android') {
    const {
      shortSide
    } = getScreenInfo();
    return shortSide >= 600;
  }
  return false;
}

/**
 * Returns true when running on a phone-sized device.
 */
export function isPhone() {
  return !isTablet() && !isTv();
}

/**
 * Returns true when running on a supported iPhone.
 */
function isSupportedIPhone() {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;
}

// ============================================================================
// SPECIFIC IPHONE MODEL HELPERS
// ============================================================================

/**
 * Check if running on iPhone X / XS / 11 Pro size.
 */
export function isIPhoneX() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_X);
}

/**
 * Check if running on iPhone XR / XS Max / 11 / 11 Pro Max size.
 */
export function isIPhoneXMax() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_XR_XS_MAX);
}

/**
 * Check if running on iPhone 12 / 12 Pro / 13 / 13 Pro / 14 size.
 */
export function isIPhone12() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_12_13_14);
}

/**
 * Check if running on iPhone 12 Pro Max / 13 Pro Max / 14 Plus size.
 */
export function isIPhone12Max() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_12_PRO_MAX_13_PRO_MAX_14_PLUS);
}

/**
 * Check if running on iPhone 14 Pro / 15 / 15 Pro / 16 small family size.
 */
export function isIPhone14ProLike() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_14_PRO);
}

/**
 * Check if running on iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 large family size.
 */
export function isIPhone14ProMaxLike() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_14_PRO_MAX);
}

// ============================================================================
// NOTCH / DYNAMIC ISLAND HELPERS
// ============================================================================

/**
 * Returns true if device is a known iPhone with notch or Dynamic Island.
 */
export function isIPhoneWithMonobrow() {
  return isSupportedIPhone() && matchesAnyDeviceSize(NOTCH_DEVICES);
}

/**
 * Returns true if device is part of iPhone X notch family.
 */
export function isIPhoneXFamily() {
  return isSupportedIPhone() && matchesAnyDeviceSize(IPHONE_X_FAMILY_DEVICES);
}

/**
 * Returns true if device is part of iPhone 12/13/14 notch family.
 */
export function isIPhone12Family() {
  return isSupportedIPhone() && matchesAnyDeviceSize(IPHONE_12_FAMILY_DEVICES);
}

/**
 * Returns true if device is a known Dynamic Island iPhone.
 */
export function hasDynamicIsland() {
  return isSupportedIPhone() && matchesAnyDeviceSize(DYNAMIC_ISLAND_DEVICES);
}

/**
 * Alias for notch-style iPhones including Dynamic Island.
 */
export function hasNotch() {
  return isIPhoneWithMonobrow();
}

// ============================================================================
// EXPO DETECTION
// ============================================================================

/**
 * Get Expo root object if running inside Expo.
 */
function getExpoRoot() {
  return global.Expo || global.__expo || global.__exponent;
}

/**
 * Returns true if running inside Expo.
 */
export function isExpo() {
  return getExpoRoot() !== undefined;
}

// ============================================================================
// STATUS BAR HELPERS
// ============================================================================

/**
 * Returns the iOS status bar height based on known device families.
 */
function getIosStatusBarHeight() {
  if (!isSupportedIPhone()) return 0;
  if (hasDynamicIsland()) {
    return STATUSBAR_DYNAMIC_ISLAND_HEIGHT;
  }
  if (hasNotch()) {
    return STATUSBAR_NOTCH_HEIGHT;
  }
  return STATUSBAR_DEFAULT_HEIGHT;
}

/**
 * Returns the Android status bar height.
 */
function getAndroidStatusBarHeight() {
  return StatusBar.currentHeight ?? STATUSBAR_ANDROID_FALLBACK_HEIGHT;
}

/**
 * Get the status bar height for the current platform.
 *
 * @param options control whether iOS or Android should return 0
 *
 * @example
 * getStatusBarHeight()
 * getStatusBarHeight({ skipIos: false })
 * getStatusBarHeight({ skipAndroid: true, skipIos: false })
 */
export function getStatusBarHeight(options = {}) {
  const {
    skipAndroid = false,
    skipIos = true
  } = options;
  if (Platform.OS === 'ios') {
    return skipIos ? 0 : getIosStatusBarHeight();
  }
  if (Platform.OS === 'android') {
    return skipAndroid ? 0 : getAndroidStatusBarHeight();
  }
  return 0;
}

/**
 * Returns a top inset-like value useful for layouts that need extra spacing.
 */
export function getTopInset(options = {}) {
  return getStatusBarHeight(options);
}

// ============================================================================
// DEBUG / INFO HELPERS
// ============================================================================

/**
 * Returns a readable summary of the current device environment.
 */
export function getDeviceDebugInfo() {
  const screen = getScreenInfo();
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isPad: isPad(),
    isTablet: isTablet(),
    isPhone: isPhone(),
    isTV: isTv(),
    isExpo: isExpo(),
    width: screen.width,
    height: screen.height,
    shortSide: screen.shortSide,
    longSide: screen.longSide,
    isLandscape: screen.isLandscape,
    isPortrait: screen.isPortrait,
    hasNotch: hasNotch(),
    hasDynamicIsland: hasDynamicIsland(),
    statusBarHeight: getStatusBarHeight({
      skipIos: false,
      skipAndroid: false
    })
  };
}
//# sourceMappingURL=statusBar.js.map