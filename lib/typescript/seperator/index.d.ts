import { StackProps } from "../stack";
import { StyledText } from "../text";
import React from "react";
interface SeperatorProps extends StackProps {
    leftLabel: string;
    leftLabelProps?: React.ComponentProps<typeof StyledText>;
    rightLabel?: string;
    rightLabelProps?: React.ComponentProps<typeof StyledText>;
}
declare const StyledSeperator: React.ForwardRefExoticComponent<SeperatorProps & React.RefAttributes<any>>;
export { StyledSeperator };
export type { SeperatorProps };
//# sourceMappingURL=index.d.ts.map