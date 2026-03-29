import React, { useMemo, useState } from "react";
import { ColorValue, DimensionValue, Dimensions } from "react-native";
import {
  BadgeIcon,
  StyledBadge,
  StyledCircularProgress,
  StyledImage,
  StyledImageBackground,
  StyledPressable,
  StyledSafeAreaView,
  StyledScrollView,
  StyledText,
  Stack,
  TabBar,
  theme,
} from "fluent-styles";

const { width } = Dimensions.get("window");

type Category = "All" | "Cardio" | "Muscle" | "Weight";

type WorkoutItem = {
  id: string;
  title: string;
  level: string;
  duration: string;
  category: Category;
  image: { uri: string };
};

const categories: Category[] = ["All", "Cardio", "Muscle", "Weight"];

const workouts: WorkoutItem[] = [
  {
    id: "1",
    title: "Cardio Exercise",
    level: "Intermediate",
    duration: "120 Menit",
    category: "Cardio",
    image: {
      uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    },
  },
  {
    id: "2",
    title: "Muscle Exercise",
    level: "Beginner",
    duration: "90 Menit",
    category: "Muscle",
    image: {
      uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    },
  },
  {
    id: "3",
    title: "Weight Exercise",
    level: "Advanced",
    duration: "75 Menit",
    category: "Weight",
    image: {
      uri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
    },
  },
];

const CARD_WIDTH = width * 0.66;

type BottomTab = "home" | "calendar" | "heart" | "profile";

function IconText({
  children,
  size = 20,
  color = "#111827",
}: {
  children: string;
  size?: number;
  color?: ColorValue;
}) {
  return (
    <StyledText fontSize={size} color={color as string} lineHeight={size + 2}>
      {children}
    </StyledText>
  );
}

function Metric({
  value,
  label,
  barWidth,
}: {
  value: string;
  label: string;
  barWidth: DimensionValue;
}) {
  return (
    <Stack flex={1} gap={6}>
      <StyledText color="#FFFFFF" fontSize={15} fontWeight="700">
        {value}
      </StyledText>

      <StyledText color="rgba(255,255,255,0.72)" fontSize={12}>
        {label}
      </StyledText>

      <Stack
        width="82%"
        height={6}
        borderRadius={999}
        backgroundColor="rgba(255,255,255,0.12)"
        overflow="hidden"
        marginTop={3}
      >
        <Stack
          width={barWidth}
          height="100%"
          borderRadius={999}
          backgroundColor="#F5F5F0"
        />
      </Stack>
    </Stack>
  );
}

function CategoryChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <StyledPressable
      onPress={onPress}
      paddingHorizontal={22}
      height={52}
      minWidth={110}
      borderRadius={999}
      borderWidth={1}
      borderColor={active ? "#B7F000" : "#D9D9D9"}
      backgroundColor={active ? "#B7F000" : "#FFFFFF"}
      alignItems="center"
      justifyContent="center"
    >
      <StyledText
        fontSize={15}
        fontWeight={active ? "700" : "500"}
        color="#0F1E35"
      >
        {label}
      </StyledText>
    </StyledPressable>
  );
}

