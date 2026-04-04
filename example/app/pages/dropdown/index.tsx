/**
 * DropdownUsage — exhaustive demo of every feature.
 */

import React, { useState } from 'react'

import {
  theme,
  Stack,
  StyledScrollView,
  StyledCard,
  StyledText,
  StyledDivider,
  StyledDropdown,
  StyledMultiSelectDropdown,
  DropdownOptionItem,
} from 'fluent-styles'

// ─── Icon stubs ───────────────────────────────────────────────────────────────

const E = ({ e }: { e: string }) => <StyledText fontSize={16}>{e}</StyledText>

// ─── Dataset helpers ──────────────────────────────────────────────────────────

const countries: DropdownOptionItem[] = [
  { value: 'gb', label: 'United Kingdom', icon: <E e="🇬🇧" /> },
  { value: 'us', label: 'United States',  icon: <E e="🇺🇸" /> },
  { value: 'de', label: 'Germany',        icon: <E e="🇩🇪" /> },
  { value: 'fr', label: 'France',         icon: <E e="🇫🇷" /> },
  { value: 'jp', label: 'Japan',          icon: <E e="🇯🇵" /> },
  { value: 'au', label: 'Australia',      icon: <E e="🇦🇺" /> },
  { value: 'ca', label: 'Canada',         icon: <E e="🇨🇦" /> },
  { value: 'br', label: 'Brazil',         icon: <E e="🇧🇷" /> },
  { value: 'in', label: 'India',          icon: <E e="🇮🇳" /> },
  { value: 'ng', label: 'Nigeria',        icon: <E e="🇳🇬" /> },
]

const roles: DropdownOptionItem[] = [
  { value: 'admin',   label: 'Admin',   subtitle: 'Full access to all resources', icon: <E e="🔑" /> },
  { value: 'editor',  label: 'Editor',  subtitle: 'Can edit but not delete',      icon: <E e="✏️" /> },
  { value: 'viewer',  label: 'Viewer',  subtitle: 'Read-only access',             icon: <E e="👁" /> },
  { value: 'billing', label: 'Billing', subtitle: 'Access to billing only',       icon: <E e="💳" />, disabled: true },
]

const skills: DropdownOptionItem[] = [
  { value: 'react',      label: 'React',        meta: { group: 'Frontend' } },
  { value: 'rn',         label: 'React Native', meta: { group: 'Mobile'   } },
  { value: 'typescript', label: 'TypeScript',   meta: { group: 'Frontend' } },
  { value: 'node',       label: 'Node.js',      meta: { group: 'Backend'  } },
  { value: 'python',     label: 'Python',       meta: { group: 'Backend'  } },
  { value: 'graphql',    label: 'GraphQL',      meta: { group: 'Backend'  } },
  { value: 'swift',      label: 'Swift',        meta: { group: 'Mobile'   } },
  { value: 'kotlin',     label: 'Kotlin',       meta: { group: 'Mobile'   } },
  { value: 'figma',      label: 'Figma',        meta: { group: 'Design'   } },
  { value: 'css',        label: 'CSS',          meta: { group: 'Frontend' } },
]

const timezones: DropdownOptionItem[] = [
  { value: 'utc',  label: 'UTC+00  London',      meta: { region: 'Europe'   } },
  { value: 'cet',  label: 'UTC+01  Paris',        meta: { region: 'Europe'   } },
  { value: 'eet',  label: 'UTC+02  Helsinki',     meta: { region: 'Europe'   } },
  { value: 'est',  label: 'UTC-05  New York',     meta: { region: 'Americas' } },
  { value: 'cst',  label: 'UTC-06  Chicago',      meta: { region: 'Americas' } },
  { value: 'pst',  label: 'UTC-08  Los Angeles',  meta: { region: 'Americas' } },
  { value: 'ist',  label: 'UTC+05:30  Mumbai',    meta: { region: 'Asia'     } },
  { value: 'jst',  label: 'UTC+09  Tokyo',        meta: { region: 'Asia'     } },
  { value: 'aest', label: 'UTC+10  Sydney',       meta: { region: 'Oceania'  } },
]

const priority: DropdownOptionItem[] = [
  { value: 'low',      label: 'Low',      icon: <E e="🟢" /> },
  { value: 'medium',   label: 'Medium',   icon: <E e="🟡" /> },
  { value: 'high',     label: 'High',     icon: <E e="🔴" /> },
  { value: 'critical', label: 'Critical', icon: <E e="🚨" /> },
]

const statusOptions: DropdownOptionItem[] = [
  { value: 'active',   label: 'Active'   },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending',  label: 'Pending'  },
  { value: 'archived', label: 'Archived' },
]

const manyItems = Array.from({ length: 50 }, (_, i) => ({
  value: String(i),
  label: `Option ${i + 1}`,
}))

