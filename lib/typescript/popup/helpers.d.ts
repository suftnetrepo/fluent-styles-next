import type { ViewStyle } from 'react-native';
import type { PopupAnimation, PopupPosition } from './interface';
export declare function resolveAnimation(animation: PopupAnimation | undefined, position: PopupPosition): PopupAnimation;
export declare function hiddenValue(animation: PopupAnimation, position: PopupPosition): number;
export declare function visibleValue(animation: PopupAnimation): number;
export declare function animatedStyle(animation: PopupAnimation, position: PopupPosition, value: any): ViewStyle;
export declare function getBorderRadius(position: PopupPosition, round: boolean, radius: number): ViewStyle;
export declare function getPositionStyle(position: PopupPosition): ViewStyle;
//# sourceMappingURL=helpers.d.ts.map