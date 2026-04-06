"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = exports.PADDING = exports.FONT_SIZE = void 0;
exports.bodyPadStyle = bodyPadStyle;
exports.headerPadStyle = headerPadStyle;
exports.subtitleTextStyle = subtitleTextStyle;
exports.titleTextStyle = titleTextStyle;
var _reactNative = require("react-native");
// ─── Spacing scale ────────────────────────────────────────────────────────────

const PADDING = exports.PADDING = {
  sm: {
    h: 10,
    v: 8
  },
  md: {
    h: 16,
    v: 12
  },
  lg: {
    h: 20,
    v: 16
  }
};
const FONT_SIZE = exports.FONT_SIZE = {
  sm: {
    title: 13,
    subtitle: 11
  },
  md: {
    title: 15,
    subtitle: 13
  },
  lg: {
    title: 17,
    subtitle: 15
  }
};

// ─── Static styles (layout only — colours injected at runtime) ────────────────

const S = exports.S = _reactNative.StyleSheet.create({
  // ── Outer wrappers ──────────────────────────────────────────────────────

  root_cell: {
    // flat, no border/shadow — colour comes from `colors.background` at runtime
  },
  root_card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 3
  },
  root_card_square: {
    borderRadius: 0
  },
  root_bordered: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  root_ghost: {
    // fully transparent; no background, no border
  },
  // ── Header ──────────────────────────────────────────────────────────────

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  // ── Content slots ────────────────────────────────────────────────────────

  leading: {
    marginRight: 10
  },
  trailing: {
    marginLeft: 6,
    marginRight: 2
  },
  // ── Title block ─────────────────────────────────────────────────────────

  title_block: {
    flex: 1,
    gap: 2
  },
  title_base: {
    fontWeight: '600'
  },
  subtitle_base: {
    fontWeight: '400'
  },
  // ── Icon wrapper ─────────────────────────────────────────────────────────

  icon_wrap: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24
  },
  // ── Animated body ────────────────────────────────────────────────────────

  body_animated: {
    overflow: 'hidden'
  },
  // Absolutely positioned so it can be measured without affecting flow
  body_inner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  // ── Dividers ─────────────────────────────────────────────────────────────

  divider: {
    height: _reactNative.StyleSheet.hairlineWidth
  },
  body_divider: {
    height: _reactNative.StyleSheet.hairlineWidth
  }
});

// ─── Runtime style builders ───────────────────────────────────────────────────
// These return plain objects (not StyleSheet entries) because they depend on
// runtime values (colors, size) that differ per instance.

function headerPadStyle(size) {
  const p = PADDING[size];
  return {
    paddingHorizontal: p.h,
    paddingVertical: p.v
  };
}
function bodyPadStyle(size) {
  const p = PADDING[size];
  return {
    paddingHorizontal: p.h,
    paddingVertical: p.v
  };
}
function titleTextStyle(size, color) {
  return {
    fontSize: FONT_SIZE[size].title,
    color
  };
}
function subtitleTextStyle(size, color) {
  return {
    fontSize: FONT_SIZE[size].subtitle,
    color
  };
}
//# sourceMappingURL=style.js.map