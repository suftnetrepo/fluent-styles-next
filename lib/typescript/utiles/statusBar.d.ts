type StatusBarHeightOptions = {
    skipAndroid?: boolean;
    skipIos?: boolean;
};
type ScreenInfo = {
    width: number;
    height: number;
    shortSide: number;
    longSide: number;
    isLandscape: boolean;
    isPortrait: boolean;
};
/**
 * Returns raw screen info from the window dimensions.
 */
export declare function getScreenInfo(): ScreenInfo;
/**
 * Returns true when running on iOS.
 */
export declare function isIos(): boolean;
/**
 * Returns true when running on Android.
 */
export declare function isAndroid(): boolean;
/**
 * Returns true when running on tvOS / Apple TV.
 */
export declare function isTv(): boolean;
/**
 * Returns true when running on an iPad.
 */
export declare function isPad(): boolean;
/**
 * Returns true when running on a tablet.
 * For iOS it checks iPad.
 * For Android it uses shortest side heuristic.
 */
export declare function isTablet(): boolean;
/**
 * Returns true when running on a phone-sized device.
 */
export declare function isPhone(): boolean;
/**
 * Check if running on iPhone X / XS / 11 Pro size.
 */
export declare function isIPhoneX(): boolean;
/**
 * Check if running on iPhone XR / XS Max / 11 / 11 Pro Max size.
 */
export declare function isIPhoneXMax(): boolean;
/**
 * Check if running on iPhone 12 / 12 Pro / 13 / 13 Pro / 14 size.
 */
export declare function isIPhone12(): boolean;
/**
 * Check if running on iPhone 12 Pro Max / 13 Pro Max / 14 Plus size.
 */
export declare function isIPhone12Max(): boolean;
/**
 * Check if running on iPhone 14 Pro / 15 / 15 Pro / 16 small family size.
 */
export declare function isIPhone14ProLike(): boolean;
/**
 * Check if running on iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 large family size.
 */
export declare function isIPhone14ProMaxLike(): boolean;
/**
 * Returns true if device is a known iPhone with notch or Dynamic Island.
 */
export declare function isIPhoneWithMonobrow(): boolean;
/**
 * Returns true if device is part of iPhone X notch family.
 */
export declare function isIPhoneXFamily(): boolean;
/**
 * Returns true if device is part of iPhone 12/13/14 notch family.
 */
export declare function isIPhone12Family(): boolean;
/**
 * Returns true if device is a known Dynamic Island iPhone.
 */
export declare function hasDynamicIsland(): boolean;
/**
 * Alias for notch-style iPhones including Dynamic Island.
 */
export declare function hasNotch(): boolean;
/**
 * Returns true if running inside Expo.
 */
export declare function isExpo(): boolean;
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
export declare function getStatusBarHeight(options?: StatusBarHeightOptions): number;
/**
 * Returns a top inset-like value useful for layouts that need extra spacing.
 */
export declare function getTopInset(options?: StatusBarHeightOptions): number;
/**
 * Returns a readable summary of the current device environment.
 */
export declare function getDeviceDebugInfo(): {
    platform: "ios" | "android" | "macos" | "windows" | "web";
    version: string | number;
    isPad: boolean;
    isTablet: boolean;
    isPhone: boolean;
    isTV: boolean;
    isExpo: boolean;
    width: number;
    height: number;
    shortSide: number;
    longSide: number;
    isLandscape: boolean;
    isPortrait: boolean;
    hasNotch: boolean;
    hasDynamicIsland: boolean;
    statusBarHeight: number;
};
export {};
//# sourceMappingURL=statusBar.d.ts.map