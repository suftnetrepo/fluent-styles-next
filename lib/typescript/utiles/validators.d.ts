/**
 * Validates if a value is a valid CSS/React Native color
 * Supports hex formats: #RGB, #RRGGBB, #RRGGBBAA
 */
export declare const isValidColor: (value: string) => boolean;
/**
 * Validates if a value is a valid number (finite and not NaN)
 */
export declare const isValidNumber: (value: unknown) => value is number;
/**
 * Validates if a value is a non-empty string
 */
export declare const isValidString: (value: unknown) => value is string;
interface Rule {
    array?: boolean;
    pattern?: RegExp;
    message: string;
    validate?: (value: any, fields: Record<string, any>) => string | undefined;
}
interface Rules {
    [key: string]: Rule[];
}
interface Values {
    [key: string]: any;
}
export interface Errors {
    [key: string]: {
        message: string;
    };
}
/**
 * Validates a set of values against a set of field rules.
 * @param values - The object of field values.
 * @param rules - The object of field rules.
 * @returns An object containing a boolean indicating if there are errors, and an object of errors.
 */
declare const validate: (values: Values, rules: Rules) => {
    hasError: boolean;
    errors: Errors;
};
export { validate };
//# sourceMappingURL=validators.d.ts.map