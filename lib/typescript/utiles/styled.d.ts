import React, { ComponentType } from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";
type Style = ViewStyle | TextStyle | ImageStyle;
interface StyledOptions {
    base?: Style;
    variants?: {
        [key: string]: {
            [variant: string]: Style | ((selected: string, options: any) => Style);
        } | ((selected: string, options: any) => Style);
    };
}
declare const styled: <P extends object>(Component: React.ComponentType<P>, { base, variants }?: StyledOptions) => {
    (props: P & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
export { styled };
//# sourceMappingURL=styled.d.ts.map