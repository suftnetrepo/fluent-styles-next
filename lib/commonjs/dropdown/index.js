"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledMultiSelectDropdown = exports.StyledDropdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _index = require("../stack/index.js");
var _index2 = require("../text/index.js");
var _index3 = require("../input/index.js");
var _index4 = require("../button/index.js");
var _index5 = require("../pressable/index.js");
var _index6 = require("../divider/index.js");
var _index7 = require("../icons/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Size tokens ─────────────────────────────────────────────────────────────

const SZ = {
  sm: {
    triggerHeight: 36,
    fontSize: 13,
    px: 10,
    rowHeight: 38,
    iconSize: 14
  },
  md: {
    triggerHeight: 48,
    fontSize: 15,
    px: 14,
    rowHeight: 44,
    iconSize: 16
  },
  lg: {
    triggerHeight: 56,
    fontSize: 17,
    px: 18,
    rowHeight: 50,
    iconSize: 18
  }
};

// ─── Shared base props ────────────────────────────────────────────────────────

// ─── Animated chevron ─────────────────────────────────────────────────────────
// Single icon that rotates 0 → 180° instead of swapping components.

const AnimChevron = ({
  open,
  color,
  size
}) => {
  const rot = (0, _react.useRef)(new _reactNative.Animated.Value(open ? 1 : 0)).current;
  const prevRef = (0, _react.useRef)(open);
  if (prevRef.current !== open) {
    prevRef.current = open;
    _reactNative.Animated.timing(rot, {
      toValue: open ? 1 : 0,
      duration: 180,
      useNativeDriver: true
    }).start();
  }
  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: {
      transform: [{
        rotate
      }]
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index7.ChevronDown, {
      color: color,
      size: size
    })
  });
};

// ─── Checkmark (drawn with borders — no icon library) ─────────────────────────

const CheckMark = ({
  color,
  size = 14
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
  width: size,
  height: size,
  alignItems: "center",
  justifyContent: "center",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    width: size * 0.5,
    height: size * 0.27,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: color,
    style: {
      transform: [{
        rotate: "-45deg"
      }, {
        translateY: -size * 0.05
      }]
    }
  })
});

// ─── Spinner (drawn with borders — no icon library) ───────────────────────────

const Spinner = ({
  color,
  size
}) => {
  const rot = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rot, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    })).start();
    return () => rot.stopAnimation();
  }, [rot]);
  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
      borderTopColor: "transparent",
      transform: [{
        rotate
      }]
    }
  });
};

// ─── Checkbox row (multi-select) ─────────────────────────────────────────────

const CheckboxCell = ({
  checked,
  color
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
  width: 18,
  height: 18,
  borderRadius: 4,
  borderWidth: 1.5,
  borderColor: checked ? color : _theme.theme.colors.gray[300],
  backgroundColor: checked ? color : _theme.theme.colors.white,
  alignItems: "center",
  justifyContent: "center",
  children: checked && /*#__PURE__*/(0, _jsxRuntime.jsx)(CheckMark, {
    color: _theme.theme.colors.white,
    size: 10
  })
});

// ─── Option row ───────────────────────────────────────────────────────────────

const OptionRow = ({
  item,
  selected,
  onPress,
  multiSelect,
  size,
  focusColor
}) => {
  const sz = SZ[size];
  const textColor = item.disabled ? _theme.theme.colors.gray[300] : _theme.theme.colors.gray[800];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index4.StyledButton, {
    onPress: item.disabled ? undefined : onPress,
    activeOpacity: item.disabled ? 1 : 0.65,
    compact: true,
    square: true,
    ghost: true,
    block: true,
    minHeight: item.subtitle ? 52 : sz.rowHeight,
    paddingHorizontal: sz.px,
    paddingVertical: item.subtitle ? 10 : 0,
    backgroundColor: selected ? focusColor + "15" : _theme.theme.colors.transparent,
    opacity: item.disabled ? 0.45 : 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    accessibilityRole: multiSelect ? "checkbox" : "menuitem",
    accessibilityState: {
      selected,
      disabled: item.disabled
    },
    children: [multiSelect && /*#__PURE__*/(0, _jsxRuntime.jsx)(CheckboxCell, {
      checked: selected,
      color: focusColor
    }), item.icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      width: 24,
      alignItems: "center",
      children: item.icon
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
      vertical: true,
      flex: 1,
      gap: 2,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: sz.fontSize,
        color: textColor,
        fontWeight: selected ? _theme.theme.fontWeight.semiBold : _theme.theme.fontWeight.normal,
        numberOfLines: 1,
        children: item.label
      }), item.subtitle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: sz.fontSize - 2,
        color: _theme.theme.colors.gray[400],
        children: item.subtitle
      }) : null]
    }), !multiSelect && selected && /*#__PURE__*/(0, _jsxRuntime.jsx)(CheckMark, {
      color: focusColor,
      size: 14
    })]
  });
};

