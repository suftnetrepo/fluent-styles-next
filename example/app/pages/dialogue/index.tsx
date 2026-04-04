import React, { useState } from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledButton,
  StyledCard,
  useDialogue
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

export default function DialogueUsage() {
  const dialogue = useDialogue();

  const [status, setStatus] = useState("No action yet");

  const handleAlert = async () => {
    await dialogue.alert(
      "Session expired",
      "Please log in again to continue.",
      "🔒",
      "light"
    );
    setStatus("Alert closed");
  };

  const handleConfirm = async () => {
    const confirmed = await dialogue.confirm({
      title: "Save changes?",
      message: "Your edits will be saved to this project.",
      icon: "💾",
      confirmLabel: "Save",
      cancelLabel: "Cancel",
      theme: "light",
    });

    setStatus(confirmed ? "User confirmed save" : "User cancelled save");
  };

  const handleDelete = async () => {
    const confirmed = await dialogue.confirm({
      title: "Delete project?",
      message: "This action cannot be undone.",
      icon: "⚠️",
      confirmLabel: "Delete",
      cancelLabel: "Keep it",
      destructive: true,
    });

    if (confirmed) {
      setStatus("Project deleted");
    } else {
      setStatus("Delete cancelled");
    }
  };

  const handleCustom = () => {
    dialogue.show({
      title: "Unsaved changes",
      message: "You have unsaved edits. What would you like to do?",
      icon: "📝",
      theme: "light",
      actions: [
        {
          label: "Discard",
          variant: "destructive",
          onPress: () => {
            setStatus("Changes discarded");
          },
        },
        {
          label: "Save draft",
          variant: "secondary",
          onPress: () => {
            setStatus("Draft saved");
          },
        },
        {
          label: "Keep editing",
          variant: "primary",
          onPress: () => {
            setStatus("Continue editing");
          },
        },
      ],
    });
  };

  const handleAsyncFlow = async () => {
    const confirmed = await dialogue.confirm({
      title: "Publish update?",
      message: "This will make the latest version visible to users.",
      icon: "🚀",
      confirmLabel: "Publish",
      cancelLabel: "Not now",
      theme: "light",
      
    });

    if (!confirmed) {
      setStatus("Publish cancelled");
      return;
    }

    await dialogue.alert(
      "Published",
      "Your update is now live.",
      "✅",
    );

    setStatus("Publish completed");
  };

  const handleManualDismiss = () => {
    const id = dialogue.show({
      title: "Temporary dialogue",
      message: "This dialogue will be dismissed in 2 seconds.",
      icon: "⏳",
      theme: "light",
      actions: [
        {
          label: "OK",
          variant: "primary",
          onPress: () => {
            setStatus("User closed temporary dialogue");
          },
        },
      ],
    });

    setStatus(`Dialogue mounted with id ${id}`);

    setTimeout(() => {
      dialogue.dismiss(id);
      setStatus("Dialogue dismissed programmatically");
    }, 2000);
  };

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

          <Section label="Alert">
            <StyledButton onPress={handleAlert}>
              Show alert
            </StyledButton>
          </Section>

          <Section label="Confirm">
            <StyledButton onPress={handleConfirm}>
              Show confirm dialogue
            </StyledButton>
          </Section>

          <Section label="Destructive confirm">
            <StyledButton onPress={handleDelete}>
              Show delete confirmation
            </StyledButton>
          </Section>

          <Section label="Custom actions">
            <StyledButton onPress={handleCustom}>
              Show custom dialogue
            </StyledButton>
          </Section>

          <Section label="Async flow">
            <StyledButton onPress={handleAsyncFlow}>
              Confirm then alert
            </StyledButton>
          </Section>

          <Section label="Manual dismiss">
            <StyledButton onPress={handleManualDismiss}>
              Show then dismiss by id
            </StyledButton>
          </Section>

          <Section label="Real-world examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={async () => {
                  const confirmed = await dialogue.confirm({
                    title: "Log out?",
                    message: "You will need to sign in again.",
                    icon: "👋",
                    confirmLabel: "Log out",
                    cancelLabel: "Stay signed in",
                  });

                  setStatus(
                    confirmed ? "User chose to log out" : "User stayed signed in",
                  );
                }}
              >
                Log out example
              </StyledButton>

              <StyledButton
                onPress={async () => {
                  await dialogue.alert(
                    "Profile updated",
                    "Your account details were saved successfully.",
                    "🎉",
                  );
                  setStatus("Profile update acknowledged");
                }}
              >
                Success message example
              </StyledButton>

              <StyledButton
                onPress={() => {
                  dialogue.show({
                    title: "Choose an option",
                    message: "Select one of the actions below.",
                    icon: "📦",
                    actions: [
                      {
                        label: "Archive",
                        variant: "secondary",
                        onPress: () => setStatus("Item archived"),
                      },
                      {
                        label: "Duplicate",
                        variant: "secondary",
                        onPress: () => setStatus("Item duplicated"),
                      },
                      {
                        label: "Open",
                        variant: "primary",
                        onPress: () => setStatus("Item opened"),
                      },
                    ],
                  });
                }}
              >
                Action sheet style example
              </StyledButton>
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
  );
}