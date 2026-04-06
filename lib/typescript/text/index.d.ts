/// <reference types="react" />
import { TextProps, TextStyle } from 'react-native';
type TextVariants = {
    fontSize?: number;
    fontWeight?: number | string;
    color?: string;
    textDecorationLine?: boolean | string;
    textAlign?: string;
    fontFamily?: string;
    link?: boolean;
};
type StyledTextProps = TextVariants & TextProps & TextStyle;
declare const StyledText: import("react").ForwardRefExoticComponent<TextVariants & TextProps & TextStyle & import("react").RefAttributes<any>>;
export { StyledText };
export type { StyledTextProps };
//# sourceMappingURL=index.d.ts.map