/**
 * StyledTimelineDemo.tsx
 * ───────────────────────
 * Comprehensive showcase of StyledTimeline across 8 real-world use cases:
 *
 *  1. Workout Schedule       — fitness cards with progress + stats
 *  2. Order Tracking         — delivery status with step states
 *  3. Medical History        — doctor visits with severity badges
 *  4. Project Milestones     — kanban-style with avatars + due dates
 *  5. Transaction History    — debit/credit with amounts
 *  6. Notification Feed      — social/app notifications with icons
 *  7. Travel Itinerary       — flights + hotels + activities
 *  8. Interview Pipeline     — hiring stages with status chips
 */

import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledPage,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  StyledImage,
  StyledSpacer,
  StyledDivider,
  TabBar,
  TabItem,
  theme,
  palettes,
  StyledTimeline,
  type TimelineItem,
} from 'fluent-styles';

const { width: W } = Dimensions.get('window');
const CARD_PAD = 16;
const CONTAINER_PAD = 40; // screen padding only (no extra card wrapping)

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string; subtitle?: string; color?: string }> = ({
  title, subtitle, color = theme.colors.gray[900],
}) => (
  <Stack paddingHorizontal={20} paddingTop={28} paddingBottom={14}>
    <Stack horizontal alignItems="center" gap={8}>
      <Stack width={4} height={22} borderRadius={2} backgroundColor={color} />
      <StyledText fontSize={18} fontWeight="900" color={theme.colors.gray[900]}>
        {title}
      </StyledText>
    </Stack>
    {subtitle && (
      <StyledText fontSize={13} color={theme.colors.gray[400]} marginTop={4} marginLeft={12}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
);

// ═════════════════════════════════════════════════════════════════════════════
// 1. WORKOUT SCHEDULE
// ═════════════════════════════════════════════════════════════════════════════

const WorkoutProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => (
  <Stack horizontal alignItems="center" gap={8} marginBottom={10}>
    <StyledText fontSize={11} color={theme.colors.gray[400]} width={48}>Exercise</StyledText>
    <Stack flex={1} height={4} borderRadius={2} backgroundColor={theme.colors.gray[100]}>
      <Stack width={`${progress * 100}%` as any} height={4} borderRadius={2} backgroundColor="#8bc34a" />
    </Stack>
    <StyledText fontSize={11} color={theme.colors.gray[400]}>{label}</StyledText>
  </Stack>
);

const WorkoutCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  return (
    <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={14} shadow="light" marginBottom={2}>
      <Stack horizontal alignItems="center" justifyContent="space-between" marginBottom={10}>
        <Stack horizontal alignItems="center" gap={8}>
          <Stack width={36} height={36} borderRadius={18} backgroundColor="#f0f7e6"
            alignItems="center" justifyContent="center">
            <Icon name={m.icon} size={16} color="#5a8a1e" />
          </Stack>
          <StyledText fontSize={15} fontWeight="800" color={theme.colors.gray[900]}>{item.title}</StyledText>
        </Stack>
        <StyledPressable onPress={() => {}}>
          <Icon name="more-vertical" size={16} color={theme.colors.gray[400]} />
        </StyledPressable>
      </Stack>
      <WorkoutProgressBar progress={m.progress} label={m.progressLabel} />
      <Stack horizontal>
        {[
          { v: m.calories, u: 'kcal', l: 'Calories Burn' },
          { v: m.bpm,      u: 'bpm',  l: 'Heart Rate'    },
          { v: m.duration, u: 'hr',   l: 'Time'          },
        ].map(({ v, u, l }) => (
          <Stack key={l} flex={1} gap={2}>
            <Stack horizontal alignItems="flex-end" gap={2}>
              <StyledText fontSize={18} fontWeight="900" color={theme.colors.gray[900]}>{v}</StyledText>
              <StyledText fontSize={11} color={theme.colors.gray[400]} marginBottom={2}>{u}</StyledText>
            </Stack>
            <StyledText fontSize={11} color={theme.colors.gray[400]}>{l}</StyledText>
          </Stack>
        ))}
      </Stack>
    </StyledCard>
  );
};

const workoutItems: TimelineItem[] = [
  { id: 'w1', time: '06:00', endTime: '07:00', title: 'Morning Run',
    meta: { icon: 'wind', progress: 1,    progressLabel: '6 Of 6', calories: '520',  bpm: '142', duration: '01:00' } },
  { id: 'w2', time: '11:35', endTime: '13:05', title: 'Cardio',
    meta: { icon: 'heart', progress: 0.65, progressLabel: '4 Of 6', calories: '1200', bpm: '90',  duration: '03:00' } },
  { id: 'w3', time: '14:50', endTime: '15:15', title: 'Weight Training',
    meta: { icon: 'activity', progress: 0.44, progressLabel: '4 Of 9', calories: '800',  bpm: '85',  duration: '01:30' } },
  { id: 'w4', time: '18:00', endTime: '19:00', title: 'Yoga & Stretch',
    meta: { icon: 'feather', progress: 0, progressLabel: '0 Of 5', calories: '300',  bpm: '65',  duration: '01:00' } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. ORDER TRACKING
// ═════════════════════════════════════════════════════════════════════════════

type OrderStatus = 'done' | 'active' | 'pending';

const STATUS_COLOR: Record<OrderStatus, string> = {
  done:    '#4caf50',
  active:  '#2196f3',
  pending: theme.colors.gray[300],
};

const STATUS_BG: Record<OrderStatus, string> = {
  done:    '#e8f5e9',
  active:  '#e3f2fd',
  pending: theme.colors.gray[100],
};

const OrderStepCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  const status: OrderStatus = m.status;
  return (
    <Stack
      paddingVertical={12}
      paddingHorizontal={14}
      borderRadius={14}
      backgroundColor={STATUS_BG[status]}
      marginBottom={4}
      borderLeftWidth={3}
      borderLeftColor={STATUS_COLOR[status]}
    >
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={3}>
          <StyledText fontSize={14} fontWeight="700"
            color={status === 'pending' ? theme.colors.gray[400] : theme.colors.gray[900]}>
            {item.title}
          </StyledText>
          {item.subtitle && (
            <StyledText fontSize={12} color={theme.colors.gray[400]}>{item.subtitle}</StyledText>
          )}
        </Stack>
        {status === 'done' && (
          <Stack width={28} height={28} borderRadius={14} backgroundColor="#4caf50"
            alignItems="center" justifyContent="center">
            <Icon name="check" size={14} color="#fff" />
          </Stack>
        )}
        {status === 'active' && (
          <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={12} backgroundColor="#2196f3">
            <StyledText fontSize={11} fontWeight="700" color="#fff">Live</StyledText>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const orderItems: TimelineItem[] = [
  { id: 'o1', time: '09:12', title: 'Order Placed',    subtitle: 'Order #FS-8821 confirmed',   meta: { status: 'done'    } },
  { id: 'o2', time: '10:45', title: 'Preparing',       subtitle: 'Kitchen is preparing your order', meta: { status: 'done' } },
  { id: 'o3', time: '11:30', title: 'Out for Delivery', subtitle: 'Rider: James · 4.2km away',  meta: { status: 'active'  } },
  { id: 'o4', time: '12:00', title: 'Delivered',       subtitle: 'Estimated arrival',           meta: { status: 'pending' } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 3. MEDICAL HISTORY
// ═════════════════════════════════════════════════════════════════════════════

const SEVERITY_COLOR: Record<string, string> = {
  routine:  '#4caf50',
  moderate: '#ff9800',
  urgent:   '#f44336',
};

const MedCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  return (
    <StyledCard backgroundColor={palettes.white} borderRadius={16} padding={14} shadow="light" marginBottom={2}>
      <Stack horizontal alignItems="flex-start" justifyContent="space-between" marginBottom={6}>
        <Stack flex={1} gap={2}>
          <StyledText fontSize={14} fontWeight="800" color={theme.colors.gray[900]}>{item.title}</StyledText>
          <StyledText fontSize={12} color={theme.colors.gray[400]}>{item.subtitle}</StyledText>
        </Stack>
        <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={12}
          backgroundColor={`${SEVERITY_COLOR[m.severity]}22`}>
          <StyledText fontSize={11} fontWeight="700" color={SEVERITY_COLOR[m.severity]}>
            {m.severity}
          </StyledText>
        </Stack>
      </Stack>
      {m.notes && (
        <StyledText fontSize={12} color={theme.colors.gray[500]} marginTop={4}>
          {m.notes}
        </StyledText>
      )}
      {m.prescriptions && (
        <Stack horizontal gap={6} marginTop={8} flexWrap="wrap">
          {(m.prescriptions as string[]).map((p: string) => (
            <Stack key={p} paddingHorizontal={9} paddingVertical={4} borderRadius={12}
              backgroundColor={theme.colors.blue?.[50] ?? '#e3f2fd'}>
              <StyledText fontSize={11} color={theme.colors.blue?.[700] ?? '#1565c0'}>💊 {p}</StyledText>
            </Stack>
          ))}
        </Stack>
      )}
    </StyledCard>
  );
};

const medItems: TimelineItem[] = [
  { id: 'm1', time: 'Jan 2024', title: 'Annual Checkup',       subtitle: 'Dr. Patel · General Practice',
    meta: { severity: 'routine',  notes: 'Blood pressure normal. Cholesterol slightly elevated.', prescriptions: ['Statins 10mg'] } },
  { id: 'm2', time: 'Mar 2024', title: 'Knee Pain Consultation', subtitle: 'Dr. Okonkwo · Orthopaedics',
    meta: { severity: 'moderate', notes: 'Mild ligament strain. Advised physiotherapy for 6 weeks.', prescriptions: ['Ibuprofen 400mg', 'Physio x3/week'] } },
  { id: 'm3', time: 'Apr 2024', title: 'Emergency — Chest Pain', subtitle: 'City Hospital A&E',
    meta: { severity: 'urgent',   notes: 'ECG normal. Diagnosed as musculoskeletal pain. Discharged same day.', prescriptions: ['Paracetamol', 'Rest'] } },
  { id: 'm4', time: 'Jun 2024', title: 'Follow-up Bloods',      subtitle: 'Dr. Patel · General Practice',
    meta: { severity: 'routine',  notes: 'Cholesterol improved. Continue current medication.', prescriptions: [] } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 4. PROJECT MILESTONES
// ═════════════════════════════════════════════════════════════════════════════

const MilestoneCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  const statusColor = m.status === 'completed' ? '#4caf50'
    : m.status === 'in_progress' ? '#2196f3' : theme.colors.gray[400];

  return (
    <StyledCard backgroundColor={palettes.white} borderRadius={16} padding={14} shadow="light" marginBottom={2}>
      <Stack horizontal alignItems="flex-start" justifyContent="space-between" marginBottom={8}>
        <Stack flex={1} gap={2}>
          <StyledText fontSize={14} fontWeight="800" color={theme.colors.gray[900]}>{item.title}</StyledText>
          <StyledText fontSize={12} color={theme.colors.gray[400]}>Due: {m.due}</StyledText>
        </Stack>
        <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={12}
          backgroundColor={`${statusColor}18`}>
          <StyledText fontSize={11} fontWeight="700" color={statusColor}>
            {m.status.replace('_', ' ')}
          </StyledText>
        </Stack>
      </Stack>
      <StyledText fontSize={12} color={theme.colors.gray[500]} marginBottom={10}>
        {item.description}
      </StyledText>
      {/* Assignee avatars */}
      <Stack horizontal alignItems="center" gap={8}>
        <Stack horizontal>
          {(m.assignees as string[]).map((url: string, i: number) => (
            <Stack key={i} style={{ marginLeft: i > 0 ? -10 : 0 }}
              borderWidth={2} borderColor={palettes.white} borderRadius={14}>
              <StyledImage source={{ uri: url }} width={28} height={28} cycle size={28} borderRadius={14} />
            </Stack>
          ))}
        </Stack>
        <StyledText fontSize={11} color={theme.colors.gray[400]}>
          {(m.assignees as string[]).length} assignees
        </StyledText>
      </Stack>
    </StyledCard>
  );
};

const milestoneItems: TimelineItem[] = [
  { id: 'p1', time: 'Sprint 1', title: 'Design System Setup', description: 'Tokens, typography, spacing and component foundations.',
    meta: { due: '01 Mar', status: 'completed', assignees: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    ]} },
  { id: 'p2', time: 'Sprint 2', title: 'Core Components', description: 'Button, Input, Card, Badge, Divider, Stack.',
    meta: { due: '15 Mar', status: 'completed', assignees: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    ]} },
  { id: 'p3', time: 'Sprint 3', title: 'Chart & Data Viz', description: 'StyledBar, StyledTimeline, BMI gauge.',
    meta: { due: '01 Apr', status: 'in_progress', assignees: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
    ]} },
  { id: 'p4', time: 'Sprint 4', title: 'Documentation & Release', description: 'README, demos, npm publish.',
    meta: { due: '20 Apr', status: 'pending', assignees: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    ]} },
];

// ═════════════════════════════════════════════════════════════════════════════
// 5. TRANSACTION HISTORY
// ═════════════════════════════════════════════════════════════════════════════

const TxCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  const isCredit = m.type === 'credit';
  return (
    <Stack
      horizontal
      alignItems="center"
      justifyContent="space-between"
      paddingVertical={12}
      paddingHorizontal={14}
      borderRadius={14}
      backgroundColor={palettes.white}
      marginBottom={4}
    
    >
      <Stack horizontal alignItems="center" gap={12} flex={1}>
        <Stack width={40} height={40} borderRadius={20}
          backgroundColor={isCredit ? '#e8f5e9' : '#fce4ec'}
          alignItems="center" justifyContent="center">
          <Icon name={isCredit ? 'arrow-down-left' : 'arrow-up-right'} size={18}
            color={isCredit ? '#388e3c' : '#c62828'} />
        </Stack>
        <Stack flex={1} gap={2}>
          <StyledText fontSize={14} fontWeight="700" color={theme.colors.gray[900]}>{item.title}</StyledText>
          <StyledText fontSize={12} color={theme.colors.gray[400]}>{item.subtitle}</StyledText>
        </Stack>
      </Stack>
      <StyledText fontSize={15} fontWeight="800"
        color={isCredit ? '#388e3c' : '#c62828'}>
        {isCredit ? '+' : '-'}${m.amount}
      </StyledText>
    </Stack>
  );
};

const txItems: TimelineItem[] = [
  { id: 't1', time: '09:14', title: 'Salary Deposit',   subtitle: 'Employer · Direct transfer', meta: { type: 'credit', amount: '4,200.00' } },
  { id: 't2', time: '10:02', title: 'Netflix',          subtitle: 'Subscription · auto-debit',  meta: { type: 'debit',  amount: '15.99'    } },
  { id: 't3', time: '12:30', title: 'Grocery Store',    subtitle: 'Card payment · Tesco',       meta: { type: 'debit',  amount: '87.40'    } },
  { id: 't4', time: '14:55', title: 'PayPal Transfer',  subtitle: 'From @mike_doe',             meta: { type: 'credit', amount: '250.00'   } },
  { id: 't5', time: '17:10', title: 'Electricity Bill', subtitle: 'Direct debit · April',      meta: { type: 'debit',  amount: '63.20'    } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 6. NOTIFICATION FEED
// ═════════════════════════════════════════════════════════════════════════════

const NotifCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as any;
  return (
    <Stack
      horizontal
      alignItems="flex-start"
      gap={10}
      paddingVertical={10}
      paddingHorizontal={12}
      borderRadius={14}
      backgroundColor={m.unread ? `${m.color}10` : palettes.white}
      marginBottom={4}
      borderLeftWidth={m.unread ? 3 : 0}
      borderLeftColor={m.color}
    >
      <Stack width={38} height={38} borderRadius={19}
        backgroundColor={`${m.color}22`} alignItems="center" justifyContent="center">
        <Icon name={m.icon} size={17} color={m.color} />
      </Stack>
      <Stack flex={1} gap={3}>
        <StyledText fontSize={13} fontWeight={m.unread ? '700' : '500'} color={theme.colors.gray[900]}>
          {item.title}
        </StyledText>
        <StyledText fontSize={12} color={theme.colors.gray[500]} numberOfLines={2}>
          {item.subtitle}
        </StyledText>
      </Stack>
      {m.unread && (
        <Stack width={8} height={8} borderRadius={4} backgroundColor={m.color} marginTop={4} />
      )}
    </Stack>
  );
};

const notifItems: TimelineItem[] = [
  { id: 'n1', time: '2m ago',   title: 'Sarah liked your post',    subtitle: '"My morning run PR — 5k in 22 mins!"', meta: { icon: 'heart',     color: '#e91e63', unread: true  } },
  { id: 'n2', time: '15m ago',  title: 'New comment',              subtitle: 'James: "Great work, keep it up! 💪"', meta: { icon: 'message-circle', color: '#2196f3', unread: true  } },
  { id: 'n3', time: '1h ago',   title: 'Workout reminder',         subtitle: 'Time for your afternoon Cardio session.', meta: { icon: 'bell', color: '#ff9800', unread: false } },
  { id: 'n4', time: '3h ago',   title: 'Goal achieved! 🎉',        subtitle: 'You hit your weekly step goal of 50,000 steps.', meta: { icon: 'award', color: '#4caf50', unread: false } },
  { id: 'n5', time: 'Yesterday',title: 'App update available',     subtitle: 'Version 2.4.1 — bug fixes and performance.', meta: { icon: 'download', color: '#9c27b0', unread: false } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 7. TRAVEL ITINERARY
// ═════════════════════════════════════════════════════════════════════════════

const TYPE_COLOR: Record<string, { bg: string; icon: string; color: string }> = {
  flight:  { bg: '#e3f2fd', color: '#1565c0', icon: 'navigation' },
  hotel:   { bg: '#fce4ec', color: '#880e4f', icon: 'home'       },
  activity:{ bg: '#e8f5e9', color: '#1b5e20', icon: 'map-pin'    },
  food:    { bg: '#fff8e1', color: '#e65100', icon: 'coffee'     },
};

const TravelCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m   = item.meta as any;
  const cfg = TYPE_COLOR[m.type] ?? TYPE_COLOR.activity;
  return (
    <StyledCard backgroundColor={palettes.white} borderRadius={16} padding={14} shadow="light" marginBottom={4}>
      <Stack horizontal alignItems="flex-start" gap={12}>
        <Stack width={44} height={44} borderRadius={12} backgroundColor={cfg.bg}
          alignItems="center" justifyContent="center">
          <Icon name={cfg.icon} size={19} color={cfg.color} />
        </Stack>
        <Stack flex={1} gap={3}>
          <Stack horizontal alignItems="center" justifyContent="space-between">
            <StyledText fontSize={14} fontWeight="800" color={theme.colors.gray[900]}>{item.title}</StyledText>
            <Stack paddingHorizontal={8} paddingVertical={3} borderRadius={10} backgroundColor={cfg.bg}>
              <StyledText fontSize={10} fontWeight="700" color={cfg.color}>{m.type}</StyledText>
            </Stack>
          </Stack>
          <StyledText fontSize={12} color={theme.colors.gray[500]}>{item.subtitle}</StyledText>
          {m.detail && (
            <StyledText fontSize={12} color={theme.colors.gray[400]}>{m.detail}</StyledText>
          )}
        </Stack>
      </Stack>
    </StyledCard>
  );
};

const travelItems: TimelineItem[] = [
  { id: 'tr1', time: 'Day 1\n06:00', title: 'Flight LHR → DXB',   subtitle: 'Emirates EK006 · Terminal 3',   meta: { type: 'flight',   detail: 'Seat 14A · 7h 20min'           } },
  { id: 'tr2', time: 'Day 1\n15:20', title: 'Check-in: Burj Al Arab', subtitle: 'Jumeirah Beach, Dubai',     meta: { type: 'hotel',    detail: 'Deluxe Sea View · 3 nights'    } },
  { id: 'tr3', time: 'Day 2\n10:00', title: 'Desert Safari',      subtitle: 'Dune bashing + camel ride',    meta: { type: 'activity', detail: 'Pickup at hotel lobby 09:45'  } },
  { id: 'tr4', time: 'Day 2\n19:00', title: 'Al Hadheerah Dinner',subtitle: 'Bedouin-style outdoor dinner', meta: { type: 'food',     detail: 'Reservation for 2 · Table 7'  } },
  { id: 'tr5', time: 'Day 3\n09:00', title: 'Burj Khalifa',       subtitle: 'At the Top SKY — 148th floor', meta: { type: 'activity', detail: 'Tickets pre-booked'            } },
  { id: 'tr6', time: 'Day 4\n08:00', title: 'Flight DXB → LHR',   subtitle: 'Emirates EK003',               meta: { type: 'flight',   detail: 'Seat 22C · 7h 45min'           } },
];

// ═════════════════════════════════════════════════════════════════════════════
// 8. INTERVIEW PIPELINE
// ═════════════════════════════════════════════════════════════════════════════

const STAGE_CFG: Record<string, { color: string; bg: string }> = {
  passed:    { color: '#4caf50', bg: '#e8f5e9' },
  scheduled: { color: '#2196f3', bg: '#e3f2fd' },
  pending:   { color: '#ff9800', bg: '#fff8e1' },
  rejected:  { color: '#f44336', bg: '#ffebee' },
};

const InterviewCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m   = item.meta as any;
  const cfg = STAGE_CFG[m.status] ?? STAGE_CFG.pending;
  return (
    <Stack
      paddingVertical={12}
      paddingHorizontal={14}
      borderRadius={14}
      backgroundColor={palettes.white}
      marginBottom={4}
    
    >
      <Stack horizontal alignItems="center" justifyContent="space-between" marginBottom={4}>
        <StyledText fontSize={14} fontWeight="800" color={theme.colors.gray[900]}>{item.title}</StyledText>
        <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={12} backgroundColor={cfg.bg}>
          <StyledText fontSize={11} fontWeight="700" color={cfg.color}>{m.status}</StyledText>
        </Stack>
      </Stack>
      <StyledText fontSize={12} color={theme.colors.gray[400]} marginBottom={m.interviewer ? 6 : 0}>
        {item.subtitle}
      </StyledText>
      {m.interviewer && (
        <Stack horizontal alignItems="center" gap={6}>
          <Icon name="user" size={12} color={theme.colors.gray[400]} />
          <StyledText fontSize={12} color={theme.colors.gray[400]}>{m.interviewer}</StyledText>
        </Stack>
      )}
    </Stack>
  );
};

const interviewItems: TimelineItem[] = [
  { id: 'i1', time: '12 Mar', title: 'Application Submitted', subtitle: 'Senior React Native Engineer · Acme Corp', meta: { status: 'passed',    interviewer: null                       } },
  { id: 'i2', time: '14 Mar', title: 'Recruiter Screen',      subtitle: '30 min call · HR assessment',             meta: { status: 'passed',    interviewer: 'Emily Clarke · Talent'    } },
  { id: 'i3', time: '18 Mar', title: 'Technical Round 1',     subtitle: 'Live coding · 90 minutes',                meta: { status: 'passed',    interviewer: 'David Kim · Engineering'  } },
  { id: 'i4', time: '22 Mar', title: 'System Design',         subtitle: 'Architecture discussion · 60 min',        meta: { status: 'scheduled', interviewer: 'Sarah Obi · Staff Eng'    } },
  { id: 'i5', time: '26 Mar', title: 'Final Panel',           subtitle: 'Culture + values · Executive round',      meta: { status: 'pending',   interviewer: 'C-Suite Panel'            } },
];

// ═════════════════════════════════════════════════════════════════════════════
// TAB NAV
// ═════════════════════════════════════════════════════════════════════════════

type DemoTab =
  | 'workout' | 'order' | 'medical' | 'project'
  | 'finance' | 'notif' | 'travel'  | 'hiring';

const TABS: TabItem<DemoTab>[] = [
  { value: 'workout', label: 'Workout'  },
  { value: 'order',   label: 'Delivery' },
  { value: 'medical', label: 'Medical'  },
  { value: 'project', label: 'Project'  },
  { value: 'finance', label: 'Finance'  },
  { value: 'notif',   label: 'Notifs'   },
  { value: 'travel',  label: 'Travel'   },
  { value: 'hiring',  label: 'Hiring'   },
];

const TAB_META: Record<DemoTab, { title: string; subtitle: string; color: string; dot: string }> = {
  workout: { title: 'Workout Schedule',    subtitle: 'Daily fitness plan with stats',     color: '#8bc34a', dot: '#8bc34a' },
  order:   { title: 'Order Tracking',      subtitle: 'Real-time delivery steps',          color: '#2196f3', dot: '#2196f3' },
  medical: { title: 'Medical History',     subtitle: 'Doctor visits & prescriptions',     color: '#f44336', dot: '#f44336' },
  project: { title: 'Project Milestones',  subtitle: 'Sprint progress with team',         color: '#9c27b0', dot: '#9c27b0' },
  finance: { title: 'Transactions',        subtitle: 'Today\'s account activity',         color: '#4caf50', dot: '#4caf50' },
  notif:   { title: 'Notification Feed',   subtitle: 'Unread & recent activity',          color: '#ff9800', dot: '#ff9800' },
  travel:  { title: 'Travel Itinerary',    subtitle: 'Dubai 4-day trip',                  color: '#1565c0', dot: '#1565c0' },
  hiring:  { title: 'Interview Pipeline',  subtitle: 'Senior RN Engineer application',    color: '#795548', dot: '#795548' },
};

// ═════════════════════════════════════════════════════════════════════════════
// SCREEN
// ═════════════════════════════════════════════════════════════════════════════

export default function StyledTimelineDemo() {
  const [activeTab, setTab] = useState<DemoTab>('workout');
  const meta = TAB_META[activeTab];

  const renderContent = () => {
    switch (activeTab) {
      case 'workout':
        return (
          <StyledTimeline items={workoutItems} renderItem={(item) => <WorkoutCard item={item} />}
            variant="default" dotShape="filled" dotSize={10} timeColumnWidth={58}
            colors={{ dot: meta.dot, line: theme.colors.gray[200], endTimeText: theme.colors.gray[400] }} />
        );
      case 'order':
        return (
          <StyledTimeline items={orderItems} renderItem={(item) => <OrderStepCard item={item} />}
            variant="spacious" dotShape="ring" dotSize={14} timeColumnWidth={58}
            colors={{ dot: meta.dot, line: '#bbdefb', dotBorder: palettes.white }} />
        );
      case 'medical':
        return (
          <StyledTimeline items={medItems} renderItem={(item) => <MedCard item={item} />}
            variant="spacious" dotShape="ring" dotSize={12} timeColumnWidth={68}
            colors={{ dot: meta.dot, line: '#ffcdd2', dotBorder: palettes.white }} />
        );
      case 'project':
        return (
          <StyledTimeline items={milestoneItems} renderItem={(item) => <MilestoneCard item={item} />}
            variant="spacious" dotShape="filled" dotSize={10} timeColumnWidth={68}
            colors={{ dot: meta.dot, line: '#e1bee7' }} />
        );
      case 'finance':
        return (
          <StyledTimeline items={txItems} renderItem={(item) => <TxCard item={item} />}
            variant="compact" dotShape="circle" dotSize={8} timeColumnWidth={54}
            colors={{ dot: meta.dot, line: theme.colors.gray[200] }} />
        );
      case 'notif':
        return (
          <StyledTimeline items={notifItems} renderItem={(item) => <NotifCard item={item} />}
            variant="compact" dotShape="filled" dotSize={8} timeColumnWidth={72}
            colors={{ dot: meta.dot, line: theme.colors.gray[100] }} />
        );
      case 'travel':
        return (
          <StyledTimeline items={travelItems} renderItem={(item) => <TravelCard item={item} />}
            variant="spacious" dotShape="ring" dotSize={14} timeColumnWidth={72}
            colors={{ dot: meta.dot, line: '#bbdefb', dotBorder: palettes.white }} />
        );
      case 'hiring':
        return (
          <StyledTimeline items={interviewItems} renderItem={(item) => <InterviewCard item={item} />}
            variant="default" dotShape="filled" dotSize={10} timeColumnWidth={58}
            colors={{ dot: meta.dot, line: '#d7ccc8' }} />
        );
    }
  };

  return (
    <Stack flex={1} backgroundColor="#f8f8f8">

      {/* Header */}
      <Stack paddingHorizontal={20} paddingTop={16} paddingBottom={4}
        backgroundColor={palettes.white} >
        <StyledText fontSize={22} fontWeight="900" color={theme.colors.gray[900]}>
          StyledTimeline
        </StyledText>
        <StyledText fontSize={13} color={theme.colors.gray[400]} marginBottom={12}>
          8 real-world use cases
        </StyledText>

        {/* Scrollable tabs */}
        <TabBar
          options={TABS}
          value={activeTab}
          onChange={setTab}
          indicator="line"
          tabAlign="scroll"
          showBorder
          fontSize={13}
          height={44}
          colors={{
            background:  palettes.white,
            activeText:  meta.color,
            text:        theme.colors.gray[400],
            indicator:   meta.color,
            border:      theme.colors.gray[100],
          }}
        />
      </Stack>

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
     

          <SectionHeader
            title={meta.title}
            subtitle={meta.subtitle}
            color={meta.color}
          />

          <Stack paddingHorizontal={20}>
            {renderContent()}
          </Stack>

    
      </StyledScrollView>
    </Stack>
  );
}