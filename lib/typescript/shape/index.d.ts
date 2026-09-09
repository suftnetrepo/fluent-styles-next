import { ViewProps, ViewStyle } from 'react-native';
type ShapeVariants = {
    cycle?: boolean | [boolean, ViewStyle];
    size?: string | number | [string | number, ViewStyle];
};
type ShapeProps = ShapeVariants & ViewProps & ViewStyle;
declare const StyledShape: {
    (props: ShapeVariants & ViewProps & ViewStyle & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { StyledShape, StyledShape as StyleShape };
export type { ShapeProps };
//# sourceMappingURL=index.d.ts.map