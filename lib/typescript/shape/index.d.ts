/// <reference types="react" />
import { ViewProps, ViewStyle } from 'react-native';
type ShapeVariants = {
    cycle?: boolean | [boolean, ViewStyle];
    size?: string | number | [string | number, ViewStyle];
};
type ShapeProps = ShapeVariants & ViewProps & ViewStyle;
declare const StyleShape: import("react").ForwardRefExoticComponent<ShapeVariants & ViewProps & ViewStyle & import("react").RefAttributes<any>>;
export { StyleShape };
export type { ShapeProps };
//# sourceMappingURL=index.d.ts.map