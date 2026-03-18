import {
    SafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';
import { styled } from '../utiles/styled';
import { ViewStyle } from 'react-native';

type ViewStyleProps = Pick<
  ViewStyle,
  | 'padding'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'margin'
  | 'marginTop'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'backgroundColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'borderColor'
  | 'width'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'minWidth'
  | 'maxWidth'
  | 'flex'
  | 'flexDirection'
  | 'justifyContent'
  | 'alignItems'
  | 'alignSelf'
  | 'position'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
>;

type StyledSafeAreaViewProps = SafeAreaViewProps & ViewStyleProps;

const StyledSafeAreaView = styled<StyledSafeAreaViewProps>(SafeAreaView, {
    base: {
        flex: 1,
    } as ViewStyle
});

export { StyledSafeAreaView };
export type { StyledSafeAreaViewProps };