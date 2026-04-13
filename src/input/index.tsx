import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native'

import { styled }               from '../utiles/styled'
import { theme }                from '../utiles/theme'
import { viewStyleVariants } from '../utiles/viewStyleVariants'
import { StyledText }           from '../text'
import type { StyledTextProps } from '../text'

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputSize     = 'sm' | 'md' | 'lg'
export type InputVariant  = 'outline' | 'filled' | 'underline' | 'ghost'

export type InputAddon = {
  /** Text label (e.g. "https://", ".com"). */
  text?:     string
  /** Any ReactNode — icon, button, spinner, etc. */
  node?:     React.ReactNode
  /** Background colour for the addon strip. Defaults to gray[100]. */
  bg?:       string
  /** Text / icon colour inside the addon. */
  color?:    string
  /** Called when the addon strip is tapped. */
  onPress?:  () => void
}

type CardComponentProps =  TextInputProps & TextStyle;

export interface StyledTextInputProps
  extends CardComponentProps {

  // ── Label / meta ───────────────────────────────────────────────────────
  label?:             string
  labelProps?:        StyledTextProps
  /** Small required asterisk after the label. */
  required?:          boolean
  /** Assistive text rendered below the input. Hidden when error shows. */
  helperText?:        string
  helperProps?:       StyledTextProps
  /** Error message — turns border red + replaces helper text. */
  errorMessage?:      string
  errorProps?:        StyledTextProps
  /** Explicit error flag (shows red border even without errorMessage). */
  error?:             boolean

  // ── Character counter ──────────────────────────────────────────────────
  /**
   * Show a live character counter (e.g. `12 / 100`).
   * Pair with `maxLength` for the upper bound.
   */
  showCounter?:       boolean

  // ── Icons / addons ─────────────────────────────────────────────────────
  /** Node rendered inside the input on the left (e.g. search icon). */
  leftIcon?:          React.ReactNode
  /** Node rendered inside the input on the right (e.g. calendar icon). */
  rightIcon?:         React.ReactNode
  /**
   * Addon strip attached to the left edge of the input (outside the border).
   * Good for currency symbols, URL prefixes, country codes.
   */
  leftAddon?:         InputAddon
  /**
   * Addon strip attached to the right edge (outside the border).
   * Good for domain suffixes, units, action buttons.
   */
  rightAddon?:        InputAddon

  // ── Clear button ───────────────────────────────────────────────────────
  /** Show a × clear button when the field has content. @default false */
  clearable?:         boolean

  // ── Loading state ──────────────────────────────────────────────────────
  /** Replace the right icon with a spinner and block input. @default false */
  loading?:           boolean

  // ── Appearance ────────────────────────────────────────────────────────
  /**
   * Visual style variant.
   * - `outline`   — border on all sides (default)
   * - `filled`    — light background, no border
   * - `underline` — bottom border only (like Material Design)
   * - `ghost`     — no border, no background; bare input
   */
  variant?:           InputVariant

  /** Padding / height scale. @default 'md' */
  size?:              InputSize

  /** Explicit border colour. Overrides error/focus colours when set. */
  borderColor?:       string

  /** Focus-highlight colour. @default theme.colors.indigo[500] */
  focusColor?:        string

  // ── Float label (animated placeholder) ────────────────────────────────
  /**
   * When true, the `label` animates up and shrinks when the input is
   * focused or has content (Material-style float). Requires `label`.
   */
  floatLabel?:        boolean

  // ── Style overrides ────────────────────────────────────────────────────
  containerStyle?:    ViewStyle
  inputWrapStyle?:    ViewStyle
  inputStyle?:        TextStyle

  // ── Pass-through style props (from original) ───────────────────────────
  fontSize?:          number
  fontWeight?:        TextStyle['fontWeight']
  
}

