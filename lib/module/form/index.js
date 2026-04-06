"use strict";

import React, { createContext, useContext } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Stack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import { StyledDivider } from "../divider/index.js";
import { StyledTextInput } from "../input/index.js";
import { StyledCheckBox } from "../checkBox/index.js";
import { Switch } from "../switch/index.js";
import { StyledDropdown } from "../dropdown/index.js";
import { StyledRadioGroup } from "../radio/index.js";
import { StyledDatePicker } from "../datePicker/index.js";
import { StyledSlider } from "../slider/index.js";
import { theme } from "../utiles/theme.js";

// ─── CompatNode ───────────────────────────────────────────────────────────────

// ─── Form context ─────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FormContext = /*#__PURE__*/createContext({});
export const useFormContext = () => useContext(FormContext);

// ─── Types ────────────────────────────────────────────────────────────────────

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
const Row = ({
  gap = 12,
  children,
  ...rest
}) => /*#__PURE__*/_jsx(Stack, {
  horizontal: true,
  gap: gap,
  ...rest,
  children: children
});
Row.displayName = "StyledForm.Row";

/**
 * StyledForm.Section
 * Groups related inputs under a titled section.
 *
 *   <StyledForm.Section title="Personal info" subtitle="Shown on your profile">
 *     <StyledForm.Input label="Name" />
 *   </StyledForm.Section>
 */
const Section = ({
  title,
  titleProps,
  subtitle,
  subtitleProps,
  showDivider = true,
  children,
  ...rest
}) => /*#__PURE__*/_jsxs(Stack, {
  gap: 14,
  ...rest,
  children: [(title || subtitle) && /*#__PURE__*/_jsxs(Stack, {
    gap: 2,
    children: [title && /*#__PURE__*/_jsx(StyledText, {
      fontSize: 15,
      fontWeight: "700",
      color: theme.colors.gray[900],
      ...titleProps,
      children: title
    }), subtitle && /*#__PURE__*/_jsx(StyledText, {
      fontSize: 13,
      color: theme.colors.gray[400],
      ...subtitleProps,
      children: subtitle
    }), showDivider && /*#__PURE__*/_jsx(StyledDivider, {
      borderBottomColor: theme.colors.gray[100],
      marginTop: 6
    })]
  }), children]
});
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
const Actions = ({
  horizontal = false,
  gap = 10,
  children,
  ...rest
}) => /*#__PURE__*/_jsx(Stack, {
  horizontal: horizontal,
  gap: gap,
  ...rest,
  children: children
});
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
const Input = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(StyledTextInput, {
    editable: ctx.disabled ? false : props.editable,
    loading: props.loading ?? ctx.loading,
    ...props
  });
};
Input.displayName = "StyledForm.Input";

/**
 * StyledForm.Checkbox  →  StyledCheckBox
 *
 *   <StyledForm.Checkbox label="I agree to the terms" checked={agreed} onCheck={setAgreed} />
 */
const Checkbox = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(StyledCheckBox, {
    disabled: props.disabled ?? ctx.disabled,
    ...props
  });
};
Checkbox.displayName = "StyledForm.Checkbox";

/**
 * StyledForm.Switch  →  Switch
 *
 *   <StyledForm.Switch label="Email notifications" value={notifs} onChange={setNotifs} />
 */
const FormSwitch = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(Switch, {
    disabled: props.disabled ?? ctx.disabled,
    loading: props.loading ?? ctx.loading,
    ...props
  });
};
FormSwitch.displayName = "StyledForm.Switch";

/**
 * StyledForm.Select  →  StyledDropdown
 *
 *   <StyledForm.Select label="Country" options={countries} value={country} onChange={setCountry} />
 */
const Select = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(StyledDropdown, {
    disabled: props.disabled ?? ctx.disabled,
    ...props
  });
};
Select.displayName = "StyledForm.Select";

/**
 * StyledForm.Radio  →  StyledRadioGroup
 *
 *   <StyledForm.Radio options={plans} value={plan} onChange={setPlan} />
 */
const Radio = props => /*#__PURE__*/_jsx(StyledRadioGroup, {
  ...props
});
Radio.displayName = "StyledForm.Radio";

/**
 * StyledForm.DatePicker  →  StyledDatePicker
 *
 *   <StyledForm.DatePicker label="Date of birth" value={dob} onChange={setDob} variant="input" />
 */
const DatePicker = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(StyledDatePicker, {
    disabled: props.disabled ?? ctx.disabled,
    ...props
  });
};
DatePicker.displayName = "StyledForm.DatePicker";

/**
 * StyledForm.Slider  →  StyledSlider
 *
 *   <StyledForm.Slider label="Budget" value={budget} onValueChange={setBudget} min={0} max={1000} />
 */
const Slider = props => {
  const ctx = useFormContext();
  return /*#__PURE__*/_jsx(StyledSlider, {
    disabled: props.disabled ?? ctx.disabled,
    ...props
  });
};
Slider.displayName = "StyledForm.Slider";

// ─── StyledForm (root) ────────────────────────────────────────────────────────

const StyledForm = ({
  disabled,
  loading,
  gap = 16,
  avoidKeyboard = true,
  scrollable = false,
  scrollPadding = 40,
  children,
  ...rest
}) => {
  const fields = /*#__PURE__*/_jsx(Stack, {
    gap: gap,
    ...rest,
    children: children
  });
  const content = scrollable ? /*#__PURE__*/_jsx(ScrollView, {
    keyboardShouldPersistTaps: "handled",
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
      paddingBottom: scrollPadding
    },
    children: fields
  }) : fields;
  return /*#__PURE__*/_jsx(FormContext.Provider, {
    value: {
      disabled,
      loading
    },
    children: avoidKeyboard ? /*#__PURE__*/_jsx(KeyboardAvoidingView, {
      behavior: Platform.OS === "ios" ? "padding" : "height",
      style: {
        flex: 1
      },
      children: content
    }) : content
  });
};
StyledForm.displayName = "StyledForm";
StyledForm.Row = Row;
StyledForm.Section = Section;
StyledForm.Actions = Actions;
StyledForm.Input = Input;
StyledForm.Checkbox = Checkbox;
StyledForm.Switch = FormSwitch;
StyledForm.Select = Select;
StyledForm.Radio = Radio;
StyledForm.DatePicker = DatePicker;
StyledForm.Slider = Slider;
export { StyledForm };
//# sourceMappingURL=index.js.map