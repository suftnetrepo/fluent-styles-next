"use strict";

/**
 * StyledDatePicker.tsx
 * ─────────────────────
 * Production-ready date picker for fluent-styles apps.
 * Pure JS — no native deps. Built exclusively on fluent-styles primitives.
 *
 * Modes:    date | time | datetime | range | month
 * Variants: inline | sheet | input
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Animated, Dimensions, Modal, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Stack, StyledText, StyledPressable, StyledDivider, StyledSpacer, theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Date helpers (local-time safe) ──────────────────────────────────────────

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
const FMT_DATE = d => d.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
const FMT_TIME = d => d.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit'
});
const FMT_DATETIME = d => `${FMT_DATE(d)}, ${FMT_TIME(d)}`;
const FMT_MONTH = d => d.toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric'
});
const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ─── Colours ──────────────────────────────────────────────────────────────────

function buildColors(o) {
  const sel = o?.selected ?? theme.colors.gray[900];
  return {
    selected: sel,
    selectedText: o?.selectedText ?? '#ffffff',
    today: o?.today ?? '#3b82f6',
    rangeFill: o?.rangeFill ?? `${sel}18`,
    dayText: o?.dayText ?? theme.colors.gray[800],
    disabledText: o?.disabledText ?? theme.colors.gray[300],
    headerText: o?.headerText ?? theme.colors.gray[900],
    background: o?.background ?? palettes.white,
    inputBorder: o?.inputBorder ?? theme.colors.gray[200],
    confirmBg: o?.confirmBg ?? theme.colors.gray[900],
    confirmText: o?.confirmText ?? '#ffffff'
  };
}
const CELL = {
  sm: 34,
  md: 40,
  lg: 48
};
const FONT = {
  sm: 13,
  md: 15,
  lg: 17
};

// ─── MonthYearHeader ─────────────────────────────────────────────────────────

const MonthYearHeader = ({
  date,
  onPrev,
  onNext,
  onTapTitle,
  C
}) => /*#__PURE__*/_jsxs(Stack, {
  horizontal: true,
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 4,
  paddingBottom: 12,
  children: [/*#__PURE__*/_jsx(StyledPressable, {
    onPress: onPrev,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    children: /*#__PURE__*/_jsx(Icon, {
      name: "chevron-left",
      size: 16,
      color: C.headerText
    })
  }), /*#__PURE__*/_jsx(StyledPressable, {
    onPress: onTapTitle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    children: /*#__PURE__*/_jsxs(StyledText, {
      fontSize: 16,
      fontWeight: theme.fontWeight.bold,
      color: C.headerText,
      children: [MONTH_FULL[date.getMonth()], " ", date.getFullYear()]
    })
  }), /*#__PURE__*/_jsx(StyledPressable, {
    onPress: onNext,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    children: /*#__PURE__*/_jsx(Icon, {
      name: "chevron-right",
      size: 16,
      color: C.headerText
    })
  })]
});

// ─── CalendarGrid ─────────────────────────────────────────────────────────────

