/// <reference types="react" />
import { ViewProps } from 'react-native';
import { ViewStyleProps } from '../utiles/viewStyleProps';
type SpacerProps = ViewProps & (Pick<ViewStyleProps, 'margin' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginHorizontal' | 'marginVertical' | 'backgroundColor' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'flex' | 'width' | 'height'>);
declare const StyledSpacer: {
    (props: ViewProps & Pick<ViewStyleProps, "flex" | "backgroundColor" | "borderColor" | "borderRadius" | "borderWidth" | "height" | "margin" | "marginBottom" | "marginHorizontal" | "marginLeft" | "marginRight" | "marginTop" | "marginVertical" | "width"> & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { StyledSpacer };
export type { SpacerProps };
//# sourceMappingURL=index.d.ts.map