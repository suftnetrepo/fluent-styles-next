/**
 * DropdownUsage — exhaustive demo of every feature.
 */

import React, { Fragment, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import {
    theme,
    Stack,
    StyledScrollView,
    StyledSpacer,
    StyledCard,
    StyledSeperator,
    StyledText,
    TabBar,
    TabItem,
    palettes,
    StyledDropdown,
    StyledMultiSelectDropdown,
    DropdownOptionItem,
} from "fluent-styles";

// ─── Icon stubs ───────────────────────────────────────────────────────────────

const E = ({ e }: { e: string }) => <Text style={{ fontSize: 16 }}>{e}</Text>;

// ─── Dataset helpers ──────────────────────────────────────────────────────────

const countries: DropdownOptionItem[] = [
    { value: "gb", label: "United Kingdom", icon: <E e="🇬🇧" /> },
    { value: "us", label: "United States", icon: <E e="🇺🇸" /> },
    { value: "de", label: "Germany", icon: <E e="🇩🇪" /> },
    { value: "fr", label: "France", icon: <E e="🇫🇷" /> },
    { value: "jp", label: "Japan", icon: <E e="🇯🇵" /> },
    { value: "au", label: "Australia", icon: <E e="🇦🇺" /> },
    { value: "ca", label: "Canada", icon: <E e="🇨🇦" /> },
    { value: "br", label: "Brazil", icon: <E e="🇧🇷" /> },
    { value: "in", label: "India", icon: <E e="🇮🇳" /> },
    { value: "ng", label: "Nigeria", icon: <E e="🇳🇬" /> },
];

const roles: DropdownOptionItem[] = [
    {
        value: "admin",
        label: "Admin",
        subtitle: "Full access to all resources",
        icon: <E e="🔑" />,
    },
    {
        value: "editor",
        label: "Editor",
        subtitle: "Can edit but not delete",
        icon: <E e="✏️" />,
    },
    {
        value: "viewer",
        label: "Viewer",
        subtitle: "Read-only access",
        icon: <E e="👁" />,
    },
    {
        value: "billing",
        label: "Billing",
        subtitle: "Access to billing only",
        icon: <E e="💳" />,
        disabled: true,
    },
];

const skills: DropdownOptionItem[] = [
    { value: "react", label: "React", meta: { group: "Frontend" } },
    { value: "rn", label: "React Native", meta: { group: "Mobile" } },
    { value: "typescript", label: "TypeScript", meta: { group: "Frontend" } },
    { value: "node", label: "Node.js", meta: { group: "Backend" } },
    { value: "python", label: "Python", meta: { group: "Backend" } },
    { value: "graphql", label: "GraphQL", meta: { group: "Backend" } },
    { value: "swift", label: "Swift", meta: { group: "Mobile" } },
    { value: "kotlin", label: "Kotlin", meta: { group: "Mobile" } },
    { value: "figma", label: "Figma", meta: { group: "Design" } },
    { value: "css", label: "CSS", meta: { group: "Frontend" } },
];

const timezones: DropdownOptionItem[] = [
    { value: "utc", label: "UTC+00  London", meta: { region: "Europe" } },
    { value: "cet", label: "UTC+01  Paris", meta: { region: "Europe" } },
    { value: "eet", label: "UTC+02  Helsinki", meta: { region: "Europe" } },
    { value: "est", label: "UTC-05  New York", meta: { region: "Americas" } },
    { value: "cst", label: "UTC-06  Chicago", meta: { region: "Americas" } },
    { value: "pst", label: "UTC-08  Los Angeles", meta: { region: "Americas" } },
    { value: "ist", label: "UTC+05:30  Mumbai", meta: { region: "Asia" } },
    { value: "jst", label: "UTC+09  Tokyo", meta: { region: "Asia" } },
    { value: "aest", label: "UTC+10  Sydney", meta: { region: "Oceania" } },
];

const priority: DropdownOptionItem[] = [
    { value: "low", label: "Low", icon: <E e="🟢" /> },
    { value: "medium", label: "Medium", icon: <E e="🟡" /> },
    { value: "high", label: "High", icon: <E e="🔴" /> },
    { value: "critical", label: "Critical", icon: <E e="🚨" /> },
];

const statusOptions: DropdownOptionItem[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "archived", label: "Archived" },
];

