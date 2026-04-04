import React, { useState } from "react";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledCard,
  StyledCheckBox,
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

// ─── Reusable row ────────────────────────────────────────────────────────────

const CheckRow = ({
  label,
  helper,
  checked,
  onCheck,
  disabled,
  size,
  checkedColor,
  checkMarkColor,
}: {
  label: string;
  helper?: string;
  checked: boolean;
  onCheck: (value: boolean) => void;
  disabled?: boolean;
  size?: number;
  checkedColor?: string;
  checkMarkColor?: string;
}) => (
  <Stack horizontal justifyContent="flex-start" alignItems="center" gap={12}>
    <StyledCheckBox
      checked={checked}
      onCheck={onCheck}
      disabled={disabled}
      size={size}
      checkedColor={checkedColor}
      checkMarkColor={checkMarkColor}
      marginTop={2}
    />
    <Stack flex={1}>
      <StyledText fontSize={15} fontWeight={600} color={theme.colors.gray[800]}>
        {label}
      </StyledText>
      {helper ? (
        <StyledText fontSize={13} color={theme.colors.gray[500]} marginTop={4}>
          {helper}
        </StyledText>
      ) : null}
    </Stack>
  </Stack>
);

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function CheckBoxUsage() {
  const [basic, setBasic] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [updates, setUpdates] = useState(true);

  const [skills, setSkills] = useState({
    react: true,
    rn: false,
    ts: true,
    node: false,
  });

  const [tasks, setTasks] = useState({
    design: true,
    api: false,
    testing: false,
    docs: true,
  });

  const updateSkill = (key: keyof typeof skills, value: boolean) => {
    setSkills((prev) => ({ ...prev, [key]: value }));
  };

  const updateTask = (key: keyof typeof tasks, value: boolean) => {
    setTasks((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          {/* 1. Basic */}
          <Section label="Basic checkbox">
            <Stack gap={12}>
              <StyledCheckBox checked={basic} onCheck={setBasic} />
              <StyledText color={theme.colors.gray[500]}>
                Current value: {basic ? "checked" : "unchecked"}
              </StyledText>
            </Stack>
          </Section>

          {/* 2. With label */}
          <Section label="Checkbox with label">
            <CheckRow
              label="Enable notifications"
              helper="Receive alerts for important updates."
              checked={newsletter}
              onCheck={setNewsletter}
            />
          </Section>

          {/* 3. Different sizes */}
          <Section label="Sizes">
            <Stack horizontal gap={16} alignItems="center">
              <StyledCheckBox checked size={18} onCheck={() => {}} />
              <StyledCheckBox checked size={24} onCheck={() => {}} />
              <StyledCheckBox checked size={32} onCheck={() => {}} />
              <StyledCheckBox checked size={40} onCheck={() => {}} />
            </Stack>
          </Section>

          {/* 4. Custom colors */}
          <Section label="Custom colors">
            <Stack horizontal gap={16} alignItems="center" flexWrap="wrap">
              <StyledCheckBox
                checked
                onCheck={() => {}}
                checkedColor={theme.colors.green[500]}
                checkMarkColor={theme.colors.white}
              />
              <StyledCheckBox
                checked
                onCheck={() => {}}
                checkedColor={theme.colors.blue[600]}
                checkMarkColor={theme.colors.white}
              />
              <StyledCheckBox
                checked
                onCheck={() => {}}
                checkedColor={theme.colors.rose?.[500] ?? "#f43f5e"}
                checkMarkColor={theme.colors.white}
              />
              <StyledCheckBox
                checked
                onCheck={() => {}}
                checkedColor={theme.colors.gray[900]}
                checkMarkColor={theme.colors.white}
              />
            </Stack>
          </Section>

          {/* 5. Disabled */}
          <Section label="Disabled state">
            <Stack gap={14}>
              <CheckRow
                label="Disabled unchecked"
                checked={false}
                onCheck={() => {}}
                disabled
              />
              <CheckRow
                label="Disabled checked"
                checked={true}
                onCheck={() => {}}
                disabled
              />
            </Stack>
          </Section>

          {/* 6. Settings example */}
          <Section label="Settings preferences">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack gap={18}>
                <StyledText fontSize={18} fontWeight={800}>
                  Preferences
                </StyledText>

                <CheckRow
                  label="Product updates"
                  helper="Get occasional updates about new features."
                  checked={updates}
                  onCheck={setUpdates}
                />

                <CheckRow
                  label="Marketing emails"
                  helper="Receive tips, offers, and product news."
                  checked={marketing}
                  onCheck={setMarketing}
                />

                <CheckRow
                  label="Push notifications"
                  helper="Allow important real-time alerts."
                  checked={newsletter}
                  onCheck={setNewsletter}
                />
              </Stack>
            </StyledCard>
          </Section>

          {/* 7. Skills checklist */}
          <Section label="Checklist group">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack gap={16}>
                <StyledText fontSize={18} fontWeight={800}>
                  Select your skills
                </StyledText>

                <CheckRow
                  label="React"
                  checked={skills.react}
                  onCheck={(v) => updateSkill("react", v)}
                />
                <CheckRow
                  label="React Native"
                  checked={skills.rn}
                  onCheck={(v) => updateSkill("rn", v)}
                />
                <CheckRow
                  label="TypeScript"
                  checked={skills.ts}
                  onCheck={(v) => updateSkill("ts", v)}
                />
                <CheckRow
                  label="Node.js"
                  checked={skills.node}
                  onCheck={(v) => updateSkill("node", v)}
                />
              </Stack>
            </StyledCard>
          </Section>

          {/* 8. Task list */}
          <Section label="Task list">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack gap={16}>
                <StyledText fontSize={18} fontWeight={800}>
                  Sprint tasks
                </StyledText>

                <CheckRow
                  label="Finish UI design"
                  helper="Complete mobile and tablet layouts."
                  checked={tasks.design}
                  onCheck={(v) => updateTask("design", v)}
                  checkedColor={theme.colors.green[500]}
                  checkMarkColor={theme.colors.white}
                />
                <CheckRow
                  label="Connect API"
                  helper="Hook screens to backend endpoints."
                  checked={tasks.api}
                  onCheck={(v) => updateTask("api", v)}
                  checkedColor={theme.colors.green[500]}
                  checkMarkColor={theme.colors.white}
                />
                <CheckRow
                  label="Write tests"
                  helper="Add unit and integration coverage."
                  checked={tasks.testing}
                  onCheck={(v) => updateTask("testing", v)}
                  checkedColor={theme.colors.green[500]}
                  checkMarkColor={theme.colors.white}
                />
                <CheckRow
                  label="Prepare docs"
                  helper="Usage notes and examples for the team."
                  checked={tasks.docs}
                  onCheck={(v) => updateTask("docs", v)}
                  checkedColor={theme.colors.green[500]}
                  checkMarkColor={theme.colors.white}
                />
              </Stack>
            </StyledCard>
          </Section>

          {/* 9. Terms and consent */}
          <Section label="Terms and consent">
            <StyledCard
              backgroundColor={theme.colors.white}
              borderRadius={18}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              padding={16}
              shadow="light"
            >
              <Stack gap={18}>
                <StyledText fontSize={18} fontWeight={800}>
                  Create account
                </StyledText>

                <CheckRow
                  label="I agree to the terms and conditions"
                  checked={terms}
                  onCheck={setTerms}
                />

                <CheckRow
                  label="Send me product tips and occasional updates"
                  checked={marketing}
                  onCheck={setMarketing}
                />

                <StyledText color={theme.colors.gray[500]}>
                  Form ready: {terms ? "Yes" : "No"}
                </StyledText>
              </Stack>
            </StyledCard>
          </Section>

          {/* 10. Compact inline usage */}
          <Section label="Compact inline usage">
            <Stack vertical gap={12}>
              <Stack horizontal alignItems="center" gap={10}>
                <StyledCheckBox checked={true} onCheck={() => {}} size={20} />
                <StyledText>Remember me</StyledText>
              </Stack>

              <Stack horizontal alignItems="center" gap={10}>
                <StyledCheckBox checked={false} onCheck={() => {}} size={20} />
                <StyledText>Subscribe to newsletter</StyledText>
              </Stack>

              <Stack horizontal alignItems="center" gap={10}>
                <StyledCheckBox
                  checked={true}
                  onCheck={() => {}}
                  size={20}
                  checkedColor={theme.colors.blue[600]}
                  checkMarkColor={theme.colors.white}
                />
                <StyledText>Enable cloud sync</StyledText>
              </Stack>
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
  );
}
