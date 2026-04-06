"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabBarUsage;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _TabBar = require("./TabBar.js");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * TabBarUsage — exhaustive demo of every feature.
 */

// ─── Icon stubs (replace with your icon library) ──────────────────────────────
const Emoji = ({
  e,
  color,
  size = 20
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
  style: {
    fontSize: size
  },
  children: e
});

// ─── Static option sets ───────────────────────────────────────────────────────

const NAV_TABS = [{
  value: 'home',
  label: 'Home',
  iconRender: c => /*#__PURE__*/(0, _jsxRuntime.jsx)(Emoji, {
    e: "\uD83C\uDFE0",
    color: c
  })
}, {
  value: 'explore',
  label: 'Explore',
  iconRender: c => /*#__PURE__*/(0, _jsxRuntime.jsx)(Emoji, {
    e: "\uD83D\uDD0D",
    color: c
  }),
  badge: 3
}, {
  value: 'activity',
  label: 'Activity',
  iconRender: c => /*#__PURE__*/(0, _jsxRuntime.jsx)(Emoji, {
    e: "\u26A1",
    color: c
  }),
  badge: ''
}, {
  value: 'profile',
  label: 'Profile',
  iconRender: c => /*#__PURE__*/(0, _jsxRuntime.jsx)(Emoji, {
    e: "\uD83D\uDC64",
    color: c
  })
}];
const SIMPLE_TABS = [{
  value: 'day',
  label: 'Day'
}, {
  value: 'week',
  label: 'Week'
}, {
  value: 'month',
  label: 'Month'
}, {
  value: 'year',
  label: 'Year'
}];
const MANY_TABS = [{
  value: 'all',
  label: 'All'
}, {
  value: 'design',
  label: 'Design'
}, {
  value: 'dev',
  label: 'Dev'
}, {
  value: 'pm',
  label: 'Product'
}, {
  value: 'data',
  label: 'Data'
}, {
  value: 'ops',
  label: 'DevOps'
}, {
  value: 'qa',
  label: 'QA'
}, {
  value: 'mkt',
  label: 'Marketing'
}, {
  value: 'sales',
  label: 'Sales'
}];
const NUMBERED_TABS = [{
  value: 1,
  label: 'Step 1'
}, {
  value: 2,
  label: 'Step 2'
}, {
  value: 3,
  label: 'Step 3'
}];
const BADGE_TABS = [{
  value: 'inbox',
  label: 'Inbox',
  badge: 24
}, {
  value: 'sent',
  label: 'Sent'
}, {
  value: 'drafts',
  label: 'Drafts',
  badge: 2
}, {
  value: 'spam',
  label: 'Spam',
  badge: ''
}, {
  value: 'archived',
  label: 'Archived'
}];
const DISABLED_TABS = [{
  value: 'available',
  label: 'Available'
}, {
  value: 'locked',
  label: 'Locked',
  disabled: true
}, {
  value: 'preview',
  label: 'Preview',
  disabled: true
}, {
  value: 'open',
  label: 'Open'
}];

// ─── Screen ───────────────────────────────────────────────────────────────────