const manyItems = Array.from({ length: 50 }, (_, i) => ({
    value: String(i),
    label: `Option ${i + 1}`,
}));

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <Stack paddingVertical={0}>
        <>
            <StyledSeperator
                leftLabel={label}
                borderRadius={8}
                paddingVertical={8}
                paddingHorizontal={8}
                marginVertical={8}
                backgroundColor={theme.colors.gray[200]}
            />
            {children}
        </>

    </Stack>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({

    sectionLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#8e8e93",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 12,
    },

 
    cardTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
});

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function DropdownUsage() {
    // Controlled state examples
    const [country, setCountry] = useState("");
    const [role, setRole] = useState("");
    const [selectedSkills, setSkills] = useState<string[]>([]);
    const [tz, setTz] = useState("");

    return (
        <Fragment>
            <StyledSpacer marginVertical={8} />
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <StyledCard
                    backgroundColor={theme.colors.gray[1]}
                    marginHorizontal={1}
                    borderWidth={0.5}
                    borderColor={theme.colors.gray[1]}
                    borderRadius={32}
                    padding={16}
                >
                    {/* ── 1. Basic single-select ─────────────────────────────────── */}
                    <Section label="Basic single-select">
                        <StyledDropdown
                            label="Country"
                            placeholder="Select a country"
                            data={countries}
                            onChange={(item) => setCountry(item.value)}
                            value={country}
                            helperText="We use this to customise your experience."
                        />
                    </Section>

                    {/* ── 2. Uncontrolled (defaultValue) ────────────────────────── */}
                    <Section label="Uncontrolled (defaultValue)">
                        <StyledDropdown
                            label="Status"
                            placeholder="Pick status"
                            data={statusOptions}
                            defaultValue="active"
                            onChange={(item) => console.log("status:", item.value)}
                        />
                    </Section>

                    {/* ── 3. With icons + subtitle (roles) ──────────────────────── */}
                    <Section label="Icons + subtitle rows">
                        <StyledDropdown
                            label="Team role"
                            placeholder="Assign a role"
                            data={roles}
                            value={role}
                            onChange={(item) => setRole(item.value)}
                        />
                    </Section>

                    {/* ── 4. Searchable ─────────────────────────────────────────── */}
                    <Section label="Searchable list">
                        <StyledDropdown
                            label="Time zone"
                            placeholder="Search time zones…"
                            data={timezones}
                            searchable
                            value={tz}
                            onChange={(item) => setTz(item.value)}
                        />
                    </Section>

                    {/* ── 5. Grouped by section ──────────────────────────────────── */}
                    <Section label="Grouped by section">
                        <StyledDropdown
                            label="Time zone (grouped)"
                            placeholder="Select time zone"
                            data={timezones}
                            searchable
                            groupBy={(item) => (item.meta as any)?.region ?? "Other"}
                            onChange={(item) => console.log(item.value)}
                        />
                    </Section>

                    {/* ── 6. Clearable ──────────────────────────────────────────── */}
                    <Section label="Clearable">
                        <StyledDropdown
                            label="Priority"
                            placeholder="Select priority"
                            data={priority}
                            clearable
                            onChange={(item) => console.log(item?.value)}
                        />
                    </Section>

                    {/* ── 7. Variants ───────────────────────────────────────────── */}
                    <Section label="Variants">
                        <Stack vertical gap={12}>
                            {(["outline", "filled", "underline", "ghost"] as const).map((v) => (
                                <StyledDropdown
                                    key={v}
                                    label={v.charAt(0).toUpperCase() + v.slice(1)}
                                    placeholder={`${v} variant`}
                                    data={statusOptions}
                                    variant={v}
                                    onChange={() => { }}
                                />
                            ))}
                        </Stack>
                    </Section>

                    {/* ── 8. Sizes ──────────────────────────────────────────────── */}
                    <Section label="Sizes">
                        <Stack vertical gap={12}>
                            {(["sm", "md", "lg"] as const).map((s) => (
                                <StyledDropdown
                                    key={s}
                                    label={`Size: ${s}`}
                                    placeholder={`${s} dropdown`}
                                    data={statusOptions}
                                    size={s}
                                    onChange={() => { }}
                                />
                            ))}
                        </Stack>
                    </Section>

                    {/* ── 9. Left icons ─────────────────────────────────────────── */}
                    <Section label="Left icons in trigger">
                        <Stack vertical gap={12}>
                            <StyledDropdown
                                label="Country"
                                placeholder="Select country"
                                data={countries}
                                leftIcon={<E e="🌍" />}
                                onChange={() => { }}
                            />
                            <StyledDropdown
                                label="Priority"
                                placeholder="Choose priority"
                                data={priority}
                                leftIcon={<E e="🚩" />}
                                onChange={() => { }}
                            />
                        </Stack>
                    </Section>

                    {/* ── 10. Error state ───────────────────────────────────────── */}
                    <Section label="Error state">
                        <StyledDropdown
                            label="Role"
                            placeholder="You must select a role"
                            data={roles}
                            error
                            errorMessage="This field is required."
                            onChange={() => { }}
                        />
                    </Section>

                    {/* ── 11. Disabled ──────────────────────────────────────────── */}
                    <Section label="Disabled">
                        <StyledDropdown
                            label="Account type"
                            placeholder="Cannot change this"
                            data={statusOptions}
                            defaultValue="active"
                            disabled
                            onChange={() => { }}
                        />
                    </Section>

                    {/* ── 12. Loading state ─────────────────────────────────────── */}
                    <Section label="Loading state">
                        <StyledDropdown
                            label="Options loading…"
                            placeholder="Please wait"
                            data={[]}
                            loading
                            onChange={() => { }}
                        />
                    </Section>

                    {/* ── 13. Custom focus colour ───────────────────────────────── */}
                    <Section label="Custom focus colour">
                        <Stack vertical gap={12}>
                            <StyledDropdown
                                label="Green focus"
                                placeholder="Pick one"
                                data={statusOptions}
                                focusColor={theme.colors.green[500]}
                                onChange={() => { }}
                            />
                            <StyledDropdown
                                label="Rose focus"
                                placeholder="Pick one"
                                data={statusOptions}
                                focusColor={theme.colors.rose?.[500] ?? "#f43f5e"}
                                onChange={() => { }}
                            />
                        </Stack>
                    </Section>

                    {/* ── 14. Many items (virtual scroll) ──────────────────────── */}
                    <Section label="Many items (50) — scrollable">
                        <StyledDropdown
                            label="Option"
                            placeholder="Choose from 50 items"
                            data={manyItems}
                            searchable
                            maxHeight={300}
                            onChange={(item) => console.log(item.value)}
                        />
                    </Section>

                    {/* ── 15. Multi-select basic ────────────────────────────────── */}
                    <Section label="Multi-select">
                        <StyledMultiSelectDropdown
                            label="Skills"
                            placeholder="Select your skills"
                            data={skills}
                            value={selectedSkills}
                            onChange={(items) => setSkills(items.map((i) => i.value))}
                            helperText={
                                selectedSkills.length > 0
                                    ? `${selectedSkills.length} skill(s) selected`
                                    : undefined
                            }
                        />
                    </Section>

                    {/* ── 16. Multi + searchable + select-all ──────────────────── */}
                    <Section label="Multi-select — searchable + select all">
                        <StyledMultiSelectDropdown
                            label="Technologies"
                            placeholder="Choose technologies"
                            data={skills}
                            searchable
                            selectAll
                            clearable
                            onChange={(items) => console.log(items.map((i) => i.value))}
                        />
                    </Section>

                    {/* ── 17. Multi + grouped ───────────────────────────────────── */}
                    <Section label="Multi-select — grouped by tech stack">
                        <StyledMultiSelectDropdown
                            label="Stack"
                            placeholder="Pick your stack"
                            data={skills}
                            groupBy={(item) => (item.meta as any)?.group ?? "Other"}
                            searchable
                            selectAll
                            onChange={(items) => console.log(items.length, "selected")}
                        />
                    </Section>

                    {/* ── 18. Multi + summary threshold ────────────────────────── */}
                    <Section label="Multi-select — summary after 2">
                        <StyledMultiSelectDropdown
                            label="Countries"
                            placeholder="Select countries"
                            data={countries}
                            maxDisplay={2}
                            separator=" · "
                            onChange={() => { }}
                        />
                    </Section>

                    {/* ── 19. Real-world: sign-up form ─────────────────────────── */}
                    <Section label="Sign-up form">
                     <StyledCard padding={20} borderRadius={16} borderWidth={1} backgroundColor={theme.colors.gray[1]} borderColor={theme.colors.gray[200]} shadowOpacity={0.06} shadowRadius={12} elevation={2} shadowOffset={{ width: 0, height: 4 }} shadowColor={'#000'} >
                              <StyledText fontSize={19} fontWeight={800} color="#111827">Create your profile</StyledText>
                  
                            <Stack vertical gap={14} marginTop={16}>
                                <StyledDropdown
                                    label="Country"
                                    placeholder="Where are you based?"
                                    data={countries}
                                    leftIcon={<E e="🌍" />}
                                    searchable
                                    onChange={() => { }}
                                />
                                <StyledDropdown
                                    label="Role"
                                    placeholder="What is your role?"
                                    data={roles}
                                    onChange={() => { }}
                                />
                                <StyledMultiSelectDropdown
                                    label="Skills"
                                    placeholder="What are your skills?"
                                    data={skills}
                                    searchable
                                    selectAll
                                    onChange={() => { }}
                                />
                                <StyledDropdown
                                    label="Time zone"
                                    placeholder="Your time zone"
                                    data={timezones}
                                    groupBy={(item) => (item.meta as any)?.region}
                                    searchable
                                    onChange={() => { }}
                                />
                            </Stack>
                        </StyledCard>
                    </Section>

                    {/* ── 20. Task form ─────────────────────────────────────────── */}
                    <Section label="Task creation form">
                      <StyledCard padding={20} borderRadius={16} borderWidth={1} backgroundColor={theme.colors.gray[1]} borderColor={theme.colors.gray[200]} shadowOpacity={0.06} shadowRadius={12} elevation={2} shadowOffset={{ width: 0, height: 4 }} shadowColor={'#000'} >
                          <StyledText fontSize={19} fontWeight={800} color="#111827">New task</StyledText>
                            <Stack vertical gap={14} marginTop={16}>
                                <Stack horizontal gap={12}>
                                    <StyledDropdown
                                        label="Priority"
                                        placeholder="Set priority"
                                        data={priority}
                                        flex={1}
                                        onChange={() => { }}
                                    />
                                    <StyledDropdown
                                        label="Status"
                                        placeholder="Set status"
                                        data={statusOptions}
                                        flex={1}
                                        onChange={() => { }}
                                    />
                                </Stack>
                                <StyledMultiSelectDropdown
                                    label="Assign to"
                                    placeholder="Select team members"
                                    data={[
                                        {
                                            value: "alice",
                                            label: "Alice",
                                            icon: <E e="👩" />,
                                            subtitle: "Frontend",
                                        },
                                        {
                                            value: "bob",
                                            label: "Bob",
                                            icon: <E e="👨" />,
                                            subtitle: "Backend",
                                        },
                                        {
                                            value: "carol",
                                            label: "Carol",
                                            icon: <E e="👩" />,
                                            subtitle: "Design",
                                        },
                                        {
                                            value: "dave",
                                            label: "Dave",
                                            icon: <E e="👨" />,
                                            subtitle: "Mobile",
                                        },
                                    ]}
                                    onChange={() => { }}
                                />
                            </Stack>
                        </StyledCard>
                    </Section>
                </StyledCard>
            </StyledScrollView>
        </Fragment>
    );
}

