import React, { createContext, useContext, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Stack } from "../stack";
import { StyledText, StyledTextProps } from "../text";
import { StyledDivider } from "../divider";
import { StyledTextInput, StyledTextInputProps } from "../input";
import { StyledCheckBox, StyledCheckBoxProps } from "../checkBox";
import { Switch, SwitchProps } from "../switch";
import { StyledDropdown, StyledDropdownProps } from "../dropdown";
import { StyledRadioGroup, StyledRadioGroupProps } from "../radio";
import { StyledDatePicker, StyledDatePickerProps } from "../datePicker";
import { StyledSlider, StyledSliderProps } from "../slider";
import { theme } from "../utiles/theme";

// ─── CompatNode ───────────────────────────────────────────────────────────────
type CompatNode = ReactNode;

// ─── Form context ─────────────────────────────────────────────────────────────
interface FormContextValue {
  disabled?: boolean;
  loading?:  boolean;
}

const FormContext = createContext<FormContextValue>({});
export const useFormContext = () => useContext(FormContext);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StyledFormProps extends ViewProps, ViewStyle {
  disabled?:      boolean;
  loading?:       boolean;
  gap?:           number;
  avoidKeyboard?: boolean;
  scrollable?:    boolean;
  scrollPadding?: number;
  children?:      CompatNode;
}

export interface FormRowProps extends ViewProps, ViewStyle {
  gap?:      number;
  children?: CompatNode;
}

export interface FormSectionProps extends ViewProps, ViewStyle {
  title?:         string;
  titleProps?:    StyledTextProps;
  subtitle?:      string;
  subtitleProps?: StyledTextProps;
  showDivider?:   boolean;
  children?:      CompatNode;
}

export interface FormActionsProps extends ViewProps, ViewStyle {
  horizontal?: boolean;
  gap?:        number;
  children?:   CompatNode;
}

// ─── Layout sub-components ────────────────────────────────────────────────────

/**
 * StyledForm.Row
 * Side-by-side inputs — e.g. First name / Last name.
 *
 *   <StyledForm.Row>
 *     <StyledForm.Input label="First" flex={1} />
 *     <StyledForm.Input label="Last"  flex={1} />
 *   </StyledForm.Row>
 */
const Row: React.FC<FormRowProps> = ({ gap = 12, children, ...rest }) => (
  <Stack horizontal gap={gap} {...rest}>
    {children}
  </Stack>
);
Row.displayName = "StyledForm.Row";

/**
 * StyledForm.Section
 * Groups related inputs under a titled section.
 *
 *   <StyledForm.Section title="Personal info" subtitle="Shown on your profile">
 *     <StyledForm.Input label="Name" />
 *   </StyledForm.Section>
 */
const Section: React.FC<FormSectionProps> = ({
  title,
  titleProps,
  subtitle,
  subtitleProps,
  showDivider = true,
  children,
  ...rest
}) => (
  <Stack gap={14} {...rest}>
    {(title || subtitle) && (
      <Stack gap={2}>
        {title && (
          <StyledText
            fontSize={15}
            fontWeight="700"
            color={theme.colors.gray[900]}
            {...titleProps}
          >
            {title}
          </StyledText>
        )}
        {subtitle && (
          <StyledText fontSize={13} color={theme.colors.gray[400]} {...subtitleProps}>
            {subtitle}
          </StyledText>
        )}
        {showDivider && (
          <StyledDivider borderBottomColor={theme.colors.gray[100]} marginTop={6} />
        )}
      </Stack>
    )}
    {children}
  </Stack>
);
Section.displayName = "StyledForm.Section";

/**
 * StyledForm.Actions
 * Slot for submit / cancel buttons.
 *
 *   <StyledForm.Actions>
 *     <StyledButton primary block>Submit</StyledButton>
 *     <StyledButton outline block>Cancel</StyledButton>
 *   </StyledForm.Actions>
 */
const Actions: React.FC<FormActionsProps> = ({
  horizontal = false,
  gap = 10,
  children,
  ...rest
}) => (
  <Stack horizontal={horizontal} gap={gap} {...rest}>
    {children}
  </Stack>
);
Actions.displayName = "StyledForm.Actions";

// ─── Input sub-components — thin aliases that read FormContext ────────────────
// Each one forwards all props of the underlying component unchanged.
// The only addition: they read disabled/loading from FormContext so form-level
// state propagates without prop drilling.

/**
 * StyledForm.Input  →  StyledTextInput
 *
 *   <StyledForm.Input label="Email" required variant="outline" />
 */
