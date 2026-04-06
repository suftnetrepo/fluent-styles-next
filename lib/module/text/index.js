"use strict";

import { Text } from 'react-native';
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";
const StyledText = styled(Text, {
  base: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.gray[800],
    fontWeight: theme.fontWeight.normal
  },
  variants: {
    fontSize: selected => {
      const size = selected || theme.fontSize.normal;
      if (isNaN(Number(size))) {
        // throw new Error('Invalid fontSize value');
      }
      return {
        fontSize: Number(size)
      };
    },
    fontWeight: selected => {
      const weight = selected || theme.fontWeight.normal;
      if (isNaN(Number(weight))) {
        // throw new Error('Invalid fontWeight value');
      }
      return {
        fontWeight: weight
      };
    },
    color: selected => {
      const colorValue = selected || theme.colors.gray[800];
      return {
        color: colorValue
      };
    },
    textAlign: selected => {
      const align = selected || 'left';
      const validAlignments = ['auto', 'left', 'right', 'center', 'justify'];
      if (!validAlignments.includes(align)) {
        // throw new Error('Invalid textAlign value');
      }
      return {
        textAlign: align
      };
    },
    fontFamily: selected => {
      if (!selected) return {};
      return {
        fontFamily: selected
      };
    },
    link: {
      true: {
        color: theme.colors.blue[800],
        textDecorationLine: 'underline'
      }
    }
  }
});
export { StyledText };
//# sourceMappingURL=index.js.map