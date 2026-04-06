import React, { type ReactNode } from "react";
import { ViewProps, ViewStyle } from "react-native";
import { StyledTextProps } from "../text";
import { StyledTextInputProps } from "../input";
import { StyledCheckBoxProps } from "../checkBox";
import { SwitchProps } from "../switch";
import { StyledDropdownProps } from "../dropdown";
import { StyledRadioGroupProps } from "../radio";
import { StyledDatePickerProps } from "../datePicker";
import { StyledSliderProps } from "../slider";
type CompatNode = ReactNode;
interface FormContextValue {
    disabled?: boolean;
    loading?: boolean;
}
export declare const useFormContext: () => FormContextValue;
export interface StyledFormProps extends ViewProps, ViewStyle {
    disabled?: boolean;
    loading?: boolean;
    gap?: number;
    avoidKeyboard?: boolean;
    scrollable?: boolean;
    scrollPadding?: number;
    children?: CompatNode;
}
export interface FormRowProps extends ViewProps, ViewStyle {
    gap?: number;
    children?: CompatNode;
}
export interface FormSectionProps extends ViewProps, ViewStyle {
    title?: string;
    titleProps?: StyledTextProps;
    subtitle?: string;
    subtitleProps?: StyledTextProps;
    showDivider?: boolean;
    children?: CompatNode;
}
export interface FormActionsProps extends ViewProps, ViewStyle {
    horizontal?: boolean;
    gap?: number;
    children?: CompatNode;
}
/**
 * StyledForm.Row
 * Side-by-side inputs — e.g. First name / Last name.
 *
 *   <StyledForm.Row>
 *     <StyledForm.Input label="First" flex={1} />
 *     <StyledForm.Input label="Last"  flex={1} />
 *   </StyledForm.Row>
 */
declare const Row: React.FC<FormRowProps>;
/**
 * StyledForm.Section
 * Groups related inputs under a titled section.
 *
 *   <StyledForm.Section title="Personal info" subtitle="Shown on your profile">
 *     <StyledForm.Input label="Name" />
 *   </StyledForm.Section>
 */
declare const Section: React.FC<FormSectionProps>;
/**
 * StyledForm.Actions
 * Slot for submit / cancel buttons.
 *
 *   <StyledForm.Actions>
 *     <StyledButton primary block>Submit</StyledButton>
 *     <StyledButton outline block>Cancel</StyledButton>
 *   </StyledForm.Actions>
 */
declare const Actions: React.FC<FormActionsProps>;
/**
 * StyledForm.Input  →  StyledTextInput
 *
 *   <StyledForm.Input label="Email" required variant="outline" />
 */
declare const Input: React.FC<StyledTextInputProps>;
/**
 * StyledForm.Checkbox  →  StyledCheckBox
 *
 *   <StyledForm.Checkbox label="I agree to the terms" checked={agreed} onCheck={setAgreed} />
 */
declare const Checkbox: React.FC<StyledCheckBoxProps>;
/**
 * StyledForm.Switch  →  Switch
 *
 *   <StyledForm.Switch label="Email notifications" value={notifs} onChange={setNotifs} />
 */
declare const FormSwitch: React.FC<SwitchProps<any>>;
/**
 * StyledForm.Select  →  StyledDropdown
 *
 *   <StyledForm.Select label="Country" options={countries} value={country} onChange={setCountry} />
 */
declare const Select: React.FC<StyledDropdownProps>;
/**
 * StyledForm.Radio  →  StyledRadioGroup
 *
 *   <StyledForm.Radio options={plans} value={plan} onChange={setPlan} />
 */
declare const Radio: React.FC<StyledRadioGroupProps<any>>;
/**
 * StyledForm.DatePicker  →  StyledDatePicker
 *
 *   <StyledForm.DatePicker label="Date of birth" value={dob} onChange={setDob} variant="input" />
 */
declare const DatePicker: React.FC<StyledDatePickerProps>;
/**
 * StyledForm.Slider  →  StyledSlider
 *
 *   <StyledForm.Slider label="Budget" value={budget} onValueChange={setBudget} min={0} max={1000} />
 */
declare const Slider: React.FC<StyledSliderProps>;
interface FormComponent extends React.FC<StyledFormProps> {
    Row: typeof Row;
    Section: typeof Section;
    Actions: typeof Actions;
    Input: typeof Input;
    Checkbox: typeof Checkbox;
    Switch: typeof FormSwitch;
    Select: typeof Select;
    Radio: typeof Radio;
    DatePicker: typeof DatePicker;
    Slider: typeof Slider;
}
declare const StyledForm: FormComponent;
export { StyledForm };
//# sourceMappingURL=index.d.ts.map