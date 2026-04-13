
import {
  Image,
  ImageBackground,
  ImageProps,
  ImageBackgroundProps,
  ImageStyle,
  DimensionValue,
} from 'react-native';
import { styled } from '../utiles/styled';
import React from 'react';
import { viewStyleVariants } from '../utiles/viewStyleVariants';

type StyledImageProps = ImageProps & ImageStyle 

type StyledImageBackgroundProps = ImageBackgroundProps & ImageStyle;
const StyledImageBackground = styled<StyledImageBackgroundProps>(ImageBackground, {
    base: {
        position: 'relative',
        borderWidth: 0,
        resizeMode: 'cover',
        
    } as ImageStyle,
    variants: {
        ...viewStyleVariants,
    }
});

interface _StyledImageProps extends Omit<StyledImageProps, 'height' | 'width'> {
    cycle?: boolean;
    size?: DimensionValue;
    height?: DimensionValue;
    width?: DimensionValue;
}   

const StyledImage = ({ height = 100, width = 100, ref, ...props }: _StyledImageProps & { ref?: React.Ref<React.ComponentRef<typeof Image>> }) => {
    const { cycle, size, ...rest } = props;
    const sizeStyle: ImageStyle = cycle
        ? { height: Number(size) as DimensionValue, width: Number(size) as DimensionValue, borderRadius: 9999  }
        : { height: height as DimensionValue, width: width as DimensionValue };
    return <Image {...rest} style={[props.style, sizeStyle]} ref={ref} />;
};

export { StyledImage, StyledImageBackground };
export type { StyledImageProps, StyledImageBackgroundProps };