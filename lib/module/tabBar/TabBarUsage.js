"use strict";

/**
 * TabBarUsage — exhaustive demo of every feature.
 */

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TabBar } from "./TabBar.js";
import { palettes } from "../utiles/theme.js";

// ─── Icon stubs (replace with your icon library) ──────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Emoji = ({
  e,
  color,
  size = 20
}) => /*#__PURE__*/_jsx(Text, {
  style: {
    fontSize: size
  },
  children: e
});

// ─── Static option sets ───────────────────────────────────────────────────────

const NAV_TABS = [{
  value: 'home',
  label: 'Home',
  iconRender: c => /*#__PURE__*/_jsx(Emoji, {
    e: "\uD83C\uDFE0",
    color: c
  })
}, {
  value: 'explore',
  label: 'Explore',
  iconRender: c => /*#__PURE__*/_jsx(Emoji, {
    e: "\uD83D\uDD0D",
    color: c
  }),
  badge: 3
}, {
  value: 'activity',
  label: 'Activity',
  iconRender: c => /*#__PURE__*/_jsx(Emoji, {
    e: "\u26A1",
    color: c
  }),
  badge: ''
}, {
  value: 'profile',
  label: 'Profile',
  iconRender: c => /*#__PURE__*/_jsx(Emoji, {
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

export default function TabBarUsage() {
  // Controlled states
  const [nav, setNav] = useState('home');
  const [seg, setSeg] = useState('week');
  const [cat, setCat] = useState('all');
  const [step, setStep] = useState(1);
  const [mail, setMail] = useState('inbox');
  const [dis, setDis] = useState('available');

  // Content colours for demo
  const PANEL_BG = {
    home: '#eef2ff',
    explore: '#f0fdf4',
    activity: '#fff7ed',
    profile: '#fdf2f8'
  };
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: u.safe,
    children: /*#__PURE__*/_jsxs(ScrollView, {
      showsVerticalScrollIndicator: false,
      contentContainerStyle: u.scroll,
      children: [/*#__PURE__*/_jsxs(Section, {
        label: "Bottom nav \u2014 icons + dot badges",
        children: [/*#__PURE__*/_jsx(View, {
          style: [u.panel, {
            backgroundColor: PANEL_BG[nav]
          }],
          children: /*#__PURE__*/_jsxs(Text, {
            style: u.panelText,
            children: ["Active: ", nav]
          })
        }), /*#__PURE__*/_jsx(TabBar, {
          options: NAV_TABS,
          value: nav,
          onChange: v => setNav(v),
          indicator: "dot",
          showBorder: true
        })]
      }), /*#__PURE__*/_jsx(Section, {
        label: "Indicator: line (animated)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          value: seg,
          onChange: v => setSeg(v),
          indicator: "line",
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Indicator: pill (sliding background)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          indicator: "pill",
          colors: {
            background: palettes.indigo[50],
            activeText: palettes.indigo[700],
            indicator: palettes.indigo[200],
            text: palettes.indigo[400]
          }
        })
      }), /*#__PURE__*/_jsxs(Section, {
        label: "Scrollable (tabAlign=scroll) \u2014 9 tabs",
        children: [/*#__PURE__*/_jsx(TabBar, {
          options: MANY_TABS,
          value: cat,
          onChange: v => setCat(v),
          tabAlign: "scroll",
          indicator: "line",
          showBorder: true
        }), /*#__PURE__*/_jsxs(Text, {
          style: u.hint,
          children: ["Active: ", cat]
        })]
      }), /*#__PURE__*/_jsx(Section, {
        label: "Badges \u2014 number \xB7 dot (empty string)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: BADGE_TABS,
          value: mail,
          onChange: v => setMail(v),
          indicator: "line",
          tabAlign: "scroll",
          colors: {
            badge: palettes.rose[500]
          },
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Disabled tabs",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: DISABLED_TABS,
          value: dis,
          onChange: v => setDis(v),
          indicator: "line",
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Variant: solid (chip tabs)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          variant: "solid",
          indicator: "pill",
          colors: {
            background: palettes.gray[100],
            activeChipBg: '#ffffff',
            activeChipText: palettes.gray[900],
            indicator: palettes.coolGray[200],
            text: palettes.gray[500]
          },
          style: u.chipBar
        })
      }), /*#__PURE__*/_jsxs(Section, {
        label: "Numeric values \u2014 stepper",
        children: [/*#__PURE__*/_jsx(TabBar, {
          options: NUMBERED_TABS,
          value: step,
          onChange: v => setStep(v),
          indicator: "line",
          indicatorHeight: 2,
          fontSize: 13,
          colors: {
            activeText: palettes.violet[600],
            indicator: palettes.violet[600],
            text: palettes.gray[400]
          },
          showBorder: true
        }), /*#__PURE__*/_jsx(View, {
          style: u.stepContent,
          children: /*#__PURE__*/_jsxs(Text, {
            style: u.stepText,
            children: [step === 1 && '① Fill in your details', step === 2 && '② Review your order', step === 3 && '③ Confirm & pay']
          })
        })]
      }), /*#__PURE__*/_jsx(Section, {
        label: "Label bulge (active tab scales up)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "week",
          indicator: "line",
          labelBulge: 1.15,
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Fixed indicator width (24 px)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "month",
          indicator: "line",
          indicatorWidth: 24,
          indicatorHeight: 3,
          indicatorRadius: 3,
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Scrollable + full-width indicator (0)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: MANY_TABS,
          defaultValue: "design",
          tabAlign: "scroll",
          indicator: "line",
          indicatorWidth: 0,
          indicatorHeight: 3,
          showBorder: true
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Color overrides \u2014 green",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "day",
          indicator: "line",
          showBorder: true,
          colors: {
            background: palettes.green[50],
            activeText: palettes.green[700],
            indicator: palettes.green[500],
            text: palettes.green[400],
            border: palettes.green[200]
          }
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Color overrides \u2014 dark slate",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: NAV_TABS,
          defaultValue: "home",
          indicator: "dot",
          showBorder: true,
          colors: {
            background: palettes.blueGray[900],
            activeText: palettes.indigo[400],
            indicator: palettes.indigo[400],
            text: palettes.blueGray[400],
            border: palettes.blueGray[700],
            badge: palettes.rose[400]
          }
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "No indicator \u2014 plain (default)",
        children: /*#__PURE__*/_jsx(TabBar, {
          options: SIMPLE_TABS,
          defaultValue: "month"
        })
      }), /*#__PURE__*/_jsx(Section, {
        label: "Large font (fontSize=17)",
        children: /*#__PURE__*/_jsx(TabBar, {
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
}) => /*#__PURE__*/_jsxs(View, {
  style: u.section,
  children: [/*#__PURE__*/_jsx(Text, {
    style: u.sectionLabel,
    children: label
  }), children]
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
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