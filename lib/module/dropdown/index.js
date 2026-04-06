"use strict";

import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, BackHandler, Dimensions, FlatList, Modal } from "react-native";
import { theme } from "../utiles/theme.js";
import { Stack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import { StyledTextInput } from "../input/index.js";
import { StyledButton } from "../button/index.js";
import { StyledPressable } from "../pressable/index.js";
import { StyledDivider } from "../divider/index.js";
import { ChevronDown } from "../icons/index.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
  const rot = useRef(new Animated.Value(open ? 1 : 0)).current;
  const prevRef = useRef(open);
  if (prevRef.current !== open) {
    prevRef.current = open;
    Animated.timing(rot, {
      toValue: open ? 1 : 0,
      duration: 180,
      useNativeDriver: true
    }).start();
  }
  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      transform: [{
        rotate
      }]
    },
    children: /*#__PURE__*/_jsx(ChevronDown, {
      color: color,
      size: size
    })
  });
};

// ─── Checkmark (drawn with borders — no icon library) ─────────────────────────

const CheckMark = ({
  color,
  size = 14
}) => /*#__PURE__*/_jsx(Stack, {
  width: size,
  height: size,
  alignItems: "center",
  justifyContent: "center",
  children: /*#__PURE__*/_jsx(Stack, {
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
  const rot = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(rot, {
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
  return /*#__PURE__*/_jsx(Animated.View, {
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
}) => /*#__PURE__*/_jsx(Stack, {
  width: 18,
  height: 18,
  borderRadius: 4,
  borderWidth: 1.5,
  borderColor: checked ? color : theme.colors.gray[300],
  backgroundColor: checked ? color : theme.colors.white,
  alignItems: "center",
  justifyContent: "center",
  children: checked && /*#__PURE__*/_jsx(CheckMark, {
    color: theme.colors.white,
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
  const textColor = item.disabled ? theme.colors.gray[300] : theme.colors.gray[800];
  return /*#__PURE__*/_jsxs(StyledButton, {
    onPress: item.disabled ? undefined : onPress,
    activeOpacity: item.disabled ? 1 : 0.65,
    compact: true,
    square: true,
    ghost: true,
    block: true,
    minHeight: item.subtitle ? 52 : sz.rowHeight,
    paddingHorizontal: sz.px,
    paddingVertical: item.subtitle ? 10 : 0,
    backgroundColor: selected ? focusColor + "15" : theme.colors.transparent,
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
    children: [multiSelect && /*#__PURE__*/_jsx(CheckboxCell, {
      checked: selected,
      color: focusColor
    }), item.icon ? /*#__PURE__*/_jsx(Stack, {
      width: 24,
      alignItems: "center",
      children: item.icon
    }) : null, /*#__PURE__*/_jsxs(Stack, {
      vertical: true,
      flex: 1,
      gap: 2,
      children: [/*#__PURE__*/_jsx(StyledText, {
        fontSize: sz.fontSize,
        color: textColor,
        fontWeight: selected ? theme.fontWeight.semiBold : theme.fontWeight.normal,
        numberOfLines: 1,
        children: item.label
      }), item.subtitle ? /*#__PURE__*/_jsx(StyledText, {
        fontSize: sz.fontSize - 2,
        color: theme.colors.gray[400],
        children: item.subtitle
      }) : null]
    }), !multiSelect && selected && /*#__PURE__*/_jsx(CheckMark, {
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
  const [query, setQuery] = useState("");
  const sz = SZ[size];

  // Filter
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(i => i.label.toLowerCase().includes(q) || (i.subtitle ?? "").toLowerCase().includes(q));
  }, [data, query]);

  // Group into section headers + items
  const listData = useMemo(() => {
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
  const renderItem = useCallback(({
    item
  }) => {
    // Section header
    if ("_header" in item) {
      return /*#__PURE__*/_jsx(Stack, {
        paddingHorizontal: sz.px,
        paddingTop: 10,
        paddingBottom: 4,
        backgroundColor: theme.colors.gray[50],
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: 11,
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.gray[400],
          style: {
            letterSpacing: 0.8,
            textTransform: "uppercase"
          },
          children: item._header
        })
      });
    }
    return /*#__PURE__*/_jsx(OptionRow, {
      item: item,
      selected: selectedKeys.has(item.value),
      onPress: () => onSelect(item),
      multiSelect: multiSelect,
      size: size,
      focusColor: focusColor
    });
  }, [selectedKeys, onSelect, multiSelect, size, focusColor, sz.px]);
  const keyExtractor = useCallback(item => "_header" in item ? `__h__${item._header}` : item.value, []);
  return /*#__PURE__*/_jsx(Modal, {
    visible: true,
    transparent: true,
    animationType: "fade",
    onRequestClose: onClose,
    statusBarTranslucent: true,
    children: /*#__PURE__*/_jsx(StyledPressable, {
      flex: 1,
      onPress: onClose,
      children: /*#__PURE__*/_jsxs(Stack, {
        position: "absolute",
        top: position.top,
        left: position.left,
        width: position.width,
        maxHeight: maxHeight,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        shadowColor: theme.colors.gray[900],
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
        children: [searchable && /*#__PURE__*/_jsx(Stack, {
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.gray[100],
          children: /*#__PURE__*/_jsx(StyledTextInput, {
            value: query,
            onChangeText: setQuery,
            placeholder: searchPlaceholder ?? "Search…",
            variant: "filled",
            size: "sm",
            leftIcon: /*#__PURE__*/_jsx(StyledText, {
              fontSize: 13,
              children: "\uD83D\uDD0D"
            }),
            clearable: true,
            autoFocus: true,
            autoCorrect: false
          })
        }), selectAll && multiSelect && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs(StyledButton, {
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
            children: [/*#__PURE__*/_jsx(CheckboxCell, {
              checked: !!allSelected,
              color: focusColor
            }), /*#__PURE__*/_jsx(StyledText, {
              fontSize: sz.fontSize,
              fontWeight: theme.fontWeight.semiBold,
              color: theme.colors.gray[700],
              children: "Select all"
            })]
          }), /*#__PURE__*/_jsx(StyledDivider, {
            backgroundColor: theme.colors.gray[100],
            height: 1
          })]
        }), clearable && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(StyledButton, {
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
            children: /*#__PURE__*/_jsx(StyledText, {
              fontSize: sz.fontSize,
              color: theme.colors.gray[400],
              children: "Clear selection"
            })
          }), /*#__PURE__*/_jsx(StyledDivider, {
            backgroundColor: theme.colors.gray[100],
            height: 1
          })]
        }), listData.length === 0 ? /*#__PURE__*/_jsx(Stack, {
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          children: /*#__PURE__*/_jsx(StyledText, {
            fontSize: sz.fontSize,
            color: theme.colors.gray[400],
            children: emptyText
          })
        }) : /*#__PURE__*/_jsx(FlatList, {
          data: listData,
          keyExtractor: keyExtractor,
          renderItem: renderItem,
          ItemSeparatorComponent: () => /*#__PURE__*/_jsx(StyledDivider, {
            backgroundColor: theme.colors.gray[100],
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

const SCREEN_H = Dimensions.get("window").height;
function useMeasure(maxHeight) {
  const triggerRef = useRef(null);
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    triggerY: 0,
    triggerH: 0,
    direction: "down",
    ready: false
  });
  const measure = useCallback(() => {
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
  const updatePanelHeight = useCallback(panelHeight => {
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
  const textColor = isPlaceholder ? placeholderColor : theme.colors.gray[800];

  // Border colour logic
  const borderColor = hasError ? theme.colors.red[500] : open ? focusColor : theme.colors.gray[200];

  // Variant-specific styles
  const variantStyle = (() => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: open ? theme.colors.white : theme.colors.gray[100],
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 0,
          borderBottomColor: borderColor,
          borderRadius: 8
        };
      case "underline":
        return {
          backgroundColor: theme.colors.transparent,
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 1.5,
          borderBottomColor: borderColor,
          borderRadius: 0
        };
      case "ghost":
        return {
          backgroundColor: theme.colors.transparent,
          borderWidth: 0
        };
      default:
        // outline
        return {
          backgroundColor: theme.colors.white,
          borderWidth: open ? 1.5 : 1,
          borderColor: borderColor,
          borderRadius: 8
        };
    }
  })();
  return /*#__PURE__*/_jsxs(StyledButton, {
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
    children: [leftIcon ? /*#__PURE__*/_jsx(Stack, {
      width: 22,
      alignItems: "center",
      justifyContent: "center",
      children: leftIcon
    }) : null, /*#__PURE__*/_jsx(StyledText, {
      fontSize: sz.fontSize,
      color: textColor,
      flex: 1,
      numberOfLines: 1,
      children: label
    }), loading ? /*#__PURE__*/_jsx(Spinner, {
      color: theme.colors.gray[400],
      size: sz.iconSize
    }) : /*#__PURE__*/_jsx(AnimChevron, {
      open: open,
      color: theme.colors.gray[400],
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
}) => /*#__PURE__*/_jsxs(_Fragment, {
  children: [label ? /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.gray[700],
    marginBottom: 6,
    children: label
  }) : null, hasError && errorMessage ? /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.micro,
    color: theme.colors.red[500],
    marginTop: 4,
    children: errorMessage
  }) : helperText ? /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.micro,
    color: theme.colors.gray[400],
    marginTop: 4,
    children: helperText
  }) : null]
});

// ─────────────────────────────────────────────────────────────────────────────
// ─── StyledDropdown (single-select) ──────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export const StyledDropdown = /*#__PURE__*/forwardRef(({
  data,
  onChange,
  placeholder,
  placeholderTextColor = theme.colors.gray[400],
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
  focusColor = theme.colors.indigo?.[500] ?? "#6366f1",
  groupBy,
  ...rest
}, ref) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const {
    triggerRef,
    pos,
    measure,
    updatePanelHeight
  } = useMeasure(maxHeight);
  const selected = value ?? internalValue;
  const hasError = error || !!errorMessage;
  const selectedItem = useMemo(() => data.find(d => d.value === selected), [data, selected]);
  const displayLabel = selectedItem?.label ?? placeholder;
  const isPlaceholder = !selectedItem;

  // Android back button
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setOpen(false);
      return true;
    });
    return () => sub.remove();
  }, [open]);
  const toggle = useCallback(() => {
    if (disabled || loading) return;
    if (!open) measure();
    setOpen(v => !v);
  }, [disabled, loading, open, measure]);
  const handleSelect = useCallback(item => {
    if (value === undefined) setInternalValue(item.value);
    onChange(item);
    setOpen(false);
  }, [value, onChange]);
  const handleClear = useCallback(() => {
    if (value === undefined) setInternalValue("");
    onChange(null);
  }, [value, onChange]);
  const selectedKeys = useMemo(() => new Set([selected].filter(Boolean)), [selected]);
  return /*#__PURE__*/_jsxs(Stack, {
    vertical: true,
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/_jsx(MetaRow, {
      label: label,
      helperText: helperText,
      errorMessage: errorMessage,
      hasError: hasError
    }), /*#__PURE__*/_jsx(Trigger, {
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
    }), open && /*#__PURE__*/_jsx(ListPanel, {
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

export const StyledMultiSelectDropdown = /*#__PURE__*/forwardRef(({
  data,
  onChange,
  placeholder,
  placeholderTextColor = theme.colors.gray[400],
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
  focusColor = theme.colors.indigo?.[500] ?? "#6366f1",
  groupBy,
  separator = ", ",
  maxDisplay = 3,
  selectAll = false,
  ...rest
}, ref) => {
  const [open, setOpen] = useState(false);
  const [internalKeys, setInternalKeys] = useState(defaultValue ?? []);
  const {
    triggerRef,
    pos,
    measure,
    updatePanelHeight
  } = useMeasure(maxHeight);
  const selectedKeys = useMemo(() => new Set(value ?? internalKeys), [value, internalKeys]);
  const hasError = error || !!errorMessage;
  const selectedItems = useMemo(() => data.filter(d => selectedKeys.has(d.value)), [data, selectedKeys]);
  const displayLabel = useMemo(() => {
    if (selectedItems.length === 0) return placeholder;
    if (selectedItems.length > maxDisplay) return `${selectedItems.length} selected`;
    return selectedItems.map(i => i.label).join(separator);
  }, [selectedItems, placeholder, maxDisplay, separator]);
  const isPlaceholder = selectedItems.length === 0;

  // Android back
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setOpen(false);
      return true;
    });
    return () => sub.remove();
  }, [open]);
  const toggle = useCallback(() => {
    if (disabled || loading) return;
    if (!open) measure();
    setOpen(v => !v);
  }, [disabled, loading, open, measure]);
  const handleSelect = useCallback(item => {
    const next = new Set(selectedKeys);
    next.has(item.value) ? next.delete(item.value) : next.add(item.value);
    const nextArr = Array.from(next);
    if (value === undefined) setInternalKeys(nextArr);
    onChange(data.filter(d => next.has(d.value)));
  }, [selectedKeys, value, onChange, data]);
  const handleClear = useCallback(() => {
    if (value === undefined) setInternalKeys([]);
    onChange([]);
  }, [value, onChange]);
  const enabledData = useMemo(() => data.filter(d => !d.disabled), [data]);
  const allSelected = selectedItems.length === enabledData.length && enabledData.length > 0;
  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      if (value === undefined) setInternalKeys([]);
      onChange([]);
    } else {
      const allKeys = enabledData.map(d => d.value);
      if (value === undefined) setInternalKeys(allKeys);
      onChange(enabledData);
    }
  }, [allSelected, enabledData, value, onChange]);
  return /*#__PURE__*/_jsxs(Stack, {
    vertical: true,
    ref: ref,
    ...rest,
    children: [/*#__PURE__*/_jsx(MetaRow, {
      label: label,
      helperText: helperText,
      errorMessage: errorMessage,
      hasError: hasError
    }), /*#__PURE__*/_jsx(Trigger, {
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
    }), open && /*#__PURE__*/_jsx(ListPanel, {
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