import type { ViewStyle } from 'react-native';
import type { Offset, Position } from '../portal/types';
/**
 * Returns absolute-position styles that anchor a portal element at the
 * requested screen position, with an optional pixel offset applied on top.
 *
 * ⚠️  The `'center'` variant uses a negative-50 translate trick that works
 *     well for modals/toasts but assumes the content has a known or bounded
 *     size.  For content of variable width/height, prefer wrapping in a
 *     container that measures itself and passes explicit offsets instead.
 */
export declare function getPositionStyles(position?: Position, offset?: Offset): ViewStyle;
//# sourceMappingURL=position.d.ts.map