// ─── List panel (Modal overlay) ──────────────────────────────────────────────

const ListPanel = ({
  data,
  selectedKeys,
  onSelect,
  onClose,
  position,
  maxHeight,
  multiSelect,
  searchable,
  searchPlaceholder,
  clearable,
  onClear,
  emptyText,
  size,
  focusColor,
  groupBy,
  selectAll,
  allSelected,
  onSelectAll,
  onPanelLayout
}) => {
  const [query, setQuery] = (0, _react.useState)("");
  const sz = SZ[size];

  // Filter
  const filtered = (0, _react.useMemo)(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(i => i.label.toLowerCase().includes(q) || (i.subtitle ?? "").toLowerCase().includes(q));
  }, [data, query]);

  // Group into section headers + items
  const listData = (0, _react.useMemo)(() => {
    if (!groupBy) return filtered;
    const groups = new Map();
    for (const item of filtered) {
      const key = groupBy(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    const result = [];
    for (const [header, items] of groups) {
      result.push({
        _header: header
      });
      result.push(...items);
    }
    return result;
  }, [filtered, groupBy]);
  const renderItem = (0, _react.useCallback)(({
    item
  }) => {
    // Section header
    if ("_header" in item) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
        paddingHorizontal: sz.px,
        paddingTop: 10,
        paddingBottom: 4,
        backgroundColor: _theme.theme.colors.gray[50],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
          fontSize: 11,
          fontWeight: _theme.theme.fontWeight.bold,
          color: _theme.theme.colors.gray[400],
          style: {
            letterSpacing: 0.8,
            textTransform: "uppercase"
          },
          children: item._header
        })
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OptionRow, {
      item: item,
      selected: selectedKeys.has(item.value),
      onPress: () => onSelect(item),
      multiSelect: multiSelect,
      size: size,
      focusColor: focusColor
    });
  }, [selectedKeys, onSelect, multiSelect, size, focusColor, sz.px]);
  const keyExtractor = (0, _react.useCallback)(item => "_header" in item ? `__h__${item._header}` : item.value, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    visible: true,
    transparent: true,
    animationType: "fade",
    onRequestClose: onClose,
    statusBarTranslucent: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.StyledPressable, {
      flex: 1,
      onPress: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
        position: "absolute",
        top: position.top,
        left: position.left,
        width: position.width,
        maxHeight: maxHeight,
        backgroundColor: _theme.theme.colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: _theme.theme.colors.gray[200],
        shadowColor: _theme.theme.colors.gray[900],
        shadowOffset: {
          width: 0,
          height: position.direction === "up" ? -6 : 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        overflow: "hidden"
        // Prevent tap-away from triggering on the panel itself
        ,
        onStartShouldSetResponder: () => true,
        onLayout: e => onPanelLayout?.(e.nativeEvent.layout.height),
        children: [searchable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: _theme.theme.colors.gray[100],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledTextInput, {
            value: query,
            onChangeText: setQuery,
            placeholder: searchPlaceholder ?? "Search…",
            variant: "filled",
            size: "sm",
            leftIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
              fontSize: 13,
              children: "\uD83D\uDD0D"
            }),
            clearable: true,
            autoFocus: true,
            autoCorrect: false
          })
        }), selectAll && multiSelect && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index4.StyledButton, {
            ghost: true,
            compact: true,
            square: true,
            block: true,
            height: sz.rowHeight,
            paddingHorizontal: sz.px,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            onPress: onSelectAll,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CheckboxCell, {
              checked: !!allSelected,
              color: focusColor
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
              fontSize: sz.fontSize,
              fontWeight: _theme.theme.fontWeight.semiBold,
              color: _theme.theme.colors.gray[700],
              children: "Select all"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.StyledDivider, {
            backgroundColor: _theme.theme.colors.gray[100],
            height: 1
          })]
        }), clearable && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledButton, {
            ghost: true,
            compact: true,
            square: true,
            block: true,
            height: sz.rowHeight,
            paddingHorizontal: sz.px,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            onPress: () => {
              onClear?.();
              onClose();
            },
            accessibilityRole: "button",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
              fontSize: sz.fontSize,
              color: _theme.theme.colors.gray[400],
              children: "Clear selection"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.StyledDivider, {
            backgroundColor: _theme.theme.colors.gray[100],
            height: 1
          })]
        }), listData.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
            fontSize: sz.fontSize,
            color: _theme.theme.colors.gray[400],
            children: emptyText
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
          data: listData,
          keyExtractor: keyExtractor,
          renderItem: renderItem,
          ItemSeparatorComponent: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.StyledDivider, {
            backgroundColor: _theme.theme.colors.gray[100],
            height: 1
          }),
          keyboardShouldPersistTaps: "handled",
          scrollEnabled: true,
          bounces: false
        })]
      })
    })
  });
};

