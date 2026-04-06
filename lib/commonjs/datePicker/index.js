"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledDatePicker = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Feather = _interopRequireDefault(require("react-native-vector-icons/Feather"));
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledDatePicker.tsx
 * ─────────────────────
 * Production-ready date picker for fluent-styles apps.
 * Pure JS — no native deps. Built exclusively on fluent-styles primitives.
 *
 * Modes:    date | time | datetime | range | month
 * Variants: inline | sheet | input
 */

// ─── Types ────────────────────────────────────────────────────────────────────

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
  const sel = o?.selected ?? _fluentStyles.theme.colors.gray[900];
  return {
    selected: sel,
    selectedText: o?.selectedText ?? '#ffffff',
    today: o?.today ?? '#3b82f6',
    rangeFill: o?.rangeFill ?? `${sel}18`,
    dayText: o?.dayText ?? _fluentStyles.theme.colors.gray[800],
    disabledText: o?.disabledText ?? _fluentStyles.theme.colors.gray[300],
    headerText: o?.headerText ?? _fluentStyles.theme.colors.gray[900],
    background: o?.background ?? _fluentStyles.palettes.white,
    inputBorder: o?.inputBorder ?? _fluentStyles.theme.colors.gray[200],
    confirmBg: o?.confirmBg ?? _fluentStyles.theme.colors.gray[900],
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  horizontal: true,
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 4,
  paddingBottom: 12,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
    onPress: onPrev,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: _fluentStyles.theme.colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Feather.default, {
      name: "chevron-left",
      size: 16,
      color: C.headerText
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
    onPress: onTapTitle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledText, {
      fontSize: 16,
      fontWeight: _fluentStyles.theme.fontWeight.bold,
      color: C.headerText,
      children: [MONTH_FULL[date.getMonth()], " ", date.getFullYear()]
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
    onPress: onNext,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: _fluentStyles.theme.colors.gray[100],
    alignItems: "center",
    justifyContent: "center",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Feather.default, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      horizontal: true,
      marginBottom: 4,
      children: DAY_INITIALS.map((n, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        flex: 1,
        alignItems: "center",
        paddingVertical: 4,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: 12,
          fontWeight: _fluentStyles.theme.fontWeight.semiBold,
          color: _fluentStyles.theme.colors.gray[400],
          children: n
        })
      }, i))
    }), rows.map((row, ri) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      horizontal: true,
      marginBottom: 2,
      children: row.map((date, ci) => {
        if (!date) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
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
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          onPress: () => !dis && onSelect(date),
          disabled: dis,
          children: [rng && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            position: "absolute",
            left: 0,
            right: 0,
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), isStart && hasRange && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            position: "absolute",
            left: "50%",
            right: 0,
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), isEnd && hasRange && !sameDay(rangeStart, date) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            position: "absolute",
            left: 0,
            right: "50%",
            top: 4,
            bottom: 4,
            backgroundColor: C.rangeFill
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            width: cellSize,
            height: cellSize,
            borderRadius: cellSize / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: sel ? C.selected : 'transparent',
            borderWidth: tod && !sel ? 1.5 : 0,
            borderColor: C.today,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: fontSize,
              fontWeight: sel ? _fluentStyles.theme.fontWeight.bold : _fluentStyles.theme.fontWeight.normal,
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
  const yearScrollRef = (0, _react.useRef)(null);
  const yearIdx = viewYear - YEAR_START;
  const padding = 2; // visible rows above/below selected

  // Scroll year drum to selected year on mount and when viewYear changes
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    horizontal: true,
    gap: 8,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      flex: 1,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        horizontal: true,
        flexWrap: "wrap",
        children: MONTH_SHORT.map((name, i) => {
          const sel = !!selected && selected.getMonth() === i && selected.getFullYear() === viewYear;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
            width: "33.33%",
            alignItems: "center",
            paddingVertical: 10,
            onPress: () => onSelect(i, viewYear),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 18,
              backgroundColor: sel ? C.selected : 'transparent',
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                fontSize: 14,
                fontWeight: sel ? _fluentStyles.theme.fontWeight.semiBold : _fluentStyles.theme.fontWeight.normal,
                color: sel ? C.selectedText : C.dayText,
                children: name
              })
            })
          }, i);
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      width: 80,
      alignItems: "center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: 11,
        fontWeight: _fluentStyles.theme.fontWeight.semiBold,
        color: _fluentStyles.theme.colors.gray[400],
        marginBottom: 4,
        children: "Year"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        width: 80,
        height: DRUM_ITEM_H * 5,
        overflow: "hidden",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          position: "absolute",
          top: padding * DRUM_ITEM_H,
          left: 4,
          right: 4,
          height: DRUM_ITEM_H,
          borderRadius: 10,
          backgroundColor: _fluentStyles.theme.colors.gray[100]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
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
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
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
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                fontSize: 16,
                fontWeight: isActive ? _fluentStyles.theme.fontWeight.bold : _fluentStyles.theme.fontWeight.normal,
                color: isActive ? C.headerText : _fluentStyles.theme.colors.gray[400],
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
  const scrollRef = (0, _react.useRef)(null);
  const padding = Math.floor(DRUM_VISIBLE / 2);
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    width: 72,
    height: DRUM_H,
    overflow: "hidden",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      position: "absolute",
      top: padding * DRUM_ITEM_H,
      left: 4,
      right: 4,
      height: DRUM_ITEM_H,
      borderRadius: 10,
      backgroundColor: _fluentStyles.theme.colors.gray[100]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      ref: scrollRef,
      showsVerticalScrollIndicator: false,
      snapToInterval: DRUM_ITEM_H,
      decelerationRate: "fast",
      onMomentumScrollEnd: onMomentumEnd,
      contentContainerStyle: {
        paddingTop: padding * DRUM_ITEM_H,
        paddingBottom: padding * DRUM_ITEM_H
      },
      children: items.map((item, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
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
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: 20,
          fontWeight: i === selected ? _fluentStyles.theme.fontWeight.bold : _fluentStyles.theme.fontWeight.normal,
          color: i === selected ? C.headerText : _fluentStyles.theme.colors.gray[400],
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
  const [selHour, setSelHour] = (0, _react.useState)(h12 - 1);
  const [selMin, setSelMin] = (0, _react.useState)(now.getMinutes());
  const [selAmpm, setSelAmpm] = (0, _react.useState)(h24 >= 12 ? 1 : 0);
  const emit = (h, m, ap) => onChange(h + 1, m, ap === 0 ? 'AM' : 'PM');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    alignItems: "center",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 4,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DrumColumn, {
        items: HOURS,
        selected: selHour,
        C: C,
        onSelect: i => {
          setSelHour(i);
          emit(i, selMin, selAmpm);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: 24,
        fontWeight: _fluentStyles.theme.fontWeight.bold,
        color: C.headerText,
        children: ":"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(DrumColumn, {
        items: MINUTES,
        selected: selMin,
        C: C,
        onSelect: i => {
          setSelMin(i);
          emit(selHour, i, selAmpm);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(DrumColumn, {
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
  const [viewMonth, setViewMonth] = (0, _react.useState)(value ?? rangeStart ?? new Date());
  const [showMonthPicker, setShowMonthPicker] = (0, _react.useState)(false);
  const [viewYear, setViewYear] = (0, _react.useState)(viewMonth.getFullYear());
  const isRange = mode === 'range';
  const showCalendar = mode === 'date' || mode === 'range' || mode === 'datetime';
  const handleDaySelect = (0, _react.useCallback)(date => {
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
  const handleTimeChange = (0, _react.useCallback)((h, m, ap) => {
    const base = value ?? new Date();
    const h24 = ap === 'AM' ? h === 12 ? 0 : h : h === 12 ? 12 : h + 12;
    onChange(new Date(base.getFullYear(), base.getMonth(), base.getDate(), h24, m));
  }, [value, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    backgroundColor: C.background,
    borderRadius: 16,
    padding: 16,
    children: [showCalendar && !showMonthPicker && /*#__PURE__*/(0, _jsxRuntime.jsx)(MonthYearHeader, {
      date: viewMonth,
      onPrev: () => setViewMonth(addMonths(viewMonth, -1)),
      onNext: () => setViewMonth(addMonths(viewMonth, 1)),
      onTapTitle: () => {
        setViewYear(viewMonth.getFullYear());
        setShowMonthPicker(true);
      },
      C: C
    }), showMonthPicker ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MonthPicker, {
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
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      children: [showCalendar && /*#__PURE__*/(0, _jsxRuntime.jsx)(CalendarGrid, {
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
      }), mode === 'month' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MonthPicker, {
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
      }), (mode === 'time' || mode === 'datetime') && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        children: [mode === 'datetime' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledDivider, {
          borderBottomColor: _fluentStyles.theme.colors.gray[100],
          marginVertical: 16
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TimePicker, {
          value: value,
          onChange: handleTimeChange,
          C: C
        })]
      })]
    }), showTodayBtn && showCalendar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
      alignItems: "center",
      paddingVertical: 10,
      onPress: () => {
        const t = new Date();
        setViewMonth(t);
        if (!isRange) onChange(t);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: 14,
        fontWeight: _fluentStyles.theme.fontWeight.semiBold,
        color: C.today,
        style: {
          textDecorationLine: 'underline'
        },
        children: "Today"
      })
    }), showConfirm && onConfirm && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledSpacer, {
        height: 8
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
        onPress: onConfirm,
        backgroundColor: C.confirmBg,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: 15,
          fontWeight: _fluentStyles.theme.fontWeight.bold,
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
  const slideAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const {
    height: SH
  } = _reactNative.Dimensions.get('window');
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 280,
      useNativeDriver: true
    }).start();
  }, [visible]);
  if (!visible) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Modal, {
    transparent: true,
    animationType: "none",
    visible: visible,
    onRequestClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      onPress: onClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: _fluentStyles.palettes.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: _reactNative.Platform.OS === 'ios' ? 34 : 16,
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [SH * 0.6, 0]
          })
        }]
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: _fluentStyles.theme.colors.gray[200],
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  opacity: disabled ? 0.5 : 1,
  children: [!!label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    fontSize: 13,
    fontWeight: _fluentStyles.theme.fontWeight.semiBold,
    color: _fluentStyles.theme.colors.gray[600],
    marginBottom: 6,
    children: label
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: isOpen ? C.selected : C.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: _fluentStyles.palettes.white,
    onPress: onPress,
    disabled: disabled,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
      flex: 1,
      fontSize: 15,
      color: displayText ? C.dayText : _fluentStyles.theme.colors.gray[400],
      children: displayText || placeholder
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Feather.default, {
      name: "calendar",
      size: 18,
      color: isOpen ? C.selected : _fluentStyles.theme.colors.gray[400]
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
const StyledDatePicker = ({
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
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const [localValue, setLocalValue] = (0, _react.useState)(value);
  const [localStart, setLocalStart] = (0, _react.useState)(valueStart);
  const [localEnd, setLocalEnd] = (0, _react.useState)(valueEnd);
  (0, _react.useEffect)(() => {
    setLocalValue(value);
  }, [value]);
  (0, _react.useEffect)(() => {
    setLocalStart(valueStart);
  }, [valueStart]);
  (0, _react.useEffect)(() => {
    setLocalEnd(valueEnd);
  }, [valueEnd]);
  const handleChange = (0, _react.useCallback)(date => {
    setLocalValue(date);
    onChange?.(date);
  }, [onChange]);
  const handleRangeChange = (0, _react.useCallback)((s, e) => {
    setLocalStart(s);
    setLocalEnd(e);
    onRangeChange?.(s, e);
  }, [onRangeChange]);
  const handleConfirm = (0, _react.useCallback)(() => {
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      opacity: disabled ? 0.5 : 1,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickerBody, {
        ...bodyProps,
        showConfirm: false
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    opacity: disabled ? 0.5 : 1,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(InputTrigger, {
      label: label,
      displayText: displayText,
      placeholder: placeholder,
      isOpen: isOpen,
      disabled: disabled,
      onPress: () => setIsOpen(true),
      C: C
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Sheet, {
      visible: isOpen,
      onClose: () => setIsOpen(false),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        paddingHorizontal: 16,
        paddingBottom: 8,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickerBody, {
          ...bodyProps,
          showConfirm: showConfirm,
          onConfirm: handleConfirm
        })
      })
    })]
  });
};
exports.StyledDatePicker = StyledDatePicker;
var _default = exports.default = StyledDatePicker;
//# sourceMappingURL=index.js.map