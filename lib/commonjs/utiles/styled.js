"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styled = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...cleanProps,
      style: [styles, incomingStyle]
    });
  };
  StyledComponent.displayName = `Styled(${typeof Component === "string" ? Component : Component.displayName ?? Component.name ?? "Component"})`;
  return StyledComponent;
};
exports.styled = styled;
//# sourceMappingURL=styled.js.map