import React from 'react';
import { StyledSafeAreaView, StyledSafeAreaViewProps } from '../safeAreaView';
import { StatusBar, StatusBarProps } from 'react-native';
import { StyledHeader } from '../header';

interface StyledPageProps extends StyledSafeAreaViewProps {
    statusBarProps?: StatusBarProps;
    showStatusBar?: boolean;
    statusBarStyle?: StatusBarProps['barStyle'];
    statusBarBackgroundColor?: StatusBarProps['backgroundColor'];
    hideStatusBarOnAndroid?: boolean;
    hideStatusBarOnIOS?: boolean;
    translucentStatusBar?: boolean;
}

interface StyledPageType {
    (props: React.PropsWithChildren<StyledPageProps>): React.ReactNode;
    Header: typeof StyledHeader;
    displayName?: string;
}

const Page = ({ children, statusBarProps, showStatusBar = true, statusBarStyle, statusBarBackgroundColor, hideStatusBarOnAndroid, hideStatusBarOnIOS, translucentStatusBar, ...props }: React.PropsWithChildren<StyledPageProps>) => {
    return (
        <StyledSafeAreaView {...props}>
            {showStatusBar && <StatusBar hidden={hideStatusBarOnAndroid || hideStatusBarOnIOS} barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} translucent={translucentStatusBar} {...statusBarProps} />}
            {children}
        </StyledSafeAreaView>
    )
}

const StyledPage = Page as StyledPageType;

StyledPage.Header = StyledHeader;
StyledPage.displayName = 'StyledPage';

export { StyledPage };
export type { StyledPageProps };