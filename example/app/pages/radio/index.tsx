/**
 * StyledRadioDemo.tsx
 * ────────────────────
 * Demonstrates all StyledRadioGroup variants matching the screenshots:
 *
 *  1. Subscription plan — list variant with badge + price right content
 *  2. Billing period card — boxed variant inside a card
 *  3. Delivery method — card variant, 3 columns, blue theme
 *  4. Payment method — list variant with leading card logos
 *  5. Size variants — sm / md / lg
 *  6. Disabled options
 */

import React, { useState } from "react";
import {
    StyledSafeAreaView,
    StyledScrollView,
    StyledPage,
    StyledCard,
    Stack,
    StyledText,
    StyledPressable,
    StyledSpacer,
    StyledDivider,
    theme,
    palettes,
    StyledRadioGroup,
    StyledRadio,
    RadioOption,
} from "fluent-styles";
import Icon from "react-native-vector-icons/Feather";

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    horizontal?: boolean;
}> = ({ title, subtitle, children, horizontal = false }) => (
    <Stack marginBottom={28}>
        <Stack marginBottom={14} paddingHorizontal={2}>
            <StyledText
                fontSize={17}
                fontWeight={theme.fontWeight.bold}
                color={theme.colors.gray[900]}
            >
                {title}
            </StyledText>
            {subtitle && (
                <StyledText
                    fontSize={theme.fontSize.small}
                    color={theme.colors.gray[400]}
                    marginTop={3}
                >
                    {subtitle}
                </StyledText>
            )}
        </Stack>
        <StyledScrollView
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
        >
            <>{children}</>
        </StyledScrollView>
    </Stack>
);

// ─── Price right content helpers ──────────────────────────────────────────────

const PriceBlock: React.FC<{ main: string; sub: string }> = ({ main, sub }) => (
    <Stack alignItems="flex-end" gap={2}>
        <StyledText
            fontSize={theme.fontSize.normal}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.colors.gray[900]}
        >
            {main}
        </StyledText>
        <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
            {sub}
        </StyledText>
    </Stack>
);

