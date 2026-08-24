import { Image, ImageProps, ImageBackgroundProps, ImageStyle, DimensionValue } from 'react-native';
import React from 'react';
type StyledImageProps = ImageProps & ImageStyle;
type StyledImageBackgroundProps = ImageBackgroundProps & ImageStyle;
declare const StyledImageBackground: {
    (props: ImageBackgroundProps & ImageStyle & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
interface _StyledImageProps extends Omit<StyledImageProps, 'height' | 'width'> {
    cycle?: boolean;
    size?: DimensionValue;
    height?: DimensionValue;
    width?: DimensionValue;
}
declare const StyledImage: ({ height, width, ref, ...props }: _StyledImageProps & {
    ref?: React.Ref<Image> | undefined;
}) => React.JSX.Element;
export { StyledImage, StyledImageBackground };
export type { StyledImageProps, StyledImageBackgroundProps };
//# sourceMappingURL=index.d.ts.map