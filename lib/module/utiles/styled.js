"use strict";

import React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
const styled = (Component, {
  base,
  variants
} = {}) => {
  const StyledComponent = props => {
    const styles = {
      ...(base || {})
    };
    const options = props;
    const incomingStyle = options.style;
    const cleanProps = {
      ...options
    };
    if (variants) {
      Object.keys(variants).forEach(category => {
        delete cleanProps[category];
        const variantSelected = options[category];
        const variantValue = variants[category];
        if (typeof variantValue === "function") {
          const style = variantValue(variantSelected, options);
          if (style) Object.assign(styles, style);
        } else if (variantValue?.[variantSelected]) {
          const value = variantValue[variantSelected];
          Object.assign(styles, typeof value === "function" ? value(variantSelected, options) : value);
        }
      });
    }
    return /*#__PURE__*/_jsx(Component, {
      ...cleanProps,
      style: [styles, incomingStyle]
    });
  };
  StyledComponent.displayName = `Styled(${typeof Component === "string" ? Component : Component.displayName ?? Component.name ?? "Component"})`;
  return StyledComponent;
};
export { styled };
//# sourceMappingURL=styled.js.map