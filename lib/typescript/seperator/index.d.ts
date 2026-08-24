import { Stack, StackProps } from "../stack";
import { StyledText } from "../text";
import React from "react";
interface SeperatorProps extends StackProps {
    leftLabel: string;
    leftLabelProps?: React.ComponentProps<typeof StyledText>;
    rightLabel?: string;
    rightLabelProps?: React.ComponentProps<typeof StyledText>;
}
declare const StyledSeperator: {
    ({ leftLabel, leftLabelProps, rightLabel, rightLabelProps, ref, ...rest }: SeperatorProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
export { StyledSeperator };
export type { SeperatorProps };
//# sourceMappingURL=index.d.ts.map