const CalendarGrid = ({
  viewMonth,
  selected,
  rangeStart,
  rangeEnd,
  isRange,
  minDate,
  maxDate,
  size,
  C,
  onSelect
}) => {
  const cellSize = CELL[size];
  const fontSize = FONT[size];
  const today = new Date();
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const totalCells = Math.ceil((firstDow + total) / 7) * 7;
  const cells = Array.from({
    length: totalCells
  }, (_, i) => {
    const d = i - firstDow + 1;
    return d < 1 || d > total ? null : new Date(year, month, d);
  });
  const isDisabled = d => {
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };
  const isSel = d => isRange ? !!rangeStart && sameDay(d, rangeStart) || !!rangeEnd && sameDay(d, rangeEnd) : !!selected && sameDay(d, selected);
  const inRange = d => isRange && !!rangeStart && !!rangeEnd && d > rangeStart && d < rangeEnd;
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return /*#__PURE__*/_jsxs(Stack, {
    children: [/*#__PURE__*/_jsx(Stack, {
      horizontal: true,
      marginBottom: 4,
      children: DAY_INITIALS.map((n, i) => /*#__PURE__*/_jsx(Stack, {
        flex: 1,
        alignItems: "center",
        paddingVertical: 4,
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: 12,
          fontWeight: theme.fontWeight.semiBold,
          color: theme.colors.gray[400],
          children: n
        })
      }, i))
    }), rows.map((row, ri) => /*#__PURE__*/_jsx(Stack, {
      horizontal: true,
      marginBottom: 2,
      children: row.map((date, ci) => {
        if (!date) return /*#__PURE__*/_jsx(Stack, {
          flex: 1,
          height: cellSize
        }, ci);
        const sel = isSel(date);
        const rng = inRange(date);
        const dis = isDisabled(date);
        const tod = sameDay(date, today);
        const isStart = isRange && !!rangeStart && sameDay(date, rangeStart);
        const isEnd = isRange && !!rangeEnd && sameDay(date, rangeEnd);
        const hasRange = !!rangeStart && !!rangeEnd;
        return /*#__PURE__*/_jsxs(StyledPressable, {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          onPress: () => !dis && onSelect(date),
          disabled: dis,
          children: [rng && /*#__PURE__*/_jsx(Stack, {
            position: "absolute",
            left: 0,
            right: 0,
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), isStart && hasRange && /*#__PURE__*/_jsx(Stack, {
            position: "absolute",
            left: "50%",
            right: 0,
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), isEnd && hasRange && !sameDay(rangeStart, date) && /*#__PURE__*/_jsx(Stack, {
            position: "absolute",
            left: 0,
            right: "50%",
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), /*#__PURE__*/_jsx(Stack, {
            width: cellSize,
            height: cellSize,
            borderRadius: cellSize / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: sel ? C.selected : 'transparent',
            borderWidth: tod && !sel ? 1.5 : 0,
            borderColor: C.today,
            children: /*#__PURE__*/_jsx(StyledText, {
              fontSize: fontSize,
              fontWeight: sel ? theme.fontWeight.bold : theme.fontWeight.normal,
              color: dis ? C.disabledText : sel ? C.selectedText : tod ? C.today : C.dayText,
              children: date.getDate()
            })
          })]
        }, ci);
      })
    }, ri))]
  });
};

// ─── MonthPicker ──────────────────────────────────────────────────────────────

// Year range for the drum: 100 years back → 50 years forward
const THIS_YEAR = new Date().getFullYear();
const YEAR_START = THIS_YEAR - 100;
const YEAR_END = THIS_YEAR + 50;
const YEARS = Array.from({
  length: YEAR_END - YEAR_START + 1
}, (_, i) => String(YEAR_START + i));

/**
 * MonthPicker — month grid (left) + year scroll drum (right).
 * Lets the user jump to any year instantly without tapping arrows.
 *
 * Layout:
 *  ┌──────────────────┬──────────┐
 *  │ Jan  Feb  Mar    │   2023   │
 *  │ Apr  May  Jun    │   2024   │
 *  │ Jul  Aug  Sep  ← │ ► 2025 ◄ │ ← selected
 *  │ Oct  Nov  Dec    │   2026   │
 *  │                  │   2027   │
 *  └──────────────────┴──────────┘
 */
const MonthPicker = ({
  viewYear,
  selected,
  onSelect,
  onYearChange,
  C
}) => {
  const yearScrollRef = useRef(null);
  const yearIdx = viewYear - YEAR_START;
  const padding = 2; // visible rows above/below selected

  // Scroll year drum to selected year on mount and when viewYear changes
  useEffect(() => {
    yearScrollRef.current?.scrollTo({
      y: yearIdx * DRUM_ITEM_H,
      animated: false
    });
  }, [viewYear]);
  const onYearMomentumEnd = e => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / DRUM_ITEM_H);
    const clamped = Math.max(0, Math.min(YEARS.length - 1, idx));
    const year = YEAR_START + clamped;
    onYearChange(year);
    yearScrollRef.current?.scrollTo({
      y: clamped * DRUM_ITEM_H,
      animated: true
    });
  };
  return /*#__PURE__*/_jsxs(Stack, {
    horizontal: true,
    gap: 8,
    children: [/*#__PURE__*/_jsx(Stack, {
      flex: 1,
      children: /*#__PURE__*/_jsx(Stack, {
        horizontal: true,
        flexWrap: "wrap",
        children: MONTH_SHORT.map((name, i) => {
          const sel = !!selected && selected.getMonth() === i && selected.getFullYear() === viewYear;
          return /*#__PURE__*/_jsx(StyledPressable, {
            width: "33.33%",
            alignItems: "center",
            paddingVertical: 10,
            onPress: () => onSelect(i, viewYear),
            children: /*#__PURE__*/_jsx(Stack, {
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 18,
              backgroundColor: sel ? C.selected : 'transparent',
              children: /*#__PURE__*/_jsx(StyledText, {
                fontSize: 14,
                fontWeight: sel ? theme.fontWeight.semiBold : theme.fontWeight.normal,
                color: sel ? C.selectedText : C.dayText,
                children: name
              })
            })
          }, i);
        })
      })
    }), /*#__PURE__*/_jsxs(Stack, {
      width: 80,
      alignItems: "center",
      children: [/*#__PURE__*/_jsx(StyledText, {
        fontSize: 11,
        fontWeight: theme.fontWeight.semiBold,
        color: theme.colors.gray[400],
        marginBottom: 4,
        children: "Year"
      }), /*#__PURE__*/_jsxs(Stack, {
        width: 80,
        height: DRUM_ITEM_H * 5,
        overflow: "hidden",
        children: [/*#__PURE__*/_jsx(Stack, {
          position: "absolute",
          top: padding * DRUM_ITEM_H,
          left: 4,
          right: 4,
          height: DRUM_ITEM_H,
          borderRadius: 10,
          backgroundColor: theme.colors.gray[100]
        }), /*#__PURE__*/_jsx(ScrollView, {
          ref: yearScrollRef,
          showsVerticalScrollIndicator: false,
          snapToInterval: DRUM_ITEM_H,
          decelerationRate: "fast",
          onMomentumScrollEnd: onYearMomentumEnd,
          contentContainerStyle: {
            paddingTop: padding * DRUM_ITEM_H,
            paddingBottom: padding * DRUM_ITEM_H
          },
          children: YEARS.map((yr, i) => {
            const isActive = YEAR_START + i === viewYear;
            return /*#__PURE__*/_jsx(StyledPressable, {
              height: DRUM_ITEM_H,
              alignItems: "center",
              justifyContent: "center",
              onPress: () => {
                onYearChange(YEAR_START + i);
                yearScrollRef.current?.scrollTo({
                  y: i * DRUM_ITEM_H,
                  animated: true
                });
              },
              children: /*#__PURE__*/_jsx(StyledText, {
                fontSize: 16,
                fontWeight: isActive ? theme.fontWeight.bold : theme.fontWeight.normal,
                color: isActive ? C.headerText : theme.colors.gray[400],
                children: yr
              })
            }, yr);
          })
        })]
      })]
    })]
  });
};

