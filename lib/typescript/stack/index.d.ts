/// <reference types="react" />
import { ViewProps, ViewStyle } from 'react-native';
/**
 * Stack-specific layout variants for flex direction
 * Supports dual-level customization:
 * - Variant level: horizontal={[true, { gap: 10 }]}
 * - Component level: horizontal={true} gap={15}
 */
type StackVariants = {
    horizontal?: boolean | [boolean, ViewStyle];
    vertical?: boolean | [boolean, ViewStyle];
};
type StackProps = StackVariants & ViewProps & ViewStyle;
/**
 * Base Stack component - flexible layout container
 * Default: neutral layout (no flex direction preset)
 * Use horizontal or vertical variants to set flex direction
 */
declare const Stack: import("react").ForwardRefExoticComponent<StackVariants & ViewProps & ViewStyle & import("react").RefAttributes<any>>;
declare const XStack: import("react").ForwardRefExoticComponent<Omit<StackProps, "horizontal" | "vertical"> & import("react").RefAttributes<any>>;
declare const YStack: import("react").ForwardRefExoticComponent<Omit<StackProps, "horizontal" | "vertical"> & import("react").RefAttributes<any>>;
export { Stack, XStack, YStack };
export type { StackProps };
//# sourceMappingURL=index.d.ts.map