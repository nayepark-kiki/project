/* @ds-bundle: {"format":3,"namespace":"BaseUIKitDesignSystem_019e15","components":[],"sourceHashes":{"ui_kits/web-dashboard/components.jsx":"a7f689a5d1d6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BaseUIKitDesignSystem_019e15 = window.BaseUIKitDesignSystem_019e15 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/web-dashboard/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Base UI Kit — Web Dashboard components (React, inline JSX)
// Recreated from /page19/Frame-1430105799 ("드론 관리" / drone management)

const {
  useState
} = React;

// ─────── Primitives ──────────────────────────────────────────────────────

function Icon({
  name,
  size = 24,
  weight = "linear",
  style
}) {
  const url = `https://api.iconify.design/vuesax-${weight}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      backgroundColor: "currentColor",
      WebkitMask: `url("${url}") center / contain no-repeat`,
      mask: `url("${url}") center / contain no-repeat`,
      flexShrink: 0,
      ...style
    }
  });
}
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled,
  onClick,
  style
}) {
  const base = {
    height: size === "sm" ? 36 : 44,
    padding: size === "sm" ? "0 16px" : "0 22px",
    borderRadius: 8,
    fontFamily: "var(--font-ko-gov)",
    fontWeight: 700,
    fontSize: size === "sm" ? 14 : 15,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "0",
    transition: "background 120ms ease-out"
  };
  const variants = {
    primary: {
      background: disabled ? "var(--gray-30)" : "var(--primary-50)",
      color: disabled ? "var(--gray-60)" : "#fff"
    },
    ghost: {
      background: "#fff",
      color: "var(--primary-50)",
      border: "1px solid var(--primary-50)"
    },
    gray: {
      background: "#fff",
      color: "var(--fg-strong)",
      border: "1px solid var(--border-default)"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(Icon, {
    name: iconLeft,
    size: size === "sm" ? 16 : 18
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: size === "sm" ? 16 : 18
  }));
}
function Field({
  icon,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, props, {
    style: {
      width: "100%",
      height: 44,
      padding: icon ? "0 40px 0 14px" : "0 14px",
      borderRadius: 8,
      border: "1px solid var(--border-default)",
      background: "#fff",
      fontFamily: "var(--font-ko-gov)",
      fontSize: 15,
      color: "var(--fg-strong)",
      boxSizing: "border-box",
      outline: "none"
    },
    onFocus: e => {
      e.target.style.borderColor = "var(--primary-50)";
      e.target.style.boxShadow = "0 0 0 3px var(--primary-5)";
    },
    onBlur: e => {
      e.target.style.borderColor = "var(--border-default)";
      e.target.style.boxShadow = "none";
    }
  })), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--fg-subtle)"
    }
  }));
}
function Select({
  value,
  onClick,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      height: 44,
      padding: "0 14px",
      borderRadius: 8,
      border: "1px solid var(--border-default)",
      background: "#fff",
      fontFamily: "var(--font-ko-gov)",
      fontSize: 15,
      color: "var(--fg-muted)",
      width,
      cursor: "pointer"
    }
  }, value, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-down",
    size: 20
  }));
}
function Pill({
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: "inline-block",
      padding: "6px 16px",
      borderRadius: 100,
      border: "1px solid var(--border-default)",
      background: "#fff",
      fontFamily: "var(--font-ko-gov)",
      fontSize: 14,
      color: "var(--fg-strong)",
      cursor: onClick ? "pointer" : "default"
    }
  }, children);
}

// ─────── Layout ───────────────────────────────────────────────────────────

function Sidebar({
  activeKey = "drone",
  onNav
}) {
  const groups = [{
    key: "dashboard",
    label: "대시보드",
    icon: "glass",
    children: null
  }, {
    key: "device",
    label: "디바이스",
    icon: "3dcube",
    weight: "bold",
    children: [{
      key: "drone",
      label: "드론 관리"
    }, {
      key: "glass",
      label: "스마트글라스 관리"
    }, {
      key: "charge",
      label: "차징스테이션 관리"
    }]
  }, {
    key: "inventory",
    label: "재고조사",
    icon: "box",
    children: []
  }, {
    key: "picking",
    label: "피킹",
    icon: "truck-fast",
    children: []
  }, {
    key: "packing",
    label: "패킹",
    icon: "box-1",
    children: []
  }, {
    key: "system",
    label: "시스템 관리",
    icon: "setting-2",
    children: []
  }];
  const activeGroup = groups.find(g => g.children && g.children.some(c => c.key === activeKey)) || groups.find(g => g.key === activeKey);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--sidebar-w)",
      minHeight: "100vh",
      background: "var(--bg-sidebar)",
      boxShadow: "var(--shadow-md)",
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      padding: "0 30px",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/base-ui-kit-h.png",
    alt: "logo",
    width: 40,
    height: 40,
    style: {
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, groups.map(g => {
    const isExpanded = activeGroup && activeGroup.key === g.key && g.children && g.children.length;
    const isItemActive = g.key === activeKey;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: g.key
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => onNav && onNav(g.children && g.children.length ? g.children[0].key : g.key),
      style: {
        height: 76,
        padding: "0 30px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: isExpanded || isItemActive ? "#fff" : "#999999",
        background: isExpanded || isItemActive ? "var(--bg-sidebar-selected)" : "transparent",
        fontFamily: "var(--font-ko)",
        fontWeight: 500,
        fontSize: 19,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: g.icon,
      size: 24,
      weight: g.weight || "linear"
    }), /*#__PURE__*/React.createElement("span", null, g.label), g.children && /*#__PURE__*/React.createElement(Icon, {
      name: isExpanded ? "arrow-up" : "arrow-down",
      size: 16,
      style: {
        marginLeft: "auto"
      }
    })), isExpanded && g.children.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.key,
      onClick: () => onNav && onNav(c.key),
      style: {
        padding: "14px 64px",
        color: c.key === activeKey ? "#fff" : "#CCCCCC",
        fontFamily: "var(--font-ko)",
        fontSize: 17,
        fontWeight: c.key === activeKey ? 500 : 400,
        cursor: "pointer"
      }
    }, c.label)));
  })));
}
function Topbar({
  title,
  user = "관리자",
  onLogout
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 72,
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--border-subtle)",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-ko-gov)",
      fontWeight: 700,
      fontSize: 28,
      color: "var(--fg-default)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "var(--gray-30)"
    }
  }), /*#__PURE__*/React.createElement(Pill, {
    onClick: onLogout
  }, "\uB85C\uADF8\uC544\uC6C3")));
}
function Tabs({
  tabs,
  activeKey,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid var(--border-default)",
      padding: "0 40px"
    }
  }, tabs.map(t => {
    const active = t.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange(t.key),
      style: {
        padding: "16px 32px",
        marginBottom: -1,
        border: 0,
        borderBottom: active ? "3px solid var(--fg-default)" : "3px solid transparent",
        background: "transparent",
        fontFamily: "var(--font-ko-noto)",
        fontWeight: 700,
        fontSize: 17,
        color: active ? "var(--fg-default)" : "var(--fg-subtle)",
        cursor: "pointer"
      }
    }, t.label);
  }));
}

