"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Default colours (uses theme + palettes tokens) ───────────────────────────

const buildDefaults = () => ({
  inactiveBar: _fluentStyles.theme.colors.gray[200],
  hatchLine: 'rgba(0,0,0,0.07)',
  activeTop: '#d4f53c',
  activeBottom: '#a8c820',
  tooltipBg: _fluentStyles.theme.colors.gray[900],
  tooltipText: _fluentStyles.palettes.white,
  activeLabelColor: _fluentStyles.theme.colors.gray[900],
  inactiveLabelColor: _fluentStyles.theme.colors.gray[400]
});

// ─── Internal: hatched bar ────────────────────────────────────────────────────

const HatchedBar = ({
  id,
  x,
  y,
  w,
  h,
  rx,
  fill,
  hatchColor,
  hatchSpacing,
  showHatch
}) => {
  const lines = [];
  if (showHatch) {
    for (let off = -h; off < w + h; off += hatchSpacing) {
      lines.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Line, {
        x1: x + off,
        y1: y,
        x2: x + off + h,
        y2: y + h,
        stroke: hatchColor,
        strokeWidth: "5"
      }, off));
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.ClipPath, {
        id: id,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
          x: x,
          y: y,
          width: w,
          height: h,
          rx: rx
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
      x: x,
      y: y,
      width: w,
      height: h,
      rx: rx,
      fill: fill
    }), showHatch && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.G, {
      clipPath: `url(#${id})`,
      children: lines
    })]
  });
};

// ─── Internal: tooltip ────────────────────────────────────────────────────────

const Tooltip = ({
  cx,
  barTop,
  label,
  bgColor,
  textColor
}) => {
  const HEIGHT = 32;
  const boxW = Math.max(label.length * 8 + 28, 60);
  const boxX = cx - boxW / 2;
  const boxY = barTop - HEIGHT - 14;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
      x: boxX,
      y: boxY,
      width: boxW,
      height: HEIGHT,
      rx: HEIGHT / 2,
      fill: bgColor
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: `M ${cx - 7} ${boxY + HEIGHT} L ${cx + 7} ${boxY + HEIGHT} L ${cx} ${boxY + HEIGHT + 9}`,
      fill: bgColor
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Text, {
      x: cx,
      y: boxY + HEIGHT / 2 + 5,
      textAnchor: "middle",
      fontSize: _fluentStyles.theme.fontSize.small,
      fontWeight: _fluentStyles.theme.fontWeight.bold,
      fill: textColor,
      fontFamily: "System",
      children: label
    })]
  });
};

// ─── StyledBar ────────────────────────────────────────────────────────────────

/**
 * StyledBar — production-ready animated bar chart for fluent-styles apps.
 *
 * @example Basic (workout, lime theme)
 * ```tsx
 * <StyledBar
 *   data={[
 *     { label: 'Mon', value: 45 },
 *     { label: 'Tue', value: 70, active: true },
 *     { label: 'Wed', value: 55 },
 *   ]}
 *   unit="min"
 * />
 * ```
 *
 * @example Inside a StyledCard with padding={20}, screen padding=20
 * ```tsx
 * // containerPaddingHorizontal = (screenPad + cardPad) * 2 = (20+20)*2 = 80
 * <StyledCard padding={20}>
 *   <StyledBar data={data} unit="kg" containerPaddingHorizontal={80} />
 * </StyledCard>
 * ```
 *
 * @example Blue water theme
 * ```tsx
 * <StyledBar
 *   data={waterData}
 *   unit="mL"
 *   maxValue={3000}
 *   colors={{
 *     activeTop: palettes.blue[400],
 *     activeBottom: palettes.blue[600],
 *     tooltipBg: palettes.blue[900],
 *     inactiveBar: palettes.blue[100],
 *   }}
 * />
 * ```
 */
