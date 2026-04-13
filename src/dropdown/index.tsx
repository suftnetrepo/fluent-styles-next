import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Modal,
  ViewStyle,
} from "react-native";

import { theme } from "../utiles/theme";
import { Stack } from "../stack";
import { StyledText } from "../text";
import { StyledTextInput } from "../input";
import { StyledButton } from "../button";
import { StyledPressable } from "../pressable";
import { StyledDivider } from "../divider";
import { ChevronDown } from "../icons";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DropdownOptionItem<TMeta = unknown> = {
  value: string;
  label: string;
  /** Leading icon rendered inside the row. */
  icon?: React.ReactNode;
  /** Secondary line below the label. */
  subtitle?: string;
  /** Non-selectable, greyed-out row. */
  disabled?: boolean;
  /** Arbitrary payload forwarded to onChange. */
  meta?: TMeta;
};

export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "outline" | "filled" | "underline" | "ghost";

// ─── Size tokens ─────────────────────────────────────────────────────────────

const SZ: Record<
  DropdownSize,
  {
    triggerHeight: number;
    fontSize: number;
    px: number;
    rowHeight: number;
    iconSize: number;
  }
> = {
  sm: { triggerHeight: 36, fontSize: 13, px: 10, rowHeight: 38, iconSize: 14 },
  md: { triggerHeight: 48, fontSize: 15, px: 14, rowHeight: 44, iconSize: 16 },
  lg: { triggerHeight: 56, fontSize: 17, px: 18, rowHeight: 50, iconSize: 18 },
};

// ─── Shared base props ────────────────────────────────────────────────────────

interface DropdownBaseProps<TItem extends DropdownOptionItem>
  extends ViewStyle {
  data: TItem[];
  placeholder: string;
  placeholderTextColor?: string;
  disabled?: boolean;
  maxHeight?: number;
  size?: DropdownSize;
  variant?: DropdownVariant;
  leftIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  loading?: boolean;
  emptyText?: string;
  focusColor?: string;
  groupBy?: (item: TItem) => string;
}

export interface StyledDropdownProps<
  TItem extends DropdownOptionItem = DropdownOptionItem,
> extends DropdownBaseProps<TItem> {
  value?: string;
  defaultValue?: string;
  onChange: (item: TItem) => void;
}

export interface StyledMultiSelectDropdownProps<
  TItem extends DropdownOptionItem = DropdownOptionItem,
> extends DropdownBaseProps<TItem> {
  value?: string[];
  defaultValue?: string[];
  onChange: (items: TItem[]) => void;
  separator?: string;
  maxDisplay?: number;
  selectAll?: boolean;
}

// ─── Animated chevron ─────────────────────────────────────────────────────────
// Single icon that rotates 0 → 180° instead of swapping components.

const AnimChevron: React.FC<{ open: boolean; color: string; size: number }> = ({
  open,
  color,
  size,
}) => {
  const rot = useRef(new Animated.Value(open ? 1 : 0)).current;
  const prevRef = useRef(open);

  if (prevRef.current !== open) {
    prevRef.current = open;
    Animated.timing(rot, {
      toValue: open ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }

  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <ChevronDown color={color} size={size} />
    </Animated.View>
  );
};

// ─── Checkmark (drawn with borders — no icon library) ─────────────────────────

const CheckMark: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 14,
}) => (
  <Stack width={size} height={size} alignItems="center" justifyContent="center">
    <Stack
      width={size * 0.5}
      height={size * 0.27}
      borderLeftWidth={2}
      borderBottomWidth={2}
      borderColor={color}
      style={{
        transform: [{ rotate: "-45deg" }, { translateY: -size * 0.05 }],
      }}
    />
  </Stack>
);

// ─── Spinner (drawn with borders — no icon library) ───────────────────────────

const Spinner: React.FC<{ color: string; size: number }> = ({
  color,
  size,
}) => {
  const rot = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rot, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ).start();
    return () => rot.stopAnimation();
  }, [rot]);

  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: color,
        borderTopColor: "transparent",
        transform: [{ rotate }],
      }}
    />
  );
};

// ─── Checkbox row (multi-select) ─────────────────────────────────────────────

const CheckboxCell: React.FC<{
  checked: boolean;
  color: string;
}> = ({ checked, color }) => (
  <Stack
    width={18}
    height={18}
    borderRadius={4}
    borderWidth={1.5}
    borderColor={checked ? color : theme.colors.gray[300]}
    backgroundColor={checked ? color : theme.colors.white}
    alignItems="center"
    justifyContent="center"
  >
    {checked && <CheckMark color={theme.colors.white} size={10} />}
  </Stack>
);

