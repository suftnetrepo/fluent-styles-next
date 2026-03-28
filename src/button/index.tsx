import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { styled }                  from '../utiles/styled';
import { ViewStyle } from '../utiles/viewStyleProps';
import { viewStyleStringVariants, viewStyleVariants } from '../utiles/viewStyleVariants';
import { StyledText }              from '../text';
import { theme }                   from '../utiles/theme';

// ─── Variant shape ────────────────────────────────────────────────────────────

type ButtonVariants = {
  // ── Appearance ────────────────────────────────────────────────────────────
  /** Solid filled — cyan background. */
  primary?:   boolean
  /** Solid filled — indigo background. */
  secondary?: boolean
  /** White background, dark border. */
  outline?:   boolean
  /** Transparent, no border, label only. */
  ghost?:     boolean
  /** Transparent, no padding, inline text link. */
  link?:      boolean
  /** Danger / destructive action — red fill. */
  danger?:    boolean
  /** Success action — green fill. */
  success?:   boolean
  /** Warning — amber fill. */
  warning?:   boolean
  /** White card surface, top + side borders, no bottom (for dropdowns). */
  dropdown?:  boolean
  /** Greyed-out, non-interactive. */
  disabled?:  boolean
  // ── Shape ─────────────────────────────────────────────────────────────────
  /** Fully circular pill (default). */
  pill?:      boolean
  /** Slightly rounded rectangle. */
  rounded?:   boolean
  /** No border radius — sharp corners. */
  square?:    boolean
  // ── Size ──────────────────────────────────────────────────────────────────
  xs?:        boolean
  sm?:        boolean
  md?:        boolean  // default
  lg?:        boolean
  xl?:        boolean
  // ── Layout ────────────────────────────────────────────────────────────────
  /** Button shrinks to fit its content instead of flex: 1. */
  compact?:   boolean
  /** Full-width block button. */
  block?:     boolean
  /** Icon-only circular button. */
  icon?:      boolean
} & typeof viewStyleStringVariants

type ButtonProps = { variant?: ButtonVariants } & TouchableOpacityProps & ViewStyle

export interface StyledButtonProps extends ButtonProps {
  children?:   React.ReactNode
  // Convenience flat props (same as wrapping in variant object)
  primary?:    boolean
  secondary?:  boolean
  outline?:    boolean
  ghost?:      boolean
  link?:       boolean
  danger?:     boolean
  success?:    boolean
  warning?:    boolean
  dropdown?:   boolean
  disabled?:   boolean
  pill?:       boolean
  rounded?:    boolean
  square?:     boolean
  xs?:         boolean
  sm?:         boolean
  md?:         boolean
  lg?:         boolean
  xl?:         boolean
  compact?:    boolean
  block?:      boolean
  icon?:       boolean
  // Extra
  /** Show an activity-indicator spinner and block presses. */
  loading?:    boolean
  /** Icon element rendered before the label. */
  leftIcon?:   React.ReactNode
  /** Icon element rendered after the label. */
  rightIcon?:  React.ReactNode
}

interface RefExoticComponent
  extends React.ForwardRefExoticComponent<
    StyledButtonProps & React.RefAttributes<React.ComponentRef<typeof ButtonBase>>
  > {
  Text: typeof StyledText
}

// ─── Base styled component ────────────────────────────────────────────────────

