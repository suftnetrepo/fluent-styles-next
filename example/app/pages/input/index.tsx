/**
 * TextInputUsage — exhaustive demo of every StyledTextInput feature.
 */

import React, { useRef, useState } from 'react'
import {
    theme,
    StyledScrollView,
    StyledDivider,
    StyledButton,
    Stack,
    StyledText,
    StyledPressable,
    StyledCard,
    palettes,
    StyledTextInput,
    StyledTextInputHandle,
} from "fluent-styles";

// ─── Tiny icon stubs (replace with your icon library) ─────────────────────────

const Icon = ({ e, size = 16, color = theme.colors.gray[400] }: {
    e: string; size?: number; color?: string
}) => <StyledText fontSize={size} color={color}>{e}</StyledText>

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Divider = () => <StyledDivider height={1} backgroundColor={theme.colors.gray[200]} />

const Section = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
    <Stack gap={2} paddingBottom={8} marginBottom={12} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
        <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
            {label}
        </StyledText>
        <>
           {children}
        </>
     
    </Stack>
)

const Btn = ({ label, onPress, color = theme.colors.indigo?.[500] ?? '#6366f1' }: {
    label: string; onPress: () => void; color?: string
}) => (
    <StyledButton
        borderColor={color}
        borderRadius={8}
        borderWidth={1.5}
        alignItems='center'
        backgroundColor={theme.colors.gray[1]}
        onPress={onPress}
        activeOpacity={0.7}
        paddingVertical={10}
    >
        <StyledText fontSize={16} fontWeight="bold" color={color}>{label}</StyledText>
    </StyledButton>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TextInputUsage() {

    // Controlled states
    const [email, setEmail] = useState('')
    const [search, setSearch] = useState('')
    const [bio, setBio] = useState('')
    const [url, setUrl] = useState('')
    const [amount, setAmount] = useState('')
    const [counter, setCounter] = useState('')
    const [loading, setLoading] = useState(false)
    const [floatVal, setFloatVal] = useState('')

    const inputRef = useRef<StyledTextInputHandle>(null)

    const simulateLoad = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
            <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

                    {/* ── 1. Variants ───────────────────────────────────────────────── */}
                    <Section label="Variants">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Outline (default)"
                                placeholder="placeholder text"
                                variant="outline"
                            />
                            <StyledTextInput
                                label="Filled"
                                placeholder="placeholder text"
                                variant="filled"
                            />
                            <StyledTextInput
                                label="Underline"
                                placeholder="placeholder text"
                                variant="underline"
                            />
                            <StyledTextInput
                                label="Ghost"
                                placeholder="placeholder text"
                                variant="ghost"
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 2. Sizes ──────────────────────────────────────────────────── */}
                    <Section label="Sizes">
                        <Stack vertical gap={12}>
                            <StyledTextInput label="Small (sm)" placeholder="Small input" size="sm" />
                            <StyledTextInput label="Medium (md) default" placeholder="Medium input" size="md" />
                            <StyledTextInput label="Large (lg)" placeholder="Large input" size="lg" />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 3. Label states ────────────────────────────────────────────── */}
                    <Section label="Label states">
                        <Stack vertical gap={12}>
                            <StyledTextInput label="Standard label" placeholder="With label above" />
                            <StyledTextInput
                                label="Required field"
                                required
                                placeholder="Marked as required"
                            />
                            <StyledTextInput placeholder="No label" />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 4. Floating label ─────────────────────────────────────────── */}
                    <Section label="Floating label (Material style)">
                        <Stack vertical gap={20}>
                            <StyledTextInput
                                label="Email address"
                                floatLabel
                                value={floatVal}
                                onChangeText={setFloatVal}
                                keyboardType="email-address"
                            />
                            <StyledTextInput
                                label="Password"
                                floatLabel
                                secureTextEntry
                            />
                            <StyledTextInput
                                label="Required float"
                                floatLabel
                                required
                                placeholder=""
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 5. Helper / error / success ────────────────────────────────── */}
                    <Section label="Helper, error, and validation states">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Email"
                                placeholder="you@example.com"
                                helperText="We'll never share your email with anyone."
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <StyledTextInput
                                label="Username"
                                placeholder="@handle"
                                error
                                errorMessage="This username is already taken."
                            />
                            <StyledTextInput
                                label="Password"
                                placeholder="Min 8 characters"
                                error={false}
                                helperText="Use a mix of letters, numbers, and symbols."
                            />
                            <StyledTextInput
                                label="Confirm password"
                                placeholder="Repeat password"
                                error
                                errorMessage="Passwords do not match."
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 6. Left & right icons ──────────────────────────────────────── */}
                    <Section label="Icons (left & right)">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                placeholder="Search…"
                                leftIcon={<Icon e="🔍" />}
                                value={search}
                                onChangeText={setSearch}
                                clearable
                            />
                            <StyledTextInput
                                label="Email"
                                placeholder="you@example.com"
                                leftIcon={<Icon e="✉️" />}
                                keyboardType="email-address"
                            />
                            <StyledTextInput
                                label="Phone"
                                placeholder="+1 555 000 0000"
                                leftIcon={<Icon e="📱" />}
                                keyboardType="phone-pad"
                            />
                            <StyledTextInput
                                label="Date"
                                placeholder="DD / MM / YYYY"
                                rightIcon={<Icon e="📅" />}
                            />
                            <StyledTextInput
                                label="Password"
                                placeholder="Enter password"
                                rightIcon={<Icon e="👁" />}
                                secureTextEntry
                            />
                            <StyledTextInput
                                label="Both icons"
                                placeholder="Search places…"
                                leftIcon={<Icon e="📍" />}
                                rightIcon={<Icon e="🗺️" />}
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 7. Addons ─────────────────────────────────────────────────── */}
                    <Section label="Addons (left & right strips)">
                        <Stack vertical gap={12}>
                            {/* URL prefix */}
                            <StyledTextInput
                                label="Website URL"
                                placeholder="your-site"
                                leftAddon={{ text: 'https://' }}
                                rightAddon={{ text: '.com' }}
                                value={url}
                                onChangeText={setUrl}
                                autoCapitalize="none"
                            />

                            {/* Currency */}
                            <StyledTextInput
                                label="Amount"
                                placeholder="0.00"
                                leftAddon={{ text: '$' }}
                                rightAddon={{ text: 'USD' }}
                                keyboardType="decimal-pad"
                                value={amount}
                                onChangeText={setAmount}
                            />

                            {/* Icon addon */}
                            <StyledTextInput
                                label="Twitter handle"
                                placeholder="username"
                                leftAddon={{ node: <StyledText fontSize={16}>𝕏</StyledText> }}
                                autoCapitalize="none"
                            />

                            {/* Tappable addon */}
                            <StyledTextInput
                                label="Referral code"
                                placeholder="Enter code"
                                rightAddon={{
                                    text: 'Apply',
                                    bg: theme.colors.indigo?.[500] ?? '#6366f1',
                                    color: '#fff',
                                    onPress: () => alert('Code applied!'),
                                }}
                            />

                            {/* Left only */}
                            <StyledTextInput
                                label="Phone"
                                placeholder="Enter number"
                                leftAddon={{
                                    node: <StyledText fontSize={18}>🇬🇧</StyledText>,
                                    text: ' +44',
                                    bg: theme.colors.gray[50],
                                }}
                                keyboardType="phone-pad"
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 8. Clear button ───────────────────────────────────────────── */}
                    <Section label="Clearable">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Search"
                                placeholder="Type to see clear button"
                                clearable
                                value={search}
                                onChangeText={setSearch}
                                leftIcon={<Icon e="🔍" />}
                            />
                            <StyledTextInput
                                label="Email (clearable)"
                                placeholder="you@example.com"
                                clearable
                                keyboardType="email-address"
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 9. Character counter ──────────────────────────────────────── */}
                    <Section label="Character counter">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Bio"
                                placeholder="Tell us about yourself…"
                                showCounter
                                maxLength={100}
                                value={counter}
                                onChangeText={setCounter}
                            />
                            <StyledTextInput
                                label="Tweet"
                                placeholder="What's happening?"
                                showCounter
                                maxLength={280}
                                multiline
                                numberOfLines={3}
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 10. Multiline / textarea ───────────────────────────────────── */}
                    <Section label="Multiline (textarea)">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Bio"
                                placeholder="Write something about yourself…"
                                multiline
                                numberOfLines={4}
                                value={bio}
                                onChangeText={setBio}
                                showCounter
                                maxLength={300}
                            />
                            <StyledTextInput
                                label="Notes"
                                placeholder="Add notes here…"
                                multiline
                                numberOfLines={6}
                                variant="filled"
                            />
                            <StyledTextInput
                                label="Feedback"
                                placeholder="Your message…"
                                multiline
                                numberOfLines={3}
                                variant="underline"
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 11. Loading state ─────────────────────────────────────────── */}
                    <Section label="Loading state">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Username (checking availability…)"
                                placeholder="@handle"
                                loading={loading}
                                defaultValue="alexsmith"
                            />
                            <Btn label={loading ? 'Loading…' : 'Simulate async check (2 s)'} onPress={simulateLoad} />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 12. Disabled & read-only ──────────────────────────────────── */}
                    <Section label="Disabled & read-only">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Disabled"
                                placeholder="Cannot type here"
                                editable={false}
                                helperText="This field is read-only."
                            />
                            <StyledTextInput
                                label="Pre-filled & disabled"
                                defaultValue="alex.johnson@company.com"
                                editable={false}
                            />
                            <StyledTextInput
                                label="Locked with icon"
                                defaultValue="my-api-key-123"
                                editable={false}
                                leftIcon={<Icon e="🔒" />}
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 13. Keyboard types ────────────────────────────────────────── */}
                    <Section label="Keyboard types">
                        <Stack vertical gap={12}>
                            <StyledTextInput label="Email" keyboardType="email-address" placeholder="you@example.com" leftIcon={<Icon e="✉️" />} />
                            <StyledTextInput label="Phone" keyboardType="phone-pad" placeholder="+1 555 000 0000" leftIcon={<Icon e="📞" />} />
                            <StyledTextInput label="Number" keyboardType="numeric" placeholder="42" leftIcon={<Icon e="#" />} />
                            <StyledTextInput label="Decimal" keyboardType="decimal-pad" placeholder="0.00" leftIcon={<Icon e="💲" />} />
                            <StyledTextInput label="URL" keyboardType="url" placeholder="https://example.com" leftIcon={<Icon e="🔗" />} />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 14. Imperative ref ────────────────────────────────────────── */}
                    <Section label="Imperative ref (focus / blur / clear)">
                        <StyledTextInput
                            ref={inputRef}
                            label="Controlled via ref"
                            placeholder="Use the buttons below"
                            defaultValue="Hello, ref!"
                        />
                        <Stack horizontal gap={10}>
                            <Btn label="Focus" onPress={() => inputRef.current?.focus()} />
                            <Btn label="Blur" onPress={() => inputRef.current?.blur()} />
                            <Btn label="Clear" color={theme.colors.red[500]} onPress={() => inputRef.current?.clear()} />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 15. Colour overrides ──────────────────────────────────────── */}
                    <Section label="Custom colours via focusColor">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                label="Green focus"
                                placeholder="Focus me"
                                focusColor={theme.colors.green[500]}
                            />
                            <StyledTextInput
                                label="Rose focus"
                                placeholder="Focus me"
                                focusColor={theme.colors.rose?.[500] ?? '#f43f5e'}
                            />
                            <StyledTextInput
                                label="Amber focus"
                                placeholder="Focus me"
                                focusColor={theme.colors.amber[500]}
                            />
                        </Stack>
                    </Section>

                    <Divider />

                    {/* ── 16. Real-world forms ──────────────────────────────────────── */}
                    <Section label="Sign-in form">
                        <StyledCard backgroundColor="#fff" borderRadius={16} padding={20} borderWidth={1} borderColor="#e5e7eb">
                            <StyledText fontSize={20} fontWeight="800" color="#111827">Welcome back</StyledText>
                            <StyledText fontSize={14} color="#6b7280" marginTop={4}>Sign in to your account</StyledText>
                            <Stack vertical gap={14} marginTop={20}>
                                <StyledTextInput
                                    label="Email"
                                    placeholder="you@example.com"
                                    leftIcon={<Icon e="✉️" />}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    textContentType="emailAddress"
                                />
                                <StyledTextInput
                                    label="Password"
                                    placeholder="••••••••"
                                    leftIcon={<Icon e="🔑" />}
                                    secureTextEntry
                                    textContentType="password"
                                />
                            </Stack>
                            <StyledPressable marginTop={20} backgroundColor={theme.colors.indigo?.[600] ?? '#4f46e5'} borderRadius={12} height={50} alignItems="center" justifyContent="center" onPress={() => {}}>
                                <StyledText color="#fff" fontSize={16} fontWeight="700">Sign in</StyledText>
                            </StyledPressable>
                            <StyledText textAlign="center" marginTop={14} fontSize={13} color={theme.colors.indigo?.[500] ?? '#6366f1'} fontWeight="600">Forgot your password?</StyledText>
                        </StyledCard>
                    </Section>

                    <Section label="Sign-up form">
                        <StyledCard backgroundColor="#fff" borderRadius={16} padding={20} borderWidth={1} borderColor="#e5e7eb">
                            <StyledText fontSize={20} fontWeight="800" color="#111827">Create account</StyledText>
                            <Stack vertical gap={14} marginTop={16}>
                                <Stack horizontal gap={12} flex={1}>
                                    <StyledTextInput label="First name" placeholder="Alex" />
                                    <StyledTextInput label="Last name" placeholder="Johnson" />
                                </Stack>
                                <StyledTextInput
                                    label="Email"
                                    placeholder="you@example.com"
                                    leftIcon={<Icon e="✉️" />}
                                    keyboardType="email-address"
                                    required
                                />
                                <StyledTextInput
                                    label="Username"
                                    placeholder="@handle"
                                    leftAddon={{ text: '@' }}
                                    autoCapitalize="none"
                                />
                                <StyledTextInput
                                    label="Website"
                                    placeholder="yoursite"
                                    leftAddon={{ text: 'https://' }}
                                    rightAddon={{ text: '.com' }}
                                />
                                <StyledTextInput
                                    label="Bio"
                                    placeholder="Tell us about yourself…"
                                    multiline
                                    numberOfLines={3}
                                    showCounter
                                    maxLength={160}
                                    required
                                />
                            </Stack>
                            <StyledPressable marginTop={20} backgroundColor={theme.colors.indigo?.[600] ?? '#4f46e5'} borderRadius={12} height={50} alignItems="center" justifyContent="center" onPress={() => {}}>
                                <StyledText color="#fff" fontSize={16} fontWeight="700">Create account</StyledText>
                            </StyledPressable>
                        </StyledCard>
                    </Section>

                    <Section label="Payment form">
                        <StyledCard backgroundColor="#fff" borderRadius={16} padding={20} borderWidth={1} borderColor="#e5e7eb">
                            <StyledText fontSize={20} fontWeight="800" color="#111827">Payment details</StyledText>
                            <Stack vertical gap={14} marginTop={16}>
                                <StyledTextInput
                                    label="Cardholder name"
                                    placeholder="Alex Johnson"
                                    leftIcon={<Icon e="👤" />}
                                    autoCapitalize="words"
                                />
                                <StyledTextInput
                                    label="Card number"
                                    placeholder="1234 5678 9012 3456"
                                    leftIcon={<Icon e="💳" />}
                                    keyboardType="numeric"
                                    maxLength={19}
                                />
                                <Stack horizontal gap={12}>
                                    <StyledTextInput label="Expiry" placeholder="MM / YY" keyboardType="numeric" maxLength={5} />
                                    <StyledTextInput label="CVV" placeholder="•••" keyboardType="numeric" maxLength={4} secureTextEntry />
                                </Stack>
                                <StyledTextInput
                                    label="Billing ZIP"
                                    placeholder="10001"
                                    leftIcon={<Icon e="📮" />}
                                    keyboardType="numeric"
                                    maxLength={5}
                                />
                            </Stack>
                            <StyledPressable marginTop={20} backgroundColor={theme.colors.green[500]} borderRadius={12} height={50} alignItems="center" justifyContent="center" onPress={() => {}}>
                                <StyledText color="#fff" fontSize={16} fontWeight="700">Pay $49.99</StyledText>
                            </StyledPressable>
                        </StyledCard>
                    </Section>

                    <Section label="Search bar variants">
                        <Stack vertical gap={12}>
                            <StyledTextInput
                                placeholder="Search anything…"
                                variant="filled"
                                leftIcon={<Icon e="🔍" />}
                                clearable
                                value={search}
                                onChangeText={setSearch}

                            />
                            <StyledTextInput
                                placeholder="Search with voice…"
                                variant="outline"
                                leftIcon={<Icon e="🔍" />}
                                rightIcon={<Icon e="🎙️" />}
                                clearable
                            />
                        </Stack>
                    </Section>

            </StyledScrollView>
        </Stack>
    )
}