const TextInputBase = styled<CardComponentProps>(TextInput, {
    base: {
        borderColor: theme.colors.gray[200],
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

export interface StyledTextInputHandle extends StyledTextInputProps {
  focus:      () => void
  blur:       () => void
  clear:      () => void
  isFocused:  () => boolean
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE: Record<InputSize, {
  paddingH:    number
  paddingV:    number
  minHeight:   number
  fontSize:    number
  iconSize:    number
  addonPad:    number
}> = {
  sm: { paddingH: 10, paddingV: 7,  minHeight: 36, fontSize: 13, iconSize: 14, addonPad: 10 },
  md: { paddingH: 16, paddingV: 11, minHeight: 48, fontSize: 15, iconSize: 16, addonPad: 14 },
  lg: { paddingH: 18, paddingV: 14, minHeight: 56, fontSize: 17, iconSize: 18, addonPad: 16 },
}

// ─── Variant style builders ───────────────────────────────────────────────────

function variantWrapStyle(
  variant:     InputVariant,
  borderColor: string,
  bg:          string,
  focused:     boolean,
  focusColor:  string,
): ViewStyle {
  const bc = focused ? focusColor : borderColor

  switch (variant) {
    case 'filled':
      return {
        backgroundColor: focused ? '#fff' : bg,
        borderWidth:     focused ? 1.5 : 0,
        borderColor:     bc,
      }
    case 'underline':
      return {
        backgroundColor: 'transparent',
        borderBottomWidth: focused ? 2 : 1.5,
        borderBottomColor: bc,
        borderRadius:    0,
      }
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderWidth:     0,
      }
    default: // outline
      return {
        backgroundColor: '#fff',
        borderWidth:     focused ? 1.5 : 1,
        borderColor:     bc,
      }
  }
}

// ─── Animated floating label ──────────────────────────────────────────────────

const FloatLabel: React.FC<{
  label:      string
  focused:    boolean
  hasValue:   boolean
  focusColor: string
  size:       InputSize
}> = ({ label, focused, hasValue, focusColor, size }) => {
  const sz         = SIZE[size]
  const floated    = focused || hasValue
  const topAnim    = useRef(new Animated.Value(floated ? 0 : 1)).current
  const prevFloated = useRef(floated)

  if (prevFloated.current !== floated) {
    prevFloated.current = floated
    Animated.timing(topAnim, {
      toValue:         floated ? 0 : 1,
      duration:        180,
      useNativeDriver: false,
    }).start()
  }

  const top = topAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [-(sz.fontSize * 0.9), sz.paddingV + 1],
  })
  const fontSize = topAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [sz.fontSize * 0.78, sz.fontSize],
  })
  const color = floated ? focusColor : theme.colors.gray[400]

  return (
    <Animated.Text
      style={[
        fl.label,
        { top, fontSize, color, backgroundColor: '#fff', zIndex: 1 },
      ]}
      pointerEvents="none"
    >
      {label}
    </Animated.Text>
  )
}

const fl = StyleSheet.create({
  label: {
    position:          'absolute',
    left:              14,
    paddingHorizontal: 3,
    fontWeight:        '500',
  },
})

// ─── Addon strip ──────────────────────────────────────────────────────────────

const AddonStrip: React.FC<{
  addon:   InputAddon
  size:    InputSize
  side:    'left' | 'right'
  variant: InputVariant
}> = ({ addon, size, side, variant }) => {
  const sz       = SIZE[size]
  const bg       = addon.bg ?? theme.colors.gray[100]
  const color    = addon.color ?? theme.colors.gray[600]
  const isLeft   = side === 'left'
  const isUnder  = variant === 'underline' || variant === 'ghost'

  const content  = addon.node ?? (
    <Text style={{ fontSize: sz.fontSize, color, fontWeight: '500' }}>
      {addon.text}
    </Text>
  )

  const Wrapper  = addon.onPress ? TouchableOpacity : View

  return (
    <Wrapper
      onPress={addon.onPress}
      activeOpacity={addon.onPress ? 0.7 : 1}
      style={[
        ad.strip,
        {
          paddingHorizontal: sz.addonPad,
          backgroundColor:   isUnder ? 'transparent' : bg,
          borderLeftWidth:   isLeft  ? 0 : (isUnder ? 0 : StyleSheet.hairlineWidth),
          borderRightWidth:  isLeft  ? (isUnder ? 0 : StyleSheet.hairlineWidth) : 0,
          borderColor:       theme.colors.gray[200],
          borderTopLeftRadius:    isLeft  ? 8 : 0,
          borderBottomLeftRadius: isLeft  ? 8 : 0,
          borderTopRightRadius:   isLeft  ? 0 : 8,
          borderBottomRightRadius: isLeft ? 0 : 8,
        },
      ]}
    >
      {content}
    </Wrapper>
  )
}

