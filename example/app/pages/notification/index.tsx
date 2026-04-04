import React, { useRef, useState } from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledButton,
  StyledCard,
  useNotification
} from "fluent-styles";

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
    {children}
  </Stack>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function NotificationUsage() {
  const notification = useNotification();
  const lastId = useRef<number | null>(null);
  const [status, setStatus] = useState("No notification shown yet");

  const dismissLast = () => {
    if (lastId.current == null) {
      setStatus("No notification id available");
      return;
    }
    notification.dismiss(lastId.current);
    setStatus(`Dismissed notification ${lastId.current}`);
    lastId.current = null;
  };

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          <StyledCard
            backgroundColor={theme.colors.white}
            borderRadius={18}
            borderWidth={1}
            borderColor={theme.colors.gray[100]}
            padding={16}
            shadow="light"
          >
            <StyledText fontSize={18} fontWeight={800}>
              Notification hook usage
            </StyledText>
            <StyledText color={theme.colors.gray[500]}>
              Status: {status}
            </StyledText>
          </StyledCard>

          <Section label="Basic notification">
            <StyledButton
              onPress={() => {
                const id = notification.show({
                  title: "New message from Alex",
                  body: "Hey, are you free this afternoon?",
                  source: "Messages",
                  initials: "AK",
                  timestamp: "now",
                  theme: "dark",
                });
                lastId.current = id;
                setStatus(`Basic notification shown: ${id}`);
              }}
            >
              Show basic notification
            </StyledButton>
          </Section>

          <Section label="With avatar">
            <StyledButton
              onPress={() => {
                const id = notification.show({
                  title: "Sarah Johnson",
                  body: "Sent you 3 new design files.",
                  source: "Drive",
                  avatar: {
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
                  },
                  timestamp: "2m",
                  theme: "light",
                });
                lastId.current = id;
                setStatus(`Avatar notification shown: ${id}`);
              }}
            >
              Show avatar notification
            </StyledButton>
          </Section>

          <Section label="Initials fallback">
            <StyledButton
              onPress={() => {
                const id = notification.show({
                  title: "Finance Team",
                  body: "Your invoice has been approved.",
                  source: "Billing",
                  initials: "FT",
                  timestamp: "5m",
                  theme: "light",
                });
                lastId.current = id;
                setStatus(`Initials notification shown: ${id}`);
              }}
            >
              Show initials notification
            </StyledButton>
          </Section>

          <Section label="With action button">
            <StyledButton
              onPress={() => {
                const id = notification.show({
                  title: "Deployment finished",
                  body: "Production build completed successfully.",
                  source: "CI/CD",
                  initials: "CI",
                  timestamp: "now",
                  actionLabel: "Open",
                  onAction: () => {
                    setStatus("User tapped notification action");
                  },
                  theme: "dark",
                });
                lastId.current = id;
                setStatus(`Action notification shown: ${id}`);
              }}
            >
              Show action notification
            </StyledButton>
          </Section>

          <Section label="Custom duration">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Quick heads up",
                    body: "This notification disappears quickly.",
                    initials: "QH",
                    duration: 1500,
                    theme: "light",
                  });
                  lastId.current = id;
                  setStatus(`Short notification shown: ${id}`);
                }}
              >
                Short notification
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Longer reminder",
                    body: "This stays visible a bit longer for readability.",
                    initials: "LR",
                    duration: 8000,
                    theme: "dark",
                  });
                  lastId.current = id;
                  setStatus(`Long notification shown: ${id}`);
                }}
              >
                Long notification
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Theme examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Light theme",
                    body: "This notification uses the light theme.",
                    source: "Theme",
                    initials: "LT",
                    timestamp: "now",
                    theme: "light",
                  });
                  lastId.current = id;
                  setStatus(`Light themed notification shown: ${id}`);
                }}
              >
                Light theme notification
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Dark theme",
                    body: "This notification uses the dark theme.",
                    source: "Theme",
                    initials: "DT",
                    timestamp: "now",
                    theme: "dark",
                  });
                  lastId.current = id;
                  setStatus(`Dark themed notification shown: ${id}`);
                }}
              >
                Dark theme notification
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Color overrides">
            <StyledButton
              onPress={() => {
                const id = notification.show({
                  title: "Custom brand notification",
                  body: "Using token overrides on top of the active theme.",
                  source: "Brand",
                  initials: "BR",
                  timestamp: "now",
                  theme: "light",
                  colors: {
                    background: "#eff6ff",
                    border: "#2563eb",
                    title: "#1e3a8a",
                    body: "#1d4ed8",
                    source: "#2563eb",
                    timestamp: "#3b82f6",
                    avatarBg: "#dbeafe",
                    avatarBorder: "#60a5fa",
                    avatarInitials: "#1d4ed8",
                    actionBg: "#dbeafe",
                    actionBorder: "#60a5fa",
                    actionLabel: "#1d4ed8",
                    closeIcon: "#1d4ed8",
                  },
                  actionLabel: "View",
                  onAction: () => setStatus("Viewed custom notification"),
                });
                lastId.current = id;
                setStatus(`Custom color notification shown: ${id}`);
              }}
            >
              Show custom colors
            </StyledButton>
          </Section>

          <Section label="Manual dismiss">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Persistent-style notification",
                    body: "Dismiss me manually before timeout if needed.",
                    source: "System",
                    initials: "SY",
                    timestamp: "now",
                    duration: 12000,
                    theme: "dark",
                  });
                  lastId.current = id;
                  setStatus(`Manual dismiss notification shown: ${id}`);
                }}
              >
                Show dismissable notification
              </StyledButton>

              <StyledButton onPress={dismissLast}>
                Dismiss last notification
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Real-world examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "New comment on your PR",
                    body: "Chris left feedback on the latest changes.",
                    source: "Git",
                    initials: "CK",
                    timestamp: "1m",
                    actionLabel: "Review",
                    onAction: () => setStatus("Navigating to PR review"),
                    theme: "dark",
                  });
                  lastId.current = id;
                  setStatus(`PR notification shown: ${id}`);
                }}
              >
                Pull request comment
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Meeting starts in 10 minutes",
                    body: "Frontend sync with the product team.",
                    source: "Calendar",
                    initials: "CA",
                    timestamp: "soon",
                    actionLabel: "Join",
                    onAction: () => setStatus("Joining meeting"),
                    theme: "light",
                  });
                  lastId.current = id;
                  setStatus(`Meeting notification shown: ${id}`);
                }}
              >
                Calendar reminder
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = notification.show({
                    title: "Payment received",
                    body: "£1,240 has been credited to your account.",
                    source: "Banking",
                    initials: "£",
                    timestamp: "now",
                    theme: "light",
                  });
                  lastId.current = id;
                  setStatus(`Payment notification shown: ${id}`);
                }}
              >
                Payment received
              </StyledButton>
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
  );
}