// ─────── Domain ───────────────────────────────────────────────────────────

function FilterBar({
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: "16px 40px"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    value: "\uD544\uD130\uC785\uB2C8\uB2E4"
  }), /*#__PURE__*/React.createElement(Select, {
    value: "\uD544\uD130\uC785\uB2C8\uB2E4"
  }), /*#__PURE__*/React.createElement(Field, {
    icon: "search-normal",
    placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"
  }), /*#__PURE__*/React.createElement(Select, {
    value: "\uC804\uCCB4",
    width: 140
  }), /*#__PURE__*/React.createElement(Field, {
    icon: "search-normal",
    placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: onAdd
  }, "\uAE30\uCCB4 \uB4F1\uB85D"));
}
function StatusText({
  status
}) {
  const map = {
    done: {
      label: "검수 완료",
      color: "var(--success-50)"
    },
    pending: {
      label: "검수 미완료",
      color: "var(--danger-50)"
    },
    wait: {
      label: "대기 중",
      color: "var(--fg-subtle)"
    }
  };
  const s = map[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.color,
      fontFamily: "var(--font-ko-noto)",
      fontSize: 16
    }
  }, s.label);
}
function DataTable({
  rows,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-ko-noto)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["순번", "주문번호", "기체", "검수상태", "영상 다운로드", ""].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "16px 20px",
      borderTop: "1px solid var(--navy-strong)",
      borderBottom: "1px solid var(--navy-strong)",
      fontFamily: "var(--font-ko-noto)",
      fontWeight: 700,
      fontSize: 15,
      color: "var(--fg-default)",
      background: "#fff"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    style: {
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.idx), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.orderNo), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.craft), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement(StatusText, {
    status: r.status
  })), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.status === "done" ? /*#__PURE__*/React.createElement(Pill, null, "\uB2E4\uC6B4\uB85C\uB4DC") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-disabled)"
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 20,
    weight: "linear",
    style: {
      color: "var(--fg-subtle)",
      cursor: "pointer"
    },
    onClick: () => onDelete && onDelete(r)
  }))))));
}
const td = {
  padding: "18px 20px",
  borderBottom: "1px solid var(--border-default)",
  fontFamily: "var(--font-ko-noto)",
  fontSize: 16,
  color: "var(--fg-strong)"
};
function Pagination({
  page = 1,
  total = 99,
  onChange
}) {
  const around = [1, 2, 3, 4, 5, 6, 7, 8];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      padding: "24px 0 40px",
      fontFamily: "var(--font-ko-gov)",
      fontSize: 15,
      color: "var(--fg-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...pagerCell,
      color: "var(--fg-muted)",
      display: "inline-flex",
      gap: 6
    },
    onClick: () => onChange(Math.max(1, page - 1))
  }, "< \uC774\uC804"), around.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    onClick: () => onChange(n),
    style: {
      ...pagerCell,
      background: page === n ? "var(--primary-50)" : "transparent",
      color: page === n ? "#fff" : "var(--fg-strong)",
      fontWeight: page === n ? 700 : 400
    }
  }, n)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-subtle)",
      padding: "0 6px"
    }
  }, "\xB7\xB7\xB7"), /*#__PURE__*/React.createElement("span", {
    style: pagerCell,
    onClick: () => onChange(total)
  }, total), /*#__PURE__*/React.createElement("span", {
    style: {
      ...pagerCell,
      color: "var(--fg-muted)",
      display: "inline-flex",
      gap: 6
    },
    onClick: () => onChange(Math.min(total, page + 1))
  }, "\uB2E4\uC74C >"));
}
const pagerCell = {
  minWidth: 36,
  height: 36,
  padding: "0 10px",
  borderRadius: 6,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};
function Modal({
  title,
  body,
  onCancel,
  onConfirm,
  confirmLabel = "예",
  cancelLabel = "취소"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 540,
      background: "#fff",
      borderRadius: 16,
      padding: "28px 28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-ko-noto)",
      fontWeight: 700,
      fontSize: 22,
      color: "var(--fg-default)"
    }
  }, title), /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      cursor: "pointer",
      color: "var(--fg-strong)"
    },
    onClick: onCancel
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ko-noto)",
      fontSize: 15,
      lineHeight: 1.6,
      color: "var(--fg-muted)"
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onConfirm
  }, confirmLabel))));
}
Object.assign(window, {
  Icon,
  Button,
  Field,
  Select,
  Pill,
  Sidebar,
  Topbar,
  Tabs,
  FilterBar,
  DataTable,
  Pagination,
  Modal,
  StatusText
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-dashboard/components.jsx", error: String((e && e.message) || e) }); }

})();