function TabBarUsage() {
  // Controlled states
  const [nav, setNav] = (0, _react.useState)('home');
  const [seg, setSeg] = (0, _react.useState)('week');
  const [cat, setCat] = (0, _react.useState)('all');
  const [step, setStep] = (0, _react.useState)(1);
  const [mail, setMail] = (0, _react.useState)('inbox');
  const [dis, setDis] = (0, _react.useState)('available');

  // Content colours for demo
  const PANEL_BG = {
    home: '#eef2ff',
    explore: '#f0fdf4',
    activity: '#fff7ed',
    profile: '#fdf2f8'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: u.safe,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false,
      contentContainerStyle: u.scroll,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(Section, {
        label: "Bottom nav \u2014 icons + dot badges",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [u.panel, {
            backgroundColor: PANEL_BG[nav]
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: u.panelText,
            children: ["Active: ", nav]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: NAV_TABS,
          value: nav,
          onChange: v => setNav(v),
          indicator: "dot",
          showBorder: true
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Indicator: line (animated)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          value: seg,
          onChange: v => setSeg(v),
          indicator: "line",
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Indicator: pill (sliding background)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          indicator: "pill",
          colors: {
            background: _theme.palettes.indigo[50],
            activeText: _theme.palettes.indigo[700],
            indicator: _theme.palettes.indigo[200],
            text: _theme.palettes.indigo[400]
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(Section, {
        label: "Scrollable (tabAlign=scroll) \u2014 9 tabs",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: MANY_TABS,
          value: cat,
          onChange: v => setCat(v),
          tabAlign: "scroll",
          indicator: "line",
          showBorder: true
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
          style: u.hint,
          children: ["Active: ", cat]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Badges \u2014 number \xB7 dot (empty string)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: BADGE_TABS,
          value: mail,
          onChange: v => setMail(v),
          indicator: "line",
          tabAlign: "scroll",
          colors: {
            badge: _theme.palettes.rose[500]
          },
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Disabled tabs",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: DISABLED_TABS,
          value: dis,
          onChange: v => setDis(v),
          indicator: "line",
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Variant: solid (chip tabs)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          variant: "solid",
          indicator: "pill",
          colors: {
            background: _theme.palettes.gray[100],
            activeChipBg: '#ffffff',
            activeChipText: _theme.palettes.gray[900],
            indicator: _theme.palettes.coolGray[200],
            text: _theme.palettes.gray[500]
          },
          style: u.chipBar
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(Section, {
        label: "Numeric values \u2014 stepper",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: NUMBERED_TABS,
          value: step,
          onChange: v => setStep(v),
          indicator: "line",
          indicatorHeight: 2,
          fontSize: 13,
          colors: {
            activeText: _theme.palettes.violet[600],
            indicator: _theme.palettes.violet[600],
            text: _theme.palettes.gray[400]
          },
          showBorder: true
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: u.stepContent,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: u.stepText,
            children: [step === 1 && '① Fill in your details', step === 2 && '② Review your order', step === 3 && '③ Confirm & pay']
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Label bulge (active tab scales up)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          indicator: "line",
          labelBulge: 1.15,
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Fixed indicator width (24 px)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "month",
          indicator: "line",
          indicatorWidth: 24,
          indicatorHeight: 3,
          indicatorRadius: 3,
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Scrollable + full-width indicator (0)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: MANY_TABS,
          defaultValue: "design",
          tabAlign: "scroll",
          indicator: "line",
          indicatorWidth: 0,
          indicatorHeight: 3,
          showBorder: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Color overrides \u2014 green",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "day",
          indicator: "line",
          showBorder: true,
          colors: {
            background: _theme.palettes.green[50],
            activeText: _theme.palettes.green[700],
            indicator: _theme.palettes.green[500],
            text: _theme.palettes.green[400],
            border: _theme.palettes.green[200]
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Color overrides \u2014 dark slate",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: NAV_TABS,
          defaultValue: "home",
          indicator: "dot",
          showBorder: true,
          colors: {
            background: _theme.palettes.blueGray[900],
            activeText: _theme.palettes.indigo[400],
            indicator: _theme.palettes.indigo[400],
            text: _theme.palettes.blueGray[400],
            border: _theme.palettes.blueGray[700],
            badge: _theme.palettes.rose[400]
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "No indicator \u2014 plain (default)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "month"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Section, {
        label: "Large font (fontSize=17)",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBar.TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          indicator: "line",
          fontSize: 17,
          height: 52,
          showBorder: true
        })
      })]
    })
  });
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({
  label,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: u.section,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: u.sectionLabel,
    children: label
  }), children]
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = _reactNative.StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  scroll: {
    paddingTop: 16,
    paddingBottom: 48,
    gap: 28
  },
  section: {
    gap: 0
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8e8e93',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 16
  },
  panel: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 0,
    borderRadius: 12
  },
  panelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151'
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    paddingHorizontal: 16,
    marginTop: 6
  },
  stepContent: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    borderRadius: 10
  },
  stepText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500'
  },
  chipBar: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=TabBarUsage.js.map