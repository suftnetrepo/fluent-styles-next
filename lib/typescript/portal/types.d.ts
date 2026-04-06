import type { ViewStyle } from 'react-native';
import type React from 'react';
export type Position = 'top' | 'center' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type Offset = {
    x: number;
    y: number;
};
export type PortalOptions = {
    /** Where the portal should be anchored on screen. Defaults to `'center'`. */
    position?: Position;
    /** Pixel offset applied after positional anchoring. */
    offset?: Offset;
    /** Additional styles applied to the portal wrapper `View`. */
    style?: ViewStyle;
    /** Whether to render a semi-transparent backdrop behind the portal. */
    backdrop?: boolean;
    /** Called when the user taps the backdrop (requires `backdrop: true`). */
    onBackdropPress?: () => void;
};
export type PortalNode = {
    id: number;
    children: React.ReactNode;
    options: PortalOptions;
};
export type PortalContextType = {
    mount: (children: React.ReactNode, options?: PortalOptions) => number;
    update: (id: number, children: React.ReactNode, options?: PortalOptions) => void;
    unmount: (id: number) => void;
};
//# sourceMappingURL=types.d.ts.map