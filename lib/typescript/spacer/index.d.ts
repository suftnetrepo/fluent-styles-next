/// <reference types="react" />
import { ViewProps } from 'react-native';
import { ViewStyleProps } from '../utiles/viewStyleProps';
type SpacerProps = ViewProps & (Pick<ViewStyleProps, 'margin' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginHorizontal' | 'marginVertical' | 'backgroundColor' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'flex' | 'width' | 'height'>);
declare const StyledSpacer: import("react").ForwardRefExoticComponent<ViewProps & Pick<ViewStyleProps, "flex" | "backgroundColor" | "borderColor" | "borderRadius" | "borderWidth" | "height" | "margin" | "marginBottom" | "marginHorizontal" | "marginLeft" | "marginRight" | "marginTop" | "marginVertical" | "width"> & import("react").RefAttributes<any>>;
export { StyledSpacer };
export type { SpacerProps };
//# sourceMappingURL=index.d.ts.map