const PriceText: React.FC<{ price: string; color?: string }> = ({
    price,
    color,
}) => (
    <StyledText
        fontSize={theme.fontSize.normal}
        fontWeight={theme.fontWeight.semiBold}
        color={color ?? theme.colors.gray[900]}
    >
        {price}
    </StyledText>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const SaveBadge: React.FC<{ label: string }> = ({ label }) => (
    <Stack
        paddingHorizontal={8}
        paddingVertical={3}
        borderRadius={6}
        backgroundColor="#dcfce7"
    >
        <StyledText
            fontSize={10}
            fontWeight="700"
            color="#16a34a"
            letterSpacing={0.5}
        >
            {label}
        </StyledText>
    </Stack>
);

// ─── Card logos ───────────────────────────────────────────────────────────────

const MastercardLogo: React.FC = () => (
    <Stack
        width={36}
        height={24}
        borderRadius={4}
        overflow="hidden"
        backgroundColor="#f4f4f4"
        alignItems="center"
        justifyContent="center"
    >
        <Stack horizontal>
            <Stack
                width={14}
                height={14}
                borderRadius={7}
                backgroundColor="#eb001b"
            />
            <Stack
                width={14}
                height={14}
                borderRadius={7}
                backgroundColor="#f79e1b"
                style={{ marginLeft: -5 }}
            />
        </Stack>
    </Stack>
);

const VisaLogo: React.FC = () => (
    <Stack
        width={40}
        height={24}
        borderRadius={4}
        backgroundColor="#1a1f71"
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={4}
    >
        <StyledText fontSize={11} fontWeight="900" color="#fff" letterSpacing={0.5}>
            VISA
        </StyledText>
    </Stack>
);

// ─── Dataset builders ─────────────────────────────────────────────────────────

// 1. Subscription plan options (list variant + badge)
const PLAN_OPTIONS: RadioOption<string>[] = [
    {
        value: "yearly",
        label: "Yearly",
        badge: <SaveBadge label="SAVE 33%" />,
        rightContent: <PriceBlock main="$19.99/month" sub="$240 billed yearly" />,
    },
    {
        value: "monthly",
        label: "Monthly",
        rightContent: <PriceBlock main="$24/month" sub="$24 billed monthly" />,
    },
];

// 2. Billing period (boxed variant)
const BILLING_OPTIONS: RadioOption<string>[] = [
    {
        value: "monthly",
        label: "Monthly",
        rightContent: <PriceText price="$9.99/month" />,
    },
    {
        value: "yearly",
        label: "Yearly",
        rightContent: <PriceText price="$12.99/month" />,
    },
];

// 3. Delivery method (card variant, 3 cols, blue theme)
const DELIVERY_OPTIONS: RadioOption<string>[] = [
    {
        value: "standard",
        label: "Standard",
        subtitle: "4-10 business days",
        rightContent: (
            <StyledText
                fontSize={15}
                fontWeight={theme.fontWeight.bold}
                color={theme.colors.gray[900]}
            >
                $5.00
            </StyledText>
        ),
    },
    {
        value: "express",
        label: "Express",
        subtitle: "2-5 business days",
        rightContent: (
            <StyledText
                fontSize={15}
                fontWeight={theme.fontWeight.bold}
                color="#2563eb"
            >
                $16.00
            </StyledText>
        ),
    },
    {
        value: "superfast",
        label: "Super Fast",
        subtitle: "1 business day",
        rightContent: (
            <StyledText
                fontSize={15}
                fontWeight={theme.fontWeight.bold}
                color={theme.colors.gray[900]}
            >
                $25.00
            </StyledText>
        ),
    },
];

// 4. Payment method (list variant, leading logos, blue theme)
const PAYMENT_OPTIONS: RadioOption<string>[] = [
    {
        value: "mc8304",
        leadingContent: <MastercardLogo />,
        label: "**** 8304",
        subtitle: "Last time used: Mar 26, 2022",
    },
    {
        value: "visa0123",
        leadingContent: <VisaLogo />,
        label: "**** 0123",
        subtitle: "Never used",
    },
];

// 5. Size showcase
const SIZE_OPTIONS: RadioOption<string>[] = [
    { value: "a", label: "Option A", rightContent: <PriceText price="$5.00" /> },
    { value: "b", label: "Option B", rightContent: <PriceText price="$10.00" /> },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function StyledRadioDemo() {
    const [plan, setPlan] = useState("yearly");
    const [billing, setBilling] = useState("monthly");
    const [delivery, setDelivery] = useState("express");
    const [payment, setPayment] = useState("visa0123");
    const [sizeSm, setSizeSm] = useState("a");
    const [sizeMd, setSizeMd] = useState("a");
    const [sizeLg, setSizeLg] = useState("a");

    return (
        <Stack
            flex={1}
            marginTop={16}
            borderRadius={32}
            backgroundColor={theme.colors.gray[1]}
            paddingHorizontal={16}
            paddingVertical={16}
        >
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 48 }}
            >
                <StyledSpacer height={24} />
                <StyledText
                    fontSize={22}
                    fontWeight={theme.fontWeight.bold}
                    color={theme.colors.gray[900]}
                    marginBottom={4}
                >
                    StyledRadio
                </StyledText>
                <StyledText
                    fontSize={theme.fontSize.small}
                    color={theme.colors.gray[400]}
                    marginBottom={28}
                >
                    Radio button component · all variants
                </StyledText>

                {/* ── 1. Subscription plan — list variant ── */}
                <Section
                    title="Subscription plan"
                    subtitle="list variant · badge · price block"
                >
                    <StyledRadioGroup
                        options={PLAN_OPTIONS}
                        value={plan}
                        onChange={setPlan}
                        variant="list"
                        size="md"
                        colors={{
                            active: "#2563eb",
                            selectedCardBg: "#eff6ff",
                            selectedCardBorder: "#2563eb",
                            unselectedCardBorder: theme.colors.gray[200],
                        }}
                    />
                </Section>

                {/* ── 2. Billing period — boxed variant ── */}
                <Section
                    title="Billing Period"
                    subtitle="boxed variant · inside a card with title"
                >
                    <StyledRadioGroup
                        title="Billing Period"
                        options={BILLING_OPTIONS}
                        value={billing}
                        onChange={setBilling}
                        variant="boxed"
                        size="md"
                    />
                </Section>

                {/* ── 3. Delivery method — card variant, 3 cols, blue ── */}
                <Section
                    horizontal={true}
                    title="Delivery method"
                    subtitle="card variant · 3 columns · blue accent"
                >
                    <StyledRadioGroup
                        options={DELIVERY_OPTIONS}
                        value={delivery}
                        onChange={setDelivery}
                        variant="card"
                        columns={3}
                        gap={10}
                        size="md"
                        colors={{
                            active: "#2563eb",
                            selectedCardBg: "#eff6ff",
                            selectedCardBorder: "#2563eb",
                            unselectedCardBorder: theme.colors.gray[200],
                            subtitle: "#2563eb",
                        }}
                    />
                </Section>

                {/* ── 4. Payment method — list variant, leading logos, blue ── */}
                <Section
                    title="Payment method"
                    subtitle="list variant · leading logos · blue accent"
                >
                    {/* Section header with "Add new card" */}
                    <Stack
                        horizontal
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        marginBottom={12}
                    >
                        <StyledPressable
                            onPress={() => { }}
                            flexDirection="row"
                            alignItems="center"
                            gap={5}
                        >
                            <Icon name="plus" size={16} color="#2563eb" />
                            <StyledText
                                fontSize={theme.fontSize.normal}
                                fontWeight={theme.fontWeight.semiBold}
                                color="#2563eb"
                            >
                                Add new card
                            </StyledText>
                        </StyledPressable>
                    </Stack>

                    <StyledRadioGroup
                        options={PAYMENT_OPTIONS}
                        value={payment}
                        onChange={setPayment}
                        variant="list"
                        size="md"
                        colors={{
                            active: "#2563eb",
                            selectedCardBg: "#eff6ff",
                            selectedCardBorder: "#2563eb",
                            unselectedCardBorder: theme.colors.gray[200],
                        }}
                    />
                </Section>

                {/* ── 5. Size variants ── */}
                <Section title="Size variants" subtitle="sm · md · lg">
                    <Stack gap={14}>
                        <Stack>
                            <StyledText
                                fontSize={12}
                                color={theme.colors.gray[400]}
                                marginBottom={8}
                            >
                                Small (sm)
                            </StyledText>
                            <StyledRadioGroup
                                options={SIZE_OPTIONS}
                                value={sizeSm}
                                onChange={setSizeSm}
                                variant="list"
                                size="sm"
                                colors={{
                                    active: "#2563eb",
                                    selectedCardBg: "#eff6ff",
                                    selectedCardBorder: "#2563eb",
                                    unselectedCardBorder: theme.colors.gray[200],
                                }}
                            />
                        </Stack>
                        <Stack>
                            <StyledText
                                fontSize={12}
                                color={theme.colors.gray[400]}
                                marginBottom={8}
                            >
                                Medium (md) — default
                            </StyledText>
                            <StyledRadioGroup
                                options={SIZE_OPTIONS}
                                value={sizeMd}
                                onChange={setSizeMd}
                                variant="list"
                                size="md"
                                colors={{
                                    active: "#2563eb",
                                    selectedCardBg: "#eff6ff",
                                    selectedCardBorder: "#2563eb",
                                    unselectedCardBorder: theme.colors.gray[200],
                                }}
                            />
                        </Stack>
                        <Stack>
                            <StyledText
                                fontSize={12}
                                color={theme.colors.gray[400]}
                                marginBottom={8}
                            >
                                Large (lg)
                            </StyledText>
                            <StyledRadioGroup
                                options={SIZE_OPTIONS}
                                value={sizeLg}
                                onChange={setSizeLg}
                                variant="list"
                                size="lg"
                                colors={{
                                    active: "#2563eb",
                                    selectedCardBg: "#eff6ff",
                                    selectedCardBorder: "#2563eb",
                                    unselectedCardBorder: theme.colors.gray[200],
                                }}
                            />
                        </Stack>
                    </Stack>
                </Section>

                {/* ── 6. Disabled options ── */}
                <Section
                    title="Disabled state"
                    subtitle="individual options can be disabled"
                >
                    <StyledRadioGroup
                        options={[
                            {
                                value: "active",
                                label: "Active option",
                                rightContent: <PriceText price="$9.99" />,
                            },
                            {
                                value: "disabled",
                                label: "Disabled option",
                                rightContent: <PriceText price="$19.99" />,
                                disabled: true,
                            },
                            {
                                value: "other",
                                label: "Another option",
                                rightContent: <PriceText price="$5.99" />,
                            },
                        ]}
                        defaultValue="active"
                        variant="list"
                        colors={{
                            active: "#2563eb",
                            selectedCardBg: "#eff6ff",
                            selectedCardBorder: "#2563eb",
                            unselectedCardBorder: theme.colors.gray[200],
                        }}
                    />
                </Section>

                {/* ── 7. Standalone dot reference ── */}
                <Section
                    title="StyledRadio (standalone)"
                    subtitle="use the dot directly in custom layouts"
                >
                    <StyledCard
                        backgroundColor={palettes.white}
                        borderRadius={14}
                        padding={16}
                        shadow="light"
                    >
                        <Stack gap={16}>
                            {[
                                {
                                    label: "Selected · dark",
                                    selected: true,
                                    color: theme.colors.gray[900],
                                },
                                {
                                    label: "Unselected",
                                    selected: false,
                                    color: theme.colors.gray[900],
                                },
                                { label: "Selected · blue", selected: true, color: "#2563eb" },
                                { label: "Selected · green", selected: true, color: "#16a34a" },
                                { label: "Selected · rose", selected: true, color: "#e11d48" },
                            ].map(({ label, selected, color }) => (
                                <Stack key={label} horizontal alignItems="center" gap={12}>
                                    <StyledRadio selected={selected} color={color} size="md" />
                                    <StyledText
                                        fontSize={theme.fontSize.normal}
                                        color={theme.colors.gray[700]}
                                    >
                                        {label}
                                    </StyledText>
                                </Stack>
                            ))}
                        </Stack>
                    </StyledCard>
                </Section>

                {/* ── API reference ── */}
                <StyledCard
                    backgroundColor={theme.colors.gray[900]}
                    borderRadius={18}
                    padding={18}
                    shadow="light"
                    marginBottom={8}
                >
                    <StyledText
                        fontSize={12}
                        fontWeight={theme.fontWeight.bold}
                        color="#c6ef3e"
                        marginBottom={12}
                    >
                        StyledRadioGroup · Props
                    </StyledText>
                    {(
                        [
                            ["options", "RadioOption[]", "required"],
                            ["value", "T", "controlled"],
                            ["defaultValue", "T", "uncontrolled"],
                            ["onChange", "(value: T) => void", "—"],
                            ["variant", "list·card·boxed", "list"],
                            ["size", "sm·md·lg", "md"],
                            ["title", "string", "— (boxed only)"],
                            ["columns", "number", "3 (card only)"],
                            ["gap", "number", "10 (card only)"],
                            ["colors", "StyledRadioColors", "dark theme"],
                        ] as [string, string, string][]
                    ).map(([p, t, d]) => (
                        <Stack
                            key={p}
                            horizontal
                            alignItems="center"
                            paddingVertical={5}
                            borderBottomWidth={1}
                            borderBottomColor={theme.colors.gray[800]}
                        >
                            <StyledText
                                fontSize={11}
                                fontWeight={theme.fontWeight.semiBold}
                                color="#f472b6"
                                flex={1}
                            >
                                {p}
                            </StyledText>
                            <StyledText fontSize={11} color={theme.colors.gray[400]} flex={1}>
                                {t}
                            </StyledText>
                            <StyledText fontSize={11} color={theme.colors.gray[600]} flex={1}>
                                {d}
                            </StyledText>
                        </Stack>
                    ))}
                </StyledCard>
            </StyledScrollView>
        </Stack>
    );
}
