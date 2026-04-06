"use strict";

import React, { useRef, useEffect, useState } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import Svg, { Rect, Path, G, Defs, LinearGradient, Stop, ClipPath, Line, Text as SvgText } from 'react-native-svg';
import { theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Default colours (uses theme + palettes tokens) ───────────────────────────

const buildDefaults = () => ({
  inactiveBar: theme.colors.gray[200],
  hatchLine: 'rgba(0,0,0,0.07)',
  activeTop: '#d4f53c',
  activeBottom: '#a8c820',
  tooltipBg: theme.colors.gray[900],
  tooltipText: palettes.white,
  activeLabelColor: theme.colors.gray[900],
  inactiveLabelColor: theme.colors.gray[400]
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
      lines.push(/*#__PURE__*/_jsx(Line, {
        x1: x + off,
        y1: y,
        x2: x + off + h,
        y2: y + h,
        stroke: hatchColor,
        strokeWidth: "5"
      }, off));
    }
  }
  return /*#__PURE__*/_jsxs(G, {
    children: [/*#__PURE__*/_jsx(Defs, {
      children: /*#__PURE__*/_jsx(ClipPath, {
        id: id,
        children: /*#__PURE__*/_jsx(Rect, {
          x: x,
          y: y,
          width: w,
          height: h,
          rx: rx
        })
      })
    }), /*#__PURE__*/_jsx(Rect, {
      x: x,
      y: y,
      width: w,
      height: h,
      rx: rx,
      fill: fill
    }), showHatch && /*#__PURE__*/_jsx(G, {
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
  return /*#__PURE__*/_jsxs(G, {
    children: [/*#__PURE__*/_jsx(Rect, {
      x: boxX,
      y: boxY,
      width: boxW,
      height: HEIGHT,
      rx: HEIGHT / 2,
      fill: bgColor
    }), /*#__PURE__*/_jsx(Path, {
      d: `M ${cx - 7} ${boxY + HEIGHT} L ${cx + 7} ${boxY + HEIGHT} L ${cx} ${boxY + HEIGHT + 9}`,
      fill: bgColor
    }), /*#__PURE__*/_jsx(SvgText, {
      x: cx,
      y: boxY + HEIGHT / 2 + 5,
      textAnchor: "middle",
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
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
export const StyledBar = ({
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
  const screenW = Dimensions.get('window').width;
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
  const animValue = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const [progress, setProgress] = useState(animated ? 0 : 1);
  useEffect(() => {
    if (!animated) return;
    const id = animValue.addListener(({
      value
    }) => setProgress(value));
    Animated.timing(animValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
    return () => animValue.removeListener(id);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return /*#__PURE__*/_jsxs(Svg, {
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
      return /*#__PURE__*/_jsxs(G, {
        children: [isActive ? /*#__PURE__*/_jsxs(G, {
          children: [/*#__PURE__*/_jsx(Defs, {
            children: /*#__PURE__*/_jsxs(LinearGradient, {
              id: `ag${i}`,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [/*#__PURE__*/_jsx(Stop, {
                offset: "0%",
                stopColor: C.activeTop,
                stopOpacity: "1"
              }), /*#__PURE__*/_jsx(Stop, {
                offset: "100%",
                stopColor: C.activeBottom,
                stopOpacity: "0.8"
              })]
            })
          }), /*#__PURE__*/_jsx(Rect, {
            x: bx,
            y: by,
            width: barW,
            height: bh,
            rx: rx,
            fill: `url(#ag${i})`
          })]
        }) : /*#__PURE__*/_jsx(HatchedBar, {
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
        }), /*#__PURE__*/_jsx(SvgText, {
          x: cx,
          y: tooltipReserve + plotH + labelHeight - 4,
          textAnchor: "middle",
          fontSize: theme.fontSize.small,
          fill: isActive ? C.activeLabelColor : C.inactiveLabelColor,
          fontWeight: isActive ? theme.fontWeight.bold : theme.fontWeight.normal,
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
      return /*#__PURE__*/_jsx(Tooltip, {
        cx: cx,
        barTop: barTop,
        label: resolvedTooltip,
        bgColor: C.tooltipBg,
        textColor: C.tooltipText
      });
    })()]
  });
};
export default StyledBar;
//# sourceMappingURL=index.js.map