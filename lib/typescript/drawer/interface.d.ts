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
export type DrawerSide = 'left' | 'right';
export type DrawerColors = {
    /** Drawer surface background. */
    background: string;
    /** Semi-transparent backdrop. */
    overlay: string;
    /** Header background (can differ from surface). */
    headerBg: string;
    /** Header title text. */
    headerTitle: string;
    /** Header subtitle text. */
    headerSubtitle: string;
    /** Hairline border below the header. */
    headerBorder: string;
    /** Back/close chevron icon. */
    backIcon: string;
    /** Footer background. */
    footerBg: string;
    /** Footer border. */
    footerBorder: string;
    /** Vertical edge handle strip (drag affordance). */
    edgeHandle: string;
    /** Active nav item background. */
    navActiveItemBg: string;
    /** Active nav item label. */
    navActiveText: string;
    /** Inactive nav item label. */
    navText: string;
    /** Nav section label. */
    navSectionLabel: string;
    /** Separator / divider. */
    separator: string;
};
export declare const DRAWER_COLORS_LIGHT: DrawerColors;
export declare const DRAWER_COLORS_DARK: DrawerColors;
export type DrawerNavItem = {
    /** Unique key. */
    key: string;
    /** Display label. */
    label: string;
    /** Optional emoji / icon node shown to the left. */
    icon?: React.ReactNode;
    /** Optional trailing badge count. */
    badge?: number | string;
    /** Section this item belongs to. Items in the same section are grouped. */
    section?: string;
    /** Mark this item as the currently active route. */
    active?: boolean;
    /** Disable interaction. */
    disabled?: boolean;
    onPress?: () => void;
};
export interface DrawerProps extends PopupLifecycle {
    visible: boolean;
    /** Which edge the drawer slides from. @default 'left' */
    side?: DrawerSide;
    /**
     * Drawer width.
     * - number  → fixed pixels
     * - string  → percentage of screen width (e.g. `'80%'`)
     * @default '78%'
     */
    width?: number | string;
    /** Show a backdrop behind the drawer. @default true */
    overlay?: boolean;
    /** Custom overlay colour. Falls back to `colors.overlay`. */
    overlayColor?: string;
    /** Close when the user taps the overlay. @default true */
    closeOnPressOverlay?: boolean;
    onPressOverlay?: () => void;
    /** Animation duration in ms. @default 300 */
    duration?: number;
    /** Spring physics — overrides `duration` for the open stroke. */
    spring?: {
        damping: number;
        stiffness: number;
        mass?: number;
    };
    /**
     * Enable swipe-to-close gesture.
     * User swipes toward the originating edge to dismiss. @default true
     */
    swipeToClose?: boolean;
    /**
     * How far (px) from the leading edge the gesture must start to be captured.
     * Only applies when `swipeToClose=true`. @default 40
     */
    swipeEdgeWidth?: number;
    /**
     * Fraction of drawer width that counts as "enough" to dismiss
     * when the user lifts their finger. @default 0.4
     */
    swipeThreshold?: number;
    /** Drawer title. Renders the built-in header. */
    title?: React.ReactNode;
    /** Secondary line below the title. */
    subtitle?: React.ReactNode;
    /** Show a back / close chevron button. @default true when title is set */
    showBack?: boolean;
    /** Custom content for the header right slot. */
    headerRight?: React.ReactNode;
    onClose?: () => void;
    /**
     * When supplied, renders a styled navigation list above `children`.
     * Sections are auto-grouped by the `section` field on each item.
     */
    navItems?: DrawerNavItem[];
    /** Pinned content at the bottom of the drawer (profile row, logout, etc.). */
    footer?: React.ReactNode;
    /** Respect top safe area (status bar). @default true */
    safeAreaTop?: boolean;
    /** Respect bottom safe area (home bar). @default true */
    safeAreaBottom?: boolean;
    /** Mount children only after first open. @default true */
    lazyRender?: boolean;
    /** Unmount children when closed. @default false */
    destroyOnClose?: boolean;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    footerStyle?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
    colors?: Partial<DrawerColors>;
    onRequestClose?: () => boolean;
    testID?: string;
}
//# sourceMappingURL=interface.d.ts.map