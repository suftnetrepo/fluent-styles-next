import React from 'react';
import { useWindowDimensions, View, ViewProps, ViewStyle, Platform } from 'react-native';
import { styled } from '../utiles/styled';
import { getStatusBarHeight } from '../utiles/statusBar';
import { Stack } from '../stack';
import StyledStatusBar, { type StatusBarProps } from './statusBar';
import { StyleShape, ShapeProps } from '../shape';
import { StyledText, StyledTextProps } from '../text';
import { BackArrow } from '../icons';
import { theme } from '../utiles/theme';

type HeaderProps = ViewProps & ViewStyle;

const Header = styled<ViewProps & ViewStyle>(View, {
    base: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.select({
            ios: 44,
            android: 56,
            default: 56,
        }),
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
    titleAlign?: 'left' | 'center' | 'right';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    backArrowProps?: backArrowProps;
    shapeProps?: ShapeProps;
    onPress?: () => void;
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
            onPress,
            title,
            titleAlign = 'left',
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

                    <Stack flex={titleAlign === 'left' ? 2 : 1} alignItems='center' horizontal>
                        {showBackArrow && (
                            <StyleShape cycle {...shapeProps}>
                                <BackArrow
                                    size={32}
                                    color={theme.colors.gray[1]}
                                    onPress={() => onPress && onPress()}
                                    {...backArrowProps}
                                />
                            </StyleShape>
                        )}

                        {leftIcon && (
                            <>{leftIcon}</>
                        )}

                        {titleAlign === 'left' && title && (
                            <StyledText
                                marginLeft={24}
                                {...titleProps}
                            >
                                {title}
                            </StyledText>
                        )}
                    </Stack>

                    <Stack
                        flex={titleAlign === 'center' ? 2 : 1}
                        flexWrap='nowrap'
                        alignItems='center'
                    >
                        {titleAlign === 'center' && title && (
                            <StyledText {...titleProps}>
                                {title}
                            </StyledText>
                        )}
                    </Stack>

                    <Stack flex={1} backgroundColor={theme.colors.gray[1]} alignItems='flex-end'>
                        {rightIcon && <>{rightIcon}</>}
                    </Stack>
                </Header>
            </Stack>
        );
    }
);

export { StyledHeader };
export type { HeaderProps };