// ─── TimePicker (scroll drum) ─────────────────────────────────────────────────
// ScrollView is kept here — there is no fluent-styles snap-scroll equivalent

const DRUM_ITEM_H = 44;
const DRUM_VISIBLE = 5;
const DRUM_H = DRUM_ITEM_H * DRUM_VISIBLE;
const DrumColumn = ({
  items,
  selected,
  onSelect,
  C
}) => {
  const scrollRef = useRef(null);
  const padding = Math.floor(DRUM_VISIBLE / 2);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: selected * DRUM_ITEM_H,
      animated: false
    });
  }, []);
  const onMomentumEnd = e => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / DRUM_ITEM_H);
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    onSelect(clamped);
    scrollRef.current?.scrollTo({
      y: clamped * DRUM_ITEM_H,
      animated: true
    });
  };
  return /*#__PURE__*/_jsxs(Stack, {
    width: 72,
    height: DRUM_H,
    overflow: "hidden",
    children: [/*#__PURE__*/_jsx(Stack, {
      position: "absolute",
      top: padding * DRUM_ITEM_H,
      left: 4,
      right: 4,
      height: DRUM_ITEM_H,
      borderRadius: 10,
      backgroundColor: theme.colors.gray[100]
    }), /*#__PURE__*/_jsx(ScrollView, {
      ref: scrollRef,
      showsVerticalScrollIndicator: false,
      snapToInterval: DRUM_ITEM_H,
      decelerationRate: "fast",
      onMomentumScrollEnd: onMomentumEnd,
      contentContainerStyle: {
        paddingTop: padding * DRUM_ITEM_H,
        paddingBottom: padding * DRUM_ITEM_H
      },
      children: items.map((item, i) => /*#__PURE__*/_jsx(StyledPressable, {
        height: DRUM_ITEM_H,
        alignItems: "center",
        justifyContent: "center",
        onPress: () => {
          onSelect(i);
          scrollRef.current?.scrollTo({
            y: i * DRUM_ITEM_H,
            animated: true
          });
        },
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: 20,
          fontWeight: i === selected ? theme.fontWeight.bold : theme.fontWeight.normal,
          color: i === selected ? C.headerText : theme.colors.gray[400],
          children: item
        })
      }, i))
    })]
  });
};
const HOURS = Array.from({
  length: 12
}, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({
  length: 60
}, (_, i) => String(i).padStart(2, '0'));
const AMPM = ['AM', 'PM'];
const TimePicker = ({
  value,
  onChange,
  C
}) => {
  const now = value ?? new Date();
  const h24 = now.getHours();
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const [selHour, setSelHour] = useState(h12 - 1);
  const [selMin, setSelMin] = useState(now.getMinutes());
  const [selAmpm, setSelAmpm] = useState(h24 >= 12 ? 1 : 0);
  const emit = (h, m, ap) => onChange(h + 1, m, ap === 0 ? 'AM' : 'PM');
  return /*#__PURE__*/_jsx(Stack, {
    alignItems: "center",
    children: /*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 4,
      children: [/*#__PURE__*/_jsx(DrumColumn, {
        items: HOURS,
        selected: selHour,
        C: C,
        onSelect: i => {
          setSelHour(i);
          emit(i, selMin, selAmpm);
        }
      }), /*#__PURE__*/_jsx(StyledText, {
        fontSize: 24,
        fontWeight: theme.fontWeight.bold,
        color: C.headerText,
        children: ":"
      }), /*#__PURE__*/_jsx(DrumColumn, {
        items: MINUTES,
        selected: selMin,
        C: C,
        onSelect: i => {
          setSelMin(i);
          emit(selHour, i, selAmpm);
        }
      }), /*#__PURE__*/_jsx(DrumColumn, {
        items: AMPM,
        selected: selAmpm,
        C: C,
        onSelect: i => {
          setSelAmpm(i);
          emit(selHour, selMin, i);
        }
      })]
    })
  });
};

