import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { StatusBarProps } from "./statusBar";
import { ShapeProps } from "../shape";
import { StyledTextProps } from "../text";
export interface BackArrowProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    onPress?: () => void;
}
export interface HeaderProps extends ViewProps, ViewStyle {
    showBackArrow?: boolean;
    title?: string;
    titleProps?: StyledTextProps;
    titleAlignment?: "left" | "center" | "right";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    backArrowProps?: BackArrowProps;
    shapeProps?: ShapeProps;
    onBackPress?: () => void;
    showStatusBar?: boolean;
    statusBarProps?: StatusBarProps;
    skipStatusBarOnAndroid?: boolean;
    skipStatusBarOnIOS?: boolean;
    children?: React.ReactNode;
}
declare const Full: React.FC<{
    children?: React.ReactNode;
}>;
declare const HeaderComponent: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<Omit<ViewProps & ViewStyle & React.RefAttributes<any>, "ref"> & {
    ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
}>>;
interface HeaderComponent extends React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<View>> {
    Full: typeof Full;
}
declare const StyledHeader: HeaderComponent;
export { StyledHeader };
//# sourceMappingURL=index.d.ts.map