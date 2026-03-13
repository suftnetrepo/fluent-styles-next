import React from 'react';
import { useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';
import { getStatusBarHeight } from '../utiles/statusBar';
import { Stack } from '../stack';
import StyledStatusBar, { type StatusBarProps } from './statusBar';
import { StyleShape, ShapeProps } from '../shape';
import { StyledText, StyledTextProps } from '../text';
import { StyledSpacer, SpacerProps } from '../spacer';
import { BackArrow } from '../icons';
import { theme } from '../utiles/theme';

type HeaderProps = ViewProps & ViewStyle;

const Header = styled<ViewProps & ViewStyle>(View, {
    base: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.gray[1],
    }
});

type backArrowProps = {
    size?: number;
    color?: string;
    strokeWidth?: number;
    onPress?: () => void;
};

type headerProps = HeaderProps & {
    showBackArrow?: boolean;
    title?: string;
    titleProps?: StyledTextProps;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    backArrowProps?: backArrowProps;
    shapeProps?: ShapeProps;
    onBackPress?: () => void;
    showStatusBar?: boolean;
    statusBarProps?: StatusBarProps;
    skipAndroid?: boolean;
    skipIOS?: boolean;
};

const StyledHeader = React.forwardRef<View, headerProps>(
    (
        {
            showBackArrow,
            backArrowProps,
            showStatusBar = true,
            onBackPress,
            title,
            titleProps,
            leftIcon,
            rightIcon,
            shapeProps,
            statusBarProps,
            skipAndroid = true,
            skipIOS = true,
            ...rest
        },
        ref
    ) => {
        const { width } = useWindowDimensions();
        return (
            <Stack vertical>
                {showStatusBar && <StyledStatusBar {...statusBarProps} />}
                <Header
                    ref={ref}
                    marginTop={getStatusBarHeight(skipAndroid, skipIOS)}
                    width={width}
                    {...rest}
                >
                    {/* Back Icon */}
                    {showBackArrow && (
                        <StyleShape cycle {...shapeProps}>
                            <>
                                <BackArrow
                                    size={30}
                                    color={theme.colors.gray[700]}
                                    onPress={() => onBackPress && onBackPress()}
                                    {...backArrowProps}
                                />
                            </>
                        </StyleShape>
                    )}

                    {/* Left Icon */}
                    {leftIcon && <>{leftIcon}</>}

                    {/* Title */}
                    {title && (
                        <StyledText
                            {...titleProps}
                        >
                            {title}
                        </StyledText>
                    )}

                    {/* Right Icon */}
                    {rightIcon && <>{rightIcon}</>}

                </Header>
            </Stack>
        )
    }
)


export { StyledHeader };
export type { HeaderProps };