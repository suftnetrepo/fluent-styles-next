"use strict";

import { View } from 'react-native';
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";
import { viewStyleStringVariants, viewStyleVariants } from "../utiles/viewStyleVariants.js";
const StyledDivider = styled(View, {
  base: {
    flexDirection: 'row',
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray[100]
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        flex: 1
      },
      false: {}
    },
    horizontal: {
      true: {
        flexDirection: 'row',
        flex: 1
      },
      false: {}
    },
    ...viewStyleStringVariants,
    ...viewStyleVariants
  }
});
export { StyledDivider };
//# sourceMappingURL=index.js.map