import { ViewProps } from 'react-native';
import { ViewStyle } from '../utiles/viewStyleProps';
type DividerVariants = {
    vertical?: boolean | [boolean, ViewStyle];
    horizontal?: boolean | [boolean, ViewStyle];
};
type DividerProps = ViewProps & DividerVariants & ViewStyle;
declare const StyledDivider: {
    (props: ViewProps & DividerVariants & ViewStyle & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { StyledDivider };
export type { DividerProps };
//# sourceMappingURL=index.d.ts.map