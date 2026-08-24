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
declare const StyledText: {
    (props: TextVariants & TextProps & TextStyle & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { StyledText };
export type { StyledTextProps };
//# sourceMappingURL=index.d.ts.map