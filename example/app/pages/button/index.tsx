/**
 * ButtonDemo — exhaustive demo of every StyledButton feature.
 */

import React, { useState } from 'react'
import {
  Stack,
  StyledText,
  StyledDivider,
  theme,
  StyledScrollView,
  StyledCard,
  StyledButton,
} from 'fluent-styles'

// ─── Icon stub ────────────────────────────────────────────────────────────────

const Icon = ({ emoji, size = 16 }: { emoji: string; size?: number }) => (
  <StyledText fontSize={size} lineHeight={size + 2}>{emoji}</StyledText>
)

// ─── Section header ───────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} marginBottom={12} padding={8} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {title}
    </StyledText>
    {subtitle && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

const Button = () => {
  const [loading,  setLoading]  = useState(false)
  const [loading2, setLoading2] = useState(false)

  const fakeAsync = (set: (v: boolean) => void) => {
    set(true)
    setTimeout(() => set(false), 2000)
  }

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* ── 1. Appearance variants ────────────────────────────────────── */}
        <Section title="Appearance variants" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal flex={1} gap={8} flexWrap="wrap">
            <StyledButton primary compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Primary</StyledButton.Text>
            </StyledButton>
            <StyledButton secondary compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Secondary</StyledButton.Text>
            </StyledButton>
            <StyledButton outline compact>
              <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Outline</StyledButton.Text>
            </StyledButton>
            <StyledButton ghost compact>
              <StyledButton.Text color={theme.colors.gray[700]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Ghost</StyledButton.Text>
            </StyledButton>
            <StyledButton link compact>
              <StyledButton.Text color={theme.colors.blue[500]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Link</StyledButton.Text>
            </StyledButton>
            <StyledButton danger compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Danger</StyledButton.Text>
            </StyledButton>
            <StyledButton success compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Success</StyledButton.Text>
            </StyledButton>
            <StyledButton warning compact>
              <StyledButton.Text color={theme.colors.gray[900]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Warning</StyledButton.Text>
            </StyledButton>
            <StyledButton disabled compact>
              <StyledButton.Text color={theme.colors.gray[400]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Disabled</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 2. Sizes ──────────────────────────────────────────────────── */}
        <Section title="Sizes (xs to xl)" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal flex={1} gap={8} alignItems="center" flexWrap="wrap">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <StyledButton key={s} primary compact {...{ [s]: true }}>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={
                    s === 'xs' ? theme.fontSize.nano
                    : s === 'sm' ? theme.fontSize.micro
                    : s === 'md' ? theme.fontSize.small
                    : s === 'lg' ? theme.fontSize.normal
                    : theme.fontSize.large
                  }
                  fontWeight={theme.fontWeight.normal}
                >
                  {s.toUpperCase()}
                </StyledButton.Text>
              </StyledButton>
            ))}
          </Stack>
        </StyledCard>

        {/* ── 3. Shapes ─────────────────────────────────────────────────── */}
        <Section title="Shapes" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal flex={1} gap={8}>
            <StyledButton primary compact pill>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Pill</StyledButton.Text>
            </StyledButton>
            <StyledButton primary compact rounded>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Rounded</StyledButton.Text>
            </StyledButton>
            <StyledButton backgroundColor={theme.colors.yellow[500]} borderWidth={0} square>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Square</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 4. With icons ─────────────────────────────────────────────── */}
        <Section title="With icons" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={10}>
            <StyledButton primary compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Deploy</StyledButton.Text>
            </StyledButton>
            <StyledButton outline compact>
              <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Continue</StyledButton.Text>
            </StyledButton>
            <StyledButton secondary compact>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Download package</StyledButton.Text>
            </StyledButton>
            <Stack horizontal gap={10}>
              {[
                { label: 'Mail',  bg: theme.colors.indigo[500] },
                { label: 'Bell',  bg: theme.colors.amber[400]  },
                { label: 'Gear',  bg: theme.colors.gray[200]   },
                { label: 'Trash', bg: theme.colors.red[500]    },
              ].map(({ label, bg }) => (
                <StyledButton key={label} icon backgroundColor={bg}>
                  <StyledText fontSize={18}>{label}</StyledText>
                </StyledButton>
              ))}
            </Stack>
          </Stack>
        </StyledCard>

        {/* ── 5. Loading state ──────────────────────────────────────────── */}
        <Section title="Loading state" subtitle="Tap to trigger a 2s fake async" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={10}>
            <StyledButton primary compact loading={loading} onPress={() => fakeAsync(setLoading)}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>
                {loading ? 'Saving...' : 'Save changes'}
              </StyledButton.Text>
            </StyledButton>
            <StyledButton outline compact loading={loading2} onPress={() => fakeAsync(setLoading2)}>
              <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>
                {loading2 ? 'Uploading...' : 'Upload file'}
              </StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 6. Full-width block buttons ────────────────────────────────── */}
        <Section title="Full-width (block)" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={10}>
            <StyledButton primary block>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.bold}>Create account</StyledButton.Text>
            </StyledButton>
            <StyledButton outline block>
              <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.semiBold}>Sign in instead</StyledButton.Text>
            </StyledButton>
            <StyledButton danger block>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.semiBold}>Delete account</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 7. Custom colours ─────────────────────────────────────────── */}
        <Section title="Custom colours" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal flex={1} gap={8} flexWrap="wrap">
            <StyledButton compact backgroundColor={theme.colors.yellow[500]} borderWidth={0} borderRadius={100}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.bold}>View on GitHub</StyledButton.Text>
            </StyledButton>
            <StyledButton compact backgroundColor={theme.colors.violet[600]} borderRadius={12}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Upgrade plan</StyledButton.Text>
            </StyledButton>
            <StyledButton compact backgroundColor={theme.colors.teal[500]} borderRadius={8}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Connect wallet</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 8. Button groups ──────────────────────────────────────────── */}
        <Section title="Button groups" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal style={{ overflow: 'hidden', borderRadius: 10, borderWidth: 1, borderColor: theme.colors.gray[200] }}>
            {['Day', 'Week', 'Month'].map((label, i, arr) => (
              <StyledButton
                key={label}
                compact
                backgroundColor={i === 1 ? theme.colors.indigo[500] : theme.colors.white}
                borderRadius={0}
                borderWidth={0}
                flex={1}
                style={[
                  i === 0 && { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
                  i === arr.length - 1 && { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                ]}
              >
                <StyledButton.Text
                  color={i === 1 ? theme.colors.white : theme.colors.gray[700]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  {label}
                </StyledButton.Text>
              </StyledButton>
            ))}
          </Stack>

          <Stack horizontal flex={1} gap={8} marginTop={12}>
            <StyledButton outline flex={1}>
              <StyledButton.Text color={theme.colors.gray[700]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Cancel</StyledButton.Text>
            </StyledButton>
            <StyledButton primary flex={2}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>Confirm and pay</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 9. Social / branded ────────────────────────────────────────── */}
        <Section title="Social / branded" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={10}>
            <StyledButton block backgroundColor="#1DA1F2" borderRadius={100}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.bold}>Continue with Twitter</StyledButton.Text>
            </StyledButton>
            <StyledButton block backgroundColor="#24292e" borderRadius={100}>
              <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.bold}>Continue with GitHub</StyledButton.Text>
            </StyledButton>
            <StyledButton block backgroundColor={theme.colors.white} borderRadius={100} borderWidth={1} borderColor={theme.colors.gray[200]}>
              <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.bold}>Continue with Google</StyledButton.Text>
            </StyledButton>
          </Stack>
        </StyledCard>

        {/* ── 10. Card CTA (real-world) ──────────────────────────────────── */}
        <Section title="Card CTA" subtitle="Real-world composition example" />
        <StyledCard shadow="light" padding={20} borderRadius={20} gap={12} borderWidth={1} borderColor={theme.colors.gray[200]} marginBottom={24}>
          <StyledText fontSize={theme.fontSize.normal} fontWeight={theme.fontWeight.bold} color={theme.colors.gray[900]}>
            Pro plan
          </StyledText>
          <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[500]} marginTop={4} marginBottom={16}>
            Unlimited projects, priority support, and advanced analytics.
          </StyledText>
          <StyledButton block backgroundColor={theme.colors.indigo[600]} borderRadius={14} paddingVertical={14}>
            <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.bold}>Get started</StyledButton.Text>
          </StyledButton>
          <StyledButton link block marginTop={8}>
            <StyledButton.Text color={theme.colors.gray[400]} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.normal}>Maybe later</StyledButton.Text>
          </StyledButton>
        </StyledCard>

      </StyledScrollView>
    </Stack>
  )
}

export default Button
