import React, { useRef, useState } from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledButton,
  StyledCard,
  useLoader,
  Loader,
  Circular,
  Spinner,
  useLoaderBinding,
} from "fluent-styles";
import { useFakeApi } from "~/hooks/useFakeApi";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export default function LoaderUsage() {
  const loader = useLoader();
  const lastLoaderId = useRef<number | null>(null);
  const [status, setStatus] = useState("No loader shown yet");

  const { loading, result, callFakeApi } = useFakeApi();

  const loaderOptions = React.useMemo(
    () => ({
      label: "Calling API...",
      variant: "circular" as const, // change to "dots" | "pulse" | "circular"
      theme: "dark" as const,
    }),
    [],
  );

  useLoaderBinding(loading, loaderOptions);

  const hideLastLoader = () => {
    if (lastLoaderId.current == null) {
      setStatus("No active loader id");
      return;
    }

    loader.hide(lastLoaderId.current);
    setStatus(`Loader ${lastLoaderId.current} hidden`);
    lastLoaderId.current = null;
  };

  const runFakeTask = async (
    options?: Parameters<typeof loader.show>[0],
    doneText = "Task complete",
  ) => {
    const id = loader.show(options);
    lastLoaderId.current = id;
    setStatus(`Loader ${id} shown`);

    try {
      await wait(2200);
      setStatus(doneText);
    } finally {
      loader.hide(id);
      if (lastLoaderId.current === id) {
        lastLoaderId.current = null;
      }
    }
  };

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Stack
   
          borderRadius={16}
          backgroundColor={theme.colors.gray[1]}
        >
          <StyledCard
            backgroundColor={theme.colors.white}
            borderRadius={18}
            borderWidth={1}
            borderColor={theme.colors.gray[100]}
            padding={16}
            shadow="light"
          >
            <StyledText fontSize={18} fontWeight={800}>
              Loader hook usage
            </StyledText>
            <StyledText color={theme.colors.gray[500]}>
              Status: {status}
            </StyledText>
          </StyledCard>

          <Section label="Variants">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Saving changes...",
                      variant: "spinner",
                      theme: "dark",
                    },
                    "Saved successfully",
                  )
                }
              >
                Spinner loader
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Syncing account...",
                      variant: "pulse",
                      theme: "light",
                    },
                    "Account synced",
                  )
                }
              >
                Pulse loader
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Uploading files...",
                      variant: "dots",
                      theme: "dark",
                    },
                    "Upload complete",
                  )
                }
              >
                Dots loader
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Portal spinner examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Signing in...",
                      variant: "spinner",
                      theme: "dark",
                    },
                    "Signed in successfully",
                  )
                }
              >
                Auth spinner
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Fetching account details...",
                      variant: "spinner",
                      theme: "light",
                    },
                    "Account loaded",
                  )
                }
              >
                Account fetch spinner
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Saving profile...",
                      variant: "spinner",
                      theme: "dark",
                      colors: {
                        indicator: "#10b981",
                        label: "#d1fae5",
                      },
                    },
                    "Profile saved",
                  )
                }
              >
                Save profile spinner
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Refreshing dashboard...",
                      variant: "spinner",
                      theme: "light",
                      colors: {
                        indicator: "#2563eb",
                        label: "#1e3a8a",
                      },
                    },
                    "Dashboard refreshed",
                  )
                }
              >
                Dashboard refresh spinner
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Themes">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Loading light theme...",
                      variant: "spinner",
                      theme: "light",
                    },
                    "Light theme done",
                  )
                }
              >
                Light theme loader
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Loading dark theme...",
                      variant: "spinner",
                      theme: "dark",
                    },
                    "Dark theme done",
                  )
                }
              >
                Dark theme loader
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Custom color overrides">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Processing payment...",
                      variant: "spinner",
                      theme: "light",
                      colors: {
                        overlayBg: "rgba(255,255,255,0.72)",
                        cardBg: "#ecfdf5",
                        cardBorder: "#10b981",
                        label: "#065f46",
                        indicator: "#10b981",
                      },
                    },
                    "Payment processed",
                  )
                }
              >
                Green custom loader
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Preparing report...",
                      variant: "dots",
                      theme: "dark",
                      colors: {
                    
                       
                        label: "#dbeafe",
                        indicator: "#60a5fa",
                      },
                    },
                    "Report ready",
                  )
                }
              >
                Blue custom loader
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Inline loader component">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack vertical gap={20}>
                <Stack alignItems="center" gap={10}>
                  <Loader
                    variant="spinner"
                    label="Loading inline..."
                    overlay={false}
                    theme="light"
                  />
                </Stack>

                <Stack alignItems="center" gap={10}>
                  <Loader
                    variant="pulse"
                    label="Syncing inline..."
                    overlay={false}
                    theme="dark"
                  />
                </Stack>

                <Stack alignItems="center" gap={10}>
                  <Loader
                    variant="dots"
                    label="Please wait..."
                    overlay={false}
                    theme="light"
                  />
                </Stack>
              </Stack>
            </StyledCard>
          </Section>

          <Section label="Real-world examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Signing you in...",
                      variant: "spinner",
                      theme: "dark",
                    },
                    "Signed in",
                  )
                }
              >
                Sign in flow
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Fetching dashboard...",
                      variant: "dots",
                      theme: "light",
                    },
                    "Dashboard ready",
                  )
                }
              >
                Fetch dashboard
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Publishing update...",
                      variant: "pulse",
                      theme: "dark",
                    },
                    "Published successfully",
                  )
                }
              >
                Publish content
              </StyledButton>
            </Stack>
          </Section>

          <Section label="Basic examples">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack gap={12}>
                <StyledText fontWeight={800}>Manual control</StyledText>
                <StyledText color={theme.colors.gray[500]}>
                  const id = loader.show(
                  {`{ label: "Saving...", variant: "spinner" }`})
                </StyledText>
                <StyledText color={theme.colors.gray[500]}>
                  await saveData()
                </StyledText>
                <StyledText color={theme.colors.gray[500]}>
                  loader.hide(id)
                </StyledText>
              </Stack>
            </StyledCard>
          </Section>
          <Section label="Standalone indicators">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack vertical gap={24}>
                {/* Default */}
                <Stack vertical gap={12}>
                  <StyledText fontSize={16} fontWeight={800}>
                    Default
                  </StyledText>
                  <Stack horizontal gap={24} alignItems="center">
                    <Stack alignItems="center" gap={8}>
                      <Spinner />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Spinner
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Circular
                      </StyledText>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Sizes */}
                <Stack vertical gap={12}>
                  <StyledText fontSize={16} fontWeight={800}>
                    Sizes
                  </StyledText>
                  <Stack
                    horizontal
                    gap={24}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Stack alignItems="center" gap={8}>
                      <Spinner size={20} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        20
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Spinner size={32} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        32
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Spinner size={48} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        48
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular size={20} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        20
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular size={32} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        32
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular size={48} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        48
                      </StyledText>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Colors */}
                <Stack vertical gap={12}>
                  <StyledText fontSize={16} fontWeight={800}>
                    Colors
                  </StyledText>
                  <Stack
                    horizontal
                    gap={24}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Stack alignItems="center" gap={8}>
                      <Spinner
                        color={theme.colors.indigo?.[500] ?? "#6366f1"}
                      />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Indigo
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Spinner color={theme.colors.green[500]} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Green
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular color={theme.colors.rose?.[500] ?? "#f43f5e"} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Rose
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular color={theme.colors.blue[600]} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Blue
                      </StyledText>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Durations */}
                <Stack vertical gap={12}>
                  <StyledText fontSize={16} fontWeight={800}>
                    Animation speed
                  </StyledText>
                  <Stack
                    horizontal
                    gap={24}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Stack alignItems="center" gap={8}>
                      <Spinner duration={500} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Fast
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Spinner duration={1200} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Slow
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular duration={600} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Fast
                      </StyledText>
                    </Stack>

                    <Stack alignItems="center" gap={8}>
                      <Circular duration={1400} />
                      <StyledText fontSize={12} color={theme.colors.gray[500]}>
                        Slow
                      </StyledText>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Inline row usage */}
                <Stack vertical gap={12}>
                  <StyledText fontSize={16} fontWeight={800}>
                    Inline usage
                  </StyledText>

                  <Stack horizontal alignItems="center" gap={10}>
                    <Spinner size={18} color={theme.colors.gray[500]} />
                    <StyledText color={theme.colors.gray[600]}>
                      Loading account details...
                    </StyledText>
                  </Stack>

                  <Stack horizontal alignItems="center" gap={10}>
                    <Circular size={18} color={theme.colors.blue[600]} />
                    <StyledText color={theme.colors.gray[600]}>
                      Syncing dashboard...
                    </StyledText>
                  </Stack>
                </Stack>
              </Stack>
            </StyledCard>
          </Section>
          <Section label="Portal circular examples">
            <Stack vertical gap={12}>
              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Syncing workspace...",
                      variant: "circular",
                      theme: "dark",
                    },
                    "Workspace synced",
                  )
                }
              >
                Workspace sync circular
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Connecting to server...",
                      variant: "circular",
                      theme: "light",
                    },
                    "Connected successfully",
                  )
                }
              >
                Server connect circular
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Preparing analytics...",
                      variant: "circular",
                      theme: "dark",
                      colors: {
                        indicator: "#60a5fa",
                        label: "#dbeafe",
                      },
                    },
                    "Analytics ready",
                  )
                }
              >
                Analytics circular
              </StyledButton>

              <StyledButton
                onPress={() =>
                  runFakeTask(
                    {
                      label: "Loading premium dashboard...",
                      variant: "circular",
                      theme: "light",
                      colors: {
                        indicator: "#10b981",
                        label: "#065f46",
                      },
                    },
                    "Premium dashboard loaded",
                  )
                }
              >
                Premium dashboard circular
              </StyledButton>
            </Stack>
          </Section>
          <Section label="Portal circular examples">
            <Stack vertical gap={12}>
              <StyledCard
                backgroundColor={theme.colors.white}
                borderRadius={18}
                borderWidth={1}
                borderColor={theme.colors.gray[100]}
                padding={16}
                shadow="light"
              >
                <Stack gap={14}>
                  <StyledText fontSize={18} fontWeight={800}>
                    Fake API demo
                  </StyledText>

                  <StyledText color={theme.colors.gray[500]}>
                    Loading: {loading ? "true" : "false"}
                  </StyledText>

                  <StyledText color={theme.colors.gray[700]}>
                    {result}
                  </StyledText>

                  <Stack vertical gap={12}>
                    <StyledButton onPress={() => callFakeApi(2000)}>
                      Call fake API for 2 seconds
                    </StyledButton>

                    <StyledButton onPress={() => callFakeApi(4000)}>
                      Call fake API for 4 seconds
                    </StyledButton>

                    <StyledButton onPress={() => callFakeApi(6000)}>
                      Call fake API for 6 seconds
                    </StyledButton>
                  </Stack>
                </Stack>
              </StyledCard>
            </Stack>
          </Section>
            </Stack>
      </StyledScrollView>
    </Stack>
  );
}
