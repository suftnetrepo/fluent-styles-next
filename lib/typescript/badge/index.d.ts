import { TextProps, TextStyle } from "react-native";
import React, { ReactNode } from "react";
type TextVariants = {
    fontSize?: number;
    fontWeight?: number | string;
    color?: string;
    textDecorationLine?: string;
    textAlign?: string;
    fontFamily?: string;
    link?: boolean;
    autoWidth?: boolean;
};
type StyledBadgeProps = TextVariants & TextProps & TextStyle;
declare const StyledBadge: {
    (props: TextVariants & TextProps & TextStyle & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface BadgeWithIconProps extends StyledBadgeProps {
    title: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
}
declare const BadgeWithIcon: ({ title, iconLeft, iconRight, ref, ...rest }: BadgeWithIconProps & {
    ref?: React.Ref<any> | undefined;
}) => React.JSX.Element;
interface BadgeIconProps extends StyledBadgeProps {
    char?: string;
    icon?: ReactNode;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    size?: number;
}
declare const BadgeIcon: ({ icon, char, top, right, fontSize, backgroundColor, color, bottom, left, size, ref, }: BadgeIconProps & {
    ref?: React.Ref<any> | undefined;
}) => React.JSX.Element;
export { BadgeIcon };
export type { BadgeIconProps };
export { BadgeWithIcon };
export type { BadgeWithIconProps };
export { StyledBadge };
export type { StyledBadgeProps };
//# sourceMappingURL=index.d.ts.map