// ─── useMeasure — extract trigger position ────────────────────────────────────

const SCREEN_H = _reactNative.Dimensions.get("window").height;
function useMeasure(maxHeight) {
  const triggerRef = (0, _react.useRef)(null);
  const [pos, setPos] = (0, _react.useState)({
    top: 0,
    left: 0,
    width: 0,
    triggerY: 0,
    triggerH: 0,
    direction: "down",
    ready: false
  });
  const measure = (0, _react.useCallback)(() => {
    requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        const spaceBelow = SCREEN_H - (y + h);
        const openUp = spaceBelow < maxHeight + 8;
        setPos({
          top: openUp ? y - maxHeight : y + h,
          left: x,
          width: w,
          triggerY: y,
          triggerH: h,
          direction: openUp ? "up" : "down",
          ready: true
        });
      });
    });
  }, [maxHeight]);
  const updatePanelHeight = (0, _react.useCallback)(panelHeight => {
    setPos(prev => {
      if (!prev.ready) return prev;
      const nextTop = prev.direction === "up" ? prev.triggerY - panelHeight : prev.triggerY + prev.triggerH;
      if (nextTop === prev.top) return prev;
      return {
        ...prev,
        top: nextTop
      };
    });
  }, []);
  return {
    triggerRef,
    pos,
    measure,
    updatePanelHeight
  };
}

// ─── Trigger row ──────────────────────────────────────────────────────────────

const Trigger = ({
  triggerRef,
  onPress,
  disabled,
  loading,
  open,
  label,
  isPlaceholder,
  placeholderColor,
  size,
  variant,
  hasError,
  focusColor,
  leftIcon
}) => {
  const sz = SZ[size];
  const opacity = disabled ? 0.5 : 1;
  const textColor = isPlaceholder ? placeholderColor : _theme.theme.colors.gray[800];

  // Border colour logic
  const borderColor = hasError ? _theme.theme.colors.red[500] : open ? focusColor : _theme.theme.colors.gray[200];

  // Variant-specific styles
  const variantStyle = (() => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: open ? _theme.theme.colors.white : _theme.theme.colors.gray[100],
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 0,
          borderBottomColor: borderColor,
          borderRadius: 8
        };
      case "underline":
        return {
          backgroundColor: _theme.theme.colors.transparent,
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 1.5,
          borderBottomColor: borderColor,
          borderRadius: 0
        };
      case "ghost":
        return {
          backgroundColor: _theme.theme.colors.transparent,
          borderWidth: 0
        };
      default:
        // outline
        return {
          backgroundColor: _theme.theme.colors.white,
          borderWidth: open ? 1.5 : 1,
          borderColor: borderColor,
          borderRadius: 8
        };
    }
  })();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index4.StyledButton, {
    ref: triggerRef,
    onPress: onPress,
    disabled: disabled || loading,
    activeOpacity: 0.75,
    compact: true,
    height: sz.triggerHeight,
    paddingHorizontal: sz.px,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    opacity: opacity,
    accessibilityRole: "button",
    accessibilityState: {
      expanded: open,
      disabled
    },
    ...variantStyle,
    children: [leftIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      width: 22,
      alignItems: "center",
      justifyContent: "center",
      children: leftIcon
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      fontSize: sz.fontSize,
      color: textColor,
      flex: 1,
      numberOfLines: 1,
      children: label
    }), loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Spinner, {
      color: _theme.theme.colors.gray[400],
      size: sz.iconSize
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimChevron, {
      open: open,
      color: _theme.theme.colors.gray[400],
      size: sz.iconSize
    })]
  });
};

