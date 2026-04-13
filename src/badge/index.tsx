import { Text, TextProps, TextStyle } from "react-native";
import { styled } from "../utiles/styled";
import { theme } from "../utiles/theme";
import React, { ReactNode } from "react";
import { Stack } from "../stack";

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

const StyledBadge = styled<StyledBadgeProps>(Text, {
  base: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.gray[800],
    fontWeight: theme.fontWeight.normal,
  } as TextStyle,
  variants: {
    fontSize: (selected: string) => {
      const size = selected || theme.fontSize.normal;
      return { fontSize: Number(size) };
    },

    fontWeight: (selected: string) => {
      const weight = selected || theme.fontWeight.normal;
      return { fontWeight: weight as any };
    },

    color: (selected: string) => {
      const colorValue = selected || theme.colors.gray[800];
      return { color: colorValue };
    },

    textAlign: (selected: string) => {
      const align = selected || "center";
      const validAlignments = ["auto", "left", "right", "center", "justify"];
      if (!validAlignments.includes(align)) {
        return {};
      }
      return { textAlign: align as any };
    },

    fontFamily: (selected: string) => {
      if (!selected) return {};
      return { fontFamily: selected };
    },

    link: {
      true: {
        color: theme.colors.blue[800],
        textDecorationLine: "underline",
      } as TextStyle,
    },
  },
});

interface BadgeWithIconProps extends StyledBadgeProps {
  title: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const BadgeWithIcon = ({ title, iconLeft, iconRight, ref, ...rest }: BadgeWithIconProps & { ref?: React.Ref<any> }) => {
  const {
    color,
    fontSize,
    fontFamily,
    fontWeight,
    gap,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    borderRadius,
    justifyContent,
    alignItems,
  } = rest;

  return (
    <Stack
      horizontal
      alignSelf="flex-start"
      {...{
        backgroundColor,
        gap,
        borderRadius,
        paddingHorizontal,
        paddingVertical,
        justifyContent,
        alignItems,
      }}
    >
      {iconLeft && <>{iconLeft}</>}
      <StyledBadge
        marginLeft={2}
        marginRight={2}
        ref={ref}
        {...{ color, fontSize, fontFamily, fontWeight }}
      >
        {title}
      </StyledBadge>
      {iconRight && <>{iconRight}</>}
    </Stack>
  );
};

interface BadgeIconProps extends StyledBadgeProps {
  char?: string;
  icon?: ReactNode;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  size?: number;
}

const BadgeIcon = ({
      icon,
      char,
      top = -6,
      right = -6,
      fontSize,
      backgroundColor,
      color,
      bottom,
      left,
      size = 16,
      ref,
    }: BadgeIconProps & { ref?: React.Ref<any> }) => {
    return (
      <Stack
        flex={1}
        horizontal
        justifyContent="center"
        alignItems="center"
        alignSelf="flex-start"
      >
        {icon && <>{icon}</>}
        <Stack
          backgroundColor={backgroundColor || theme.colors.rose[500]}
          borderWidth={0}
          justifyContent="center"
          alignItems="center"
          borderRadius={999}
          height={size}
          width={size}
          {...{ top, right, bottom, left }}
        >
          <StyledBadge
            fontSize={fontSize || 10}
            color={color || theme.colors.gray[100]}
            ref={ref}
          >
            {char}
          </StyledBadge>
        </Stack>
      </Stack>
    );
  };

export { BadgeIcon };
export type { BadgeIconProps };

export { BadgeWithIcon };
export type { BadgeWithIconProps };

export { StyledBadge };
export type { StyledBadgeProps };