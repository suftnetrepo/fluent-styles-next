import {
    SafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';
import { viewStyleStringVariants } from '../utiles/viewStyleVariants';

type StyledSafeAreaViewProps = SafeAreaViewProps & ViewStyleProps;

const StyledSafeAreaView = styled<StyledSafeAreaViewProps>(SafeAreaView, {
    base: {
    flex: 1,
    } as ViewStyle,
    variants: {
      ...viewStyleStringVariants,
    }
});

export { StyledSafeAreaView };
export type { StyledSafeAreaViewProps };