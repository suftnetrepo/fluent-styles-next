import React from 'react';
import { ComponentTheme, DialogueColors, DIALOGUE_DARK, DIALOGUE_LIGHT } from '../utiles/theme';
export type DialogueAction = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'destructive';
};
export type DialogueProps = {
    title: string;
    message?: string;
    icon?: string;
    actions: DialogueAction[];
    onDismiss?: () => void;
    theme?: ComponentTheme;
    colors?: Partial<DialogueColors>;
};
export declare const Dialogue: React.FC<DialogueProps>;
export { DIALOGUE_DARK, DIALOGUE_LIGHT };
export type { DialogueColors };
//# sourceMappingURL=dialogue.d.ts.map