// ─── PickerBody ───────────────────────────────────────────────────────────────

const PickerBody = ({
  mode,
  size,
  value,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
  showTodayBtn,
  showConfirm,
  confirmLabel,
  C,
  onChange,
  onRangeChange,
  onConfirm
}) => {
  const [viewMonth, setViewMonth] = useState(value ?? rangeStart ?? new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [viewYear, setViewYear] = useState(viewMonth.getFullYear());
  const isRange = mode === 'range';
  const showCalendar = mode === 'date' || mode === 'range' || mode === 'datetime';
  const handleDaySelect = useCallback(date => {
    if (!isRange) {
      onChange(date);
      return;
    }
    if (!rangeStart || rangeStart && rangeEnd) {
      onRangeChange(date, null);
    } else if (date < rangeStart) {
      onRangeChange(date, rangeStart);
    } else {
      onRangeChange(rangeStart, date);
    }
  }, [isRange, rangeStart, rangeEnd, onChange, onRangeChange]);
  const handleTimeChange = useCallback((h, m, ap) => {
    const base = value ?? new Date();
    const h24 = ap === 'AM' ? h === 12 ? 0 : h : h === 12 ? 12 : h + 12;
    onChange(new Date(base.getFullYear(), base.getMonth(), base.getDate(), h24, m));
  }, [value, onChange]);
  return /*#__PURE__*/_jsxs(Stack, {
    backgroundColor: C.background,
    borderRadius: 16,
    padding: 16,
    children: [showCalendar && !showMonthPicker && /*#__PURE__*/_jsx(MonthYearHeader, {
      date: viewMonth,
      onPrev: () => setViewMonth(addMonths(viewMonth, -1)),
      onNext: () => setViewMonth(addMonths(viewMonth, 1)),
      onTapTitle: () => {
        setViewYear(viewMonth.getFullYear());
        setShowMonthPicker(true);
      },
      C: C
    }), showMonthPicker ? /*#__PURE__*/_jsx(MonthPicker, {
      viewYear: viewYear,
      selected: value,
      onSelect: (m, y) => {
        // Preserve current selected day; clamp if new month has fewer days
        const currentDay = value ? value.getDate() : 1;
        const maxDay = new Date(y, m + 1, 0).getDate(); // last day of target month
        const safeDay = Math.min(currentDay, maxDay);
        const newDate = value ? new Date(y, m, safeDay, value.getHours(), value.getMinutes()) : new Date(y, m, safeDay);
        onChange(newDate);
        setViewMonth(new Date(y, m, 1));
        setShowMonthPicker(false);
      },
      onYearChange: setViewYear,
      C: C
    }) : /*#__PURE__*/_jsxs(Stack, {
      children: [showCalendar && /*#__PURE__*/_jsx(CalendarGrid, {
        viewMonth: viewMonth,
        selected: isRange ? null : value,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        isRange: isRange,
        minDate: minDate,
        maxDate: maxDate,
        size: size,
        C: C,
        onSelect: handleDaySelect
      }), mode === 'month' && /*#__PURE__*/_jsx(MonthPicker, {
        viewYear: viewYear,
        selected: value,
        onSelect: (m, y) => {
          const currentDay = value ? value.getDate() : 1;
          const maxDay = new Date(y, m + 1, 0).getDate();
          const safeDay = Math.min(currentDay, maxDay);
          onChange(new Date(y, m, safeDay));
          setViewMonth(new Date(y, m, 1));
          setViewYear(y);
        },
        onYearChange: setViewYear,
        C: C
      }), (mode === 'time' || mode === 'datetime') && /*#__PURE__*/_jsxs(Stack, {
        children: [mode === 'datetime' && /*#__PURE__*/_jsx(StyledDivider, {
          borderBottomColor: theme.colors.gray[100],
          marginVertical: 16
        }), /*#__PURE__*/_jsx(TimePicker, {
          value: value,
          onChange: handleTimeChange,
          C: C
        })]
      })]
    }), showTodayBtn && showCalendar && /*#__PURE__*/_jsx(StyledPressable, {
      alignItems: "center",
      paddingVertical: 10,
      onPress: () => {
        const t = new Date();
        setViewMonth(t);
        if (!isRange) onChange(t);
      },
      children: /*#__PURE__*/_jsx(StyledText, {
        fontSize: 14,
        fontWeight: theme.fontWeight.semiBold,
        color: C.today,
        style: {
          textDecorationLine: 'underline'
        },
        children: "Today"
      })
    }), showConfirm && onConfirm && /*#__PURE__*/_jsxs(Stack, {
      children: [/*#__PURE__*/_jsx(StyledSpacer, {
        height: 8
      }), /*#__PURE__*/_jsx(StyledPressable, {
        onPress: onConfirm,
        backgroundColor: C.confirmBg,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: 15,
          fontWeight: theme.fontWeight.bold,
          color: C.confirmText,
          children: confirmLabel
        })
      })]
    })]
  });
};