const ad = StyleSheet.create({
  strip: {
    alignItems:     'center',
    justifyContent: 'center',
    alignSelf:      'stretch',
  },
})

// ─── StyledTextInput ──────────────────────────────────────────────────────────

export const StyledTextInput = (
  {
    // Label / meta
    label,
    labelProps,
    required          = false,
    helperText,
    helperProps,
    errorMessage,
    errorProps,
    error             = false,

    // Counter
    showCounter       = false,

    // Icons
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,

    // Clear + loading
    clearable         = false,
    loading           = false,

    // Appearance
    variant           = 'outline',
    size              = 'md',
    borderColor:      borderColorProp,
    focusColor        = theme.colors.indigo?.[500] ?? '#6366f1',
    floatLabel        = false,

    // Styles
    containerStyle,
    inputWrapStyle,
    inputStyle,

    // Pass-through style props
    fontSize: fontSizeProp,
    fontWeight: fontWeightProp,

    // TextInput props
    value,
    defaultValue,
    onChangeText,
    placeholder,
    editable          = true,
    multiline         = false,
    numberOfLines,
    maxLength,
    onFocus: onFocusProp,
    onBlur:  onBlurProp,
    ref,
    ...rest
  }: StyledTextInputProps & { ref?: React.Ref<React.ComponentRef<typeof TextInputBase>> },
) => {
    const [focused,     setFocused]     = useState(false)
    const [localValue,  setLocalValue]  = useState(defaultValue ?? '')
    const inputRef = useRef<TextInput>(null)

    const currentValue = value ?? localValue
    const hasValue     = currentValue.length > 0

    // ── Imperative handle ─────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      focus:     () => inputRef.current?.focus(),
      blur:      () => inputRef.current?.blur(),
      clear:     () => { handleChange('') },
      isFocused: () => inputRef.current?.isFocused() ?? false,
    }))

    const handleChange = useCallback((text: string) => {
      if (value === undefined) setLocalValue(text)
      onChangeText?.(text)
    }, [value, onChangeText])

    const handleFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true)
      onFocusProp?.(e)
    }, [onFocusProp])

    const handleBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false)
      onBlurProp?.(e)
    }, [onBlurProp])

    // ── Resolved colours ──────────────────────────────────────────────────
    const hasError   = error || !!errorMessage
    const sz         = SIZE[size]

    const resolvedBorderColor = borderColorProp
      ?? (hasError ? theme.colors.red[500] : theme.colors.gray[200])

    const resolvedFocusColor = hasError
      ? theme.colors.red[500]
      : focusColor

    const wrapStyle = variantWrapStyle(
      variant,
      resolvedBorderColor,
      theme.colors.gray[50] ?? '#fafafa',
      focused,
      resolvedFocusColor,
    )

    const baseRadius = variant === 'underline' || variant === 'ghost' ? 0 : 8
    const hasLeftAddon  = !!leftAddon
    const hasRightAddon = !!rightAddon

    // ── Right-side icons (priority: loading > clear > rightIcon) ─────────
    const resolvedRightNode = loading ? (
      <ActivityIndicator size="small" color={theme.colors.gray[400]} />
    ) : (clearable && hasValue) ? (
      <TouchableOpacity
        onPress={() => handleChange('')}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Clear input"
      >
        <View style={[ic.clearBtn, { width: sz.iconSize + 4, height: sz.iconSize + 4, borderRadius: (sz.iconSize + 4) / 2 }]}>
          <Text style={{ fontSize: sz.iconSize * 0.65, color: theme.colors.gray[400], fontWeight: '700' }}>✕</Text>
        </View>
      </TouchableOpacity>
    ) : rightIcon ?? null

    // ── Render ────────────────────────────────────────────────────────────
    return (
      <View style={[S.container, containerStyle]}>

        {/* Label row */}
        {label && !floatLabel ? (
          <View style={S.label_row}>
            <StyledText
              fontSize={theme.fontSize.small}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.colors.gray[700]}
            
              marginBottom={6}
              {...labelProps}
            >
              {label}
              {required ? (
                <StyledText color={theme.colors.red[500]}>{' *'}</StyledText>
              ) : null}
            </StyledText>
          </View>
        ) : null}

        {/* Outer row: left addon + input wrap + right addon */}
        <View style={[S.outer_row, { borderRadius: baseRadius }]}>

          {/* Left addon */}
          {hasLeftAddon && (
            <AddonStrip addon={leftAddon!} size={size} side="left" variant={variant} />
          )}

          {/* Input wrap */}
          <View
            style={[
              S.input_wrap,
              wrapStyle,
              {
                borderRadius: hasLeftAddon && hasRightAddon ? 0
                  : hasLeftAddon  ? `0,0,${baseRadius},${baseRadius}` as any  // handled below
                  : hasRightAddon ? `${baseRadius},${baseRadius},0,0` as any
                  : baseRadius,
                flex: 1,
              },
              // Explicit radius for addons
              hasLeftAddon  && !hasRightAddon && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              !hasLeftAddon && hasRightAddon  && { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              hasLeftAddon  && hasRightAddon  && { borderRadius: 0 },
              inputWrapStyle,
            ]}
          >
            {/* Float label */}
            {floatLabel && label ? (
              <FloatLabel
                label={label + (required ? ' *' : '')}
                focused={focused}
                hasValue={hasValue}
                focusColor={resolvedFocusColor}
                size={size}
              />
            ) : null}

            {/* Left icon */}
            {leftIcon ? (
              <View style={[ic.icon_slot, { marginLeft: 4 }]}>
                {leftIcon}
              </View>
            ) : null}

            {/* Core TextInput */}
            <TextInputBase
              ref={inputRef}
              value={value}
              defaultValue={defaultValue}
              onChangeText={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={floatLabel ? undefined : placeholder}
              placeholderTextColor={theme.colors.gray[300]}
              editable={editable && !loading}
              multiline={multiline}
              numberOfLines={numberOfLines}
              flex={1}
              maxLength={maxLength}
              style={[
                S.input,
                {
                  fontSize:    fontSizeProp ?? sz.fontSize,
                  fontWeight:  fontWeightProp ?? '400',
                  paddingHorizontal: leftIcon || rightIcon || clearable ? sz.paddingH - 4 : sz.paddingH,
                  paddingVertical:   sz.paddingV,
                  minHeight:         multiline ? sz.minHeight * 2 : sz.minHeight,
                  opacity:           editable && !loading ? 1 : 0.55,
                  color:             theme.colors.gray[800],
                  textAlignVertical: multiline ? 'top' : 'center',
                },
                inputStyle,
              ]}
              {...rest}
            />

            {/* Right icon / clear / spinner */}
            {resolvedRightNode ? (
              <View style={[ic.icon_slot, { marginRight: 4 }]}>
                {resolvedRightNode}
              </View>
            ) : null}
          </View>

          {/* Right addon */}
          {hasRightAddon && (
            <AddonStrip addon={rightAddon!} size={size} side="right" variant={variant} />
          )}
        </View>

        {/* Footer row: helper/error + counter */}
        {(helperText || errorMessage || hasError || showCounter) ? (
          <View style={S.footer_row}>
            {hasError && errorMessage ? (
              <StyledText
                fontSize={theme.fontSize.micro}
                color={theme.colors.red[500]}
                marginTop={4}
                flex={1}
                {...errorProps}
              >
                {errorMessage}
              </StyledText>
            ) : helperText ? (
              <StyledText
                fontSize={theme.fontSize.micro}
                color={theme.colors.gray[400]}
                marginTop={4}
                flex={1}
                {...helperProps}
              >
                {helperText}
              </StyledText>
            ) : (
              <View style={{ flex: 1 }} />
            )}

            {showCounter && (
              <StyledText
                fontSize={theme.fontSize.micro}
                color={theme.colors.gray[400]}
                marginTop={4}
              >
                {currentValue.length}{maxLength ? ` / ${maxLength}` : ''}
              </StyledText>
            )}
          </View>
        ) : null}

      </View>
    )
};

StyledTextInput.displayName = 'StyledTextInput'
export { StyledTextInput as StyledInput }

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  container: {
  flex: 1,

  },
  label_row: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  outer_row: {
    flexDirection: 'row',
    overflow:      'hidden',
  },
  input_wrap: {
    flexDirection: 'row',
    alignItems:    'center',
    overflow:      'hidden',
  },
  input: {
    flex:              1,
    includeFontPadding: false,
  },
  footer_row: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'space-between',
    gap:            8,
  },
})

const ic = StyleSheet.create({
  icon_slot: {
    alignItems:     'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  clearBtn: {
    alignItems:     'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[100],
  },
})