// ─── Option row ───────────────────────────────────────────────────────────────

const OptionRow: React.FC<{
  item: DropdownOptionItem;
  selected: boolean;
  onPress: () => void;
  multiSelect: boolean;
  size: DropdownSize;
  focusColor: string;
}> = ({ item, selected, onPress, multiSelect, size, focusColor }) => {
  const sz = SZ[size];
  const textColor = item.disabled
    ? theme.colors.gray[300]
    : theme.colors.gray[800];

  return (
    <StyledButton
      onPress={item.disabled ? undefined : onPress}
      activeOpacity={item.disabled ? 1 : 0.65}
      compact
      square
      ghost
      block
      minHeight={item.subtitle ? 52 : sz.rowHeight}
      paddingHorizontal={sz.px}
      paddingVertical={item.subtitle ? 10 : 0}
      backgroundColor={selected ? focusColor + "15" : theme.colors.transparent}
      opacity={item.disabled ? 0.45 : 1}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={10}
      accessibilityRole={multiSelect ? "checkbox" : "menuitem"}
      accessibilityState={{ selected, disabled: item.disabled }}
    >
      {/* Checkbox (multi) */}
      {multiSelect && <CheckboxCell checked={selected} color={focusColor} />}

      {/* Leading icon */}
      {item.icon ? (
        <Stack width={24} alignItems="center">
          {item.icon}
        </Stack>
      ) : null}

      {/* Label block */}
      <Stack vertical flex={1} gap={2}>
        <StyledText
          fontSize={sz.fontSize}
          color={textColor}
          fontWeight={
            selected ? theme.fontWeight.semiBold : theme.fontWeight.normal
          }
          numberOfLines={1}
        >
          {item.label}
        </StyledText>
        {item.subtitle ? (
          <StyledText fontSize={sz.fontSize - 2} color={theme.colors.gray[400]}>
            {item.subtitle}
          </StyledText>
        ) : null}
      </Stack>

      {/* Tick (single-select) */}
      {!multiSelect && selected && <CheckMark color={focusColor} size={14} />}
    </StyledButton>
  );
};

// ─── List panel (Modal overlay) ──────────────────────────────────────────────

interface ListPanelProps {
  data: DropdownOptionItem[];
  selectedKeys: Set<string>;
  onSelect: (item: DropdownOptionItem) => void;
  onClose: () => void;
  position: {
    top: number;
    left: number;
    width: number;
    direction: "up" | "down";
  };
  maxHeight: number;
  multiSelect: boolean;
  searchable: boolean;
  searchPlaceholder?: string;
  clearable: boolean;
  onClear?: () => void;
  emptyText: string;
  size: DropdownSize;
  focusColor: string;
  groupBy?: (item: DropdownOptionItem) => string;
  selectAll?: boolean;
  allSelected?: boolean;
  onSelectAll?: () => void;
  onPanelLayout?: (height: number) => void;
}

type ListEntry = DropdownOptionItem | { _header: string };

