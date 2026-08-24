import React from 'react';
import { StyledSafeAreaViewProps } from '../safeAreaView';
import { StatusBarProps } from 'react-native';
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
declare const StyledPage: StyledPageType;
export { StyledPage };
export type { StyledPageProps };
//# sourceMappingURL=index.d.ts.map