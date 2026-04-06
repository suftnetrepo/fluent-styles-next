import { Image, ImageProps, ImageBackgroundProps, ImageStyle, DimensionValue } from 'react-native';
import React from 'react';
type StyledImageProps = ImageProps & ImageStyle;
type StyledImageBackgroundProps = ImageBackgroundProps & ImageStyle;
declare const StyledImageBackground: React.ForwardRefExoticComponent<ImageBackgroundProps & ImageStyle & React.RefAttributes<any>>;
interface _StyledImageProps extends Omit<StyledImageProps, 'height' | 'width'> {
    cycle?: boolean;
    size?: DimensionValue;
    height?: DimensionValue;
    width?: DimensionValue;
}
declare const StyledImage: React.ForwardRefExoticComponent<_StyledImageProps & React.RefAttributes<Image>>;
export { StyledImage, StyledImageBackground };
export type { StyledImageProps, StyledImageBackgroundProps };
//# sourceMappingURL=index.d.ts.map