// ─── Section header ───────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} marginBottom={12}>
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

export default function DropdownUsage() {
  const [country, setCountry] = useState('')
  const [role,    setRole]    = useState('')
  const [selectedSkills, setSkills] = useState<string[]>([])
  const [tz, setTz] = useState('')

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* ── 1. Basic single-select ─────────────────────────────────── */}
        <Section title="Basic single-select" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Country"
            placeholder="Select a country"
            data={countries}
            onChange={(item) => setCountry(item.value)}
            value={country}
            helperText="We use this to customise your experience."
          />
        </StyledCard>

        {/* ── 2. Uncontrolled (defaultValue) ────────────────────────── */}
        <Section title="Uncontrolled" subtitle="Uses defaultValue prop" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Status"
            placeholder="Pick status"
            data={statusOptions}
            defaultValue="active"
            onChange={(item) => console.log('status:', item.value)}
          />
        </StyledCard>

        {/* ── 3. With icons + subtitle (roles) ──────────────────────── */}
        <Section title="Icons + subtitle rows" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Team role"
            placeholder="Assign a role"
            data={roles}
            value={role}
            onChange={(item) => setRole(item.value)}
          />
        </StyledCard>

        {/* ── 4. Searchable ─────────────────────────────────────────── */}
        <Section title="Searchable list" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Time zone"
            placeholder="Search time zones…"
            data={timezones}
            searchable
            value={tz}
            onChange={(item) => setTz(item.value)}
          />
        </StyledCard>

        {/* ── 5. Grouped by section ──────────────────────────────────── */}
        <Section title="Grouped by section" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Time zone (grouped)"
            placeholder="Select time zone"
            data={timezones}
            searchable
            groupBy={(item) => (item.meta as any)?.region ?? 'Other'}
            onChange={(item) => console.log(item.value)}
          />
        </StyledCard>

        {/* ── 6. Clearable ──────────────────────────────────────────── */}
        <Section title="Clearable" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Priority"
            placeholder="Select priority"
            data={priority}
            clearable
            onChange={(item) => console.log(item?.value)}
          />
        </StyledCard>

        {/* ── 7. Variants ───────────────────────────────────────────── */}
        <Section title="Variants" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            {(['outline', 'filled', 'underline', 'ghost'] as const).map((v) => (
              <Stack key={v} gap={4}>
                <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">
                  {v.toUpperCase()}
                </StyledText>
                <StyledDropdown
                  label={v.charAt(0).toUpperCase() + v.slice(1)}
                  placeholder={`${v} variant`}
                  data={statusOptions}
                  variant={v}
                  onChange={() => {}}
                />
                {v !== 'ghost' && <StyledDivider borderBottomColor={theme.colors.gray[100]} />}
              </Stack>
            ))}
          </Stack>
        </StyledCard>

        {/* ── 8. Sizes ──────────────────────────────────────────────── */}
        <Section title="Sizes" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={14}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Stack key={s} gap={4}>
                <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">
                  {s.toUpperCase()}
                </StyledText>
                <StyledDropdown
                  label={`Size: ${s}`}
                  placeholder={`${s} dropdown`}
                  data={statusOptions}
                  size={s}
                  onChange={() => {}}
                />
              </Stack>
            ))}
          </Stack>
        </StyledCard>

        {/* ── 9. Left icons ─────────────────────────────────────────── */}
        <Section title="Left icon in trigger" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            <StyledDropdown
              label="Country"
              placeholder="Select country"
              data={countries}
              leftIcon={<E e="🌍" />}
              onChange={() => {}}
            />
            <StyledDropdown
              label="Priority"
              placeholder="Choose priority"
              data={priority}
              leftIcon={<E e="🚩" />}
              onChange={() => {}}
            />
          </Stack>
        </StyledCard>

        {/* ── 10. Error state ───────────────────────────────────────── */}
        <Section title="Error state" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Role"
            placeholder="You must select a role"
            data={roles}
            error
            errorMessage="This field is required."
            onChange={() => {}}
          />
        </StyledCard>

        {/* ── 11. Disabled ──────────────────────────────────────────── */}
        <Section title="Disabled" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Account type"
            placeholder="Cannot change this"
            data={statusOptions}
            defaultValue="active"
            disabled
            onChange={() => {}}
          />
        </StyledCard>

        {/* ── 12. Loading state ─────────────────────────────────────── */}
        <Section title="Loading state" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Options loading…"
            placeholder="Please wait"
            data={[]}
            loading
            onChange={() => {}}
          />
        </StyledCard>

        {/* ── 13. Custom focus colour ───────────────────────────────── */}
        <Section title="Custom focus colour" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            <StyledDropdown
              label="Green focus"
              placeholder="Pick one"
              data={statusOptions}
              focusColor={theme.colors.green[500]}
              onChange={() => {}}
            />
            <StyledDropdown
              label="Rose focus"
              placeholder="Pick one"
              data={statusOptions}
              focusColor={theme.colors.rose?.[500] ?? '#f43f5e'}
              onChange={() => {}}
            />
          </Stack>
        </StyledCard>

        {/* ── 14. Many items ────────────────────────────────────────── */}
        <Section title="Many items (50)" subtitle="Scrollable with search" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledDropdown
            label="Option"
            placeholder="Choose from 50 items"
            data={manyItems}
            searchable
            maxHeight={300}
            onChange={(item) => console.log(item.value)}
          />
        </StyledCard>

        {/* ── 15. Multi-select basic ────────────────────────────────── */}
        <Section title="Multi-select" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledMultiSelectDropdown
            label="Skills"
            placeholder="Select your skills"
            data={skills}
            value={selectedSkills}
            onChange={(items) => setSkills(items.map((i) => i.value))}
            helperText={
              selectedSkills.length > 0
                ? `${selectedSkills.length} skill(s) selected`
                : undefined
            }
          />
        </StyledCard>

        {/* ── 16. Multi + searchable + select-all ──────────────────── */}
        <Section title="Multi-select — searchable + select all" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledMultiSelectDropdown
            label="Technologies"
            placeholder="Choose technologies"
            data={skills}
            searchable
            selectAll
            clearable
            onChange={(items) => console.log(items.map((i) => i.value))}
          />
        </StyledCard>

        {/* ── 17. Multi + grouped ───────────────────────────────────── */}
        <Section title="Multi-select — grouped by tech stack" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledMultiSelectDropdown
            label="Stack"
            placeholder="Pick your stack"
            data={skills}
            groupBy={(item) => (item.meta as any)?.group ?? 'Other'}
            searchable
            selectAll
            onChange={(items) => console.log(items.length, 'selected')}
          />
        </StyledCard>

        {/* ── 18. Multi + summary threshold ────────────────────────── */}
        <Section title="Multi-select — summary after 2" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledMultiSelectDropdown
            label="Countries"
            placeholder="Select countries"
            data={countries}
            maxDisplay={2}
            separator=" · "
            onChange={() => {}}
          />
        </StyledCard>

        {/* ── 19. Real-world: sign-up form ─────────────────────────── */}
        <Section title="Sign-up form" subtitle="Real-world composition example" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledText fontSize={19} fontWeight="800" color={theme.colors.gray[900]}>
            Create your profile
          </StyledText>
          <Stack gap={14} marginTop={16}>
            <StyledDropdown
              label="Country"
              placeholder="Where are you based?"
              data={countries}
              leftIcon={<E e="🌍" />}
              searchable
              onChange={() => {}}
            />
            <StyledDropdown
              label="Role"
              placeholder="What is your role?"
              data={roles}
              onChange={() => {}}
            />
            <StyledMultiSelectDropdown
              label="Skills"
              placeholder="What are your skills?"
              data={skills}
              searchable
              selectAll
              onChange={() => {}}
            />
            <StyledDropdown
              label="Time zone"
              placeholder="Your time zone"
              data={timezones}
              groupBy={(item) => (item.meta as any)?.region}
              searchable
              onChange={() => {}}
            />
          </Stack>
        </StyledCard>

        {/* ── 20. Task form ─────────────────────────────────────────── */}
        <Section title="Task creation form" subtitle="Side-by-side dropdowns" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledText fontSize={19} fontWeight="800" color={theme.colors.gray[900]}>
            New task
          </StyledText>
          <Stack gap={14} marginTop={16}>
            <Stack horizontal gap={12}>
              <StyledDropdown
                label="Priority"
                placeholder="Set priority"
                data={priority}
                flex={1}
                onChange={() => {}}
              />
              <StyledDropdown
                label="Status"
                placeholder="Set status"
                data={statusOptions}
                flex={1}
                onChange={() => {}}
              />
            </Stack>
            <StyledMultiSelectDropdown
              label="Assign to"
              placeholder="Select team members"
              data={[
                { value: 'alice', label: 'Alice', icon: <E e="👩" />, subtitle: 'Frontend' },
                { value: 'bob',   label: 'Bob',   icon: <E e="👨" />, subtitle: 'Backend'  },
                { value: 'carol', label: 'Carol', icon: <E e="👩" />, subtitle: 'Design'   },
                { value: 'dave',  label: 'Dave',  icon: <E e="👨" />, subtitle: 'Mobile'   },
              ]}
              onChange={() => {}}
            />
          </Stack>
        </StyledCard>

      </StyledScrollView>
    </Stack>
  )
}