// ─── Sheet (bottom modal) ─────────────────────────────────────────────────────
// Modal is kept — no fluent-styles equivalent for a full-screen overlay

const Sheet = ({
  visible,
  onClose,
  children
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {
    height: SH
  } = Dimensions.get('window');
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 280,
      useNativeDriver: true
    }).start();
  }, [visible]);
  if (!visible) return null;
  return /*#__PURE__*/_jsxs(Modal, {
    transparent: true,
    animationType: "none",
    visible: visible,
    onRequestClose: onClose,
    children: [/*#__PURE__*/_jsx(StyledPressable, {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      onPress: onClose
    }), /*#__PURE__*/_jsxs(Animated.View, {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: palettes.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [SH * 0.6, 0]
          })
        }]
      },
      children: [/*#__PURE__*/_jsx(Stack, {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.colors.gray[200],
        alignSelf: "center",
        marginTop: 12,
        marginBottom: 4
      }), children]
    })]
  });
};

// ─── InputTrigger ─────────────────────────────────────────────────────────────

const InputTrigger = ({
  label,
  displayText,
  placeholder,
  isOpen,
  disabled,
  onPress,
  C
}) => /*#__PURE__*/_jsxs(Stack, {
  opacity: disabled ? 0.5 : 1,
  children: [!!label && /*#__PURE__*/_jsx(StyledText, {
    fontSize: 13,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.gray[600],
    marginBottom: 6,
    children: label
  }), /*#__PURE__*/_jsxs(StyledPressable, {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: isOpen ? C.selected : C.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: palettes.white,
    onPress: onPress,
    disabled: disabled,
    children: [/*#__PURE__*/_jsx(StyledText, {
      flex: 1,
      fontSize: 15,
      color: displayText ? C.dayText : theme.colors.gray[400],
      children: displayText || placeholder
    }), /*#__PURE__*/_jsx(Icon, {
      name: "calendar",
      size: 18,
      color: isOpen ? C.selected : theme.colors.gray[400]
    })]
  })]
});

