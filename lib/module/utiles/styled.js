"use strict";

import React, { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
const styled = (Component, {
  base,
  variants
} = {}) => {
  return /*#__PURE__*/forwardRef((props, ref) => {
    const styles = {
      ...(base || {})
    };
    const options = props;
    if (variants) {
      Object.keys(variants).forEach(category => {
        const variantSelected = options[category];
        const variantValue = variants[category];
        if (typeof variantValue === "function") {
          const style = variantValue(variantSelected, options);
          if (style) {
            Object.assign(styles, style);
          }
        } else if (variantValue && variantValue[variantSelected]) {
          const value = variantValue[variantSelected];
          Object.assign(styles, typeof value === "function" ? value(variantSelected, options) : value);
        }
      });
    }
    return /*#__PURE__*/_jsx(Component, {
      ...props,
      style: styles,
      ref: ref
    });
  });
};
export { styled };
//# sourceMappingURL=styled.js.map