// ─── Meta row — label + helper/error ─────────────────────────────────────────

const MetaRow = ({
  label,
  helperText,
  errorMessage,
  hasError
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: [label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
    fontSize: _theme.theme.fontSize.small,
    fontWeight: _theme.theme.fontWeight.semiBold,
    color: _theme.theme.colors.gray[700],
    marginBottom: 6,
    children: label
  }) : null, hasError && errorMessage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
    fontSize: _theme.theme.fontSize.micro,
    color: _theme.theme.colors.red[500],
    marginTop: 4,
    children: errorMessage
  }) : helperText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
    fontSize: _theme.theme.fontSize.micro,
    color: _theme.theme.colors.gray[400],
    marginTop: 4,
    children: helperText
  }) : null]
});

// ─────────────────────────────────────────────────────────────────────────────
// ─── StyledDropdown (single-select) ──────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const StyledDropdown = exports.StyledDropdown = /*#__PURE__*/(0, _react.forwardRef)(({
  data,
  onChange,
  placeholder,
  placeholderTextColor = _theme.theme.colors.gray[400],
  value,
  defaultValue,
  disabled = false,
  maxHeight = 260,
  size = "md",
  variant = "outline",
  leftIcon,
  label,
  helperText,
  errorMessage,
  error = false,
  searchable = false,
  searchPlaceholder,
  clearable = false,
  loading = false,
  emptyText = "No options found",
  focusColor = _theme.theme.colors.indigo?.[500] ?? "#6366f1",
  groupBy,
  ...rest
}, ref) => {
  const [open, setOpen] = (0, _react.useState)(false);
  const [internalValue, setInternalValue] = (0, _react.useState)(defaultValue ?? "");
  const {
    triggerRef,
    pos,
    measure,
    updatePanelHeight
  } = useMeasure(maxHeight);
  const selected = value ?? internalValue;
  const hasError = error || !!errorMessage;
  const selectedItem = (0, _react.useMemo)(() => data.find(d => d.value === selected), [data, selected]);
  const displayLabel = selectedItem?.label ?? placeholder;
  const isPlaceholder = !selectedItem;

  // Android back button
  (0, _react.useEffect)(() => {
    if (!open) return;
    const sub = _reactNative.BackHandler.addEventListener("hardwareBackPress", () => {
      setOpen(false);
      return true;
    });
    return () => sub.remove();
  }, [open]);
  const toggle = (0, _react.useCallback)(() => {
    if (disabled || loading) return;
    if (!open) measure();
    setOpen(v => !v);
  }, [disabled, loading, open, measure]);
  const handleSelect = (0, _react.useCallback)(item => {
    if (value === undefined) setInternalValue(item.value);
    onChange(item);
    setOpen(false);
  }, [value, onChange]);
  const handleClear = (0, _react.useCallback)(() => {
    if (value === undefined) setInternalValue("");
    onChange(null);
  }, [value, onChange]);
  const selectedKeys = (0, _react.useMemo)(() => new Set([selected].filter(Boolean)), [selected]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    vertical: true,
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MetaRow, {
      label: label,
      helperText: helperText,
      errorMessage: errorMessage,
      hasError: hasError
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Trigger, {
      triggerRef: triggerRef,
      onPress: toggle,
      disabled: disabled,
      loading: loading,
      open: open,
      label: displayLabel,
      isPlaceholder: isPlaceholder,
      placeholderColor: placeholderTextColor,
      size: size,
      variant: variant,
      hasError: hasError,
      focusColor: focusColor,
      leftIcon: leftIcon
    }), open && /*#__PURE__*/(0, _jsxRuntime.jsx)(ListPanel, {
      data: data,
      selectedKeys: selectedKeys,
      onSelect: handleSelect,
      onClose: () => setOpen(false),
      position: pos,
      maxHeight: maxHeight,
      multiSelect: false,
      searchable: searchable,
      searchPlaceholder: searchPlaceholder,
      clearable: clearable,
      onClear: handleClear,
      emptyText: emptyText,
      size: size,
      focusColor: focusColor,
      groupBy: groupBy,
      onPanelLayout: updatePanelHeight
    })]
  });
});
StyledDropdown.displayName = "StyledDropdown";

// ─────────────────────────────────────────────────────────────────────────────
// ─── StyledMultiSelectDropdown ────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

