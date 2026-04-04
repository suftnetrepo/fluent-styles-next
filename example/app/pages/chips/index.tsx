/**
 * StyledChipDemo.tsx
 * ──────────────────
 * Full showcase of StyledChip variants:
 *  Outlined · Ingredient · Smooth (icon) · Filled · Likeable · Icon
 */

import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledScrollView,
  StyledCard,
  Stack,
  StyledText,
  theme,
  palettes,
  StyledChip
} from 'fluent-styles';

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} paddingBottom={8} marginBottom={12} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {title}
    </StyledText>
    {subtitle && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
);

// ─── Demo ─────────────────────────────────────────────────────────────────────

export default function StyledChipDemo() {
  // Controlled states for demo
  const [selectedOutlined, setOutlined] = useState<string[]>(['Hacktoberfest']);
  const [selectedIngredient, setIngredient] = useState<string[]>(['Cinnamon', 'Nut']);
  const [likedChips, setLiked] = useState<string[]>(['Big Data', 'New Technology']);
  const [activeIcon, setActiveIcon] = useState<string[]>(['Social Media', 'Hello']);

  const toggleSet = (
    key: string,
    set: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter((prev) => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >

          {/* ── 1. Outlined ── */}
          <Section title="Outlined chips" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              {/* Row 1 */}
              <Stack horizontal gap={8} flexWrap="wrap">
                {[
                  { label: 'Enhancement', color: '#9e9e9e' },
                  { label: 'Trends',      color: '#ff9800' },
                ].map(({ label, color }) => (
                  <StyledChip
                    key={label}
                    label={label}
                    variant="outlined"
                    color={color}
                    selected={selectedOutlined.includes(label)}
                    onPress={() => toggleSet(label, selectedOutlined, setOutlined)}
                  />
                ))}
              </Stack>
              {/* Row 2: selected/controlled */}
              <Stack horizontal gap={8} flexWrap="wrap">
                {[
                  { label: 'Rubi Kapustu', color: '#2196f3' },
                  { label: 'Hacktoberfest', color: '#4caf50' },
                ].map(({ label, color }) => (
                  <StyledChip
                    key={label}
                    label={label}
                    variant="outlined"
                    color={color}
                    selected={selectedOutlined.includes(label)}
                    onPress={() => toggleSet(label, selectedOutlined, setOutlined)}
                  />
                ))}
              </Stack>
              {/* Row 3 */}
              <Stack horizontal gap={8} flexWrap="wrap">
                {[
                  { label: 'Limited', color: '#e65100' },
                  { label: 'Taken',   color: '#e91e63' },
                ].map(({ label, color }) => (
                  <StyledChip
                    key={label}
                    label={label}
                    variant="outlined"
                    color={color}
                    selected={selectedOutlined.includes(label)}
                    onPress={() => toggleSet(label, selectedOutlined, setOutlined)}
                  />
                ))}
              </Stack>
            </Stack>
          </StyledCard>

          {/* ── 2. Ingredient chips ── */}
          <Section title="Ingredient chips" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              {[
                ['Cheese',       'Vanilla',   'Chocolate', 'Egg'    ],
                ['Honey',        'Milk',      'Banana',    'Nut'    ],
                ['Cinnamon',     'Tomato',    'Yogurt'              ],
                ['Get Shit Done','Cayenne',   'Sosiski'             ],
              ].map((row, ri) => (
                <Stack key={ri} horizontal gap={8} flexWrap="wrap">
                  {row.map((label) => (
                    <StyledChip
                      key={label}
                      label={label}
                      variant="ingredient"
                      selected={selectedIngredient.includes(label)}
                      onPress={() => toggleSet(label, selectedIngredient, setIngredient)}
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
          </StyledCard>

          {/* ── 3. Filled chips ── */}
          <Section title="Filled chips" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip label="Hacktoberfest" variant="filled" bgColor="#e8f5e9" color="#388e3c" />
                <StyledChip label="Question"      variant="filled" bgColor="#fff3e0" color="#f57c00" />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip label="Bablo incoming" variant="filled" bgColor="#fce4ec" color="#e91e63" />
                <StyledChip label="Enhancement"    variant="filled" bgColor="#f3e5f5" color="#7b1fa2" />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                {/* Dark filled selected chip */}
                <StyledChip
                  label="Taken"
                  variant="filled"
                  bgColor="#e91e8c"
                  color={palettes.white}
                  defaultSelected
                  showCheck
                />
                <StyledChip label="Limited" variant="filled" bgColor="#fff9c4" color="#f9a825" />
              </Stack>
            </Stack>
          </StyledCard>

          {/* ── 4. Smooth / icon chips ── */}
          <Section title="Smooth chips (with icons)" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip
                  label="Pin"
                  variant="icon"
                  icon={<Icon name="map-pin" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Pin')}
                  onPress={() => toggleSet('Pin', activeIcon, setActiveIcon)}
                />
                <StyledChip
                  label="List"
                  variant="icon"
                  icon={<Icon name="list" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('List')}
                  onPress={() => toggleSet('List', activeIcon, setActiveIcon)}
                />
                <StyledChip
                  label="Activity"
                  variant="icon"
                  icon={<Icon name="activity" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Activity')}
                  onPress={() => toggleSet('Activity', activeIcon, setActiveIcon)}
                />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip
                  label="Shield"
                  variant="icon"
                  icon={<Icon name="shield" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Shield')}
                  onPress={() => toggleSet('Shield', activeIcon, setActiveIcon)}
                />
                <StyledChip
                  label="Satellite"
                  variant="icon"
                  icon={<Icon name="radio" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Satellite')}
                  onPress={() => toggleSet('Satellite', activeIcon, setActiveIcon)}
                />
              </Stack>
              {/* Solid active state */}
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip
                  label="Social Media"
                  variant="icon"
                  icon={<Icon name="refresh-cw" size={14} color={activeIcon.includes('Social Media') ? palettes.white : '#2e7d32'} />}
                  color="#2e7d32"
                  bgColor="#2e7d32"
                  selected={activeIcon.includes('Social Media')}
                  onPress={() => toggleSet('Social Media', activeIcon, setActiveIcon)}
                />
                <StyledChip
                  label="Play"
                  variant="icon"
                  icon={<Icon name="play" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Play')}
                  onPress={() => toggleSet('Play', activeIcon, setActiveIcon)}
                />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip
                  label="Paperclip"
                  variant="icon"
                  icon={<Icon name="paperclip" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Paperclip')}
                  onPress={() => toggleSet('Paperclip', activeIcon, setActiveIcon)}
                />
                <StyledChip
                  label="Tag"
                  variant="icon"
                  icon={<Icon name="tag" size={14} color="#2e7d32" />}
                  color="#2e7d32"
                  bgColor="#e8f5e9"
                  selected={activeIcon.includes('Tag')}
                  onPress={() => toggleSet('Tag', activeIcon, setActiveIcon)}
                />
              </Stack>
            </Stack>
          </StyledCard>

          {/* ── 5. Likeable chips ── */}
          <Section title="Likeable chips" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              {[
                ['Cryptocurrency', 'Big Data'         ],
                ['Software Development'               ],
                ['New Technology', 'Gadgets'          ],
                ['Technology Startups'                ],
              ].map((row, ri) => (
                <Stack key={ri} horizontal gap={8} flexWrap="wrap">
                  {row.map((label) => (
                    <StyledChip
                      key={label}
                      label={label}
                      variant="likeable"
                      selected={likedChips.includes(label)}
                      onPress={() => toggleSet(label, likedChips, setLiked)}
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
          </StyledCard>

          {/* ── 6. Mixed icon/colour chips ── */}
          <Section title="Icon chips · mixed colours" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip label="Annotation" variant="icon"
                  icon={<Icon name="edit-3" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
                <StyledChip label="Geocode" variant="icon"
                  icon={<Icon name="globe" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip label="Laboratory" variant="icon"
                  icon={<Icon name="zap" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
                <StyledChip label="History" variant="icon"
                  icon={<Icon name="clock" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                {/* Solid filled active */}
                <StyledChip
                  label="Globe"
                  variant="icon"
                  icon={<Icon name="globe" size={14} color={palettes.white} />}
                  color="#fff"
                  bgColor="#3f51b5"
                  selected
                  onPress={() => {}}
                />
                <StyledChip label="Link" variant="icon"
                  icon={<Icon name="link-2" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
              </Stack>
              <Stack horizontal gap={8} flexWrap="wrap">
                <StyledChip label="Book" variant="icon"
                  icon={<Icon name="book" size={14} color="#5c6bc0" />} color="#5c6bc0" bgColor="#e8eaf6" />
                {/* Solid filled active */}
                <StyledChip
                  label="Hello"
                  variant="icon"
                  icon={<Icon name="hand" size={14} color={palettes.white} />}
                  color="#fff"
                  bgColor="#3f51b5"
                  selected
                  onPress={() => {}}
                />
              </Stack>
            </Stack>
          </StyledCard>

          {/* ── 7. Size variants ── */}
          <Section title="Size variants" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack gap={10}>
              <Stack horizontal gap={8} alignItems="center">
                <StyledChip label="Small"  variant="outlined" size="sm" color="#2196f3" />
                <StyledChip label="Medium" variant="outlined" size="md" color="#2196f3" />
                <StyledChip label="Large"  variant="outlined" size="lg" color="#2196f3" />
              </Stack>
              <Stack horizontal gap={8} alignItems="center">
                <StyledChip label="Small"  variant="ingredient" size="sm" defaultSelected />
                <StyledChip label="Medium" variant="ingredient" size="md" defaultSelected />
                <StyledChip label="Large"  variant="ingredient" size="lg" defaultSelected />
              </Stack>
            </Stack>
          </StyledCard>

          {/* ── 8. Disabled ── */}
          <Section title="Disabled state" />
          <StyledCard backgroundColor={palettes.white} borderRadius={16} shadow="light" marginBottom={24} padding={16}>
            <Stack horizontal gap={8} flexWrap="wrap">
              <StyledChip label="Outlined"   variant="outlined"   color="#2196f3" disabled />
              <StyledChip label="Filled"     variant="filled"     bgColor="#e91e63" color="#fff" disabled />
              <StyledChip label="Ingredient" variant="ingredient" disabled />
              <StyledChip label="Likeable"   variant="likeable"   disabled />
            </Stack>
          </StyledCard>

  
      </StyledScrollView>
    </Stack>
  );
}