const StyledBar = ({
  data,
  maxValue: maxValueProp,
  width: widthProp,
  containerPaddingHorizontal = 80,
  height = 180,
  barWidthRatio = 0.62,
  labelHeight = 28,
  showHatch = true,
  hatchSpacing = 8,
  tooltipLabel,
  unit = '',
  colors: colorsProp,
  animated = true,
  animationDuration = 600
}) => {
  const C = {
    ...buildDefaults(),
    ...colorsProp
  };

  // ── Width: respect container padding ──────────────────────────────────────
  const screenW = _reactNative.Dimensions.get('window').width;
  const chartW = widthProp ?? screenW - containerPaddingHorizontal;
  const count = data.length;
  const slotW = chartW / count;
  const barW = slotW * barWidthRatio;
  const barPad = (slotW - barW) / 2;
  const rx = barW / 2;

  // ── Scale ─────────────────────────────────────────────────────────────────
  const maxValue = maxValueProp ?? Math.max(...data.map(d => d.value ?? 0), 1);

  // Extra space at top for tooltip bubble
  const tooltipReserve = 52;
  const plotH = height;
  const svgH = tooltipReserve + plotH + labelHeight;

  // ── Active bar ────────────────────────────────────────────────────────────
  const activeIdx = data.findIndex(d => d.active);
  const activeDatum = activeIdx >= 0 ? data[activeIdx] : null;
  const resolvedTooltip = tooltipLabel ?? (activeDatum?.value != null ? `${activeDatum.value}${unit ? ' ' + unit : ''}` : '');

  // ── Animation ─────────────────────────────────────────────────────────────
  const animValue = (0, _react.useRef)(new _reactNative.Animated.Value(animated ? 0 : 1)).current;
  const [progress, setProgress] = (0, _react.useState)(animated ? 0 : 1);
  (0, _react.useEffect)(() => {
    if (!animated) return;
    const id = animValue.addListener(({
      value
    }) => setProgress(value));
    _reactNative.Animated.timing(animValue, {
      toValue: 1,
      duration: animationDuration,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      useNativeDriver: false
    }).start();
    return () => animValue.removeListener(id);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: chartW,
    height: svgH,
    children: [data.map((d, i) => {
      const rawH = d.value != null ? d.value / maxValue * plotH : plotH * 0.38;
      const bh = rawH * progress;
      const bx = i * slotW + barPad;
      const baseline = tooltipReserve + plotH;
      const by = baseline - bh;
      const cx = bx + barW / 2;
      const isActive = !!d.active;
      const hasValue = d.value != null;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
        children: [isActive ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
              id: `ag${i}`,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
                offset: "0%",
                stopColor: C.activeTop,
                stopOpacity: "1"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
                offset: "100%",
                stopColor: C.activeBottom,
                stopOpacity: "0.8"
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
            x: bx,
            y: by,
            width: barW,
            height: bh,
            rx: rx,
            fill: `url(#ag${i})`
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(HatchedBar, {
          id: `hb-${i}`,
          x: bx,
          y: by,
          w: barW,
          h: bh,
          rx: rx,
          fill: C.inactiveBar,
          hatchColor: C.hatchLine,
          hatchSpacing: hatchSpacing,
          showHatch: showHatch && hasValue
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Text, {
          x: cx,
          y: tooltipReserve + plotH + labelHeight - 4,
          textAnchor: "middle",
          fontSize: _fluentStyles.theme.fontSize.small,
          fill: isActive ? C.activeLabelColor : C.inactiveLabelColor,
          fontWeight: isActive ? _fluentStyles.theme.fontWeight.bold : _fluentStyles.theme.fontWeight.normal,
          fontFamily: "System",
          children: d.label
        })]
      }, `bar-${i}`);
    }), activeIdx >= 0 && resolvedTooltip && progress > 0.4 && (() => {
      const bx = activeIdx * slotW + barPad;
      const cx = bx + barW / 2;
      const rawH = (activeDatum.value ?? plotH * 0.38) / maxValue * plotH;
      const bh = rawH * progress;
      const barTop = tooltipReserve + plotH - bh;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Tooltip, {
        cx: cx,
        barTop: barTop,
        label: resolvedTooltip,
        bgColor: C.tooltipBg,
        textColor: C.tooltipText
      });
    })()]
  });
};
exports.StyledBar = StyledBar;
var _default = exports.default = StyledBar;
//# sourceMappingURL=index.js.map