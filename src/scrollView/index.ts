
import { styled } from '../utiles/styled';
import { ScrollView, ScrollViewProps } from 'react-native'
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';

type StyledScrollViewProps = ScrollViewProps & ViewStyleProps;

const StyledScrollView = styled<StyledScrollViewProps>(ScrollView, {
    base: {
        flex: 1,
    } as ViewStyle
});

export { StyledScrollView };
export type { StyledScrollViewProps };