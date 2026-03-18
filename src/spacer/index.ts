
import { View, ViewProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';

type SpacerProps =  ViewProps & (Pick<ViewStyleProps, 
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
  | 'flex'
  | 'width'
  | 'height'>);

const StyledSpacer = styled<SpacerProps>(View, {
    base: {
        marginHorizontal: 1,
    } as ViewStyle,
});

export {  StyledSpacer };
export type { SpacerProps };