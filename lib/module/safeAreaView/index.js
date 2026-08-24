"use strict";

import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from "../utiles/styled.js";
import { viewStyleStringVariants } from "../utiles/viewStyleVariants.js";
const StyledSafeAreaView = styled(SafeAreaView, {
  base: {
    flex: 1
  },
  variants: {
    ...viewStyleStringVariants
  }
});
export { StyledSafeAreaView };
//# sourceMappingURL=index.js.map