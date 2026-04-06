"use strict";

import { Pressable } from 'react-native';
import { styled } from "../utiles/styled.js";
import { viewStyleStringVariants } from "../utiles/viewStyleVariants.js";
const StyledPressable = styled(Pressable, {
  base: {
    position: 'relative'
  },
  variants: {
    ...viewStyleStringVariants
  }
});
export { StyledPressable };
//# sourceMappingURL=index.js.map