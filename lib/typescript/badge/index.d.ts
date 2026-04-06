import { TextProps, TextStyle } from "react-native";
import { ReactNode } from "react";
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
declare const StyledBadge: import("react").ForwardRefExoticComponent<TextVariants & TextProps & TextStyle & import("react").RefAttributes<any>>;
interface BadgeWithIconProps extends StyledBadgeProps {
    title: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
}
declare const BadgeWithIcon: import("react").ForwardRefExoticComponent<BadgeWithIconProps & import("react").RefAttributes<any>>;
interface BadgeIconProps extends StyledBadgeProps {
    char?: string;
    icon?: ReactNode;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    size?: number;
}
declare const BadgeIcon: import("react").ForwardRefExoticComponent<BadgeIconProps & import("react").RefAttributes<any>>;
export { BadgeIcon };
export type { BadgeIconProps };
export { BadgeWithIcon };
export type { BadgeWithIconProps };
export { StyledBadge };
export type { StyledBadgeProps };
//# sourceMappingURL=index.d.ts.map