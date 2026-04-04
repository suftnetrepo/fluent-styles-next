import React from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledBadge,
  BadgeWithIcon,
  BadgeIcon,
  StyledCard,
  StyledImage,
} from "fluent-styles";

// ─── Small emoji helper ──────────────────────────────────────────────────────

const E = ({ e, size = 16 }: { e: string, size?: number }) => (
  <StyledText fontSize={size}>{e}</StyledText>
);

// ─── Section wrapper ─────────────────────────────────────────────────────────

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Stack gap={2} paddingBottom={8} marginBottom={12} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {label}
    </StyledText>
    <>
      {children}
    </>
  
  </Stack>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function BadgeUsage() {
  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          {/* 1. Basic badge */}
          <Section label="Basic badge">
            <Stack gap={10}>
              <StyledBadge>Default badge text</StyledBadge>
              <StyledBadge fontSize={14} color={theme.colors.gray[500]}>
                Secondary badge text
              </StyledBadge>
            </Stack>
          </Section>

          {/* 2. Font sizes */}
          <Section label="Font sizes">
            <Stack vertical gap={10}>
              <StyledBadge fontSize={12}>Small badge</StyledBadge>
              <StyledBadge fontSize={16}>Medium badge</StyledBadge>
              <StyledBadge fontSize={20}>Large badge</StyledBadge>
            </Stack>
          </Section>

          {/* 3. Font weights */}
          <Section label="Font weights">
            <Stack vertical gap={10}>
              <StyledBadge fontWeight="400">Regular</StyledBadge>
              <StyledBadge fontWeight="600">Semi bold</StyledBadge>
              <StyledBadge fontWeight="800">Bold</StyledBadge>
            </Stack>
          </Section>

          {/* 4. Colors */}
          <Section label="Text colors">
            <Stack vertical gap={10}>
              <StyledBadge color={theme.colors.gray[800]}>Gray</StyledBadge>
              <StyledBadge color={theme.colors.green[600]}>Success</StyledBadge>
              <StyledBadge color={theme.colors.red[500]}>Danger</StyledBadge>
              <StyledBadge color={theme.colors.blue[700]}>Info</StyledBadge>
              <StyledBadge color={theme.colors.orange?.[600] ?? "#ea580c"}>
                Warning
              </StyledBadge>
            </Stack>
          </Section>

          {/* 5. Text align */}
          <Section label="Text align">
            <Stack vertical gap={10}>
              <StyledBadge textAlign="left">Left aligned</StyledBadge>
              <StyledBadge textAlign="center">Center aligned</StyledBadge>
              <StyledBadge textAlign="right">Right aligned</StyledBadge>
            </Stack>
          </Section>

          {/* 6. Link style */}
          <Section label="Link style">
            <Stack gap={10}>
              <StyledBadge link>Open profile</StyledBadge>
              <StyledBadge link fontSize={15}>
                View details
              </StyledBadge>
            </Stack>
          </Section>

          {/* 7. Simple pill badges */}
          <Section label="Pill badges">
            <Stack horizontal gap={10} flexWrap="wrap">
              <StyledBadge
                backgroundColor={theme.colors.gray[100]}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
              >
                Default
              </StyledBadge>

              <StyledBadge
                backgroundColor={theme.colors.green[50]}
                color={theme.colors.green[700]}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
              >
                Active
              </StyledBadge>

              <StyledBadge
                backgroundColor={theme.colors.red[50]}
                color={theme.colors.red[600]}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
              >
                Rejected
              </StyledBadge>

              <StyledBadge
                backgroundColor={theme.colors.blue[50]}
                color={theme.colors.blue[700]}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
              >
                New
              </StyledBadge>
            </Stack>
          </Section>

          {/* 8. BadgeWithIcon basic */}
          <Section label="Badge with icon">
            <Stack horizontal gap={12} flexWrap="wrap">
              <BadgeWithIcon
                title="Featured"
                iconLeft={<E e="⭐" />}
                backgroundColor={theme.colors.yellow?.[50] ?? "#fefce8"}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
                gap={6}
              />

              <BadgeWithIcon
                title="Verified"
                iconLeft={<E e="✅" />}
                backgroundColor={theme.colors.green[50]}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
                gap={6}
              />

              <BadgeWithIcon
                title="External"
                iconRight={<E e="↗️" />}
                backgroundColor={theme.colors.gray[100]}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
                gap={6}
                fontSize={theme.fontSize.normal}
              />
            </Stack>
          </Section>

          {/* 9. Status badges */}
          <Section label="Status badges">
            <Stack vertical gap={12}>
              <BadgeWithIcon
                title="In progress"
                iconLeft={<E e="🟡" />}
                color={theme.colors.yellow[700]}
                backgroundColor={theme.colors.yellow?.[50] ?? "#fefce8"}
                paddingHorizontal={12}
                paddingVertical={8}
                borderRadius={999}
                gap={6}
              />

              <BadgeWithIcon
                title="Completed"
                iconLeft={<E e="🟢" />}
                color={theme.colors.green[700]}
                backgroundColor={theme.colors.green[50]}
                paddingHorizontal={12}
                paddingVertical={8}
                borderRadius={999}
                gap={6}
              />

              <BadgeWithIcon
                title="Blocked"
                iconLeft={<E e="🔴" />}
                color={theme.colors.red[700]}
                backgroundColor={theme.colors.red[50]}
                paddingHorizontal={12}
                paddingVertical={8}
                borderRadius={999}
                gap={6}
              />
            </Stack>
          </Section>

          {/* 10. BadgeIcon count badges */}
          <Section label="Count badges">
            <Stack horizontal gap={24} alignItems="center">
              <BadgeIcon char="1" size={24} />
              <BadgeIcon char="3" backgroundColor={theme.colors.blue[600]} size={24} />
              <BadgeIcon char="8" backgroundColor={theme.colors.green[600]} size={24} />
              <BadgeIcon char="9+" backgroundColor={theme.colors.gray[800]} size={24} />
            </Stack>
          </Section>

          {/* 11. BadgeIcon with icons */}
          <Section label="Icon + count badge">
            <Stack horizontal gap={24} alignItems="center">
              <BadgeIcon icon={<E e="🔔" size={24}  />}  char="2" right={20} top={-12} size={16}  />
              <BadgeIcon icon={<E e="💬" size={24} />} char="7" backgroundColor={theme.colors.blue[600]} right={16} top={-12} size={16} />
              <BadgeIcon icon={<E e="🛒" size={24} />} char="4" backgroundColor={theme.colors.green[600]} right={16} top={-12} size={16} />
            </Stack>
          </Section>

          {/* 12. Overlay badge example */}
          <Section label="Overlay badge">
            <Stack>
              <StyledImage
                source={{
                  uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                }}
                width={220}
                height={150}
                borderRadius={18}
              />
              <Stack position="absolute" top={10} right={10}>
                <StyledBadge
                  backgroundColor="rgba(17,24,39,0.78)"
                  color={theme.colors.white}
                  paddingHorizontal={10}
                  paddingVertical={6}
                  borderRadius={999}
                  fontWeight="700"
                >
                  New
                </StyledBadge>
              </Stack>
            </Stack>
          </Section>

          {/* 13. Avatar notification example */}
          <Section label="Avatar notification">
            <Stack>
              <StyledImage
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
                }}
                cycle
                size={64}
                borderRadius={999}
              />
              <Stack position="absolute" top={2} right={2}>
                <BadgeIcon char="3" size={18} />
              </Stack>
            </Stack>
          </Section>

          {/* 14. Profile meta badges */}
          <Section label="Profile meta badges">
            <Stack horizontal gap={10} flexWrap="wrap">
              <BadgeWithIcon
                title="React Native"
                backgroundColor={theme.colors.indigo?.[50] ?? "#eef2ff"}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
              />
              <BadgeWithIcon
                title="TypeScript"
                backgroundColor={theme.colors.blue[50]}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
              />
              <BadgeWithIcon
                title="Available"
                iconLeft={<E e="🟢" />}
                backgroundColor={theme.colors.green[50]}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
                gap={6}
              />
            </Stack>
          </Section>

          {/* 15. Product badges */}
          <Section label="Product badges">
            <Stack horizontal gap={10} flexWrap="wrap">
              <StyledBadge
                backgroundColor={theme.colors.red[50]}
                color={theme.colors.red[600]}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
                fontWeight="700"
              >
                Sale
              </StyledBadge>

              <StyledBadge
                backgroundColor={theme.colors.gray[900]}
                color={theme.colors.white}
                paddingHorizontal={10}
                paddingVertical={6}
                borderRadius={999}
                fontWeight="700"
              >
                Limited
              </StyledBadge>

              <BadgeWithIcon
                title="Free delivery"
                iconLeft={<E e="🚚" />}
                backgroundColor={theme.colors.green[50]}
                paddingHorizontal={12}
                paddingVertical={7}
                borderRadius={999}
                gap={6}
              />
            </Stack>
          </Section>

          {/* 16. Inside card example */}
          <Section label="Inside card">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              padding={16}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              shadow="light"
            >
              <Stack gap={12}>
                <Stack horizontal justifyContent="space-between" alignItems="center">
                  <StyledText fontSize={18} fontWeight={800}>
                    Project Alpha
                  </StyledText>

                  <StyledBadge
                    backgroundColor={theme.colors.green[50]}
                    color={theme.colors.green[700]}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={999}
                    fontWeight="700"
                  >
                    Active
                  </StyledBadge>
                </Stack>

                <StyledText color={theme.colors.gray[500]}>
                  New mobile onboarding flow with reusable UI components and polished interactions.
                </StyledText>

                <Stack horizontal gap={10} flexWrap="wrap">
                  <BadgeWithIcon
                    title="UI"
                    backgroundColor={theme.colors.gray[100]}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={999}
                  />
                  <BadgeWithIcon
                    title="Docs"
                    backgroundColor={theme.colors.gray[100]}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={999}
                  />
                  <BadgeWithIcon
                    title="High priority"
                    iconLeft={<E e="🔥" />}
                    backgroundColor={theme.colors.orange?.[50] ?? "#fff7ed"}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={999}
                    gap={6}
                  />
                </Stack>
              </Stack>
            </StyledCard>
          </Section>

          {/* 17. Notification examples */}
          <Section label="Notification examples">
            <Stack vertical gap={12}>
              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText>Messages</StyledText>
                <BadgeIcon char="12" backgroundColor={theme.colors.blue[600]} size={20} />
              </Stack>

              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText>Orders</StyledText>
                <StyledBadge
                  backgroundColor={theme.colors.green[50]}
                  color={theme.colors.green[700]}
                  paddingHorizontal={10}
                  paddingVertical={6}
                  borderRadius={999}
                  fontWeight="700"
                >
                  Updated
                </StyledBadge>
              </Stack>

              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText>System alerts</StyledText>
                <BadgeWithIcon
                  title="Critical"
                  iconLeft={<E e="🚨" />}
                  backgroundColor={theme.colors.red[50]}
                  paddingHorizontal={12}
                  paddingVertical={7}
                  borderRadius={999}
                  gap={6}
                />
              </Stack>
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
  );
}
