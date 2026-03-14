
import {
  Image,
  ImageBackground,
  ImageProps,
  ImageBackgroundProps,
  ImageStyle,
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

interface _StyledImageProps extends StyledImageProps {
    cycle? : boolean   
    size?: string | number ; 
    height?: number ;
    width?: number ;
}   

const StyledImage = React.forwardRef<Image, _StyledImageProps>(({ height = 100, width = 100, ...props }: _StyledImageProps, ref) => {
    const { cycle, size, ...rest } = props;
    console.log('StyledImage props:', props);
    const sizeStyle = cycle ? { height: Number(size), width: Number(size) } : { height, width };
     return <Image {...rest} style={[props.style, sizeStyle]} ref={ref} />;
});

export { StyledImage, StyledImageBackground };
export type { StyledImageProps, StyledImageBackgroundProps };