
import React, { forwardRef } from 'react';
import {
    TextInput,
    TextInputProps,
    TextStyle
} from 'react-native';
import { styled } from '../utiles/styled';
import { theme } from '../utiles/theme';
import { viewStyleVariants } from '../utiles/viewStyleVariants';
import { StyledText, StyledTextProps } from '../text'
import { Stack } from '../stack'

type InputTextProps = TextInputProps & TextStyle

const TextInputBase = styled<InputTextProps>(TextInput, {
    base: {
        borderColor: theme.colors.gray[200],
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: theme.colors.gray[1],
        flex : 1,
        color: theme.colors.gray[800],
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: theme.fontSize.normal,
        minHeight: 48,
    },
    variants: {
        ...viewStyleVariants,
        fontSize: (selected: string) => {
            const size = selected || theme.fontSize.normal;
            if (isNaN(Number(size))) {
                // throw new Error('Invalid fontSize value');
            }
            return { fontSize: Number(size) };
        },

        fontWeight: (selected: string) => {
            const weight = selected || theme.fontWeight.normal;
            if (isNaN(Number(weight))) {
                // throw new Error('Invalid fontWeight value');
            }
            return { fontWeight: weight as any };
        },
    }
});

interface InputProps extends Omit<InputTextProps, 'ref'> {
    label?: string;
    labelProps?: StyledTextProps;
    errorMessage?: string;
    error?: boolean;
    errorProps?: any;
    borderColor?: string;
    multiline?: boolean;
    numberOfLines?: number;
}

const StyledTextInput = forwardRef<React.ComponentRef<typeof TextInputBase>, InputProps>(
    (
        {
            label,
            labelProps,
            errorMessage,
            error = false,
            errorProps,
            borderColor = theme.colors.gray[200],
            placeholder,
            editable = true,
            ...rest
        },
        ref
    ) => {
        const inputBorderColor = error ? theme.colors.red[500] : borderColor;
        const inputOpacity = !editable ? 0.6 : 1;

        return (
            <Stack vertical>
                {label && <StyledText marginBottom={4} {...labelProps}>{label}</StyledText>}
                <TextInputBase
                    ref={ref}
                    placeholder={placeholder}
                    editable={editable}
                    borderColor={inputBorderColor}
                    opacity={inputOpacity}
                    {...rest}
                />
                {error && errorMessage ? (
                    <StyledText marginTop={4} fontSize={theme.fontSize.small} color={theme.colors.red[500]} {...errorProps}>{errorMessage}</StyledText>
                ) : null}
            </Stack>
        );
    }
);

export { StyledTextInput, };
export type { InputTextProps as StyledTextInputProps };


