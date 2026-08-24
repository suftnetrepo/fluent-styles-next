import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
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
    skipStatusBarOnAndroid?: boolean;
    skipStatusBarOnIOS?: boolean;
    children?: React.ReactNode;
}
declare const Full: React.FC<{
    children?: React.ReactNode;
}>;
interface StyledHeaderType {
    (props: HeaderProps & {
        ref?: React.Ref<View>;
    }): React.ReactElement | null;
    Full: typeof Full;
    displayName?: string;
}
declare const StyledHeader: StyledHeaderType;
export { StyledHeader };
//# sourceMappingURL=index.d.ts.map