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
declare const Stack: {
    (props: StackVariants & ViewProps & ViewStyle & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
declare const XStack: {
    (props: Omit<StackProps, "horizontal" | "vertical"> & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
declare const YStack: {
    (props: Omit<StackProps, "horizontal" | "vertical"> & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { Stack, XStack, YStack };
export type { StackProps };
//# sourceMappingURL=index.d.ts.map