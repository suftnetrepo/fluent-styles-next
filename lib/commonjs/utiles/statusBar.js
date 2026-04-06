"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceDebugInfo = getDeviceDebugInfo;
exports.getScreenInfo = getScreenInfo;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTopInset = getTopInset;
exports.hasDynamicIsland = hasDynamicIsland;
exports.hasNotch = hasNotch;
exports.isAndroid = isAndroid;
exports.isExpo = isExpo;
exports.isIPhone12 = isIPhone12;
exports.isIPhone12Family = isIPhone12Family;
exports.isIPhone12Max = isIPhone12Max;
exports.isIPhone14ProLike = isIPhone14ProLike;
exports.isIPhone14ProMaxLike = isIPhone14ProMaxLike;
exports.isIPhoneWithMonobrow = isIPhoneWithMonobrow;
exports.isIPhoneX = isIPhoneX;
exports.isIPhoneXFamily = isIPhoneXFamily;
exports.isIPhoneXMax = isIPhoneXMax;
exports.isIos = isIos;
exports.isPad = isPad;
exports.isPhone = isPhone;
exports.isTablet = isTablet;
exports.isTv = isTv;
var _reactNative = require("react-native");
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
function getScreenInfo() {
  const {
    width,
    height
  } = _reactNative.Dimensions.get('window');
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
function isIos() {
  return _reactNative.Platform.OS === 'ios';
}

/**
 * Returns true when running on Android.
 */
function isAndroid() {
  return _reactNative.Platform.OS === 'android';
}

/**
 * Returns true when running on tvOS / Apple TV.
 */
function isTv() {
  return !!_reactNative.Platform.isTV;
}

/**
 * Returns true when running on an iPad.
 */
function isPad() {
  return _reactNative.Platform.OS === 'ios' && !!_reactNative.Platform.isPad;
}

/**
 * Returns true when running on a tablet.
 * For iOS it checks iPad.
 * For Android it uses shortest side heuristic.
 */
function isTablet() {
  if (_reactNative.Platform.OS === 'ios') {
    return !!_reactNative.Platform.isPad;
  }
  if (_reactNative.Platform.OS === 'android') {
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
function isPhone() {
  return !isTablet() && !isTv();
}

/**
 * Returns true when running on a supported iPhone.
 */
function isSupportedIPhone() {
  return _reactNative.Platform.OS === 'ios' && !_reactNative.Platform.isPad && !_reactNative.Platform.isTV;
}

// ============================================================================
// SPECIFIC IPHONE MODEL HELPERS
// ============================================================================

/**
 * Check if running on iPhone X / XS / 11 Pro size.
 */
function isIPhoneX() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_X);
}

/**
 * Check if running on iPhone XR / XS Max / 11 / 11 Pro Max size.
 */
function isIPhoneXMax() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_XR_XS_MAX);
}

/**
 * Check if running on iPhone 12 / 12 Pro / 13 / 13 Pro / 14 size.
 */
function isIPhone12() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_12_13_14);
}

/**
 * Check if running on iPhone 12 Pro Max / 13 Pro Max / 14 Plus size.
 */
function isIPhone12Max() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_12_PRO_MAX_13_PRO_MAX_14_PLUS);
}

/**
 * Check if running on iPhone 14 Pro / 15 / 15 Pro / 16 small family size.
 */
function isIPhone14ProLike() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_14_PRO);
}

/**
 * Check if running on iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 large family size.
 */
function isIPhone14ProMaxLike() {
  return isSupportedIPhone() && matchesDeviceSize(IPHONE_14_PRO_MAX);
}

// ============================================================================
// NOTCH / DYNAMIC ISLAND HELPERS
// ============================================================================

/**
 * Returns true if device is a known iPhone with notch or Dynamic Island.
 */
function isIPhoneWithMonobrow() {
  return isSupportedIPhone() && matchesAnyDeviceSize(NOTCH_DEVICES);
}

/**
 * Returns true if device is part of iPhone X notch family.
 */
function isIPhoneXFamily() {
  return isSupportedIPhone() && matchesAnyDeviceSize(IPHONE_X_FAMILY_DEVICES);
}

/**
 * Returns true if device is part of iPhone 12/13/14 notch family.
 */
function isIPhone12Family() {
  return isSupportedIPhone() && matchesAnyDeviceSize(IPHONE_12_FAMILY_DEVICES);
}

/**
 * Returns true if device is a known Dynamic Island iPhone.
 */
function hasDynamicIsland() {
  return isSupportedIPhone() && matchesAnyDeviceSize(DYNAMIC_ISLAND_DEVICES);
}

/**
 * Alias for notch-style iPhones including Dynamic Island.
 */
function hasNotch() {
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
function isExpo() {
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
  return _reactNative.StatusBar.currentHeight ?? STATUSBAR_ANDROID_FALLBACK_HEIGHT;
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
function getStatusBarHeight(options = {}) {
  const {
    skipAndroid = false,
    skipIos = true
  } = options;
  if (_reactNative.Platform.OS === 'ios') {
    return skipIos ? 0 : getIosStatusBarHeight();
  }
  if (_reactNative.Platform.OS === 'android') {
    return skipAndroid ? 0 : getAndroidStatusBarHeight();
  }
  return 0;
}

/**
 * Returns a top inset-like value useful for layouts that need extra spacing.
 */
function getTopInset(options = {}) {
  return getStatusBarHeight(options);
}

// ============================================================================
// DEBUG / INFO HELPERS
// ============================================================================

/**
 * Returns a readable summary of the current device environment.
 */
function getDeviceDebugInfo() {
  const screen = getScreenInfo();
  return {
    platform: _reactNative.Platform.OS,
    version: _reactNative.Platform.Version,
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