const ListPanel: React.FC<ListPanelProps> = ({
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
  onPanelLayout,
}) => {
  const [query, setQuery] = useState("");
  const sz = SZ[size];

  // Filter
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.subtitle ?? "").toLowerCase().includes(q),
    );
  }, [data, query]);

  // Group into section headers + items
  const listData = useMemo<ListEntry[]>(() => {
    if (!groupBy) return filtered;

    const groups = new Map<string, DropdownOptionItem[]>();
    for (const item of filtered) {
      const key = groupBy(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    }

    const result: ListEntry[] = [];
    for (const [header, items] of groups) {
      result.push({ _header: header });
      result.push(...items);
    }
    return result;
  }, [filtered, groupBy]);

  const renderItem = useCallback(
    ({ item }: { item: ListEntry }) => {
      // Section header
      if ("_header" in item) {
        return (
          <Stack
            paddingHorizontal={sz.px}
            paddingTop={10}
            paddingBottom={4}
            backgroundColor={theme.colors.gray[50]}
          >
            <StyledText
              fontSize={11}
              fontWeight={theme.fontWeight.bold}
              color={theme.colors.gray[400]}
              style={{ letterSpacing: 0.8, textTransform: "uppercase" }}
            >
              {item._header}
            </StyledText>
          </Stack>
        );
      }

      return (
        <OptionRow
          item={item}
          selected={selectedKeys.has(item.value)}
          onPress={() => onSelect(item)}
          multiSelect={multiSelect}
          size={size}
          focusColor={focusColor}
        />
      );
    },
    [selectedKeys, onSelect, multiSelect, size, focusColor, sz.px],
  );

  const keyExtractor = useCallback(
    (item: ListEntry) =>
      "_header" in item ? `__h__${item._header}` : item.value,
    [],
  );

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Full-screen tap-away area */}
      <StyledPressable flex={1} onPress={onClose}>
        {/* Panel — shadow direction flips based on whether it opens up or down */}
        <Stack
          position="absolute"
          top={position.top}
          left={position.left}
          width={position.width}
          maxHeight={maxHeight}
          backgroundColor={theme.colors.white}
          borderRadius={10}
          borderWidth={1}
          borderColor={theme.colors.gray[200]}
          shadowColor={theme.colors.gray[900]}
          shadowOffset={{
            width: 0,
            height: position.direction === "up" ? -6 : 6,
          }}
          shadowOpacity={0.1}
          shadowRadius={12}
          elevation={8}
          overflow="hidden"
          // Prevent tap-away from triggering on the panel itself
          onStartShouldSetResponder={() => true}
          onLayout={(e) => onPanelLayout?.(e.nativeEvent.layout.height)}
        >
          {/* Search field */}
          {searchable && (
            <Stack
              paddingHorizontal={10}
              paddingVertical={8}
              borderBottomWidth={1}
              borderBottomColor={theme.colors.gray[100]}
            >
              <StyledTextInput
                value={query}
                onChangeText={setQuery}
                placeholder={searchPlaceholder ?? "Search…"}
                variant="filled"
                size="sm"
                leftIcon={<StyledText fontSize={13}>🔍</StyledText>}
                clearable
                autoFocus
                autoCorrect={false}
              />
            </Stack>
          )}

          {/* Select all row */}
          {selectAll && multiSelect && (
            <>
              <StyledButton
                ghost
                compact
                square
                block
                height={sz.rowHeight}
                paddingHorizontal={sz.px}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={10}
                onPress={onSelectAll}
              >
                <CheckboxCell checked={!!allSelected} color={focusColor} />
                <StyledText
                  fontSize={sz.fontSize}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.colors.gray[700]}
                >
                  Select all
                </StyledText>
              </StyledButton>
              <StyledDivider
                backgroundColor={theme.colors.gray[100]}
                height={1}
              />
            </>
          )}

          {/* Clear row */}
          {clearable && (
            <>
              <StyledButton
                ghost
                compact
                square
                block
                height={sz.rowHeight}
                paddingHorizontal={sz.px}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
                onPress={() => {
                  onClear?.();
                  onClose();
                }}
                accessibilityRole="button"
              >
                <StyledText
                  fontSize={sz.fontSize}
                  color={theme.colors.gray[400]}
                >
                  Clear selection
                </StyledText>
              </StyledButton>
              <StyledDivider
                backgroundColor={theme.colors.gray[100]}
                height={1}
              />
            </>
          )}

          {/* Empty state */}
          {listData.length === 0 ? (
            <Stack padding={20} alignItems="center" justifyContent="center">
              <StyledText fontSize={sz.fontSize} color={theme.colors.gray[400]}>
                {emptyText}
              </StyledText>
            </Stack>
          ) : (
            <FlatList
              data={listData}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={() => (
                <StyledDivider
                  backgroundColor={theme.colors.gray[100]}
                  height={1}
                />
              )}
              keyboardShouldPersistTaps="handled"
              scrollEnabled
              bounces={false}
            />
          )}
        </Stack>
      </StyledPressable>
    </Modal>
  );
};

// ─── useMeasure — extract trigger position ────────────────────────────────────

const SCREEN_H = Dimensions.get("window").height;

function useMeasure(maxHeight: number) {
  const triggerRef = useRef<any>(null);
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    triggerY: 0,
    triggerH: 0,
    direction: "down" as "up" | "down",
    ready: false,
  });

  const measure = useCallback(() => {
    requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow(
        (x: number, y: number, w: number, h: number) => {
          const spaceBelow = SCREEN_H - (y + h);
          const openUp = spaceBelow < maxHeight + 8;

          setPos({
            top: openUp ? y - maxHeight : y + h,
            left: x,
            width: w,
            triggerY: y,
            triggerH: h,
            direction: openUp ? "up" : "down",
            ready: true,
          });
        },
      );
    });
  }, [maxHeight]);

  const updatePanelHeight = useCallback((panelHeight: number) => {
    setPos((prev) => {
      if (!prev.ready) return prev;

      const nextTop =
        prev.direction === "up"
          ? prev.triggerY - panelHeight
          : prev.triggerY + prev.triggerH;

      if (nextTop === prev.top) return prev;

      return {
        ...prev,
        top: nextTop,
      };
    });
  }, []);

  return { triggerRef, pos, measure, updatePanelHeight };
}

