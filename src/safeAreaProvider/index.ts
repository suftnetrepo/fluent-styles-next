
import {
    SafeAreaProvider,
    SafeAreaProviderProps
} from 'react-native-safe-area-context';
import { styled } from '../utiles/styled';

type StyledSafeAreaProviderProps = SafeAreaProviderProps;

const StyledSafeAreaProvider = styled<StyledSafeAreaProviderProps>(SafeAreaProvider, {
    base: {
    }
});

export { StyledSafeAreaProvider };
export type { StyledSafeAreaProviderProps };
