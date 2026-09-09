"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewStyleVariants = exports.viewStyleStringVariants = void 0;
/**
 * A raw variant value as it arrives from a prop. Numeric props (e.g. `width={100}`)
 * come through as `number`, string props (e.g. `width="100%"`) come through as `string`.
 */

/**
 * Parses a raw prop value into a React Native `DimensionValue` (`number | \`${number}%\``).
 *
 * `parseFloat` alone silently discards any trailing unit (e.g. `parseFloat('100%') === 100`),
 * which turns a percentage into a plain pixel value. This keeps the `%` suffix intact when
 * present, and otherwise numerically parses the value (so `"16px"`, `"16dp"`, `16`, `"16"`
 * all resolve to the number `16`, matching the previous behaviour for non-percentage units).
 */
const parseDimension = (selected, {
  min,
  max
} = {}) => {
  if (selected === null || selected === undefined) return undefined;
  if (typeof selected === 'number') {
    if (isNaN(selected)) return undefined;
    if (min !== undefined && selected < min) return undefined;
    if (max !== undefined && selected > max) return undefined;
    return selected;
  }
  const trimmed = selected.trim();
  if (trimmed === '') return undefined;
  const isPercent = trimmed.endsWith('%');
  const numeric = parseFloat(trimmed);
  if (isNaN(numeric)) return undefined;
  if (min !== undefined && numeric < min) return undefined;
  if (max !== undefined && numeric > max) return undefined;
  return isPercent ? `${numeric}%` : numeric;
};
const viewStyleVariants = exports.viewStyleVariants = {
  width: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      width: value
    };
  },
  height: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      height: value
    };
  },
  minWidth: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      minWidth: value
    };
  },
  maxWidth: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      maxWidth: value
    };
  },
  minHeight: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      minHeight: value
    };
  },
  maxHeight: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      maxHeight: value
    };
  },
  // Position Properties
  top: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      top: value
    };
  },
  bottom: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      bottom: value
    };
  },
  left: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      left: value
    };
  },
  right: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      right: value
    };
  },
  // Margin Properties
  margin: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      margin: value
    };
  },
  marginTop: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginTop: value
    };
  },
  marginBottom: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginBottom: value
    };
  },
  marginLeft: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginLeft: value
    };
  },
  marginRight: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginRight: value
    };
  },
  marginHorizontal: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginHorizontal: value
    };
  },
  marginVertical: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      marginVertical: value
    };
  },
  // Padding Properties
  padding: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      padding: value
    };
  },
  paddingTop: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingTop: value
    };
  },
  paddingBottom: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingBottom: value
    };
  },
  paddingLeft: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingLeft: value
    };
  },
  paddingRight: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingRight: value
    };
  },
  paddingHorizontal: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingHorizontal: value
    };
  },
  paddingVertical: selected => {
    const value = parseDimension(selected, {
      min: 0
    });
    if (value === undefined) return {};
    return {
      paddingVertical: value
    };
  },
  // Border Properties
  borderWidth: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderWidth: value
    };
  },
  borderTopWidth: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderTopWidth: value
    };
  },
  borderBottomWidth: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderBottomWidth: value
    };
  },
  borderLeftWidth: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderLeftWidth: value
    };
  },
  borderRightWidth: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderRightWidth: value
    };
  },
  // Border Radius Properties
  borderRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderRadius: value
    };
  },
  borderTopLeftRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderTopLeftRadius: value
    };
  },
  borderTopRightRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderTopRightRadius: value
    };
  },
  borderBottomLeftRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderBottomLeftRadius: value
    };
  },
  borderBottomRightRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      borderBottomRightRadius: value
    };
  },
  // Border Color Properties (accept color strings)
  borderColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      borderColor: selected
    };
  },
  borderTopColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      borderTopColor: selected
    };
  },
  borderBottomColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      borderBottomColor: selected
    };
  },
  borderLeftColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      borderLeftColor: selected
    };
  },
  borderRightColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      borderRightColor: selected
    };
  },
  // Background Properties
  backgroundColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      backgroundColor: selected
    };
  },
  opacity: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0 || value > 1) return {};
    return {
      opacity: value
    };
  },
  // Transform Properties (simplified - only scale, rotate)
  rotation: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value)) return {};
    return {
      transform: [{
        rotate: `${value}deg`
      }]
    };
  },
  scale: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      transform: [{
        scale: value
      }]
    };
  },
  // Shadow Properties (iOS)
  shadowOpacity: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0 || value > 1) return {};
    return {
      shadowOpacity: value
    };
  },
  shadowRadius: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      shadowRadius: value
    };
  },
  shadowColor: selected => {
    if (!selected || String(selected).trim() === '') return {};
    return {
      shadowColor: selected
    };
  },
  // Elevation (Android)
  elevation: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      elevation: value
    };
  },
  // Z-Index
  zIndex: selected => {
    const value = parseInt(String(selected), 10);
    if (isNaN(value)) return {};
    return {
      zIndex: value
    };
  }
};
const viewStyleStringVariants = exports.viewStyleStringVariants = {
  position: {
    absolute: {
      position: 'absolute'
    },
    relative: {
      position: 'relative'
    }
  },
  flexDirection: {
    row: {
      flexDirection: 'row'
    },
    column: {
      flexDirection: 'column'
    },
    'row-reverse': {
      flexDirection: 'row-reverse'
    },
    'column-reverse': {
      flexDirection: 'column-reverse'
    }
  },
  justifyContent: {
    'flex-start': {
      justifyContent: 'flex-start'
    },
    'flex-end': {
      justifyContent: 'flex-end'
    },
    center: {
      justifyContent: 'center'
    },
    'space-between': {
      justifyContent: 'space-between'
    },
    'space-around': {
      justifyContent: 'space-around'
    },
    'space-evenly': {
      justifyContent: 'space-evenly'
    }
  },
  alignItems: {
    'flex-start': {
      alignItems: 'flex-start'
    },
    'flex-end': {
      alignItems: 'flex-end'
    },
    center: {
      alignItems: 'center'
    },
    stretch: {
      alignItems: 'stretch'
    },
    baseline: {
      alignItems: 'baseline'
    }
  },
  alignSelf: {
    auto: {
      alignSelf: 'auto'
    },
    'flex-start': {
      alignSelf: 'flex-start'
    },
    'flex-end': {
      alignSelf: 'flex-end'
    },
    center: {
      alignSelf: 'center'
    },
    stretch: {
      alignSelf: 'stretch'
    },
    baseline: {
      alignSelf: 'baseline'
    }
  },
  alignContent: {
    'flex-start': {
      alignContent: 'flex-start'
    },
    'flex-end': {
      alignContent: 'flex-end'
    },
    center: {
      alignContent: 'center'
    },
    stretch: {
      alignContent: 'stretch'
    },
    'space-between': {
      alignContent: 'space-between'
    },
    'space-around': {
      alignContent: 'space-around'
    }
  },
  flexWrap: {
    wrap: {
      flexWrap: 'wrap'
    },
    nowrap: {
      flexWrap: 'nowrap'
    },
    'wrap-reverse': {
      flexWrap: 'wrap-reverse'
    }
  },
  overflow: {
    visible: {
      overflow: 'visible'
    },
    hidden: {
      overflow: 'hidden'
    },
    scroll: {
      overflow: 'scroll'
    }
  },
  display: {
    flex: {
      display: 'flex'
    },
    none: {
      display: 'none'
    }
  },
  borderStyle: {
    solid: {
      borderStyle: 'solid'
    },
    dotted: {
      borderStyle: 'dotted'
    },
    dashed: {
      borderStyle: 'dashed'
    }
  },
  // Flexbox Properties
  flex: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      flex: value
    };
  },
  flexBasis: selected => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return {
      flexBasis: value
    };
  },
  flexGrow: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      flexGrow: value
    };
  },
  flexShrink: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      flexShrink: value
    };
  },
  // Gap Properties (for newer React Native versions)
  gap: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      gap: value
    };
  },
  columnGap: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      columnGap: value
    };
  },
  rowGap: selected => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return {
      rowGap: value
    };
  }
};
//# sourceMappingURL=viewStyleVariants.js.map