// ─── Trigger row ──────────────────────────────────────────────────────────────

const Trigger: React.FC<{
  triggerRef: React.RefObject<any>;
  onPress: () => void;
  disabled: boolean;
  loading: boolean;
  open: boolean;
  label: string;
  isPlaceholder: boolean;
  placeholderColor: string;
  size: DropdownSize;
  variant: DropdownVariant;
  hasError: boolean;
  focusColor: string;
  leftIcon?: React.ReactNode;
}> = ({
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
  leftIcon,
}) => {
  const sz = SZ[size];
  const opacity = disabled ? 0.5 : 1;
  const textColor = isPlaceholder ? placeholderColor : theme.colors.gray[800];

  // Border colour logic
  const borderColor = hasError
    ? theme.colors.red[500]
    : open
      ? focusColor
      : theme.colors.gray[200];

  // Variant-specific styles
  const variantStyle: ViewStyle = (() => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: open ? theme.colors.white : theme.colors.gray[100],
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 0,
          borderBottomColor: borderColor,
          borderRadius: 8,
        };
      case "underline":
        return {
          backgroundColor: theme.colors.transparent,
          borderWidth: 0,
          borderBottomWidth: open ? 2 : 1.5,
          borderBottomColor: borderColor,
          borderRadius: 0,
        };
      case "ghost":
        return {
          backgroundColor: theme.colors.transparent,
          borderWidth: 0,
        };
      default: // outline
        return {
          backgroundColor: theme.colors.white,
          borderWidth: open ? 1.5 : 1,
          borderColor: borderColor,
          borderRadius: 8,
        };
    }
  })();

  return (
    <StyledButton
      ref={triggerRef}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      compact
      height={sz.triggerHeight}
      paddingHorizontal={sz.px}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={8}
      opacity={opacity}
      accessibilityRole="button"
      accessibilityState={{ expanded: open, disabled }}
      {...variantStyle}
    >
      {/* Left icon */}
      {leftIcon ? (
        <Stack width={22} alignItems="center" justifyContent="center">
          {leftIcon}
        </Stack>
      ) : null}

      {/* Display label */}
      <StyledText
        fontSize={sz.fontSize}
        color={textColor}
        flex={1}
        numberOfLines={1}
      >
        {label}
      </StyledText>

      {/* Right: spinner or animated chevron */}
      {loading ? (
        <Spinner color={theme.colors.gray[400]} size={sz.iconSize} />
      ) : (
        <AnimChevron
          open={open}
          color={theme.colors.gray[400]}
          size={sz.iconSize}
        />
      )}
    </StyledButton>
  );
};

// ─── Meta row — label + helper/error ─────────────────────────────────────────

const MetaRow: React.FC<{
  label?: string;
  helperText?: string;
  errorMessage?: string;
  hasError: boolean;
}> = ({ label, helperText, errorMessage, hasError }) => (
  <>
    {label ? (
      <StyledText
        fontSize={theme.fontSize.small}
        fontWeight={theme.fontWeight.semiBold}
        color={theme.colors.gray[700]}
        marginBottom={6}
      >
        {label}
      </StyledText>
    ) : null}
    {hasError && errorMessage ? (
      <StyledText
        fontSize={theme.fontSize.micro}
        color={theme.colors.red[500]}
        marginTop={4}
      >
        {errorMessage}
      </StyledText>
    ) : helperText ? (
      <StyledText
        fontSize={theme.fontSize.micro}
        color={theme.colors.gray[400]}
        marginTop={4}
      >
        {helperText}
      </StyledText>
    ) : null}
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// ─── StyledDropdown (single-select) ──────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export const StyledDropdown = (
  {
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
    ref,
    ...rest
  }: StyledDropdownProps & { ref?: React.Ref<any> },
) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const { triggerRef, pos, measure, updatePanelHeight } =
      useMeasure(maxHeight);

    const selected = value ?? internalValue;
    const hasError = error || !!errorMessage;
    const selectedItem = useMemo(
      () => data.find((d) => d.value === selected),
      [data, selected],
    );
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
      setOpen((v) => !v);
    }, [disabled, loading, open, measure]);

    const handleSelect = useCallback(
      (item: DropdownOptionItem) => {
        if (value === undefined) setInternalValue(item.value);
        onChange(item as any);
        setOpen(false);
      },
      [value, onChange],
    );

    const handleClear = useCallback(() => {
      if (value === undefined) setInternalValue("");
      onChange(null as any);
    }, [value, onChange]);

    const selectedKeys = useMemo(
      () => new Set([selected].filter(Boolean)),
      [selected],
    );

    return (
      <Stack vertical ref={ref} {...(rest as any)}>
        <MetaRow
          label={label}
          helperText={helperText}
          errorMessage={errorMessage}
          hasError={hasError}
        />
        <Trigger
          triggerRef={triggerRef}
          onPress={toggle}
          disabled={disabled}
          loading={loading}
          open={open}
          label={displayLabel}
          isPlaceholder={isPlaceholder}
          placeholderColor={placeholderTextColor}
          size={size}
          variant={variant}
          hasError={hasError}
          focusColor={focusColor}
          leftIcon={leftIcon}
        />
        {open && (
          <ListPanel
            data={data}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
            onClose={() => setOpen(false)}
            position={pos}
            maxHeight={maxHeight}
            multiSelect={false}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            clearable={clearable}
            onClear={handleClear}
            emptyText={emptyText}
            size={size}
            focusColor={focusColor}
            groupBy={groupBy}
            onPanelLayout={updatePanelHeight}
          />
        )}
      </Stack>
    );
};

