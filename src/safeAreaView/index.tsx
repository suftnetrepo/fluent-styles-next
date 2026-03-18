import {
    SafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';

type StyledSafeAreaViewProps = SafeAreaViewProps & ViewStyleProps;

const StyledSafeAreaView = styled<StyledSafeAreaViewProps>(SafeAreaView, {
    base: {
        flex: 1,
    } as ViewStyle
});

export { StyledSafeAreaView };
export type { StyledSafeAreaViewProps };