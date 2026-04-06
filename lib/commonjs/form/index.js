"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormContext = exports.StyledForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _index = require("../stack/index.js");
var _index2 = require("../text/index.js");
var _index3 = require("../divider/index.js");
var _index4 = require("../input/index.js");
var _index5 = require("../checkBox/index.js");
var _index6 = require("../switch/index.js");
var _index7 = require("../dropdown/index.js");
var _index8 = require("../radio/index.js");
var _index9 = require("../datePicker/index.js");
var _index0 = require("../slider/index.js");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── CompatNode ───────────────────────────────────────────────────────────────

// ─── Form context ─────────────────────────────────────────────────────────────

const FormContext = /*#__PURE__*/(0, _react.createContext)({});
const useFormContext = () => (0, _react.useContext)(FormContext);

// ─── Types ────────────────────────────────────────────────────────────────────
exports.useFormContext = useFormContext;
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
  gap: 14,
  ...rest,
  children: [(title || subtitle) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    gap: 2,
    children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      fontSize: 15,
      fontWeight: "700",
      color: _theme.theme.colors.gray[900],
      ...titleProps,
      children: title
    }), subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      fontSize: 13,
      color: _theme.theme.colors.gray[400],
      ...subtitleProps,
      children: subtitle
    }), showDivider && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledDivider, {
      borderBottomColor: _theme.theme.colors.gray[100],
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledTextInput, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.StyledCheckBox, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.Switch, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index7.StyledDropdown, {
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
const Radio = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index8.StyledRadioGroup, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index9.StyledDatePicker, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index0.StyledSlider, {
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
  const fields = /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    gap: gap,
    ...rest,
    children: children
  });
  const content = scrollable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
    keyboardShouldPersistTaps: "handled",
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
      paddingBottom: scrollPadding
    },
    children: fields
  }) : fields;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(FormContext.Provider, {
    value: {
      disabled,
      loading
    },
    children: avoidKeyboard ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
      behavior: _reactNative.Platform.OS === "ios" ? "padding" : "height",
      style: {
        flex: 1
      },
      children: content
    }) : content
  });
};
exports.StyledForm = StyledForm;
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
//# sourceMappingURL=index.js.map