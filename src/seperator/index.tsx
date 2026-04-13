import { theme } from "../utiles/theme";
import { Stack, StackProps } from "../stack";
import { StyledText } from "../text";
import React from "react";

interface SeperatorProps extends StackProps {
    leftLabel: string;
    leftLabelProps?: React.ComponentProps<typeof StyledText>;
    rightLabel?: string;
    rightLabelProps?: React.ComponentProps<typeof StyledText>;
}

const StyledSeperator = (
    { leftLabel, leftLabelProps, rightLabel, rightLabelProps, ref, ...rest }: SeperatorProps & { ref?: React.Ref<React.ComponentRef<typeof Stack>> },
) => {
        return (
            <Stack
                horizontal
                justifyContent="space-between"
                alignItems="center"
                ref={ref}
                {...rest}
            >
                <StyledText
                    marginHorizontal={4}
                    fontSize={theme.fontSize.medium}
                    fontWeight={theme.fontWeight.semiBold}
                    color={theme.colors.gray[500]}
                    {...leftLabelProps}
                >
                    {leftLabel}
                </StyledText>
                {
                    rightLabel && (
                        <StyledText
                            marginHorizontal={4}
                            fontSize={theme.fontSize.small}
                            fontWeight={theme.fontWeight.normal}
                            color={theme.colors.gray[500]}
                            {...rightLabelProps}
                        >
                            {rightLabel}
                        </StyledText>
                    )   
                }
            </Stack>
        );
};

StyledSeperator.displayName = "StyledSeperator";

export { StyledSeperator };
export type { SeperatorProps };
