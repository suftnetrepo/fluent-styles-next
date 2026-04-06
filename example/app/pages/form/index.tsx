import React, { useState } from "react";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledHeader,
  StyledButton,
  StyledCard,
  StyledText,
  StyledDivider,
  Stack,
  theme,
  palettes,
  StyledForm,
  StyledSpacer,
} from "fluent-styles";

// ─── Shared options ───────────────────────────────────────────────────────────

const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
];

const PLAN_OPTIONS = [
  {
    value: "free",
    label: "Free",
    subtitle: "Up to 3 projects",
    rightContent: <StyledText fontWeight="700">$0 / mo</StyledText>,
  },
  {
    value: "pro",
    label: "Pro",
    subtitle: "Unlimited projects",
    rightContent: (
      <StyledText fontWeight="700" color={palettes.indigo[600]}>
        $12 / mo
      </StyledText>
    ),
  },
  {
    value: "team",
    label: "Team",
    subtitle: "Up to 20 seats",
    rightContent: <StyledText fontWeight="700">$49 / mo</StyledText>,
  },
];

const ROLE_OPTIONS = [
  { value: "dev", label: "Developer" },
  { value: "design", label: "Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "other", label: "Other" },
];

// ─── Section label ────────────────────────────────────────────────────────────

const DemoSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Stack>
    <StyledText
      fontSize={14}
      fontWeight="700"
      marginHorizontal={16}
      color={theme.colors.gray[400]}
      letterSpacing={0.8}
    >
      {title}
    </StyledText>
    <>{children}</>
  </Stack>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. Sign-up form
// ─────────────────────────────────────────────────────────────────────────────

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    email:
      email.length > 0 && !email.includes("@")
        ? "Enter a valid email"
        : undefined,
    password:
      password.length > 0 && password.length < 8
        ? "At least 8 characters"
        : undefined,
    confirm:
      confirm.length > 0 && confirm !== password
        ? "Passwords do not match"
        : undefined,
  };

  const valid =
    email.includes("@") &&
    password.length >= 8 &&
    confirm === password &&
    agreed;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <StyledCard padding={24} borderRadius={16} shadow="light">
        <Stack alignItems="center" gap={8}>
          <StyledText fontSize={32}>🎉</StyledText>
          <StyledText
            fontSize={16}
            fontWeight="700"
            color={theme.colors.gray[900]}
          >
            Account created!
          </StyledText>
          <StyledText
            fontSize={13}
            color={theme.colors.gray[400]}
            textAlign="center"
          >
            Check your inbox to verify your email address.
          </StyledText>
          <StyledButton
            outline
            compact
            marginTop={8}
            onPress={() => {
              setSubmitted(false);
              setEmail("");
              setPassword("");
              setConfirm("");
              setAgreed(false);
            }}
          >
            Reset demo
          </StyledButton>
        </Stack>
      </StyledCard>
    );
  }

  return (
    <StyledCard padding={20} borderRadius={16} shadow="light">
      <StyledForm gap={16} avoidKeyboard={false} disabled={submitting}>
        <StyledForm.Input
          label="Email address"
          required
          variant="outline"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={!!errors.email}
          errorMessage={errors.email}
          leftIcon={<StyledText fontSize={15}>✉️</StyledText>}
        />

        <StyledForm.Input
          label="Password"
          required
          variant="outline"
          placeholder="8+ characters"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={!!errors.password}
          errorMessage={errors.password}
          helperText={
            !errors.password && password.length > 0 ? "Looks good ✓" : undefined
          }
        />

        <StyledForm.Input
          label="Confirm password"
          required
          variant="outline"
          placeholder="Repeat password"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          error={!!errors.confirm}
          errorMessage={errors.confirm}
        />

        <StyledDivider borderBottomColor={theme.colors.gray[100]} />

        <Stack horizontal alignItems="center" gap={12}>
          <StyledForm.Checkbox
            checked={agreed}
            onCheck={setAgreed}
            checkedColor={theme.colors.indigo[600]}
          />
          <StyledText fontSize={13} color={theme.colors.gray[600]} flex={1}>
            I agree to the{" "}
            <StyledText
              fontWeight="700"
              fontSize={13}
              color={theme.colors.indigo[600]}
            >
              Terms of Service
            </StyledText>{" "}
            and{" "}
            <StyledText
              fontWeight="700"
              fontSize={13}
              color={theme.colors.indigo[600]}
            >
              Privacy Policy
            </StyledText>
          </StyledText>
        </Stack>

        <StyledForm.Actions>
          <StyledButton
            block
            loading={submitting}
            onPress={handleSubmit}
            backgroundColor={theme.colors.indigo[600]}
          >
            <StyledText
              color={theme.colors.white}
              fontSize={15}
              fontWeight="700"
            >
              {submitting ? "Creating account…" : "Create account"}
            </StyledText>
          </StyledButton>
        </StyledForm.Actions>
      </StyledForm>
    </StyledCard>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Profile edit form — Row, Section, Select, Switch, DatePicker
// ─────────────────────────────────────────────────────────────────────────────

const ProfileForm: React.FC = () => {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("gb");
  const [role, setRole] = useState("dev");
  const [dob, setDob] = useState<Date | null>(null);
  const [newsletter, setNewsletter] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <StyledCard padding={20} borderRadius={16} shadow="light">
      <StyledForm gap={20} avoidKeyboard={false}>
        <StyledForm.Section
          title="Personal details"
          subtitle="How you appear to others"
        >
          <StyledForm.Row>
            <StyledForm.Input
              label="First name"
              flex={1}
              variant="outline"
              value={firstName}
              onChangeText={setFirstName}
            />
            <StyledForm.Input
              label="Last name"
              flex={1}
              variant="outline"
              value={lastName}
              onChangeText={setLastName}
            />
          </StyledForm.Row>

          <StyledForm.Input
            label="Bio"
            variant="outline"
            placeholder="Tell us a little about yourself…"
            multiline
            showCounter
            maxLength={160}
            value={bio}
            onChangeText={setBio}
            helperText="Shown on your public profile"
          />

          <StyledForm.Select
            label="Country"
            variant="outline"
            data={COUNTRY_OPTIONS}
            value={country}
            onChange={(item) => setCountry(item.value)}
            placeholder="Select country"
          />

          <StyledForm.DatePicker
            label="Date of birth"
            mode="date"
            variant="input"
            placeholder="Pick a date"
            value={dob}
            onChange={setDob}
            onConfirm={setDob}
            colors={{
              selected: palettes.indigo[600],
              today: palettes.indigo[600],
            }}
          />
        </StyledForm.Section>

        <StyledForm.Section title="Work" subtitle="Your professional info">
          <StyledForm.Radio
            options={ROLE_OPTIONS}
            value={role}
            onChange={setRole}
            variant="card"
            columns={2}
            colors={{
              active: palettes.indigo[600],
              selectedCardBg: palettes.indigo[50],
              selectedCardBorder: palettes.indigo[600],
            }}
          />
        </StyledForm.Section>

        <StyledForm.Section title="Notifications">
          <Stack
            horizontal
            alignItems="center"
            justifyContent="space-between"
            paddingVertical={4}
          >
            <Stack gap={2} flex={1}>
              <StyledText
                fontSize={14}
                fontWeight="600"
                color={theme.colors.gray[900]}
              >
                Newsletter
              </StyledText>
              <StyledText fontSize={12} color={theme.colors.gray[400]}>
                Monthly product updates
              </StyledText>
            </Stack>
            <StyledForm.Switch
              value={newsletter}
              onChange={setNewsletter}
              activeColor={palettes.indigo[600]}
            />
          </Stack>

          <StyledDivider borderBottomColor={theme.colors.gray[100]} />

          <Stack
            horizontal
            alignItems="center"
            justifyContent="space-between"
            paddingVertical={4}
          >
            <Stack gap={2} flex={1}>
              <StyledText
                fontSize={14}
                fontWeight="600"
                color={theme.colors.gray[900]}
              >
                Public profile
              </StyledText>
              <StyledText fontSize={12} color={theme.colors.gray[400]}>
                Anyone can view your profile
              </StyledText>
            </Stack>
            <StyledForm.Switch
              value={publicProfile}
              onChange={setPublicProfile}
              activeColor={palettes.indigo[600]}
            />
          </Stack>
        </StyledForm.Section>

        <StyledForm.Actions horizontal gap={10}>
          <StyledButton
            outline
            compact
            flex={1}
            onPress={() => setSaved(false)}
          >
            <StyledText
              fontSize={14}
              fontWeight="600"
              color={theme.colors.gray[700]}
            >
              Discard
            </StyledText>
          </StyledButton>
          <StyledButton
            primary
            compact
            flex={1}
            backgroundColor={palettes.indigo[600]}
            onPress={() => setSaved(true)}
          >
            <StyledText fontSize={14} fontWeight="700" color={palettes.white}>
              {saved ? "Saved ✓" : "Save changes"}
            </StyledText>
          </StyledButton>
        </StyledForm.Actions>
      </StyledForm>
    </StyledCard>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Subscription form — Radio plan picker + Slider + disabled state
// ─────────────────────────────────────────────────────────────────────────────

const SubscriptionForm: React.FC = () => {
  const [plan, setPlan] = useState("pro");
  const [seats, setSeats] = useState(5);
  const [locked, setLocked] = useState(false);

  const pricePerSeat = plan === "free" ? 0 : plan === "pro" ? 12 : 49;
  const total = pricePerSeat * seats;

  return (
    <StyledCard padding={20} borderRadius={16} shadow="light">
      <StyledForm gap={20} avoidKeyboard={false} disabled={locked}>
        <StyledForm.Section title="Choose a plan">
          <StyledForm.Radio
            options={PLAN_OPTIONS}
            value={plan}
            onChange={setPlan}
            variant="list"
            colors={{
              active: palettes.indigo[600],
              selectedCardBg: palettes.indigo[50],
              selectedCardBorder: palettes.indigo[600],
            }}
          />
        </StyledForm.Section>

        {plan === "team" && (
          <StyledForm.Section title="Team size">
            <Stack gap={8}>
              <Stack horizontal justifyContent="space-between">
                <StyledText fontSize={13} color={theme.colors.gray[500]}>
                  Seats
                </StyledText>
                <StyledText
                  fontSize={13}
                  fontWeight="700"
                  color={theme.colors.gray[900]}
                >
                  {seats}
                </StyledText>
              </Stack>
              <StyledForm.Slider
                value={seats}
                min={2}
                max={50}
                step={1}
                onValueChange={setSeats}
                formatLabel={(v) => `${v} seats`}
                colors={{
                  fill: palettes.indigo[600],
                  track: palettes.indigo[100],
                  thumbBorder: palettes.indigo[600],
                  tooltipBg: palettes.indigo[600],
                }}
              />
            </Stack>
          </StyledForm.Section>
        )}

        {/* Live price summary */}
        <Stack
          padding={14}
          borderRadius={12}
          backgroundColor={palettes.indigo[50]}
          gap={4}
        >
          <Stack horizontal justifyContent="space-between">
            <StyledText fontSize={13} color={palettes.indigo[500]}>
              {plan === "team"
                ? `${seats} seats × $${pricePerSeat}`
                : "Monthly total"}
            </StyledText>
            <StyledText
              fontSize={15}
              fontWeight="800"
              color={palettes.indigo[700]}
            >
              {total === 0 ? "Free" : `$${total} / mo`}
            </StyledText>
          </Stack>
        </Stack>

        <StyledForm.Actions>
          <StyledButton
            primary
            block
            backgroundColor={
              locked ? theme.colors.gray[300] : palettes.indigo[600]
            }
            onPress={() => setLocked((v) => !v)}
          >
            <StyledText fontSize={15} fontWeight="700" color={palettes.white}>
              {locked ? "🔒 Form disabled (tap to re-enable)" : "Subscribe"}
            </StyledText>
          </StyledButton>
        </StyledForm.Actions>
      </StyledForm>
    </StyledCard>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Search / filter form — compact, no sections
// ─────────────────────────────────────────────────────────────────────────────

const FilterForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [inStock, setInStock] = useState(true);

  return (
    <StyledCard padding={20} borderRadius={16} shadow="light">
      <StyledForm gap={14} avoidKeyboard={false}>
        <StyledForm.Input
          variant="filled"
          placeholder="Search products…"
          value={query}
          onChangeText={setQuery}
          clearable
          leftIcon={<StyledText fontSize={14}>🔍</StyledText>}
        />

        <StyledForm.Select
          label="Region"
          variant="outline"
          size="sm"
          data={COUNTRY_OPTIONS}
          value={country}
          onChange={(item) => setCountry(item.value)}
          placeholder="All regions"
        />

        <Stack gap={6}>
          <Stack horizontal justifyContent="space-between">
            <StyledText fontSize={13} color={theme.colors.gray[500]}>
              Price range
            </StyledText>
            <StyledText
              fontSize={13}
              fontWeight="700"
              color={theme.colors.gray[800]}
            >
              ${minPrice} – ${maxPrice}
            </StyledText>
          </Stack>
          <StyledForm.Slider
            variant="range"
            value={minPrice}
            valueHigh={maxPrice}
            min={0}
            max={1000}
            step={10}
            onRangeChange={(lo, hi) => {
              setMinPrice(lo);
              setMaxPrice(hi);
            }}
            formatLabel={(v) => `$${v}`}
            colors={{
              fill: theme.colors.gray[800],
              thumbBorder: theme.colors.gray[800],
            }}
          />
        </Stack>

        <Stack horizontal alignItems="center" justifyContent="space-between">
          <StyledText
            fontSize={14}
            fontWeight="600"
            color={theme.colors.gray[800]}
          >
            In stock only
          </StyledText>
          <StyledForm.Switch value={inStock} onChange={setInStock} size="sm" />
        </Stack>

        <StyledForm.Actions horizontal gap={10}>
          <StyledButton
            outline
            compact
            flex={1}
            onPress={() => {
              setQuery("");
              setCountry(undefined);
              setMinPrice(0);
              setMaxPrice(500);
              setInStock(true);
            }}
          >
            <StyledText
              fontSize={13}
              fontWeight="600"
              color={theme.colors.gray[700]}
            >
              Reset
            </StyledText>
          </StyledButton>
          <StyledButton
            primary
            compact
            flex={2}
            backgroundColor={theme.colors.gray[900]}
          >
            <StyledText fontSize={13} fontWeight="700" color={palettes.white}>
              Apply filters
            </StyledText>
          </StyledButton>
        </StyledForm.Actions>
      </StyledForm>
    </StyledCard>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────────────────────────────────────

export const StyledFormDemo: React.FC = () => (
  <Stack
    flex={1}
    marginTop={16}
    borderRadius={26}
    backgroundColor={theme.colors.gray[1]}
  >
    <StyledScrollView showsVerticalScrollIndicator={false}>
      <StyledSpacer marginVertical={16} />
      <DemoSection title="Sign-up  Input, Checkbox, validation">
        <SignUpForm />
      </DemoSection>

      <DemoSection title="Profile — Row, Section, Select, DatePicker, Switch, Radio">
        <ProfileForm />
      </DemoSection>

      <DemoSection title="Subscription — Radio + Slider + disabled state via context">
        <SubscriptionForm />
      </DemoSection>

      <DemoSection title="Filter panel — compact, no sections">
        <FilterForm />
      </DemoSection>
    </StyledScrollView>
  </Stack>
);

export default StyledFormDemo;
