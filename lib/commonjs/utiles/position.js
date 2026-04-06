"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPositionStyles = getPositionStyles;
const DEFAULT_OFFSET = {
  x: 0,
  y: 0
};

/**
 * Returns absolute-position styles that anchor a portal element at the
 * requested screen position, with an optional pixel offset applied on top.
 *
 * ⚠️  The `'center'` variant uses a negative-50 translate trick that works
 *     well for modals/toasts but assumes the content has a known or bounded
 *     size.  For content of variable width/height, prefer wrapping in a
 *     container that measures itself and passes explicit offsets instead.
 */
function getPositionStyles(position = 'center', offset = DEFAULT_OFFSET) {
  const base = {
    position: 'absolute'
  };
  switch (position) {
    case 'center':
      {
        const style = {
          ...base,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        };
        // Only add a transform when the caller explicitly wants an offset —
        // avoids an unnecessary layout pass in the common no-offset case.
        if (offset.x !== 0 || offset.y !== 0) {
          style.transform = [{
            translateX: offset.x
          }, {
            translateY: offset.y
          }];
        }
        return style;
      }
    case 'top':
      return {
        ...base,
        top: offset.y,
        left: 0,
        right: 0,
        alignItems: 'center'
      };
    case 'bottom':
      return {
        ...base,
        bottom: offset.y,
        left: 0,
        right: 0,
        alignItems: 'center'
      };
    case 'top-left':
      return {
        ...base,
        top: offset.y,
        left: offset.x
      };
    case 'top-right':
      return {
        ...base,
        top: offset.y,
        right: offset.x
      };
    case 'bottom-left':
      return {
        ...base,
        bottom: offset.y,
        left: offset.x
      };
    case 'bottom-right':
      return {
        ...base,
        bottom: offset.y,
        right: offset.x
      };
    default:
      {
        // Exhaustive check — TypeScript will error if a new Position variant is
        // added to the union without a corresponding case above.
        const _exhaustive = position;
        console.warn(`[Portal] Unknown position "${_exhaustive}" – falling back to absolute origin.`);
        return base;
      }
  }
}
//# sourceMappingURL=position.js.map