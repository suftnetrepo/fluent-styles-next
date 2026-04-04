import React, { useRef, useState } from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledButton,
  StyledCard,
  useToast
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
    <>
     {children}
    </>
   
  </Stack>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ToastUsage() {
  const toast = useToast();
  const lastToastId = useRef<number | null>(null);
  const [status, setStatus] = useState("No toast shown yet");

  const showPersistentToast = () => {
    const id = toast.show({
      message: "Uploading file...",
      description: "Please keep the app open until upload finishes.",
      variant: "info",
      duration: 0,
      theme: "dark",
    });

    lastToastId.current = id;
    setStatus(`Persistent toast shown with id ${id}`);
  };

  const dismissLastToast = () => {
    if (lastToastId.current == null) {
      setStatus("No active toast id to dismiss");
      return;
    }

    toast.dismiss(lastToastId.current);
    setStatus(`Dismissed toast ${lastToastId.current}`);
    lastToastId.current = null;
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
              Toast hook usage
            </StyledText>
            <StyledText color={theme.colors.gray[500]}>
              Status: {status}
            </StyledText>
          </StyledCard>

          <Section label="Shortcut methods">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = toast.success("Profile saved");
                  lastToastId.current = id;
                  setStatus(`Success toast shown: ${id}`);
                }}
              >
                Success toast
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.error(
                    "Upload failed",
                    "The selected file is larger than 5 MB.",
                  );
                  lastToastId.current = id;
                  setStatus(`Error toast shown: ${id}`);
                }}
              >
                Error toast
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.warning(
                    "Unsaved changes",
                    "You have pending edits on this screen.",
                  );
                  lastToastId.current = id;
                  setStatus(`Warning toast shown: ${id}`);
                }}
              >
                Warning toast
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.info(
                    "New update available",
                    "Restart the app to use the latest version.",
                  );
                  lastToastId.current = id;
                  setStatus(`Info toast shown: ${id}`);
                }}
              >
                Info toast
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Full control with show()">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Settings updated",
                    description: "Your preferences were saved successfully.",
                    variant: "success",
                    duration: 2500,
                    theme: "light",
                  });
                  lastToastId.current = id;
                  setStatus(`Custom light toast shown: ${id}`);
                }}
              >
                Light themed toast
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Background sync started",
                    description: "We will notify you when sync is complete.",
                    variant: "info",
                    duration: 4000,
                    theme: "dark",
                  });
                  lastToastId.current = id;
                  setStatus(`Custom dark toast shown: ${id}`);
                }}
              >
                Dark themed toast
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Persistent toast">
            <Stack vertical gap={12}>
              <StyledButton onPress={showPersistentToast}>
                Show persistent toast
              </StyledButton>

              <StyledButton onPress={dismissLastToast}>
                Dismiss last toast by id
              </StyledButton>

              <StyledButton
                onPress={() => {
                  toast.dismissAll();
                  lastToastId.current = null;
                  setStatus("Dismissed all active toasts");
                }}
              >
                Dismiss all toasts
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Custom duration">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Quick message",
                    variant: "info",
                    duration: 1200,
                    theme: "light",
                  });
                  lastToastId.current = id;
                  setStatus(`Short toast shown: ${id}`);
                }}
              >
                Short toast
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Longer message",
                    description: "This stays a bit longer so the user can read it.",
                    variant: "warning",
                    duration: 6000,
                    theme: "light",
                  });
                  lastToastId.current = id;
                  setStatus(`Long toast shown: ${id}`);
                }}
              >
                Long toast
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Theme + color overrides">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Custom success",
                    description: "Overridden success colors on light theme.",
                    variant: "success",
                    theme: "light",
                    colors: {
                      successBg: "#ecfdf5",
                      successBorder: "#10b981",
                      successLabel: "#065f46",
                      description: "#047857",
                      closeIcon: "#065f46",
                    },
                  });
                  lastToastId.current = id;
                  setStatus(`Custom success colors toast shown: ${id}`);
                }}
              >
                Custom success colors
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.show({
                    message: "Custom error",
                    description: "Overridden error colors on dark theme.",
                    variant: "error",
                    theme: "dark",
                    colors: {
                      errorBg: "#3b0a0a",
                      errorBorder: "#ef4444",
                      errorLabel: "#fecaca",
                      description: "#fca5a5",
                      closeIcon: "#fecaca",
                    },
                  });
                  lastToastId.current = id;
                  setStatus(`Custom error colors toast shown: ${id}`);
                }}
              >
                Custom error colors
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Real-world examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() => {
                  const id = toast.success(
                    "Account created",
                    "Welcome aboard. Your profile is ready.",
                  );
                  lastToastId.current = id;
                  setStatus(`Account creation toast shown: ${id}`);
                }}
              >
                Account created
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.error(
                    "Payment failed",
                    "Please check your card details and try again.",
                  );
                  lastToastId.current = id;
                  setStatus(`Payment failure toast shown: ${id}`);
                }}
              >
                Payment failed
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.warning(
                    "Session expiring soon",
                    "You will be logged out in 2 minutes.",
                  );
                  lastToastId.current = id;
                  setStatus(`Session warning toast shown: ${id}`);
                }}
              >
                Session warning
              </StyledButton>

              <StyledButton
                onPress={() => {
                  const id = toast.info(
                    "New message received",
                    "You have a new message from the support team.",
                  );
                  lastToastId.current = id;
                  setStatus(`Message toast shown: ${id}`);
                }}
              >
                New message
              </StyledButton>
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
  );
}