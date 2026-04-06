"use strict";

import { Image, ImageBackground } from 'react-native';
import { styled } from "../utiles/styled.js";
import React from 'react';
import { viewStyleVariants } from "../utiles/viewStyleVariants.js";
import { jsx as _jsx } from "react/jsx-runtime";
const StyledImageBackground = styled(ImageBackground, {
  base: {
    position: 'relative',
    borderWidth: 0,
    resizeMode: 'cover'
  },
  variants: {
    ...viewStyleVariants
  }
});
const StyledImage = /*#__PURE__*/React.forwardRef(({
  height = 100,
  width = 100,
  ...props
}, ref) => {
  const {
    cycle,
    size,
    ...rest
  } = props;
  const sizeStyle = cycle ? {
    height: Number(size),
    width: Number(size),
    borderRadius: 9999
  } : {
    height: height,
    width: width
  };
  return /*#__PURE__*/_jsx(Image, {
    ...rest,
    style: [props.style, sizeStyle],
    ref: ref
  });
});
export { StyledImage, StyledImageBackground };
//# sourceMappingURL=index.js.map