const Input: React.FC<StyledTextInputProps> = (props) => {
  const ctx = useFormContext();
  return (
    <StyledTextInput
      editable={ctx.disabled ? false : props.editable}
      loading={props.loading ?? ctx.loading}
      {...props}
    />
  );
};
Input.displayName = "StyledForm.Input";

/**
 * StyledForm.Checkbox  →  StyledCheckBox
 *
 *   <StyledForm.Checkbox label="I agree to the terms" checked={agreed} onCheck={setAgreed} />
 */
const Checkbox: React.FC<StyledCheckBoxProps> = (props) => {
  const ctx = useFormContext();
  return (
    <StyledCheckBox
      disabled={props.disabled ?? ctx.disabled}
      {...props}
    />
  );
};
Checkbox.displayName = "StyledForm.Checkbox";

/**
 * StyledForm.Switch  →  Switch
 *
 *   <StyledForm.Switch label="Email notifications" value={notifs} onChange={setNotifs} />
 */
const FormSwitch: React.FC<SwitchProps<any>> = (props) => {
  const ctx = useFormContext();
  return (
    <Switch
      disabled={props.disabled ?? ctx.disabled}
      loading={props.loading ?? ctx.loading}
      {...props}
    />
  );
};
FormSwitch.displayName = "StyledForm.Switch";

/**
 * StyledForm.Select  →  StyledDropdown
 *
 *   <StyledForm.Select label="Country" options={countries} value={country} onChange={setCountry} />
 */
const Select: React.FC<StyledDropdownProps> = (props) => {
  const ctx = useFormContext();
  return (
    <StyledDropdown
      disabled={props.disabled ?? ctx.disabled}
      {...props}
    />
  );
};
Select.displayName = "StyledForm.Select";

/**
 * StyledForm.Radio  →  StyledRadioGroup
 *
 *   <StyledForm.Radio options={plans} value={plan} onChange={setPlan} />
 */
const Radio: React.FC<StyledRadioGroupProps<any>> = (props) => (
  <StyledRadioGroup {...props} />
);
Radio.displayName = "StyledForm.Radio";

/**
 * StyledForm.DatePicker  →  StyledDatePicker
 *
 *   <StyledForm.DatePicker label="Date of birth" value={dob} onChange={setDob} variant="input" />
 */
const DatePicker: React.FC<StyledDatePickerProps> = (props) => {
  const ctx = useFormContext();
  return (
    <StyledDatePicker
      disabled={props.disabled ?? ctx.disabled}
      {...props}
    />
  );
};
DatePicker.displayName = "StyledForm.DatePicker";

/**
 * StyledForm.Slider  →  StyledSlider
 *
 *   <StyledForm.Slider label="Budget" value={budget} onValueChange={setBudget} min={0} max={1000} />
 */
const Slider: React.FC<StyledSliderProps> = (props) => {
  const ctx = useFormContext();
  return (
    <StyledSlider
      disabled={props.disabled ?? ctx.disabled}
      {...props}
    />
  );
};
Slider.displayName = "StyledForm.Slider";

// ─── StyledForm (root) ────────────────────────────────────────────────────────

interface FormComponent extends React.FC<StyledFormProps> {
  // layout
  Row:        typeof Row;
  Section:    typeof Section;
  Actions:    typeof Actions;
  // inputs
  Input:      typeof Input;
  Checkbox:   typeof Checkbox;
  Switch:     typeof FormSwitch;
  Select:     typeof Select;
  Radio:      typeof Radio;
  DatePicker: typeof DatePicker;
  Slider:     typeof Slider;
}

const StyledForm: FormComponent = ({
  disabled,
  loading,
  gap           = 16,
  avoidKeyboard = true,
  scrollable    = false,
  scrollPadding = 40,
  children,
  ...rest
}) => {
  const fields = (
    <Stack gap={gap} {...rest}>
      {children}
    </Stack>
  );

  const content = scrollable ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: scrollPadding }}
    >
      {fields}
    </ScrollView>
  ) : fields;

  return (
    <FormContext.Provider value={{ disabled, loading }}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {content}
        </KeyboardAvoidingView>
      ) : content}
    </FormContext.Provider>
  );
};

StyledForm.displayName  = "StyledForm";
StyledForm.Row          = Row;
StyledForm.Section      = Section;
StyledForm.Actions      = Actions;
StyledForm.Input        = Input;
StyledForm.Checkbox     = Checkbox;
StyledForm.Switch       = FormSwitch;
StyledForm.Select       = Select;
StyledForm.Radio        = Radio;
StyledForm.DatePicker   = DatePicker;
StyledForm.Slider       = Slider;

export { StyledForm };