function WorkoutCard({ item }: { item: WorkoutItem }) {
  return (
    <Stack width={CARD_WIDTH} gap={12}>
      <StyledImageBackground
        source={item.image}
        width={CARD_WIDTH}
        height={240}
        borderRadius={22}
        overflow="hidden"
      >
        <Stack
          flex={1}
          padding={16}
          justifyContent="space-between"
          backgroundColor="rgba(0,0,0,0.18)"
        >
          <Stack
            horizontal
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <StyledText color="#FFFFFF" fontSize={16} fontWeight="500">
              {item.level}
            </StyledText>

            <StyledPressable
              width={32}
              height={32}
              borderRadius={999}
              backgroundColor="rgba(255,255,255,0.18)"
              alignItems="center"
              justifyContent="center"
            >
              <StyledText fontSize={16} color="#FFFFFF">
                ♡
              </StyledText>
            </StyledPressable>
          </Stack>

          <Stack />
        </Stack>
      </StyledImageBackground>

      <Stack gap={8} paddingHorizontal={2}>
        <StyledText fontSize={18} fontWeight="700" color="#0F1E35">
          {item.title}
        </StyledText>

        <Stack horizontal alignItems="center" gap={8}>
          <StyledText fontSize={14} color="#111827">
            ◷
          </StyledText>
          <StyledText fontSize={14} color="#1F2937">
            {item.duration}
          </StyledText>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Header() {
  return (
    <Stack horizontal alignItems="center" justifyContent="space-between">
      <StyledImage
        source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
        width={46}
        height={46}
        borderRadius={999}
      />

      <Stack horizontal alignItems="center" gap={18}>
        <StyledPressable>
          <IconText size={26}>⌕</IconText>
        </StyledPressable>

        <BadgeIcon
          icon={
            <StyledPressable>
              <IconText size={24}>◌</IconText>
            </StyledPressable>
          }
          char=""
          size={10}
          top={-1}
          right={1}
          backgroundColor="#FF5A5F"
        />
      </Stack>
    </Stack>
  );
}

function ActivityCard() {
  return (
    <Stack backgroundColor="#1B2013" borderRadius={24} padding={20} gap={18}>
      <Stack horizontal justifyContent="space-between" alignItems="flex-start">
        <Stack gap={6} flex={1} paddingRight={16}>
          <StyledText color="#FFFFFF" fontSize={21} fontWeight="700">
            Today’s
          </StyledText>
          <StyledText color="#FFFFFF" fontSize={21} fontWeight="700">
            Activities
          </StyledText>
          <StyledText color="rgba(255,255,255,0.65)" fontSize={15}>
            Body Weight
          </StyledText>
        </Stack>

       <StyledCircularProgress
                         value={55}
                         diameter={150}
                         strokeWidth={32}
                         display="percent"
                         contentPosition="center"
                         colors={{
                           arc: theme.colors.yellow[500],
                           track: theme.colors.yellow[100],
                           label: theme.colors.yellow[700],
                           sublabel: theme.colors.yellow[400],
                         }}
                       />
      </Stack>

      <Stack horizontal gap={12}>
        <Metric value="1200 kcal" label="Calories Burned" barWidth="42%" />
        <Metric value="90 bpm" label="Heart Rate" barWidth="54%" />
        <Metric value="03:00 hr" label="Time" barWidth="67%" />
      </Stack>
    </Stack>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <Stack horizontal alignItems="center" justifyContent="space-between">
      <StyledText fontSize={18} fontWeight="700" color="#0F1E35">
        {title}
      </StyledText>

      {action ? (
        <StyledPressable>
          <StyledText fontSize={16} fontWeight="500" color="#B7F000">
            {action}
          </StyledText>
        </StyledPressable>
      ) : (
        <Stack />
      )}
    </Stack>
  );
}

export default function FitnessHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [tab, setTab] = useState<BottomTab>("home");

  const filteredWorkouts = useMemo(() => {
    if (selectedCategory === "All") return workouts;
    return workouts.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <StyledSafeAreaView flex={1} backgroundColor="#FFFFFF">
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 120,
        }}
      >
        <Stack gap={28}>
          <Header />

          <ActivityCard />

          <Stack gap={18}>
            <SectionHeader title="Category" />

            <StyledScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingRight: 18 }}
            >
              {categories.map((category) => (
                <CategoryChip
                  key={category}
                  label={category}
                  active={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
            </StyledScrollView>
          </Stack>

          <Stack gap={18}>
            <SectionHeader title="Popular" action="See All" />

            <StyledScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 18, paddingRight: 24 }}
            >
              {filteredWorkouts.map((item) => (
                <WorkoutCard key={item.id} item={item} />
              ))}
            </StyledScrollView>
          </Stack>
        </Stack>
      </StyledScrollView>

      <Stack
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        backgroundColor="#FFFFFF"
        paddingHorizontal={20}
        paddingTop={8}
        paddingBottom={20}
      >
        <Stack
          horizontal
          alignItems="center"
          justifyContent="space-between"
          borderTopWidth={1}
          borderTopColor="#EEF2F7"
          paddingTop={10}
        >
          <Stack vertical flex={1}>
            <TabBar
              options={[
                {
                  value: "home",
                  label: "",
                  iconRender: (color) => (
                    <IconText size={32} color={color}>
                      ⌂
                    </IconText>
                  ),
                },
                {
                  value: "calendar",
                  label: "",
                  iconRender: (color) => (
                    <IconText size={32} color={color}>
                      ◫
                    </IconText>
                  ),
                },
                {
                  value: "heart",
                  label: "",
                  iconRender: (color) => (
                    <IconText size={32} color={color}>
                      ♡
                    </IconText>
                  ),
                },
                {
                  value: "profile",
                  label: "",
                  iconRender: (color) => (
                    <IconText size={32} color={color}>
                      ◯
                    </IconText>
                  ),
                },
              ]}
              value={tab}
              onChange={setTab}
              indicator={false}
              showBorder={false}
              colors={{
                background: "#FFFFFF",
                activeText: "#1D2216",
                text: "#A1A1AA",
              }}
              style={{ justifyContent: "space-between", alignItems: "center" }}
            />
          </Stack>

          {/* <Stack
            position="absolute"
            alignSelf="center"
            top={-10}
            left="50%"
            marginLeft={-32}
          >
            <StyledPressable
              width={64}
              height={64}
              borderRadius={999}
              backgroundColor="#B7F000"
              alignItems="center"
              justifyContent="center"
            >
              <StyledText fontSize={34} color="#111827" fontWeight="400">
                +
              </StyledText>
            </StyledPressable>
          </Stack> */}
        </Stack>
      </Stack>
    </StyledSafeAreaView>
  );
}