const ButtonBase = styled<ButtonProps>(TouchableOpacity, {
  base: {
    position:         'relative',
    alignItems:       'center',
    justifyContent:   'center',
    flexDirection:    'row',
    gap:              6,
    borderRadius:     999,      // pill by default
    paddingHorizontal: 20,
    paddingVertical:   10,
    flex:             1,
    borderWidth:     0,
  } as ViewStyle,

  variants: {
    // ── Forward all generic style props ─────────────────────────────────────
    ...viewStyleVariants,
    ...viewStyleStringVariants,

    // ── Appearance ───────────────────────────────────────────────────────────

    primary: {
      true: {
        backgroundColor: theme.colors.cyan[500],
        borderWidth:     0,
      } as ViewStyle,
    },

    secondary: {
      true: {
        backgroundColor: theme.colors.indigo[500],
        borderWidth:     0,
      } as ViewStyle,
    },

    outline: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth:     1.5,
        borderColor:     theme.colors.gray[300],
      } as ViewStyle,
    },

    ghost: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth:     0,
      } as ViewStyle,
    },

    link: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth:       0,
      } as ViewStyle,
    },

    danger: {
      true: {
        backgroundColor: theme.colors.red[500],
        borderWidth:     0,
      } as ViewStyle,
    },

    success: {
      true: {
        backgroundColor: theme.colors.green[500],
        borderWidth:     0,
      } as ViewStyle,
    },

    warning: {
      true: {
        backgroundColor: theme.colors.amber[400],
        borderWidth:     0,
      } as ViewStyle,
    },

    dropdown: {
      true: {
        backgroundColor:  theme.colors.white,
        borderLeftWidth:  1,
        borderTopWidth:   1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor:      theme.colors.gray[200],
        borderRadius:     0,
      } as ViewStyle,
    },

    disabled: {
      true: {
        backgroundColor: theme.colors.gray[100],
        borderWidth:     0,
        opacity:         0.6,
      } as ViewStyle,
    },

    // ── Shape ────────────────────────────────────────────────────────────────

    pill: {
      true: { borderRadius: 999, borderWidth: 0 } as ViewStyle,
    },

    rounded: {
      true: { borderRadius: 12, borderWidth: 0 } as ViewStyle,
    },

    square: {
      true: { borderRadius: 0, borderWidth: 0 } as ViewStyle,
    },

    // ── Size ─────────────────────────────────────────────────────────────────

    xs: {
      true: {
        paddingHorizontal: 10,
        paddingVertical:   4,
        borderWidth: 0,
      } as ViewStyle,
    },

    sm: {
      true: {
        paddingHorizontal: 14,
        paddingVertical:   6,
        borderWidth: 0,
      } as ViewStyle,
    },

    md: {
      true: {
        paddingHorizontal: 20,
        paddingVertical:   10,
      } as ViewStyle,
    },

    lg: {
      true: {
        paddingHorizontal: 28,
        paddingVertical:   14,
        borderWidth: 0,
      } as ViewStyle,
    },

    xl: {
      true: {
        paddingHorizontal: 36,
        paddingVertical:   18,
        borderWidth: 0,
      } as ViewStyle,
    },

    // ── Layout ────────────────────────────────────────────────────────────────

    compact: {
      true: {
        flex:      0,
        alignSelf: 'flex-start',
      } as ViewStyle,
    },

    block: {
      true: {
        flex:      1,
        alignSelf: 'stretch',
      } as ViewStyle,
    },

    icon: {
      true: {
        width:             44,
        height:            44,
        borderRadius:      22,
        padding:           0,
        paddingHorizontal: 0,
        paddingVertical:   0,
        flex:              0,
      } as ViewStyle,
    },
  },
});

// ─── Spinner colour helper ────────────────────────────────────────────────────

function spinnerColor(props: StyledButtonProps): string {
  if (props.outline || props.ghost) return theme.colors.gray[600]
  return theme.colors.white
}

// ─── Button ──────────────────────────────────────────────────────────────────

const Button = React.forwardRef<
  React.ComponentPropsWithRef<typeof ButtonBase>,
  StyledButtonProps
>(({ children, loading, leftIcon, rightIcon, disabled, ...rest }, ref) => {
  const isDisabled = disabled || loading

  return (
    <ButtonBase
      ref={ref}
      disabled={isDisabled || undefined}  // passes disabled variant styling
      activeOpacity={isDisabled ? 1 : 0.72}
      {...rest}
    >
      {/* Left icon slot */}
      {!loading && leftIcon ? leftIcon : null}

      {/* Spinner replaces left icon while loading */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor(rest as StyledButtonProps)}
          style={{ marginRight: children ? 4 : 0 }}
        />
      ) : null}

      {typeof children === 'string' ? (
        <StyledText>{children}</StyledText>
      ) : children}

      {/* Right icon slot */}
      {!loading && rightIcon ? rightIcon : null}
    </ButtonBase>
  )
})

Button.displayName = 'StyledButton'

const StyledButton = Button as RefExoticComponent
StyledButton.Text = StyledText

export { StyledButton }
