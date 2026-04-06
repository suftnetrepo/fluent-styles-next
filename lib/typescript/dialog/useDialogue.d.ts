import { DialogueAction, DialogueProps } from './dialogue';
export type ShowDialogueOptions = Omit<DialogueProps, 'onDismiss'> & {
    actions?: DialogueAction[];
};
export type ConfirmOptions = {
    title: string;
    message?: string;
    icon?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    theme?: "light" | "dark";
};
export type DialogueAPI = {
    show: (options: ShowDialogueOptions) => number;
    dismiss: (id: number) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
    alert: (title: string, message?: string, icon?: string, theme?: "light" | "dark") => Promise<void>;
};
export declare function useDialogue(): DialogueAPI;
//# sourceMappingURL=useDialogue.d.ts.map