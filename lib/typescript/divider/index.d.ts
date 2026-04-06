/// <reference types="react" />
import { ViewProps } from 'react-native';
import { ViewStyle } from '../utiles/viewStyleProps';
type DividerVariants = {
    vertical?: boolean | [boolean, ViewStyle];
    horizontal?: boolean | [boolean, ViewStyle];
};
type DividerProps = ViewProps & DividerVariants & ViewStyle;
declare const StyledDivider: import("react").ForwardRefExoticComponent<ViewProps & DividerVariants & ViewStyle & import("react").RefAttributes<any>>;
export { StyledDivider };
export type { DividerProps };
//# sourceMappingURL=index.d.ts.map