StyledDropdown.displayName = "StyledDropdown";

// ─────────────────────────────────────────────────────────────────────────────
// ─── StyledMultiSelectDropdown ────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export const StyledMultiSelectDropdown = (
  {
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
    ref,
    ...rest
  }: StyledMultiSelectDropdownProps & { ref?: React.Ref<any> },
) => {
    const [open, setOpen] = useState(false);
    const [internalKeys, setInternalKeys] = useState<string[]>(
      defaultValue ?? [],
    );
    const { triggerRef, pos, measure, updatePanelHeight } = useMeasure(maxHeight);

    const selectedKeys = useMemo(
      () => new Set(value ?? internalKeys),
      [value, internalKeys],
    );

    const hasError = error || !!errorMessage;
    const selectedItems = useMemo(
      () => data.filter((d) => selectedKeys.has(d.value)),
      [data, selectedKeys],
    );

    const displayLabel = useMemo(() => {
      if (selectedItems.length === 0) return placeholder;
      if (selectedItems.length > maxDisplay)
        return `${selectedItems.length} selected`;
      return selectedItems.map((i) => i.label).join(separator);
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
      setOpen((v) => !v);
    }, [disabled, loading, open, measure]);

    const handleSelect = useCallback(
      (item: DropdownOptionItem) => {
        const next = new Set(selectedKeys);
        next.has(item.value) ? next.delete(item.value) : next.add(item.value);
        const nextArr = Array.from(next);
        if (value === undefined) setInternalKeys(nextArr);
        onChange(data.filter((d) => next.has(d.value)) as any);
      },
      [selectedKeys, value, onChange, data],
    );

    const handleClear = useCallback(() => {
      if (value === undefined) setInternalKeys([]);
      onChange([]);
    }, [value, onChange]);

    const enabledData = useMemo(() => data.filter((d) => !d.disabled), [data]);
    const allSelected =
      selectedItems.length === enabledData.length && enabledData.length > 0;

    const handleSelectAll = useCallback(() => {
      if (allSelected) {
        if (value === undefined) setInternalKeys([]);
        onChange([]);
      } else {
        const allKeys = enabledData.map((d) => d.value);
        if (value === undefined) setInternalKeys(allKeys);
        onChange(enabledData as any);
      }
    }, [allSelected, enabledData, value, onChange]);

    return (
      <Stack vertical ref={ref} {...(rest as any)}>
        <MetaRow
          label={label}
          helperText={helperText}
          errorMessage={errorMessage}
          hasError={hasError}
        />
        <Trigger
          triggerRef={triggerRef}
          onPress={toggle}
          disabled={disabled}
          loading={loading}
          open={open}
          label={displayLabel}
          isPlaceholder={isPlaceholder}
          placeholderColor={placeholderTextColor}
          size={size}
          variant={variant}
          hasError={hasError}
          focusColor={focusColor}
          leftIcon={leftIcon}
        />
        {open && (
          <ListPanel
            data={data}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
            onClose={() => setOpen(false)}
            position={pos}
            maxHeight={maxHeight}
            multiSelect
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            clearable={clearable}
            onClear={handleClear}
            emptyText={emptyText}
            size={size}
            focusColor={focusColor}
            groupBy={groupBy}
            selectAll={selectAll}
            allSelected={allSelected}
            onSelectAll={handleSelectAll}
             onPanelLayout={updatePanelHeight}
          />
        )}
      </Stack>
    );
};

StyledMultiSelectDropdown.displayName = "StyledMultiSelectDropdown";
