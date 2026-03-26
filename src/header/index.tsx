import React from 'react';
import { 
  useWindowDimensions, 
  View, 
  ViewProps, 
  ViewStyle, 
  Platform 
} from 'react-native';
import { styled } from '../utiles/styled';
import { getStatusBarHeight } from '../utiles/statusBar';
import { Stack } from '../stack';
import StatusBar, { StatusBarProps } from './statusBar';
import { StyleShape, ShapeProps } from '../shape';
import { StyledText, StyledTextProps } from '../text';
import { BackArrow, ChevronLeft } from '../icons';
import { theme } from '../utiles/theme';

// Types
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
  titleAlignment?: 'left' | 'center' | 'right';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  backArrowProps?: BackArrowProps;
  shapeProps?: ShapeProps;
  onBackPress?: () => void;
  showStatusBar?: boolean;
  statusBarProps?: StatusBarProps;
  skipStatusBarOnAndroid?: boolean;
  skipStatusBarOnIOS?: boolean;
}

export interface FullHeaderProps extends ViewProps, ViewStyle {
  children?: React.ReactNode;
  statusBarProps?: StatusBarProps;
  skipStatusBarOnAndroid?: boolean;
  skipStatusBarOnIOS?: boolean;
}

// Styled Components
const StyledHeaderContainer = styled<ViewProps & ViewStyle>(View, {
  base: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.select({
      ios: 44,
      android: 56,
      default: 56,
    }),
  },
});

// Full Header Component
const FullHeader = React.forwardRef<React.ComponentPropsWithRef<typeof StyledHeaderContainer>, FullHeaderProps>(
  (
    { 
      children, 
      statusBarProps, 
      skipStatusBarOnAndroid = true, 
      skipStatusBarOnIOS = true, 
      ...rest 
    }, 
    ref
  ) => {
    const { width } = useWindowDimensions();
    
    return (
      <Stack vertical>
        <StatusBar {...statusBarProps} />
        <StyledHeaderContainer
          ref={ref}
          width={width}
          marginTop={getStatusBarHeight(skipStatusBarOnAndroid, skipStatusBarOnIOS)}
          {...rest}
        >
          {children}
        </StyledHeaderContainer>
      </Stack>
    );
  }
);

// Main Header Component
const HeaderComponent = React.forwardRef<React.ComponentPropsWithRef<typeof StyledHeaderContainer>, HeaderProps>(
  (
    {
      showBackArrow,
      backArrowProps,
      showStatusBar = true,
      onBackPress,
      title,
      titleAlignment = 'left',
      titleProps,
      leftIcon,
      rightIcon,
      shapeProps,
      statusBarProps,
      skipStatusBarOnAndroid = true,
      skipStatusBarOnIOS = true,
      ...rest
    },
    ref
  ) => {
   
    const renderLeftSection = () => (
      <Stack 
        flex={titleAlignment === 'left' ? 2 : 1} 
        alignItems="center" 
        horizontal
      >
        {showBackArrow && (
          <StyleShape cycle {...shapeProps}>
            <ChevronLeft
              size={32}
              color={theme.colors.gray[1]}
              onPress={onBackPress}
              {...backArrowProps}
            />
          </StyleShape>
        )}

        {leftIcon}

        {titleAlignment === 'left' && title && (
          <StyledText marginLeft={24} {...titleProps}>
            {title}
          </StyledText>
        )}
      </Stack>
    );

    const renderCenterSection = () => (
      <Stack
        flex={titleAlignment === 'center' ? 2 : 1}
        flexWrap="nowrap"
        alignItems="center"
      >
        {titleAlignment === 'center' && title && (
          <StyledText {...titleProps}>
            {title}
          </StyledText>
        )}
      </Stack>
    );

    const renderRightSection = () => (
      <Stack 
        flex={1} 
        backgroundColor={theme.colors.gray[1]} 
        alignItems="flex-end"
      >
        {rightIcon}
      </Stack>
    );

    return (
      <Stack vertical>
        <StatusBar {...statusBarProps} />
        <StyledHeaderContainer
          ref={ref}
          marginTop={getStatusBarHeight(skipStatusBarOnAndroid, skipStatusBarOnIOS)}
         
          {...rest}
        >
          {renderLeftSection()}
          {renderCenterSection()}
          {renderRightSection()}
        </StyledHeaderContainer>
      </Stack>
    );
  }
);

// Component Composition
interface HeaderComponent extends React.ForwardRefExoticComponent<
  HeaderProps & React.RefAttributes<View>
> {
  Full: typeof FullHeader;
}

const StyledHeader = HeaderComponent as HeaderComponent;

StyledHeader.Full = FullHeader;
StyledHeader.Full.displayName = 'StyledHeader.Full';
StyledHeader.displayName = 'StyledHeader';

export { StyledHeader };
