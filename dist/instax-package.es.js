import { openBlock as a, createElementBlock as s, renderSlot as v, ref as $, watchEffect as I, onMounted as Z, onUnmounted as E, computed as m, createElementVNode as o, normalizeClass as u, unref as t, toDisplayString as x, createCommentVNode as h, normalizeProps as N, guardReactiveProps as T, createVNode as g, createBlock as f, Teleport as D, Fragment as M, renderList as A, withCtx as _, resolveDynamicComponent as z, resolveComponent as O, Transition as q } from "vue";
import { defineStore as j, storeToRefs as w } from "pinia";
const V = (e, n) => {
  const l = e.__vccOpts || e;
  for (const [i, r] of n)
    l[i] = r;
  return l;
}, H = {}, P = { class: "size-10 items-center justify-center transition-all duration-300 rounded-sm cursor-pointer text-neutral-500 hover:text-neutral-600 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:text-neutral-200 dark:hover:bg-neutral-700/45" };
function W(e, n) {
  return a(), s("button", P, [
    v(e.$slots, "default")
  ]);
}
const S = /* @__PURE__ */ V(H, [["render", W]]), b = j("theme", () => {
  const e = $(
    typeof window < "u" && localStorage.getItem("theme") === "dark" || typeof window < "u" && !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches
  ), n = $(typeof window < "u" && localStorage.getItem("isCollapsed") === "true"), l = $(!0);
  typeof window < "u" && setTimeout(() => {
    l.value = !1;
  }, 3e3);
  const i = () => {
    e.value = !e.value;
  }, r = (d) => {
    typeof d == "boolean" ? n.value = d : n.value = !n.value, typeof window < "u" && localStorage.setItem("isCollapsed", n.value);
  };
  return I(() => {
    if (typeof window > "u") return;
    const d = document.documentElement, c = document.getElementById("app");
    e.value ? (d.classList.add("dark"), c?.classList.add("dark"), localStorage.setItem("theme", "dark")) : (d.classList.remove("dark"), c?.classList.remove("dark"), localStorage.setItem("theme", "light"));
  }), {
    isDark: e,
    toggleDarkMode: i,
    isCollapsed: n,
    toggleCollapse: r,
    isInitialLoading: l
  };
}), F = () => {
  function e(n, l, i = window) {
    i && (Z(() => {
      i.addEventListener(n, l);
    }), E(() => {
      i.removeEventListener(n, l);
    }));
  }
  return { listen: e };
}, G = j("screen", () => {
  const e = $(typeof window < "u" ? window.innerWidth : 1024), n = () => {
    e.value = window.innerWidth;
  };
  typeof window < "u" && F().listen("resize", n);
  const l = m(() => e.value >= 640), i = m(() => e.value >= 768), r = m(() => e.value >= 1024), d = m(() => e.value >= 1280), c = m(() => e.value >= 1536), p = m(() => e.value < 768), L = m(() => e.value >= 768 && e.value < 1024), y = m(() => e.value >= 1024);
  return {
    windowWidth: e,
    isSm: l,
    isMd: i,
    isLg: r,
    isXl: d,
    is2xl: c,
    isMobile: p,
    isTablet: L,
    isDesktop: y
  };
}), R = {
  key: 0,
  class: "flex h-2 w-2"
}, U = {
  key: 1,
  class: "flex h-5 items-center justify-center rounded-sm px-2 text-xs font-medium"
}, B = {
  __name: "NotificationIndicator",
  props: {
    dotOnly: {
      type: Boolean,
      default: !1
    },
    count: {
      type: Number,
      default: null
    },
    ringClass: {
      type: String,
      default: "ring-neutral-50 dark:ring-neutral-800"
    }
  },
  setup(e) {
    const n = b(), { isInitialLoading: l } = w(n);
    return (i, r) => e.dotOnly ? (a(), s("div", R, [
      o("span", {
        class: u([
          "absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75",
          t(l) ? "animate-ping" : ["ring-2", e.ringClass]
        ])
      }, null, 2),
      r[0] || (r[0] = o("span", { class: "relative inline-flex rounded-full h-2 w-2 bg-primary-500" }, null, -1))
    ])) : e.count !== null ? (a(), s("div", U, x(e.count), 1)) : h("", !0);
  }
}, X = { class: "grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] bg-neutral-200/60 lg:grid-cols-[auto_1fr] dark:bg-neutral-900" }, J = { class: "flex flex-col min-h-screen" }, K = { class: "flex-1" }, Ae = {
  __name: "AppLayout",
  props: {
    sidebarProps: {
      type: Object,
      required: !1,
      default: () => ({})
    }
  },
  setup(e) {
    const n = b(), { isCollapsed: l } = w(n), { toggleCollapse: i } = n;
    return (r, d) => (a(), s("div", X, [
      v(r.$slots, "sidebar", {}, () => [
        v(r.$slots, "sidebar-nav", N(T({ ...e.sidebarProps, isCollapsed: t(l), onToggleCollapse: t(i) })))
      ]),
      o("div", J, [
        v(r.$slots, "navbar", N(T({ isCollapsed: t(l), onToggleCollapse: t(i) }))),
        o("main", K, [
          v(r.$slots, "default")
        ])
      ])
    ]));
  }
};
function Q(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "fill-rule": "evenodd",
      d: "M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Y(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "fill-rule": "evenodd",
      d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function ee(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "fill-rule": "evenodd",
      d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function te(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "fill-rule": "evenodd",
      d: "M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function ne(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const ae = { class: "relative w-full" }, le = { class: "flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-200/80 text-sm font-bold text-neutral-500 dark:bg-neutral-500 dark:text-neutral-900 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-500/75" }, re = {
  key: 0,
  class: "flex flex-1 items-center justify-between overflow-hidden"
}, oe = { class: "truncate text-sm font-bold" }, se = {
  key: 1,
  class: "fixed left-2 top-14 z-[61] w-56 space-y-1 rounded-md bg-white p-1 shadow-xl ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700"
}, ie = ["onClick"], ce = { class: "flex size-6 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-xs font-bold text-neutral-800 dark:bg-neutral-600 dark:text-neutral-100" }, de = { class: "truncate text-sm font-medium text-neutral-700 dark:text-neutral-200" }, Be = {
  __name: "AccountSwitcher",
  props: {
    accounts: {
      type: Array,
      default: () => []
    },
    currentAccount: {
      type: Object,
      default: null
    }
  },
  emits: ["account-change"],
  setup(e, { emit: n }) {
    const l = b(), { isCollapsed: i } = w(l), { toggleCollapse: r } = l, d = n, c = $(!1), p = () => {
      c.value = !c.value;
    }, L = (y) => {
      d("account-change", y), c.value = !1, r(!0);
    };
    return (y, k) => (a(), s("div", ae, [
      o("button", {
        class: "group flex w-full items-center gap-3 rounded-md p-1 transition-colors text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45",
        onClick: p
      }, [
        o("span", le, x(e.currentAccount?.name?.charAt(0) || "A"), 1),
        t(i) ? h("", !0) : (a(), s("span", re, [
          o("span", oe, x(e.currentAccount?.name || "Select Account"), 1),
          g(t(te), { class: "size-4 shrink-0 text-neutral-300" })
        ]))
      ]),
      (a(), f(D, { to: "body" }, [
        c.value ? (a(), s("div", {
          key: 0,
          class: "fixed inset-0 z-[60]",
          onClick: k[0] || (k[0] = (C) => c.value = !1)
        })) : h("", !0),
        c.value ? (a(), s("div", se, [
          (a(!0), s(M, null, A(e.accounts, (C) => (a(), s("button", {
            key: C.id,
            class: u([[
              C.id === e.currentAccount?.id ? "bg-neutral-100 dark:bg-neutral-700" : "hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
            ], "flex w-full items-center gap-3 rounded-sm p-2 text-left"]),
            onClick: (Le) => L(C)
          }, [
            o("div", ce, x(C.name?.charAt(0)), 1),
            o("span", de, x(C.name), 1)
          ], 10, ie))), 128))
        ])) : h("", !0)
      ]))
    ]));
  }
};
function ue(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    })
  ]);
}
function fe(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
    })
  ]);
}
function pe(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    })
  ]);
}
function ge(e, n) {
  return a(), s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    })
  ]);
}
const he = {
  __name: "ThemeToggle",
  setup(e) {
    const n = b(), { isDark: l } = w(n), { toggleDarkMode: i } = n, r = m(() => l.value ? ge : pe);
    return (d, c) => (a(), f(t(S), {
      class: "inline-flex",
      "aria-label": "Toggle Dark Mode",
      onClick: t(i)
    }, {
      default: _(() => [
        (a(), f(z(r.value), { class: "h-5 w-5 flex-none" }))
      ]),
      _: 1
    }, 8, ["onClick"]));
  }
}, me = { class: "relative" }, ve = {
  __name: "NotificationButton",
  props: {
    hasNotifications: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (n, l) => (a(), s("div", me, [
      g(t(S), {
        "aria-label": "View Notifications",
        class: "inline-flex"
      }, {
        default: _(() => [
          g(t(fe), { class: "size-6 flex-none" })
        ]),
        _: 1
      }),
      e.hasNotifications ? (a(), f(t(B), {
        key: 0,
        "dot-only": "",
        class: "absolute top-2.5 right-2.5",
        "ring-class": "ring-neutral-50 dark:ring-neutral-800"
      })) : h("", !0)
    ]));
  }
}, xe = { class: "sticky top-0 z-50 flex items-center justify-between bg-neutral-50 px-4 min-h-12 lg:min-h-16 dark:bg-neutral-800" }, we = { class: "flex items-center gap-2" }, ke = { class: "flex items-center gap-4" }, Ne = {
  __name: "NavBar",
  setup(e) {
    const n = b(), { isCollapsed: l } = w(n), { toggleCollapse: i } = n;
    return (r, d) => (a(), s("nav", xe, [
      o("div", we, [
        t(l) ? (a(), f(t(S), {
          key: 0,
          class: "inline-flex lg:hidden",
          "aria-label": "Open Menu",
          onClick: t(i)
        }, {
          default: _(() => [
            g(t(ue), { class: "size-6 flex-none" })
          ]),
          _: 1
        }, 8, ["onClick"])) : h("", !0),
        v(r.$slots, "left")
      ]),
      o("div", ke, [
        g(ve, { "has-notifications": "" }),
        g(he),
        v(r.$slots, "right")
      ])
    ]));
  }
}, _e = ["title"], be = {
  __name: "NavLink",
  props: {
    icon: {
      type: Function,
      required: !0
    },
    label: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    notification: {
      type: Number,
      default: null
    }
  },
  setup(e) {
    const n = b(), l = G(), { isLg: i } = w(l), { isCollapsed: r } = w(n), { toggleCollapse: d } = n, c = () => {
      i.value || setTimeout(() => {
        d(!0);
      }, 100);
    };
    return (p, L) => {
      const y = O("router-link");
      return a(), f(y, {
        to: { name: e.name },
        onClick: c
      }, {
        default: _(({ isActive: k }) => [
          o("span", {
            class: u([
              "group text-md relative flex items-center gap-3 rounded-sm transition-all duration-300",
              k ? "bg-primary-200 text-primary-600 dark:bg-primary-700 dark:text-primary-200" : "text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45",
              t(r) ? "lg:aspect-square lg:size-10 lg:justify-center lg:p-0 p-2" : "px-3 py-2"
            ]),
            title: t(r) ? e.label : ""
          }, [
            (a(), f(z(e.icon), {
              class: u([
                "shrink-0 transition-all duration-300",
                t(r) ? "lg:size-5 size-4 opacity-50" : "size-4 opacity-50"
              ])
            }, null, 8, ["class"])),
            e.notification && t(r) ? (a(), f(t(B), {
              key: 0,
              "dot-only": "",
              class: "max-lg:hidden absolute top-2 right-2",
              "ring-class": k ? "ring-primary-200 dark:ring-primary-700" : "ring-neutral-50 dark:ring-neutral-800"
            }, null, 8, ["ring-class"])) : h("", !0),
            t(r) ? h("", !0) : (a(), s("span", {
              key: 1,
              class: u(["grow whitespace-nowrap", k ? "font-medium" : "font-normal", { "lg:hidden": t(r) }])
            }, x(e.label), 3)),
            e.notification && !t(r) ? (a(), f(t(B), {
              key: 2,
              count: e.notification,
              class: u([
                k ? "bg-primary-300 dark:bg-primary-300 text-primary-800" : "bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300 dark:bg-neutral-500 dark:text-neutral-900 group-hover:dark:bg-neutral-500/75"
              ])
            }, null, 8, ["count", "class"])) : h("", !0)
          ], 10, _e)
        ]),
        _: 1
      }, 8, ["to"]);
    };
  }
}, ye = { class: "p-2 min-h-12 lg:min-h-16 flex items-center justify-between w-full" }, Ce = { class: "flex-1 space-y-6 overflow-y-auto p-2" }, $e = { class: "flex flex-col gap-4 overflow-hidden p-2" }, Se = { class: "flex items-center justify-between" }, Te = {
  __name: "SidebarNav",
  props: {
    linkGroups: {
      type: Array,
      required: !0
    },
    headerTitle: {
      type: String,
      default: "Sidebar Header"
    }
  },
  setup(e) {
    const n = b(), { isCollapsed: l } = w(n), { toggleCollapse: i } = n;
    return (r, d) => (a(), s(M, null, [
      g(q, {
        "enter-active-class": "transition-opacity duration-300",
        "leave-active-class": "transition-opacity duration-300",
        "enter-from-class": "opacity-0",
        "leave-to-class": "opacity-0"
      }, {
        default: _(() => [
          t(l) ? h("", !0) : (a(), s("div", {
            key: 0,
            class: "fixed inset-0 z-[60] bg-neutral-900/50 backdrop-blur-sm lg:hidden",
            onClick: d[0] || (d[0] = (...c) => t(i) && t(i)(...c))
          }))
        ]),
        _: 1
      }),
      o("nav", {
        class: u([[t(l) ? "w-0 lg:w-16" : "w-60"], "fixed inset-y-0 left-0 z-[60] flex h-full flex-col overflow-hidden bg-neutral-50 transition-all duration-300 lg:relative lg:flex lg:z-40 dark:bg-neutral-800"])
      }, [
        o("header", ye, [
          o("span", {
            class: u(["block p-1 text-lg font-bold whitespace-nowrap text-neutral-900 dark:text-white", { "lg:hidden": t(l) }])
          }, x(e.headerTitle), 3),
          g(t(S), {
            class: "hidden lg:inline-flex",
            "aria-label": t(l) ? "Expand Sidebar" : "Collapse Sidebar",
            onClick: t(i)
          }, {
            default: _(() => [
              (a(), f(z(t(l) ? t(ee) : t(Y)), { class: "size-5 flex-none" }))
            ]),
            _: 1
          }, 8, ["aria-label", "onClick"]),
          g(t(S), {
            class: "inline-flex lg:hidden",
            "aria-label": t(l) ? "Open Menu" : "Close Menu",
            onClick: t(i)
          }, {
            default: _(() => [
              (a(), f(z(t(l) ? t(Q) : t(ne)), { class: "size-6 flex-none" }))
            ]),
            _: 1
          }, 8, ["aria-label", "onClick"])
        ]),
        o("section", Ce, [
          (a(!0), s(M, null, A(e.linkGroups, (c) => (a(), s("div", {
            key: c.name,
            class: "space-y-3 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral-200 dark:[&:not(:last-child)]:border-neutral-700/75"
          }, [
            o("p", {
              class: u(["px-2 text-xs font-semibold text-neutral-400/75 uppercase", { "lg:hidden": t(l) }])
            }, x(c.label), 3),
            o("ul", {
              class: u(["space-y-1", t(l) ? "flex flex-col items-center" : ""])
            }, [
              (a(!0), s(M, null, A(c.links, (p) => (a(), s("li", {
                key: p.name
              }, [
                g(be, {
                  icon: p.icon,
                  label: p.label,
                  name: p.name,
                  notification: p.notification
                }, null, 8, ["icon", "label", "name", "notification"])
              ]))), 128))
            ], 2)
          ]))), 128))
        ]),
        o("footer", $e, [
          v(r.$slots, "footer", { isCollapsed: t(l) }),
          o("div", Se, [
            o("span", {
              class: u(["text-xs whitespace-nowrap text-neutral-400 dark:text-neutral-500", { "lg:hidden": t(l) }])
            }, " Instax 2026 ", 2)
          ])
        ])
      ], 2)
    ], 64));
  }
};
function je() {
  return "Instax Package Initialized";
}
export {
  Be as AccountSwitcher,
  Ae as AppLayout,
  S as ButtonIcon,
  Ne as NavBar,
  be as NavLink,
  ve as NotificationButton,
  B as NotificationIndicator,
  Te as SidebarNav,
  he as ThemeToggle,
  je as default,
  F as useEvents,
  G as useScreenStore,
  b as useThemeStore
};