// ─── StyledDatePicker ─────────────────────────────────────────────────────────

/**
 * StyledDatePicker — pure-JS date/time picker built on fluent-styles.
 *
 * @example Inline date
 * ```tsx
 * <StyledDatePicker value={date} onChange={setDate} />
 * ```
 *
 * @example Input → bottom sheet
 * ```tsx
 * <StyledDatePicker
 *   variant="input"
 *   label="Check-in date"
 *   placeholder="Select date"
 *   value={date}
 *   onChange={setDate}
 *   onConfirm={setDate}
 * />
 * ```
 *
 * @example Date range
 * ```tsx
 * <StyledDatePicker
 *   mode="range"
 *   valueStart={start}
 *   valueEnd={end}
 *   onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
 *   colors={{ selected: '#6366f1', rangeFill: '#eef2ff' }}
 * />
 * ```
 *
 * @example Time picker
 * ```tsx
 * <StyledDatePicker mode="time" value={time} onChange={setTime} />
 * ```
 *
 * @example Month picker
 * ```tsx
 * <StyledDatePicker mode="month" value={month} onChange={setMonth} />
 * ```
 */
export const StyledDatePicker = ({
  mode = 'date',
  variant = 'inline',
  size = 'md',
  value = null,
  valueStart = null,
  valueEnd = null,
  minDate,
  maxDate,
  showTodayButton = true,
  showConfirm = true,
  confirmLabel = 'Done',
  placeholder = 'Select date',
  label,
  formatDisplay,
  colors: colorsProp,
  onChange,
  onRangeChange,
  onConfirm,
  disabled = false
}) => {
  const C = buildColors(colorsProp);
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [localStart, setLocalStart] = useState(valueStart);
  const [localEnd, setLocalEnd] = useState(valueEnd);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  useEffect(() => {
    setLocalStart(valueStart);
  }, [valueStart]);
  useEffect(() => {
    setLocalEnd(valueEnd);
  }, [valueEnd]);
  const handleChange = useCallback(date => {
    setLocalValue(date);
    onChange?.(date);
  }, [onChange]);
  const handleRangeChange = useCallback((s, e) => {
    setLocalStart(s);
    setLocalEnd(e);
    onRangeChange?.(s, e);
  }, [onRangeChange]);
  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    onConfirm?.(localValue);
  }, [localValue, onConfirm]);
  const getFormat = () => {
    if (formatDisplay) return formatDisplay;
    if (mode === 'time') return FMT_TIME;
    if (mode === 'datetime') return FMT_DATETIME;
    if (mode === 'month') return FMT_MONTH;
    return FMT_DATE;
  };
  const displayText = mode === 'range' ? [localStart, localEnd].filter(Boolean).map(d => FMT_DATE(d)).join(' – ') : localValue ? getFormat()(localValue) : '';
  const bodyProps = {
    mode,
    size,
    value: localValue,
    rangeStart: localStart,
    rangeEnd: localEnd,
    minDate,
    maxDate,
    showTodayBtn: showTodayButton,
    confirmLabel,
    C,
    onChange: handleChange,
    onRangeChange: handleRangeChange
  };
  if (variant === 'inline') {
    return /*#__PURE__*/_jsx(Stack, {
      opacity: disabled ? 0.5 : 1,
      children: /*#__PURE__*/_jsx(PickerBody, {
        ...bodyProps,
        showConfirm: false
      })
    });
  }
  return /*#__PURE__*/_jsxs(Stack, {
    opacity: disabled ? 0.5 : 1,
    children: [/*#__PURE__*/_jsx(InputTrigger, {
      label: label,
      displayText: displayText,
      placeholder: placeholder,
      isOpen: isOpen,
      disabled: disabled,
      onPress: () => setIsOpen(true),
      C: C
    }), /*#__PURE__*/_jsx(Sheet, {
      visible: isOpen,
      onClose: () => setIsOpen(false),
      children: /*#__PURE__*/_jsx(Stack, {
        paddingHorizontal: 16,
        paddingBottom: 8,
        children: /*#__PURE__*/_jsx(PickerBody, {
          ...bodyProps,
          showConfirm: showConfirm,
          onConfirm: handleConfirm
        })
      })
    })]
  });
};
export default StyledDatePicker;
//# sourceMappingURL=index.js.map