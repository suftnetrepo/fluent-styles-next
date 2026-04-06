"use strict";

import { View } from 'react-native';
import { styled } from "../utiles/styled.js";
const StyleShape = styled(View, {
  base: {
    position: 'relative'
  },
  variants: {
    cycle: {
      true: {
        borderRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
      },
      false: {}
    },
    size: size => {
      const selected = size ?? 0;
      if (isNaN(Number(selected))) {
        throw new Error('Invalid size value');
      }
      return {
        height: Number(selected),
        width: Number(selected)
      };
    }
  }
});
export { StyleShape };
//# sourceMappingURL=index.js.map