const StyledMultiSelectDropdown = exports.StyledMultiSelectDropdown = /*#__PURE__*/(0, _react.forwardRef)(({
  data,
  onChange,
  placeholder,
  placeholderTextColor = _theme.theme.colors.gray[400],
  value,
  defaultValue,
  disabled = false,
  maxHeight = 300,
  size = "md",
  variant = "outline",
  leftIcon,
  label,
  helperText,
  errorMessage,
  error = false,
  searchable = false,
  searchPlaceholder,
  clearable = false,
  loading = false,
  emptyText = "No options found",
  focusColor = _theme.theme.colors.indigo?.[500] ?? "#6366f1",
  groupBy,
  separator = ", ",
  maxDisplay = 3,
  selectAll = false,
  ...rest
}, ref) => {
  const [open, setOpen] = (0, _react.useState)(false);
  const [internalKeys, setInternalKeys] = (0, _react.useState)(defaultValue ?? []);
  const {
    triggerRef,
    pos,
    measure,
    updatePanelHeight
  } = useMeasure(maxHeight);
  const selectedKeys = (0, _react.useMemo)(() => new Set(value ?? internalKeys), [value, internalKeys]);
  const hasError = error || !!errorMessage;
  const selectedItems = (0, _react.useMemo)(() => data.filter(d => selectedKeys.has(d.value)), [data, selectedKeys]);
  const displayLabel = (0, _react.useMemo)(() => {
    if (selectedItems.length === 0) return placeholder;
    if (selectedItems.length > maxDisplay) return `${selectedItems.length} selected`;
    return selectedItems.map(i => i.label).join(separator);
  }, [selectedItems, placeholder, maxDisplay, separator]);
  const isPlaceholder = selectedItems.length === 0;

  // Android back
  (0, _react.useEffect)(() => {
    if (!open) return;
    const sub = _reactNative.BackHandler.addEventListener("hardwareBackPress", () => {
      setOpen(false);
      return true;
    });
    return () => sub.remove();
  }, [open]);
  const toggle = (0, _react.useCallback)(() => {
    if (disabled || loading) return;
    if (!open) measure();
    setOpen(v => !v);
  }, [disabled, loading, open, measure]);
  const handleSelect = (0, _react.useCallback)(item => {
    const next = new Set(selectedKeys);
    next.has(item.value) ? next.delete(item.value) : next.add(item.value);
    const nextArr = Array.from(next);
    if (value === undefined) setInternalKeys(nextArr);
    onChange(data.filter(d => next.has(d.value)));
  }, [selectedKeys, value, onChange, data]);
  const handleClear = (0, _react.useCallback)(() => {
    if (value === undefined) setInternalKeys([]);
    onChange([]);
  }, [value, onChange]);
  const enabledData = (0, _react.useMemo)(() => data.filter(d => !d.disabled), [data]);
  const allSelected = selectedItems.length === enabledData.length && enabledData.length > 0;
  const handleSelectAll = (0, _react.useCallback)(() => {
    if (allSelected) {
      if (value === undefined) setInternalKeys([]);
      onChange([]);
    } else {
      const allKeys = enabledData.map(d => d.value);
      if (value === undefined) setInternalKeys(allKeys);
      onChange(enabledData);
    }
  }, [allSelected, enabledData, value, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    vertical: true,
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MetaRow, {
      label: label,
      helperText: helperText,
      errorMessage: errorMessage,
      hasError: hasError
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Trigger, {
      triggerRef: triggerRef,
      onPress: toggle,
      disabled: disabled,
      loading: loading,
      open: open,
      label: displayLabel,
      isPlaceholder: isPlaceholder,
      placeholderColor: placeholderTextColor,
      size: size,
      variant: variant,
      hasError: hasError,
      focusColor: focusColor,
      leftIcon: leftIcon
    }), open && /*#__PURE__*/(0, _jsxRuntime.jsx)(ListPanel, {
      data: data,
      selectedKeys: selectedKeys,
      onSelect: handleSelect,
      onClose: () => setOpen(false),
      position: pos,
      maxHeight: maxHeight,
      multiSelect: true,
      searchable: searchable,
      searchPlaceholder: searchPlaceholder,
      clearable: clearable,
      onClear: handleClear,
      emptyText: emptyText,
      size: size,
      focusColor: focusColor,
      groupBy: groupBy,
      selectAll: selectAll,
      allSelected: allSelected,
      onSelectAll: handleSelectAll,
      onPanelLayout: updatePanelHeight
    })]
  });
});
StyledMultiSelectDropdown.displayName = "StyledMultiSelectDropdown";
//# sourceMappingURL=index.js.map