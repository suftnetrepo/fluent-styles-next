import type { PropsWithChildren, ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle, ColorValue, ViewProps } from 'react-native';
export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
/**
 * Controls how the popup enters/exits.
 * - `'slide'`  — slides in from the edge (default for side positions)
 * - `'fade'`   — opacity only
 * - `'scale'`  — scale from center (good for center position)
 * - `'none'`   — instant, no animation
 */
export type PopupAnimation = 'slide' | 'fade' | 'scale' | 'none';
export type PopupColors = {
    /** Popup surface background. */
    background: string;
    /** Semi-transparent overlay behind the popup. */
    overlay: string;
    /** Handle pill (bottom sheet). */
    handle: string;
    /** Header title text. */
    headerTitle: string;
    /** Header subtitle text. */
    headerSubtitle: string;
    /** Header border / divider. */
    headerBorder: string;
    /** Close button icon colour. */
    closeIcon: string;
    /** Close button background. */
    closeIconBg: string;
};
export declare const POPUP_COLORS_LIGHT: PopupColors;
export declare const POPUP_COLORS_DARK: PopupColors;
export type PopupLifecycle = {
    /** Fires immediately when visibility changes to true. */
    onOpen?: () => void;
    /** Fires after the open animation completes. */
    onOpened?: () => void;
    /** Fires immediately when visibility changes to false. */
    onClose?: () => void;
    /** Fires after the close animation completes. */
    onClosed?: () => void;
};
export interface PopupProps extends PropsWithChildren<{}>, PopupLifecycle {
    /** Whether the popup is visible. */
    visible: boolean;
    /** Show a backdrop overlay. @default true */
    overlay?: boolean;
    /** Custom overlay colour. Falls back to `colors.overlay`. */
    overlayColor?: ColorValue;
    /** Close the popup when the overlay is pressed. @default true */
    closeOnPressOverlay?: boolean;
    /** Called when the overlay is pressed. */
    onPressOverlay?: () => void;
    /** Where the popup enters from. @default 'bottom' */
    position?: PopupPosition;
    /**
     * Animation style.
     * Defaults: `slide` for side positions, `scale` for center.
     */
    animation?: PopupAnimation;
    /** Animation duration in ms. @default 280 */
    duration?: number;
    /**
     * Spring physics for slide/scale animations.
     * When set, overrides `duration` for the open animation.
     */
    spring?: {
        damping: number;
        stiffness: number;
        mass?: number;
    };
    /** Round the corners facing the interior of the screen. @default true */
    round?: boolean;
    /** Border radius value when `round` is true. @default 20 */
    roundRadius?: number;
    /** Add padding for the bottom safe area (notch / home bar). @default false */
    safeAreaBottom?: boolean;
    /** Add padding for the top safe area (status bar). @default false */
    safeAreaTop?: boolean;
    /** Only mount children after the first open. @default true */
    lazyRender?: boolean;
    /** Unmount children when closed (resets to lazy state). @default false */
    destroyOnClose?: boolean;
    /** Optional header title. Enables the built-in header. */
    title?: ReactNode;
    /** Optional subtitle rendered below the title. */
    subtitle?: ReactNode;
    /** Show a drag handle pill above the header. @default true for bottom */
    showHandle?: boolean;
    /** Show a close (×) button in the header. @default false */
    showClose?: boolean;
    /** Called when the close button is pressed. */
    onClose?: () => void;
    style?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    colors?: Partial<PopupColors>;
    /** Return true to handle the back button (Android). */
    onRequestClose?: () => boolean;
    testID?: ViewProps['testID'];
}
//# sourceMappingURL=interface.d.ts.map