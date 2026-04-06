import React from "react";
import {
  View,
  ViewProps,
  ViewStyle,
  Platform,
} from "react-native";
import { styled } from "../utiles/styled";
import { getStatusBarHeight } from "../utiles/statusBar";
import { Stack } from "../stack";
import StatusBar, { StatusBarProps } from "./statusBar";
import { StyleShape, ShapeProps } from "../shape";
import { StyledText, StyledTextProps } from "../text";
import { ChevronLeft } from "../icons";
import { theme } from "../utiles/theme";
import { StyledPressable } from "../pressable";
import { viewStyleStringVariants, viewStyleVariants } from "../utiles/viewStyleVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Container ────────────────────────────────────────────────────────────────

const StyledHeaderContainer = styled<ViewProps & ViewStyle>(View, {
  base: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Platform.select({ ios: 44, android: 56, default: 56 }),
    paddingHorizontal: 4,
  },
  variants: {
    // ── Forward all generic style props ─────────────────────────────────────
    ...viewStyleVariants,
    ...viewStyleStringVariants,
  },
});

// ─── Full — pure children pass-through ───────────────────────────────────────
// No layout of its own. StyledHeader (the outer wrapper) owns all spacing,
// status bar, and container sizing. Full just renders whatever is inside it.

const Full: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

Full.displayName = "StyledHeader.Full";

// ─── StyledHeader ─────────────────────────────────────────────────────────────

const HeaderComponent = React.forwardRef<
  React.ComponentPropsWithRef<typeof StyledHeaderContainer>,
  HeaderProps
>(
  (
    {
      // built-in title/icon layout props
      showBackArrow,
      backArrowProps,
      showStatusBar = true,
      onBackPress,
      title,
      titleAlignment = "left",
      titleProps,
      leftIcon,
      rightIcon,
      shapeProps,
      statusBarProps,
      skipStatusBarOnAndroid = true,
      skipStatusBarOnIOS = true,
      // children covers StyledHeader.Full usage
      children,
      ...rest
    },
    ref,
  ) => {
    // ── Left slot ─────────────────────────────────────────────────────────
    const renderLeft = () => (
      <Stack flex={1} horizontal alignItems="center" justifyContent="flex-start">
        {showBackArrow && (
          <StyledPressable onPress={onBackPress ?? backArrowProps?.onPress}>
            <StyleShape
              cycle

              {...shapeProps}
            >
              <ChevronLeft
                size={backArrowProps?.size ?? 24}
                color={backArrowProps?.color ?? theme.colors.gray[700]}
                strokeWidth={backArrowProps?.strokeWidth}
              />
            </StyleShape>
          </StyledPressable>

        )}
        {leftIcon}
        {titleAlignment === "left" && title && (
          <StyledText
            marginLeft={showBackArrow || leftIcon ? 8 : 0}
            {...titleProps}
          >
            {title}
          </StyledText>
        )}
      </Stack>
    );

    // ── Center slot ───────────────────────────────────────────────────────
    const renderCenter = () => {
      if (titleAlignment !== "center" || !title) return null;
      return (
        <Stack flex={2} alignItems="center" justifyContent="center">
          <StyledText numberOfLines={1} {...titleProps}>
            {title}
          </StyledText>
        </Stack>
      );
    };

    // ── Right slot ────────────────────────────────────────────────────────
    const renderRight = () => (
      <Stack flex={1} horizontal alignItems="center" justifyContent="flex-end">
        {titleAlignment === "right" && title && (
          <StyledText marginRight={rightIcon ? 8 : 0} {...titleProps}>
            {title}
          </StyledText>
        )}
        {rightIcon}
      </Stack>
    );

    // ── When children is present (e.g. StyledHeader.Full usage), render
    //    them directly inside the container — skip the built-in layout slots.
    const renderContent = () => {
      if (children) return <>{children}</>;
      return (
        <>
          {renderLeft()}
          {renderCenter()}
          {renderRight()}
        </>
      );
    };

    return (
      <Stack vertical>
        {showStatusBar && <StatusBar {...statusBarProps} />}
        <StyledHeaderContainer
          ref={ref}
          marginTop={getStatusBarHeight({
            skipAndroid: skipStatusBarOnAndroid,
            skipIos: skipStatusBarOnIOS,
          })}
          {...rest}
        >
          {renderContent()}
        </StyledHeaderContainer>
      </Stack>
    );
  },
);

// ─── Composition ──────────────────────────────────────────────────────────────

interface HeaderComponent
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<View>
  > {
  Full: typeof Full;
}

const StyledHeader = HeaderComponent as HeaderComponent;

StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";

export { StyledHeader };