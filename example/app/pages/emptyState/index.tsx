/**
 * EmptyStateDemo
 * Demonstrates all StyledEmptyState variants, actions, and real-world use cases.
 * Uses only fluent-styles primitives.
 */

import React, { useState } from "react";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledHeader,
  Stack,
  StyledText,
  StyledPressable,
  StyledCard,
  StyledDivider,
  theme,
  palettes,
  StyledEmptyState,
} from "fluent-styles";

const Section: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <Stack gap={2} marginBottom={12}>
    <StyledText
      fontSize={11}
      fontWeight="700"
      color={theme.colors.gray[400]}
      letterSpacing={0.8}
    >
      {title.toUpperCase()}
    </StyledText>
    {subtitle && (
      <StyledText fontSize={12} color={theme.colors.gray[400]}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
);

export const EmptyStateDemo: React.FC = () => {
  const [tab, setTab] = useState<"all" | "active" | "done">("active");

  return (
    <Stack
      flex={1}
      borderRadius={32}
      marginTop={16}
      backgroundColor={theme.colors.gray[1]}
    >
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >
        {/* 1 — Variants */}
        <Section title="Variants" />
        <Stack gap={16} marginBottom={28}>
          {/* default */}
          <StyledCard
            padding={0}
            borderRadius={16}
            borderWidth={0.5}
            borderColor={theme.colors.gray[200]}
            shadow="light"
            overflow="hidden"
          >
            <StyledEmptyState
              variant="default"
              illustration="📭"
              title="No messages yet"
              description="When you receive a message, it'll show up here."
              actions={[{ label: "Start a conversation", onPress: () => {} }]}
            />
          </StyledCard>

          {/* card */}
          <StyledCard
            padding={0}
            borderRadius={16}
            borderWidth={0.5}
            borderColor={theme.colors.gray[200]}
            shadow="light"
            overflow="hidden"
          >
            <StyledEmptyState
              variant="card"
              illustration="🔍"
              title="No results found"
              description="Try adjusting your search or filters."
              actions={[
                {
                  label: "Clear filters",
                  onPress: () => {},
                  variant: "secondary",
                },
                {
                  label: "Try different terms",
                  onPress: () => {},
                  variant: "primary",
                },
              ]}
            />
          </StyledCard>
          {/* minimal */}
          <StyledCard
            padding={0}
            borderRadius={16}
            borderWidth={0.5}
            borderColor={theme.colors.gray[200]}
            shadow="light"
            overflow="hidden"
          >
            <StyledEmptyState
              variant="minimal"
              illustration="🌿"
              title="Nothing here yet"
              description="Add your first item to get started."
              actions={[{ label: "+ Add item", onPress: () => {} }]}
            />
          </StyledCard>

          <StyledCard
            padding={0}
            borderRadius={16}
            borderWidth={0.5}
            borderColor={theme.colors.gray[200]}
            shadow="light"
            overflow="hidden"
          >
            {/* illustrated */}
            <StyledEmptyState
              variant="illustrated"
              illustration="🗂️"
              title="No files uploaded"
              description="Drop your documents here or tap the button below."
              actions={[
                { label: "Upload file", onPress: () => {}, variant: "primary" },
                {
                  label: "Browse Drive",
                  onPress: () => {},
                  variant: "secondary",
                },
              ]}
            />
          </StyledCard>

          {/* action-focused */}
          <StyledCard
            padding={0}
            borderRadius={16}
            shadow="light"
            overflow="hidden"
          >
            <StyledEmptyState
              variant="action"
              illustration="🚀"
              title="Ready to launch?"
              description="Set up your first project and deploy in seconds."
              actions={[{ label: "Create project", onPress: () => {} }]}
              colors={{
                background: palettes.indigo[600],
                illustrationBg: "rgba(255,255,255,0.15)",
                title: palettes.white,
                description: "rgba(255,255,255,0.75)",
                primaryBg: palettes.white,
                primaryText: palettes.indigo[700],
                primaryBorder: palettes.white,
              }}
            />
          </StyledCard>
        </Stack>

        {/* 2 — Compact / inline */}
        <Section
          title="Compact mode"
          subtitle="Horizontal layout for banners and cells"
        />
        <StyledCard
          padding={0}
          borderRadius={16}
          shadow="light"
          marginBottom={28}
          overflow="hidden"
        >
          <Stack>
            {[
              {
                icon: "📬",
                title: "No notifications",
                desc: "You're all caught up.",
                action: "Mark all read",
              },
              {
                icon: "🧾",
                title: "No recent orders",
                desc: "Your history is empty.",
                action: "Shop now",
              },
              {
                icon: "❤️",
                title: "No saved items",
                desc: "Tap ♡ on anything.",
                action: "Explore",
              },
            ].map(({ icon, title, desc, action }, i) => (
              <Stack key={title}>
                <StyledEmptyState
                  compact
                  illustration={icon}
                  title={title}
                  description={desc}
                  actions={[{ label: action, onPress: () => {} }]}
                  padding={16}
                />
                {i < 2 && (
                  <StyledDivider
                    borderBottomColor={theme.colors.gray[100]}
                    marginHorizontal={16}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </StyledCard>

        {/* 3 — Colour themes */}
        <Section title="Colour themes" />
        <Stack gap={14} marginBottom={28}>
          {/* Rose */}
          <StyledEmptyState
            variant="card"
            illustration="🚨"
            title="Account suspended"
            description="Your account has been temporarily suspended. Please contact support."
            actions={[{ label: "Contact support", onPress: () => {} }]}
            colors={{
              background: palettes.rose[50],
              illustrationBg: palettes.rose[100],
              title: palettes.rose[900],
              description: palettes.rose[500],
              primaryBg: palettes.rose[600],
              primaryText: palettes.white,
              primaryBorder: palettes.rose[600],
              border: palettes.rose[100],
            }}
          />

          {/* Amber */}
          <StyledEmptyState
            variant="illustrated"
            illustration="⚠️"
            title="Quota almost reached"
            description="You've used 90 % of your storage. Consider upgrading."
            actions={[
              { label: "Upgrade plan", onPress: () => {}, variant: "primary" },
              {
                label: "Manage files",
                onPress: () => {},
                variant: "secondary",
              },
            ]}
            colors={{
              background: palettes.amber[50],
              illustrationBg: palettes.amber[100],
              title: palettes.amber[900],
              description: palettes.amber[600],
              primaryBg: palettes.amber[500],
              primaryText: palettes.white,
              primaryBorder: palettes.amber[500],
              secondaryBorder: palettes.amber[300],
              secondaryText: palettes.amber[700],
              border: palettes.amber[200],
            }}
          />

          {/* Teal / success */}
          <StyledEmptyState
            variant="card"
            illustration="✅"
            title="All done!"
            description="You've completed all your tasks for today."
            actions={[{ label: "Add more tasks", onPress: () => {} }]}
            colors={{
              background: palettes.teal[50],
              illustrationBg: palettes.teal[100],
              title: palettes.teal[900],
              description: palettes.teal[600],
              primaryBg: palettes.teal[600],
              primaryText: palettes.white,
              primaryBorder: palettes.teal[600],
            }}
          />
        </Stack>

        {/* 4 — No animation */}
        <Section title="No animation" />
        <StyledCard
          padding={0}
          borderRadius={16}
          shadow="light"
          marginBottom={28}
          overflow="hidden"
        >
          <StyledEmptyState
            variant="minimal"
            illustration="🙈"
            title="Nothing to show"
            animated={false}
            description="Static render — no entrance animation."
          />
        </StyledCard>

        {/* 5 — Real world: tab-gated empty state */}
        <Section title="Real-world: Task list with empty state" />
        <StyledCard
          padding={0}
          borderRadius={16}
          shadow="light"
          marginBottom={28}
          overflow="hidden"
        >
          {/* Tab bar */}
          <Stack
            horizontal
            borderBottomWidth={1}
            borderBottomColor={theme.colors.gray[100]}
          >
            {(["all", "active", "done"] as const).map((t) => (
              <StyledPressable
                key={t}
                onPress={() => setTab(t)}
                flex={1}
                paddingVertical={12}
                alignItems="center"
                borderBottomWidth={2}
                borderBottomColor={
                  tab === t ? theme.colors.gray[900] : "transparent"
                }
              >
                <StyledText
                  fontSize={13}
                  fontWeight={tab === t ? "700" : "500"}
                  color={
                    tab === t ? theme.colors.gray[900] : theme.colors.gray[400]
                  }
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </StyledText>
              </StyledPressable>
            ))}
          </Stack>

          {/* Content */}
          {tab === "all" && (
            <Stack paddingHorizontal={16} paddingVertical={8}>
              {[
                "Design onboarding screens",
                "Write unit tests",
                "Code review",
              ].map((task) => (
                <Stack
                  key={task}
                  horizontal
                  gap={12}
                  alignItems="center"
                  paddingVertical={14}
                  borderBottomWidth={1}
                  borderBottomColor={theme.colors.gray[100]}
                >
                  <Stack
                    width={20}
                    height={20}
                    borderRadius={10}
                    borderWidth={2}
                    borderColor={theme.colors.gray[300]}
                  />
                  <StyledText fontSize={14} color={theme.colors.gray[800]}>
                    {task}
                  </StyledText>
                </Stack>
              ))}
            </Stack>
          )}

          {tab === "active" && (
            <StyledEmptyState
              variant="minimal"
              illustration="✨"
              title="No active tasks"
              description="All tasks have been completed or are awaiting review."
              actions={[{ label: "+ New task", onPress: () => {} }]}
            />
          )}

          {tab === "done" && (
            <StyledEmptyState
              variant="minimal"
              illustration="🏆"
              title="Nothing completed yet"
              description="Finish a task and it'll appear here."
            />
          )}
        </StyledCard>

        {/* 6 — Custom children */}
        <Section title="Custom children slot" />
        <StyledCard
          padding={0}
          borderRadius={16}
          shadow="light"
          overflow="hidden"
        >
          <StyledEmptyState
            variant="illustrated"
            illustration="🌙"
            title="Offline mode"
            description="You're not connected to the internet."
          >
            <Stack gap={10} marginTop={8} width="100%" alignItems="center">
              <StyledPressable
                onPress={() => {}}
                paddingVertical={12}
                paddingHorizontal={24}
                borderRadius={12}
                backgroundColor={theme.colors.gray[900]}
                width={220}
                alignItems="center"
              >
                <StyledText
                  fontSize={14}
                  fontWeight="700"
                  color={palettes.white}
                >
                  Retry connection
                </StyledText>
              </StyledPressable>
              <StyledPressable onPress={() => {}}>
                <StyledText fontSize={13} color={theme.colors.gray[400]}>
                  Work offline instead
                </StyledText>
              </StyledPressable>
            </Stack>
          </StyledEmptyState>
        </StyledCard>
      </StyledScrollView>
    </Stack>
  );
};

export default EmptyStateDemo;
