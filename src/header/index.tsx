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
  skipStatusBarOnAndroid?: boolean;
  skipStatusBarOnIOS?: boolean;
  children?: React.ReactNode;
}

// ─── Container ────────────────────────────────────────────────────────────────

const StyledHeaderContainer = styled<HeaderProps>(View, {
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

// ─── Side slot ────────────────────────────────────────────────────────────────
// Fixed-width, always-rendered container used only when titleAlignment is
// "center". It guarantees the back-icon side and the rightIcon side reserve
// equal width, so the centered title is centered relative to the whole
// header — not just the leftover space between two differently-sized
// siblings (which is what caused center titles to drift previously).

const SideSlot = styled<ViewProps>(View, {
  base: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
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

const HeaderComponent = ({
  showBackArrow,
  backArrowProps,
  onBackPress,
  title,
  titleAlignment = "left",
  titleProps,
  leftIcon,
  rightIcon,
  shapeProps,
  skipStatusBarOnAndroid = true,
  skipStatusBarOnIOS = true,
  children,
  // Pull ref directly from props
  ref,
  ...rest
}: HeaderProps & { ref?: React.Ref<View> }) => {

  // ── Left slot ─────────────────────────────────────────────────────────
  const renderBackIcon = () => (
    <>
      {showBackArrow && (
        <StyledPressable onPress={onBackPress ?? backArrowProps?.onPress} flexDirection="row" alignItems="center" justifyContent="flex-start">
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
    </>
  );

  // ── Left slot ─────────────────────────────────────────────────────────
  const renderLeft = () => (
    <>
      {titleAlignment === "left" && title && (
        <Stack flex={1} horizontal alignItems="center" justifyContent="flex-start">
          {leftIcon}
          <StyledText
            marginLeft={showBackArrow || leftIcon ? 8 : 0}
            {...titleProps}
          >
            {title}
          </StyledText>
        </Stack>
      )}
    </>

  );

  // ── Center slot ───────────────────────────────────────────────────────
  const renderCenter = () => {
    return (
      <>
        {
          titleAlignment === "center" && title && (
              <Stack flex={1} horizontal alignItems="center" justifyContent="center">
  <StyledText numberOfLines={1} {...titleProps}>
              {title}
            </StyledText>
              </Stack>

          )
        }
      </>
    );
  };

  // ── Right slot ────────────────────────────────────────────────────────
  const renderRight = () => (
    <>
      {titleAlignment === "right" && title && (
        <StyledText marginRight={rightIcon ? 8 : 0} {...titleProps}>
          {title}
        </StyledText>
      )}
      {
        rightIcon && (
          <>{rightIcon}</>
        )
      }

    </>
  );

  // ── When children is present (e.g. StyledHeader.Full usage), render
  //    them directly inside the container — skip the built-in layout slots.
  const renderContent = () => {
    if (children) return <>{children}</>;

    // Centered titles need symmetric side widths to actually sit in the
    // middle of the header — see SideSlot above. Left/right alignment
    // already hug an edge and don't need this.
    if (titleAlignment === "center") {
      return (
        <>
          <SideSlot>{renderBackIcon()}</SideSlot>
          {renderCenter()}
          <SideSlot>{rightIcon}</SideSlot>
        </>
      );
    }

    return (
      <>
        {renderBackIcon()}
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </>
    );
  };

  return (
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
  );
};


// ─── Composition (React 19 Style) ─────────────────────────────────────────────

// Define the static property on the function type
interface StyledHeaderType {
  (props: HeaderProps & { ref?: React.Ref<View> }): React.ReactElement | null;
  Full: typeof Full;
  displayName?: string;
}

const StyledHeader = HeaderComponent as StyledHeaderType;

StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";

export { StyledHeader };