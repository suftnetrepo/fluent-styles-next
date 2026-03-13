import {
    SafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';
import { styled } from '../utiles/styled';
import { ViewStyle } from 'react-native';

type StyledSafeAreaViewProps = SafeAreaViewProps & ViewStyle;

const StyledSafeAreaView = styled<StyledSafeAreaViewProps>(SafeAreaView, {
    base: {
        flex: 1,
    } as ViewStyle
});

export { StyledSafeAreaView };
export type { StyledSafeAreaViewProps };