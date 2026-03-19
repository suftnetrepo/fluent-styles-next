import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    forwardRef,
    useMemo,
    ReactNode,
} from "react";
import {
    FlatList,
    Modal,
    ViewStyle,
    Dimensions,
    BackHandler,
} from "react-native";
import { theme } from "../utiles/theme";
import { Stack } from "../stack";
import { StyledText } from "../text";
import { StyledPressable } from "../pressable";
import { StyledButton } from "../button";
import { StyledDivider } from "../divider";
import { ChevronDown, ChevronUp } from "../icons";
import { StyleShape } from "../shape";

type DropdownOptionItem = {
    value: string;
    label: string;
};

interface StyledDropdownProps extends ViewStyle {
    data: DropdownOptionItem[];
    onChange: (item: DropdownOptionItem) => void;
    placeholder: string;
    placeholderTextColor?: string;
    value?: string; // controlled
    defaultValue?: string; // uncontrolled
    disabled?: boolean;

    maxHeight?: number;
}

interface StyledMultiSelectDropdownProps extends ViewStyle {
    data: DropdownOptionItem[];
    onChange: (items: DropdownOptionItem[]) => void;
    placeholder: string;
    placeholderTextColor?: string;

    value?: DropdownOptionItem[]; // controlled
    defaultValue?: DropdownOptionItem[]; // uncontrolled
    disabled?: boolean;
  
    maxHeight?: number;
    separator?: string;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const StyledDropdown = forwardRef<React.ComponentRef<typeof Stack>, StyledDropdownProps>(
    (
        {
            data,
            onChange,
            placeholder,
            placeholderTextColor = theme.colors.gray[500],
            value,
            defaultValue,
            disabled = false,
            maxHeight = 250,
            ...rest
        },
        ref,
    ) => {
        const buttonRef = useRef<any>(null);

        const [expanded, setExpanded] = useState(false);
        const [internalValue, setInternalValue] = useState(defaultValue || "");
        const [position, setPosition] = useState<{
            top: number;
            left: number;
            width: number;
            direction: "up" | "down";
        }>({
            top: 0,
            left: 0,
            width: 0,
            direction: "down",
        });

        const selectedValue = value ?? internalValue;

        /* ----------------------------- MEASURE ----------------------------- */

        const measureDropdown = useCallback(() => {
            buttonRef.current?.measureInWindow(
                (x: number, y: number, width: number, height: number) => {
                    const spaceBelow = SCREEN_HEIGHT - (y + height);
                    const shouldOpenUp = spaceBelow < maxHeight;

                    setPosition({
                        top: shouldOpenUp ? y - maxHeight : y + height - 4,
                        left: x,
                        width,
                        direction: shouldOpenUp ? "up" : "down",
                    });
                },
            );
        }, [maxHeight]);

        /* ----------------------------- TOGGLE ------------------------------ */

        const toggleExpanded = useCallback(() => {
            if (disabled) return;

            if (!expanded) {
                measureDropdown();
            }

            setExpanded((prev) => !prev);
        }, [expanded, disabled, measureDropdown]);

        /* --------------------------- SELECTION ----------------------------- */

        const handleSelect = useCallback(
            (item: DropdownOptionItem) => {
                if (value === undefined) {
                    setInternalValue(item.label);
                }

                onChange(item);
                setExpanded(false);
            },
            [onChange, value],
        );

        /* ------------------------- ANDROID BACK ---------------------------- */

        useEffect(() => {
            if (!expanded) return;

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    setExpanded(false);
                    return true;
                },
            );

            return () => backHandler.remove();
        }, [expanded]);

        /* ---------------------------- RENDER ------------------------------- */

        const renderItem = useCallback(
            ({ item }: { item: DropdownOptionItem }) => {
                const isSelected = selectedValue === item.label;

                return (
                    <StyledButton
                        activeOpacity={0.8}
                        height={40}
                        justifyContent="flex-start"
                        paddingHorizontal={16}
                        borderWidth={0.5}
                        borderRadius={1}
                        borderColor={theme.colors.gray[200]}
                        backgroundColor={
                            isSelected ? theme.colors.gray[100] : theme.colors.gray[50]
                        }
                        onPress={() => handleSelect(item)}
                        accessibilityRole="menuitem"
                    >
                        <StyledText fontSize={15} color={theme.colors.gray[900]}>
                            {item.label}
                        </StyledText>
                        {isSelected && <ChevronUp />}
                        {!isSelected && <ChevronDown />}
                    </StyledButton>
                );
            },
            [handleSelect, selectedValue],
        );

        const keyExtractor = useCallback(
            (item: DropdownOptionItem) => item.value,
            [],
        );

        const displayLabel = useMemo(
            () => selectedValue || placeholder,
            [selectedValue, placeholder],
        );

        return (
            <Stack vertical ref={ref} {...rest}>
                <StyledButton
                    ref={buttonRef}
                    disabled={disabled}
                    activeOpacity={0.8}
                    onPress={toggleExpanded}
                    height={50}
                    justifyContent="space-between"
                    backgroundColor={theme.colors.white}
                    flexDirection="row"
                    alignItems="center"
                    paddingHorizontal={15}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={theme.colors.gray[200]}
                    accessibilityRole="button"
                    accessibilityState={{ expanded }}
                    accessibilityLabel={placeholder}
                >
                    <StyledText fontSize={15} color={placeholderTextColor}>
                        {displayLabel}
                    </StyledText>
                    <StyleShape marginRight={8}>
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </StyleShape>

                </StyledButton>

                {expanded && (
                    <Modal
                        visible={expanded}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setExpanded(false)}
                    >
                        <StyledPressable onPress={() => setExpanded(false)}>
                            <Stack
                                position="absolute"
                                top={position.top}
                                left={position.left}
                                width={position.width}
                                maxHeight={maxHeight}
                                backgroundColor={theme.colors.white}
                                borderRadius={1}
                                borderColor={theme.colors.gray[200]}
                                borderWidth={1}
                                shadowColor={theme.colors.gray[800]}
                                shadowOffset={{ width: 0, height: 2 }}
                                shadowOpacity={0.1}
                                shadowRadius={4}
                                elevation={5}
                                overflow="hidden"
                            >
                                <FlatList
                                    data={data}
                                    keyExtractor={keyExtractor}
                                    renderItem={renderItem}
                                    ItemSeparatorComponent={() => (
                                        <StyledDivider
                                            backgroundColor={theme.colors.gray[200]}
                                            height={1}
                                        />
                                    )}
                                    keyboardShouldPersistTaps="handled"
                                    scrollEnabled={data.length > 6}
                                />
                            </Stack>
                        </StyledPressable>
                    </Modal>
                )}
            </Stack>
        );
    },
);

StyledDropdown.displayName = "StyledDropdown";

export { StyledDropdown, type StyledDropdownProps, type StyledMultiSelectDropdownProps, type DropdownOptionItem };
