import { a as e, i as t, n, o as r, r as i, s as a, t as o } from "./chunks/store-S8phfMkM.js";
import { Link as s, boot as c, can as l, eventStream as u, events as d, getManifest as f, loadManifest as p, navigate as m, queryClient as h, registry as g, run as _, screenContext as v, screenText as y, t as b, timeAgo as x, useAbility as S, useAction as C, useLocation as w, useManifest as T, useScreen as E } from "@letterncms/sdk";
import { Button as D, Dock as O, EmptyState as k, Icon as A, IconButton as j, Menu as M, SidebarRow as N, Spinner as P, Surface as F, Textarea as I, Tooltip as L, cn as R, confirm as ee, toast as z } from "@letterncms/ui";
import { Fragment as B, lazy as V, useCallback as H, useEffect as U, useId as te, useLayoutEffect as W, useRef as G, useState as K, useSyncExternalStore as ne } from "react";
import { Fragment as q, jsx as J, jsxs as Y } from "react/jsx-runtime";
import { useInfiniteQuery as re } from "@tanstack/react-query";
// admin/src/ChatToggle.tsx
function X() {
	let { mode: t, working: r, awaiting: i } = a();
	T();
	let s = t !== "closed";
	return !o() || n() ? null : /* @__PURE__ */ J(L, {
		content: b("Chat"),
		shortcut: "mod+j",
		side: "bottom",
		children: /* @__PURE__ */ Y(D, {
			variant: "ghost",
			icon: !s && (r || i) ? void 0 : "comment",
			"aria-pressed": s,
			onClick: () => s ? e.close() : e.open(),
			className: R("aria-pressed:bg-active aria-pressed:text-ink", !s && "text-muted hover:text-text"),
			children: [
				!s && i && /* @__PURE__ */ J("span", {
					role: "status",
					"aria-label": b("Waiting for your go-ahead"),
					className: "size-1.5 rounded-full bg-signal ring-1 ring-border-strong"
				}),
				!s && !i && r && /* @__PURE__ */ J("span", {
					role: "status",
					"aria-label": b("Working…"),
					children: /* @__PURE__ */ J(P, { size: 12 })
				}),
				/* @__PURE__ */ J("span", {
					className: "max-sm:sr-only",
					children: b("Chat")
				})
			]
		})
	});
}
// admin/src/context.ts
var Z = 4e4, Q = 12e3, ie = 4e3;
function ae(e, t) {
	if (e.private) return [];
	let n = [];
	if (e.title && n.push({
		id: "page",
		kind: "page",
		label: e.title,
		icon: e.icon ?? "file",
		to: t.contextPath,
		read: e.kind ? async () => ({
			kind: e.kind,
			...e.data?.()
		}) : () => y(Q)
	}), n.push(...e.items ?? []), t.selectedText) {
		let e = t.selectedText.slice(0, ie);
		n.push({
			id: "text",
			kind: "selected_text",
			label: e.replace(/\s+/g, " "),
			icon: "quote",
			read: () => e
		});
	}
	return n.filter((e) => !t.dismissed.includes(e.id));
}
function oe(e, t) {
	let n = t.attached[t.conversation ?? "new"] ?? [];
	return [...ae(e, t), ...n.filter((n) => !ae(e, t).some((e) => e.id === n.id))];
}
var se = (e) => {
	if (e != null && e !== "") try {
		return (typeof e == "string" ? e : JSON.stringify(e)).slice(0, Z);
	} catch {
		return;
	}
}, ce = /* @__PURE__ */ new Map();
async function le(t) {
	let n = v.get(), r = e.get(), i = t ?? "new", a = oe(n, r), o = r.skills[i]?.skill;
	e.set({
		attached: {
			...r.attached,
			[i]: []
		},
		skills: {
			...r.skills,
			[i]: null
		},
		selectedText: ""
	}), await n.flush?.();
	let s = t && ce.get(t) || /* @__PURE__ */ new Map(), c = new Map(s), l = await Promise.all(a.map(async (e) => {
		let t = {
			kind: e.kind,
			label: e.label,
			icon: e.icon,
			to: e.to
		}, n = se(await Promise.resolve().then(() => e.read?.()).catch(() => void 0));
		return n === void 0 ? t : s.get(e.id) === n ? {
			...t,
			unchanged: !0
		} : (c.set(e.id, n), {
			...t,
			content: n
		});
	}));
	return {
		context: {
			path: a.some((e) => e.id === "page") || n.private ? r.contextPath : void 0,
			items: l,
			skill: o ?? void 0
		},
		carry: (e) => ce.set(e, c)
	};
}
function ue(e) {
	e && ce.delete(e);
}
document.addEventListener("selectionchange", () => {
	let t = document.getSelection(), n = t?.anchorNode, r = n instanceof Element ? n : n?.parentElement;
	if (!t || !r?.closest("[data-cms-screen]")) return;
	let i = t.isCollapsed ? "" : t.toString().trim();
	i !== e.get().selectedText && e.set({
		selectedText: i,
		dismissed: e.get().dismissed.filter((e) => e !== "text")
	});
});
var de = {
	page: () => b("{brand} sees this page"),
	block: () => b("{brand} sees this block"),
	selected_text: () => b("{brand} sees the text you selected")
};
// admin/src/Composer.tsx
function fe(e, t) {
	let n = /(?:^|\s)@([^\s@]*)$|(?:^|\n)\/([^\s/]*)$/.exec(e.slice(0, t));
	if (!n) return null;
	let r = n[1] === void 0 ? "/" : "@", i = n[1] ?? n[2] ?? "";
	return {
		char: r,
		query: i,
		start: t - i.length - 1
	};
}
function pe(e) {
	let t = ne(g.composer.subscribe, g.composer.version), [n, r] = K([]), [i, a] = K(!1), o = e?.char, s = e?.query;
	return U(() => {
		if (!o) {
			r([]);
			return;
		}
		let e = !1;
		a(!0);
		let t = g.composer.all().filter((e) => e.trigger === o).sort((e, t) => (e.order ?? 50) - (t.order ?? 50)), n = setTimeout(() => {
			let n = /* @__PURE__ */ new Map(), i = t.length;
			i || a(!1);
			for (let o of t) Promise.resolve().then(() => o.search(s ?? "")).catch(() => []).then((s) => {
				e || (n.set(o.id, s), r(t.map((e) => ({
					source: e,
					options: n.get(e.id) ?? []
				})).filter((e) => e.options.length > 0)), --i === 0 && a(!1));
			});
		}, s ? 120 : 0);
		return () => {
			e = !0, clearTimeout(n);
		};
	}, [
		o,
		s,
		t
	]), {
		groups: n,
		loading: i
	};
}
function me({ onAdd: t }) {
	let n = a(), r = E(), i = n.conversation ?? "new", o = oe(r, n), s = n.skills[i], c = new Set(ae(r, n).map((e) => e.id)), l = r.title && !r.private && n.dismissed.includes("page"), u = (t) => {
		t.id === "text" ? e.set({ selectedText: "" }) : c.has(t.id) ? e.set({ dismissed: [...n.dismissed, t.id] }) : e.set({ attached: {
			...n.attached,
			[i]: (n.attached[i] ?? []).filter((e) => e.id !== t.id)
		} });
	};
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-wrap items-center gap-1 px-2 pt-2",
		children: [
			/* @__PURE__ */ J(L, {
				content: b("Add Context"),
				shortcut: "@",
				children: /* @__PURE__ */ J("button", {
					type: "button",
					"aria-label": b("Add Context"),
					onClick: t,
					className: "cms-assistant-chip justify-center !px-0 w-[22px] text-muted hover:text-text",
					children: /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-xs leading-none",
						children: "@"
					})
				})
			}),
			s && /* @__PURE__ */ J(he, {
				icon: s.icon ?? "sparkle",
				label: s.label,
				hint: s.detail ?? s.label,
				strong: !0,
				onRemove: () => e.set({ skills: {
					...n.skills,
					[i]: null
				} })
			}),
			o.map((e) => /* @__PURE__ */ J(he, {
				icon: e.icon ?? "file",
				label: e.label,
				hint: (e.kind && de[e.kind]?.()) ?? e.label,
				strong: !c.has(e.id),
				onRemove: () => u(e)
			}, e.id)),
			l && /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: () => e.set({ dismissed: n.dismissed.filter((e) => e !== "page") }),
				className: "cms-assistant-chip pr-1.5 text-faint hover:text-text",
				children: [/* @__PURE__ */ J(A, {
					name: "plus",
					size: 11
				}), /* @__PURE__ */ J("span", {
					className: "truncate",
					children: r.title
				})]
			})
		]
	});
}
function he({ icon: e, label: t, hint: n, strong: r, onRemove: i }) {
	return /* @__PURE__ */ Y("span", {
		className: R("cms-assistant-chip", r ? "text-text" : "text-muted"),
		children: [/* @__PURE__ */ J(L, {
			content: n,
			children: /* @__PURE__ */ Y("span", {
				tabIndex: 0,
				className: "flex min-w-0 items-center gap-1 outline-offset-1",
				children: [/* @__PURE__ */ J(A, {
					name: e,
					size: 11,
					className: "shrink-0"
				}), /* @__PURE__ */ J("span", {
					className: "truncate",
					children: t
				})]
			})
		}), /* @__PURE__ */ J("button", {
			type: "button",
			"aria-label": b("Remove {name}", { name: t }),
			onClick: i,
			className: "grid size-4 shrink-0 place-items-center rounded-xs text-faint hover:bg-hover hover:text-text",
			children: /* @__PURE__ */ J(A, {
				name: "close",
				size: 10
			})
		})]
	});
}
function ge({ id: e, trigger: t, groups: n, loading: r, active: i, onActive: a, onPick: o }) {
	let s = G(null);
	W(() => {
		s.current?.querySelector("[aria-selected=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [i]);
	let c = -1;
	return /* @__PURE__ */ Y("div", {
		ref: s,
		id: e,
		role: "listbox",
		"aria-label": t.char === "@" ? b("Add Context") : b("Skills"),
		className: "cms-pop absolute inset-x-0 bottom-full z-10 mb-1.5 max-h-72 overflow-y-auto overscroll-contain p-1",
		children: [n.map(({ source: t, options: n }) => /* @__PURE__ */ Y("div", {
			role: "group",
			"aria-label": t.label,
			children: [/* @__PURE__ */ J("div", {
				className: "flex h-6 items-center px-2 text-2xs font-medium text-faint",
				children: t.label
			}), n.map((t) => {
				c++;
				let n = c;
				return /* @__PURE__ */ Y("div", {
					id: `${e}-${n}`,
					role: "option",
					"aria-selected": n === i,
					onMouseEnter: () => a(n),
					onMouseDown: (e) => {
						e.preventDefault(), o(t);
					},
					className: R("flex min-h-8 cursor-default items-center gap-2 rounded-sm px-2 py-1 text-sm", n === i ? "bg-hover text-ink" : "text-text"),
					children: [
						/* @__PURE__ */ J(A, {
							name: t.icon ?? "file",
							size: 14,
							className: "shrink-0 text-muted"
						}),
						/* @__PURE__ */ J("span", {
							className: "shrink-0 truncate",
							children: t.label
						}),
						t.detail && /* @__PURE__ */ J("span", {
							className: "min-w-0 flex-1 truncate text-xs text-faint",
							children: t.detail
						})
					]
				}, t.id);
			})]
		}, t.id)), n.length === 0 && /* @__PURE__ */ J("div", {
			className: "flex h-8 items-center gap-2 px-2 text-sm text-muted",
			children: r ? /* @__PURE__ */ Y(q, { children: [
				/* @__PURE__ */ J(P, { size: 12 }),
				" ",
				b("Looking…")
			] }) : b("Nothing found")
		})]
	});
}
function _e({ placeholder: t, focus: n, onSubmit: r, children: i }) {
	let { drafts: o, conversation: s } = a(), c = s ?? "new", l = o[c] ?? "", u = G(null), [d, f] = K(0), [p, m] = K(null), [h, g] = K(0), _ = te(), v = fe(l, d), y = v && v.start !== p ? v : null, { groups: x, loading: S } = pe(y), C = x.flatMap((e) => e.options), w = y !== null;
	U(() => {
		if (!n) return;
		let e = requestAnimationFrame(() => u.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [n]), U(() => g(0), [y?.char, y?.query]), U(() => {
		v || m(null);
	}, [v]);
	let T = (t, n) => {
		e.draft(t), f(n), requestAnimationFrame(() => {
			u.current?.focus(), u.current?.setSelectionRange(n, n);
		});
	}, E = (t) => {
		if (!y) return;
		let n = l.slice(0, y.start), r = l.slice(y.start + 1 + y.query.length);
		if (t.insert !== void 0) {
			T(n + t.insert + r, n.length + t.insert.length);
			return;
		}
		if (t.perform || t.skill) {
			T(n + r, n.length), t.perform ? t.perform() : e.set({ skills: {
				...e.get().skills,
				[c]: t
			} });
			return;
		}
		let i = `@${t.label} `;
		T(n + i + r, n.length + i.length), e.set({ attached: {
			...e.get().attached,
			[c]: [...(e.get().attached[c] ?? []).filter((e) => e.id !== t.id), t]
		} });
	};
	return /* @__PURE__ */ Y("div", {
		className: "relative",
		children: [w && /* @__PURE__ */ J(ge, {
			id: _,
			trigger: y,
			groups: x,
			loading: S,
			active: h,
			onActive: g,
			onPick: E
		}), /* @__PURE__ */ Y("form", {
			onSubmit: (e) => {
				e.preventDefault(), r();
			},
			className: "cms-assistant-composer overflow-hidden rounded-lg border border-border bg-bg transition-colors focus-within:border-border-strong",
			children: [
				/* @__PURE__ */ J(me, { onAdd: () => {
					let e = u.current?.selectionStart ?? l.length, t = e > 0 && !/\s/.test(l[e - 1]) ? " " : "";
					T(`${l.slice(0, e)}${t}@${l.slice(e)}`, e + t.length + 1);
				} }),
				/* @__PURE__ */ J(I, {
					ref: u,
					value: l,
					onChange: (t) => {
						e.draft(t.target.value), f(t.target.selectionStart);
					},
					onSelect: (e) => f(e.currentTarget.selectionStart),
					onKeyDown: (e) => {
						if (!e.nativeEvent.isComposing) {
							if (w && C.length > 0) {
								if (e.key === "ArrowDown" || e.key === "ArrowUp") {
									e.preventDefault(), g((t) => (t + (e.key === "ArrowDown" ? 1 : -1) + C.length) % C.length);
									return;
								}
								if (e.key === "Enter" || e.key === "Tab") {
									e.preventDefault(), E(C[Math.min(h, C.length - 1)]);
									return;
								}
							}
							w && e.key === "Escape" ? (e.preventDefault(), m(y.start)) : e.key === "Enter" && !e.shiftKey && (e.preventDefault(), r());
						}
					},
					rows: 2,
					placeholder: t,
					"aria-label": b("Message {brand}"),
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-expanded": w,
					"aria-controls": w ? _ : void 0,
					"aria-activedescendant": w && C.length > 0 ? `${_}-${h}` : void 0,
					className: "max-h-52 min-h-0 resize-none border-0 bg-transparent px-3 pt-2.5 text-sm shadow-none focus:ring-0 focus-visible:outline-none"
				}),
				i
			]
		})]
	});
}
// admin/src/History.tsx
var ve = 30;
function ye() {
	let e = l("assistant.use"), { working: t, conversation: n, title: r } = a(), i = re({
		queryKey: ["assistant/conversations", "list"],
		initialPageParam: 0,
		queryFn: ({ pageParam: e }) => _("assistant/conversations", {
			limit: ve,
			offset: e
		}),
		getNextPageParam: (e, t) => e.length === ve ? t.length * ve : void 0,
		enabled: e
	}), o = i.data?.pages.flat() ?? [], s = n && i.data && !o.some((e) => e.id === n) ? [{
		id: n,
		title: r,
		updatedAt: null
	}, ...o] : o;
	return {
		history: i,
		chats: t?.conversation ? [{
			id: t.conversation,
			title: t.title,
			updatedAt: s.find((e) => e.id === t.conversation)?.updatedAt ?? null
		}, ...s.filter((e) => e.id !== t.conversation)] : s
	};
}
function be({ chat: t, remove: n }) {
	let { conversation: r, working: i, drafts: o } = a(), s = i?.conversation === t.id, c = !!o[t.id]?.trim();
	return /* @__PURE__ */ J(N, {
		label: t.title || b("New Chat"),
		title: `${t.title} · ${x(t.updatedAt)}`,
		onClick: () => e.select(t.id),
		active: r === t.id,
		status: s || c ? /* @__PURE__ */ Y(q, { children: [s && /* @__PURE__ */ J("span", {
			role: "status",
			"aria-label": b("Working…"),
			children: /* @__PURE__ */ J(P, { size: 12 })
		}), c && /* @__PURE__ */ J("span", { children: b("Draft") })] }) : void 0,
		actions: [{
			label: b("Delete Chat"),
			icon: "trash",
			danger: !0,
			quick: !0,
			disabled: s,
			onSelect: () => n(t)
		}]
	});
}
function xe() {
	let { working: t } = a(), n = C("assistant/conversation-delete", {
		invalidates: ["assistant/conversations"],
		onSuccess: (t, { id: n }) => {
			e.deleted(n), z.success(b("Chat deleted"));
		},
		onError: z.error
	});
	return async (e) => {
		t?.conversation === e.id || n.isPending || await ee({
			title: b("Delete “{title}”?", { title: e.title || b("New Chat") }),
			description: b("This chat and its messages will be permanently deleted."),
			confirm: b("Delete Chat"),
			danger: !0
		}) && n.mutate({ id: e.id });
	};
}
function Se() {
	let { history: t, chats: n } = ye(), r = xe(), { drafts: i, working: o, conversation: s } = a(), c = o?.conversation === null, l = i.new?.trim(), u = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0), d = [
		{
			label: b("Today"),
			from: u
		},
		{
			label: b("Previous 7 Days"),
			from: u - 6048e5
		},
		{
			label: b("Older"),
			from: -Infinity
		}
	].map((e, t, r) => ({
		...e,
		chats: n.filter((n) => {
			let i = n.updatedAt ? new Date(n.updatedAt).getTime() : Date.now();
			return i >= e.from && (t === 0 || i < r[t - 1].from);
		})
	})).filter((e) => e.chats.length > 0), f = G(null);
	return U(() => {
		let e = f.current;
		if (!e) return;
		let n = new IntersectionObserver(([e]) => {
			e.isIntersecting && t.hasNextPage && !t.isFetchingNextPage && t.fetchNextPage();
		}, { rootMargin: "200px" });
		return n.observe(e), () => n.disconnect();
	}, [
		t.hasNextPage,
		t.isFetchingNextPage,
		t.fetchNextPage
	]), /* @__PURE__ */ Y("nav", {
		"aria-label": b("Chats"),
		className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-4 pt-1",
		children: [
			(c || l && s !== null) && /* @__PURE__ */ J(N, {
				label: (c ? o.title : l) || b("New Chat"),
				onClick: () => e.select(null),
				active: s === null,
				status: c ? /* @__PURE__ */ J("span", {
					role: "status",
					"aria-label": b("Working…"),
					children: /* @__PURE__ */ J(P, { size: 12 })
				}) : b("Draft"),
				actions: [!c && {
					label: b("Discard Draft"),
					icon: "close",
					quick: !0,
					onSelect: () => e.set({ drafts: {
						...e.get().drafts,
						new: ""
					} })
				}]
			}),
			d.map((e) => /* @__PURE__ */ Y("section", {
				"aria-label": e.label,
				className: "mt-2 first:mt-0",
				children: [/* @__PURE__ */ J("h3", {
					className: "m-0 flex h-7 items-center px-2 text-xs font-medium text-faint",
					children: e.label
				}), /* @__PURE__ */ J("div", {
					className: "space-y-px",
					children: e.chats.map((e) => /* @__PURE__ */ J(be, {
						chat: e,
						remove: (e) => void r(e)
					}, e.id))
				})]
			}, e.label)),
			t.isPending && /* @__PURE__ */ J("div", {
				className: "grid h-24 place-items-center text-faint",
				children: /* @__PURE__ */ J(P, {})
			}),
			t.isError && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: () => void t.refetch(),
				className: "px-2 py-1.5 text-left text-xs text-muted hover:text-text",
				children: b("Could not load chats. Try again")
			}),
			t.hasNextPage && /* @__PURE__ */ J("div", {
				ref: f,
				className: "grid h-10 place-items-center text-faint",
				children: t.isFetchingNextPage && /* @__PURE__ */ J(P, { size: 14 })
			})
		]
	});
}
function Ce() {
	return /* @__PURE__ */ J(L, {
		content: b("New Chat"),
		children: /* @__PURE__ */ J(j, {
			icon: "plus",
			label: b("New Chat"),
			title: void 0,
			onClick: () => e.newChat()
		})
	});
}
// admin/src/Markdown.tsx
function we({ text: e }) {
	return /* @__PURE__ */ J("div", {
		className: "cms-md space-y-2.5 text-sm leading-[1.6] text-text",
		children: Te(e)
	});
}
function Te(e) {
	let t = e.replace(/\r\n/g, "\n").split("\n"), n = [], r = 0;
	for (; r < t.length;) {
		let e = t[r];
		if (!e.trim()) {
			r++;
			continue;
		}
		let i = e.match(/^\s*(```|~~~)\s*([\w-]*)/);
		if (i) {
			let e = [];
			for (r++; r < t.length && !t[r].trimStart().startsWith(i[1]);) e.push(t[r++]);
			r++, n.push(/* @__PURE__ */ J("pre", {
				className: "overflow-x-auto rounded-sm border border-border bg-sunken px-3 py-2 font-mono text-xs leading-relaxed text-text",
				children: /* @__PURE__ */ J("code", { children: e.join("\n") })
			}, n.length));
			continue;
		}
		let a = e.match(/^(#{1,4})\s+(.*)$/);
		if (a) {
			let e = a[1].length <= 2 ? "text-[15px]" : "text-sm";
			n.push(/* @__PURE__ */ J("p", {
				className: `${e} pt-1 font-semibold tracking-[-0.01em] text-ink`,
				children: $(a[2])
			}, n.length)), r++;
			continue;
		}
		if (/^\s*\|.*\|\s*$/.test(e) && /^\s*\|?\s*:?-{2,}/.test(t[r + 1] ?? "")) {
			let i = (e) => e.trim().replace(/^\||\|$/g, "").split("|").map((e) => e.trim()), a = i(e), o = [];
			for (r += 2; r < t.length && /^\s*\|.*\|\s*$/.test(t[r]);) o.push(i(t[r++]));
			n.push(/* @__PURE__ */ J("div", {
				className: "overflow-x-auto rounded-sm border border-border",
				children: /* @__PURE__ */ Y("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ J("thead", {
						className: "bg-surface text-muted",
						children: /* @__PURE__ */ J("tr", { children: a.map((e, t) => /* @__PURE__ */ J("th", {
							className: "px-2.5 py-1.5 font-medium",
							children: $(e)
						}, t)) })
					}), /* @__PURE__ */ J("tbody", { children: o.map((e, t) => /* @__PURE__ */ J("tr", {
						className: "border-t border-border",
						children: e.map((e, t) => /* @__PURE__ */ J("td", {
							className: "px-2.5 py-1.5 align-top",
							children: $(e)
						}, t))
					}, t)) })]
				})
			}, n.length));
			continue;
		}
		if (/^\s*>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s*>/.test(t[r]);) e.push(t[r++].replace(/^\s*>\s?/, ""));
			n.push(/* @__PURE__ */ J("blockquote", {
				className: "border-l-2 border-border-strong pl-3 text-muted",
				children: Te(e.join("\n"))
			}, n.length));
			continue;
		}
		let o = /^\s*[-*+]\s+/, s = /^\s*\d+[.)]\s+/;
		if (o.test(e) || s.test(e)) {
			let i = s.test(e), a = i ? s : o, c = [];
			for (; r < t.length && (a.test(t[r]) || /^\s{2,}\S/.test(t[r]) && c.length);) a.test(t[r]) ? c.push(t[r].replace(a, "")) : c[c.length - 1] += `\n${t[r].trim()}`, r++;
			let l = i ? "ol" : "ul";
			n.push(/* @__PURE__ */ J(l, {
				className: `${i ? "list-decimal" : "list-disc"} space-y-1 pl-5 marker:text-faint`,
				children: c.map((e, t) => /* @__PURE__ */ J("li", { children: $(e) }, t))
			}, n.length));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !/^(\s*(```|~~~|>|[-*+]\s|\d+[.)]\s)|#{1,4}\s)/.test(t[r]);) c.push(t[r++]);
		c.length === 0 && c.push(t[r++]), n.push(/* @__PURE__ */ J("p", { children: $(c.join("\n")) }, n.length));
	}
	return n;
}
var Ee = /(`[^`]+`)|(\*\*[^*]+\*\*|__[^_]+__)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(\[[^\]]+\]\([^)\s]+\))|(\n)/g;
function $(e) {
	let t = [], n = 0;
	for (let r of e.matchAll(Ee)) {
		r.index > n && t.push(e.slice(n, r.index));
		let [i] = r, a = t.length;
		if (r[1]) t.push(/* @__PURE__ */ J("code", {
			className: "rounded-xs bg-sunken px-1 py-px font-mono text-[0.92em]",
			children: i.slice(1, -1)
		}, a));
		else if (r[2]) t.push(/* @__PURE__ */ J("strong", {
			className: "font-semibold text-ink",
			children: $(i.slice(2, -2))
		}, a));
		else if (r[3]) t.push(/* @__PURE__ */ J("em", { children: $(i.slice(1, -1)) }, a));
		else if (r[4]) {
			let [, e, n] = i.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
			t.push(/* @__PURE__ */ J(De, {
				href: n,
				children: $(e)
			}, a));
		} else t.push(/* @__PURE__ */ J("br", {}, a));
		n = r.index + i.length;
	}
	return n < e.length && t.push(e.slice(n)), t;
}
function De({ href: e, children: t }) {
	let n = e.startsWith(`${c.base}/`) || e === c.base;
	return n || /^(https?:\/\/|\/(?!\/)|mailto:)/i.test(e) ? /* @__PURE__ */ J("a", {
		href: e,
		target: n ? void 0 : "_blank",
		rel: n ? void 0 : "noopener noreferrer",
		className: "text-ink underline decoration-border-strong underline-offset-2 hover:decoration-ink",
		onClick: (t) => {
			!n || t.metaKey || t.ctrlKey || (t.preventDefault(), m(e.slice(c.base.length) || "/"));
		},
		children: t
	}) : /* @__PURE__ */ J(q, { children: t });
}
// admin/src/useChat.ts
function Oe(t, { picked: n, fallback: r, offered: i, thread: a = 0 } = {}) {
	let [o, s] = K([]), [c, l] = K(null), f = n ?? (c && (!i || i.includes(c)) ? c : r), [m, g] = K([]), [v, y] = K(""), [x, S] = K(!1), [C, w] = K(!1), [T, E] = K(null), D = G(null), O = G(t), k = G(a), A = G(f);
	A.current = f, U(() => {
		if (t === O.current && a === k.current && (o.length || x) || (k.current = a, D.current?.abort(), D.current = null, S(!1), w(!1), O.current = t, s([]), y(""), l(null), E(null), g([]), !t)) return;
		let n = !1;
		return w(!0), _("assistant/conversation", { id: t }).then((t) => {
			n || (s(t.items), g(t.awaiting), y(t.title), l(t.model), e.set({ title: t.title }));
		}).catch((r) => {
			n || (r.status === 404 ? e.deleted(t) : E(r.message));
		}).finally(() => !n && w(!1)), () => {
			n = !0;
		};
	}, [t, a]), U(() => () => D.current?.abort(), []);
	let j = (e) => s((t) => {
		let n = t[t.length - 1];
		return n?.role === "assistant" ? [...t.slice(0, -1), {
			...n,
			parts: e(n.parts)
		}] : [...t, {
			role: "assistant",
			parts: e([])
		}];
	}), M = (e, t) => s((n) => n.map((n) => n.role === "assistant" ? {
		...n,
		parts: n.parts.map((n) => n.type === "tool" && n.id === e ? {
			...n,
			...t
		} : n)
	} : n)), N = (e, t) => j((n) => {
		let r = n[n.length - 1];
		return r?.type === e ? [...n.slice(0, -1), {
			...r,
			text: r.text + t
		}] : [...n, {
			type: e,
			text: t
		}];
	}), P = H(async (t, n) => {
		D.current?.abort();
		let r = new AbortController();
		D.current = r, S(!0), E(null);
		let i = {
			conversation: O.current,
			title: e.get().title || String(t.message ?? b("New Chat"))
		};
		e.set({ working: i });
		let a = !1, o = !1, c = A.current, f = typeof t.message == "string" && (!O.current || t.edit?.index === 0);
		try {
			t.edit && ue(O.current);
			let f = typeof t.message == "string" ? await le(O.current) : null;
			if (r.signal.aborted) return !1;
			await u("assistant/chat", {
				conversation: O.current,
				model: c,
				...t,
				context: f?.context
			}, (u, p) => {
				if (!(r.signal.aborted || D.current !== r)) switch (u) {
					case "user_message": {
						o = !0;
						let e = t.edit;
						s((t) => {
							let n = e ? t.findIndex((t) => t.role === "user" && t.messageIndex === e.index) : t.findLastIndex((e) => e.role === "user");
							return n < 0 ? t : [
								...t.slice(0, n),
								{
									role: "user",
									text: p.text,
									messageIndex: p.messageIndex,
									attached: p.attached
								},
								...e ? [] : t.slice(n + 1)
							];
						}), e && (g([]), n?.());
						break;
					}
					case "conversation":
						c && l(c), O.current = p.id, f?.carry(p.id), i = {
							conversation: p.id,
							title: p.title
						}, e.set({ working: i }), y(p.title), e.created(p.id, p.title), h.invalidateQueries({ queryKey: ["assistant/conversations"] });
						break;
					case "text":
					case "thinking":
						N(u, p.delta);
						break;
					case "tool":
						j((e) => [...e, {
							type: "tool",
							id: p.id,
							name: p.name,
							label: p.label,
							status: "running"
						}]);
						break;
					case "tool_result":
						M(p.id, {
							status: p.declined ? "declined" : p.ok ? "ok" : "error",
							output: p.output,
							input: p.input,
							surface: p.surface ?? void 0
						}), a ||= p.mutated, p.mutated && (h.invalidateQueries(), d.emit("content.changed"));
						break;
					case "surface_used":
						M(p.id, { used: !0 });
						break;
					case "approval":
						g(p.calls);
						for (let e of p.calls) M(e.id, {
							status: "awaiting",
							input: e.input
						});
						break;
					case "notice":
						s((e) => [...e, {
							role: "notice",
							text: p.message,
							tone: p.tone
						}]);
						break;
					case "error":
						E(p.message);
						break;
					case "done": y(p.conversation.title), e.set({ title: p.conversation.title });
				}
			}, r.signal);
		} catch (e) {
			r.signal.aborted || E(e instanceof Error ? e.message : b("The assistant failed."));
		} finally {
			if (a) try {
				await p();
			} catch (e) {
				!r.signal.aborted && D.current === r && E(e instanceof Error ? e.message : b("The assistant failed."));
			}
			e.get().working === i && e.set({ working: null }), D.current === r && (D.current = null, S(!1)), a && h.invalidateQueries(), h.invalidateQueries({ queryKey: ["assistant/conversations"] }), f && O.current && F(O.current);
		}
		return o;
	}, []), F = async (t) => {
		try {
			let { title: n } = await _("assistant/conversation-title", { id: t });
			O.current === t && (y(n), e.set({ title: n })), h.invalidateQueries({ queryKey: ["assistant/conversations"] });
		} catch {}
	}, I = H((e, t, n) => D.current || C || !O.current || e.messageIndex === void 0 || !t.trim() ? Promise.resolve(!1) : P({
		message: t.trim(),
		edit: {
			index: e.messageIndex,
			original: e.text
		}
	}, n), [C, P]);
	return {
		items: o,
		awaiting: m,
		title: v,
		model: f,
		busy: x,
		loading: C,
		error: T,
		send: H((e) => {
			let t = e.trim();
			if (t) {
				for (let e of m) M(e.id, { status: "declined" });
				g([]), s((e) => [...e, {
					role: "user",
					text: t
				}]), P({ message: t });
			}
		}, [m, P]),
		edit: I,
		decide: H((e) => {
			for (let t of m) e.includes(t.id) || M(t.id, { status: "declined" });
			for (let t of e) M(t, { status: "running" });
			g([]), P({ approve: e });
		}, [m, P]),
		stop: H(() => {
			D.current?.abort(), D.current = null, S(!1), e.set({ working: null }), s((e) => [...e, {
				role: "notice",
				text: b("Stopped. The step in progress still finishes on the server."),
				tone: "neutral"
			}]);
		}, []),
		interact: H((e, t) => {
			if (D.current || m.length || !O.current || C) return;
			let n = o.flatMap((e) => e.role === "assistant" ? e.parts : []).find((t) => t.type === "tool" && t.id === e);
			n?.type === "tool" && n.surface && !n.used && (s((e) => [...e, {
				role: "user",
				text: b("Selected an action in “{title}”.", { title: n.surface.title })
			}]), P({ action: {
				tool: e,
				...t
			} }));
		}, [
			o,
			m,
			C,
			P
		]),
		dismissError: () => E(null)
	};
}
// admin/src/Panel.tsx
var ke = "assistant.model";
function Ae(e) {
	let t = f().user.preferences?.[ke];
	return e.models.some((e) => e.id === t) ? t : e.model;
}
function je(e) {
	let t = f().user;
	t.preferences = {
		...t.preferences ?? {},
		[ke]: e
	}, _("account/update", { preferences: { [ke]: e } }).catch(() => {});
}
var Me = window.matchMedia("(min-width: 1024px)"), Ne = () => ne((e) => (Me.addEventListener("change", e), () => Me.removeEventListener("change", e)), () => Me.matches);
function Pe() {
	let { path: t } = w(), { mode: n, title: s } = a(), c = r(), l = i(t);
	return W(() => {
		let n = e.get();
		l === void 0 ? (t !== n.contextPath && e.set({
			contextPath: t,
			dismissed: [],
			selectedText: ""
		}), n.mode === "full" && e.set({ mode: "docked" })) : e.set({
			mode: "full",
			history: !1,
			...n.conversation === l ? {} : {
				conversation: l,
				prompt: null
			}
		});
	}, [t, l]), o() ? /* @__PURE__ */ J(O, {
		open: n !== "closed",
		full: n === "full",
		floating: c.chosen || c.required,
		label: s || b("New Chat"),
		children: /* @__PURE__ */ J(Fe, {
			open: n !== "closed",
			full: n === "full"
		})
	}) : null;
}
function Fe({ open: t, full: n }) {
	let { conversation: i, thread: o, prompt: s, drafts: c, models: l, focus: u, history: d } = a(), f = r(), p = Ne(), m = ne((e) => {
		let t = window.matchMedia("(min-width: 768px)");
		return t.addEventListener("change", e), () => t.removeEventListener("change", e);
	}, () => window.matchMedia("(min-width: 768px)").matches), h = n && p, g = S("assistant/status", {}, { staleTime: 6e4 }), _ = Oe(i, {
		picked: l[i ?? "new"] ?? (i || !g.data ? void 0 : Ae(g.data)),
		fallback: g.data?.model,
		offered: g.data?.models.map((e) => e.id),
		thread: o
	});
	U(() => e.set({ awaiting: _.awaiting.length > 0 }), [_.awaiting.length]);
	let v = C("assistant/conversation-delete", {
		invalidates: ["assistant/conversations"],
		onSuccess: (t, { id: n }) => {
			e.deleted(n), z.success(b("Chat deleted"));
		},
		onError: z.error
	}), y = c[i ?? "new"] ?? "", x = e.draft, [w, T] = K(0), [E, O] = K(null), k = G(null), N = G(!0);
	U(() => {
		t && s && !_.busy && !_.loading && !v.isPending && E === null && g.data?.configured && (e.set({ prompt: null }), _.send(s));
	}, [
		t,
		s,
		_,
		v.isPending,
		E,
		g.data?.configured
	]), U(() => {
		N.current = !0, O(null), t && T((e) => e + 1);
	}, [
		i,
		t,
		u
	]), W(() => {
		let e = k.current;
		t && e && N.current && (e.scrollTop = e.scrollHeight);
	});
	let F = a().skills[i ?? "new"], I = !!y.trim() || !!F, B = () => {
		!I || _.busy || _.loading || v.isPending || E !== null || (N.current = !0, _.send(y.trim() || F.label), x(""));
	}, V = g.data?.configured === !0, H = /* @__PURE__ */ new Map();
	for (let e of _.items) if (e.role === "assistant") for (let t of e.parts) t.type === "tool" && t.surface && t.status === "ok" && H.set(t.surface.id, t.id);
	let te = {
		disabled: _.busy || _.loading || _.awaiting.length > 0 || E !== null,
		onAction: _.interact,
		surfaces: H
	}, re = async () => {
		!i || _.busy || _.loading || v.isPending || await ee({
			title: b("Delete “{title}”?", { title: _.title || b("New Chat") }),
			description: b("This chat and its messages will be permanently deleted."),
			confirm: b("Delete Chat"),
			danger: !0
		}) && v.mutate({ id: i });
	}, X = V && !_.loading && !_.items.length, Z = _.title || b("New Chat"), Q = d && !h;
	return /* @__PURE__ */ Y("div", {
		className: "cms-assistant flex h-full min-h-0",
		"data-full": n || void 0,
		onKeyDown: (t) => {
			t.key !== "Escape" || t.defaultPrevented || document.querySelector("[role=\"dialog\"], [role=\"menu\"], [role=\"listbox\"], [data-popup-open]") || (Q ? e.set({ history: !1 }) : n ? e.minimize() : e.close());
		},
		children: [h && /* @__PURE__ */ Y("div", {
			className: "flex w-[260px] shrink-0 flex-col border-r border-border",
			children: [/* @__PURE__ */ Y("div", {
				className: "flex h-12 shrink-0 items-center justify-between pl-[calc(1rem+var(--cms-sidebar-toggle,0px))] pr-2",
				children: [/* @__PURE__ */ J("h2", {
					className: "m-0 text-sm font-semibold text-ink",
					children: b("Chats")
				}), /* @__PURE__ */ J(Ce, {})]
			}), /* @__PURE__ */ J(Se, {})]
		}), /* @__PURE__ */ Y("section", {
			"aria-label": Z,
			"data-empty": n && X || void 0,
			className: "cms-assistant-page relative flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ Y("header", {
				"data-dock-drag": !0,
				className: R("flex h-12 shrink-0 items-center gap-0.5 border-b border-border pr-2", n && !h ? "pl-[calc(0.75rem+var(--cms-sidebar-toggle,0px))]" : "pl-3"),
				children: [
					Q && /* @__PURE__ */ J(L, {
						content: b("Back to Chat"),
						side: "bottom",
						children: /* @__PURE__ */ J(j, {
							icon: "arrow-left",
							label: b("Back to Chat"),
							title: void 0,
							className: "-ml-1 mr-0.5",
							onClick: () => e.set({ history: !1 })
						})
					}),
					/* @__PURE__ */ J("h2", {
						className: "m-0 min-w-0 flex-1 truncate text-sm font-medium text-ink",
						children: Q ? b("Chats") : Z
					}),
					!h && /* @__PURE__ */ J(Ce, {}),
					!h && i && !Q && /* @__PURE__ */ J(L, {
						content: b("All Chats"),
						side: "bottom",
						children: /* @__PURE__ */ J(j, {
							icon: "history",
							label: b("All Chats"),
							title: void 0,
							onClick: () => e.set({ history: !0 })
						})
					}),
					i && !Q && /* @__PURE__ */ J(M, {
						trigger: /* @__PURE__ */ J(j, {
							icon: "more",
							label: b("Chat Actions"),
							disabled: v.isPending
						}),
						items: [{
							label: b("Delete Chat"),
							icon: "trash",
							danger: !0,
							disabled: _.busy || _.loading || v.isPending,
							onSelect: re
						}]
					}),
					m && !n && !f.required && /* @__PURE__ */ J(L, {
						content: f.chosen ? b("Dock Beside the Page") : b("Detach"),
						side: "bottom",
						children: /* @__PURE__ */ J(j, {
							icon: f.chosen ? "sidebar" : "detach",
							label: f.chosen ? b("Dock Beside the Page") : b("Detach"),
							title: void 0,
							onClick: () => e.set({ detached: !f.chosen })
						})
					}),
					m && /* @__PURE__ */ J(L, {
						content: b(n ? "Back to the Page" : "Full Size"),
						side: "bottom",
						children: /* @__PURE__ */ J(j, {
							icon: n ? "minimize" : "maximize",
							label: b(n ? "Back to the Page" : "Full Size"),
							title: void 0,
							onClick: () => n ? e.minimize() : e.maximize()
						})
					}),
					!n && /* @__PURE__ */ J(L, {
						content: b("Close"),
						shortcut: "mod+j",
						side: "bottom",
						children: /* @__PURE__ */ J(j, {
							icon: "close",
							label: b("Close"),
							title: void 0,
							onClick: () => e.close()
						})
					})
				]
			}), Q ? /* @__PURE__ */ J(Se, {}) : /* @__PURE__ */ Y(q, { children: [
				V && X && !h && /* @__PURE__ */ J(Se, {}),
				/* @__PURE__ */ J("div", {
					ref: k,
					onScroll: (e) => {
						let t = e.currentTarget;
						N.current = t.scrollHeight - t.scrollTop - t.clientHeight < 48;
					},
					className: R("cms-assistant-scroll min-h-0 overflow-y-auto overscroll-contain", V && X && !h ? "shrink-0" : "flex-1"),
					children: g.isPending || _.loading ? /* @__PURE__ */ J("div", {
						className: "grid h-full place-items-center text-faint",
						children: /* @__PURE__ */ J(P, {})
					}) : g.isError ? /* @__PURE__ */ Y("div", {
						role: "alert",
						className: "cms-assistant-width flex min-h-full flex-col items-center justify-center gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ J("p", { children: b("Could not connect to the assistant.") }), /* @__PURE__ */ J(D, {
							onClick: () => void g.refetch(),
							children: b("Try Again")
						})]
					}) : V ? _.items.length === 0 ? /* @__PURE__ */ J(Re, {}) : /* @__PURE__ */ Y("div", {
						className: "cms-assistant-thread cms-assistant-width space-y-6 py-5",
						children: [_.items.map((t, n) => /* @__PURE__ */ J(ze, {
							item: t,
							...te,
							editing: E === n,
							onEditingChange: (t) => {
								e.get().conversation === i && O((e) => t ? n : e === n ? null : e);
							},
							editingDisabled: _.busy || _.loading || v.isPending,
							onEdit: _.edit
						}, `${i}:${n}`)), _.busy && /* @__PURE__ */ J(Ye, { items: _.items })]
					}) : /* @__PURE__ */ J(Le, {})
				}),
				_.error && /* @__PURE__ */ J("div", {
					className: "cms-assistant-width w-full shrink-0 pb-2",
					children: /* @__PURE__ */ Y("div", {
						role: "alert",
						className: "flex items-start gap-2 rounded-md border border-danger/30 bg-danger/6 px-3 py-2 text-sm text-text",
						children: [
							/* @__PURE__ */ J(A, {
								name: "warning",
								size: 15,
								className: "mt-0.5 shrink-0 text-danger"
							}),
							/* @__PURE__ */ J("span", {
								className: "flex-1",
								children: _.error
							}),
							/* @__PURE__ */ J(j, {
								icon: "close",
								label: b("Dismiss"),
								size: "xs",
								onClick: _.dismissError
							})
						]
					})
				}),
				_.awaiting.length > 0 && E === null && /* @__PURE__ */ J(qe, {
					calls: _.awaiting,
					onDecide: _.decide
				}),
				V && /* @__PURE__ */ J("div", {
					className: "cms-assistant-footer cms-assistant-width w-full shrink-0",
					children: /* @__PURE__ */ J(_e, {
						placeholder: _.awaiting.length ? b("Or tell {brand} what to do instead…") : b("Ask anything. @ for context, / for skills"),
						focus: w,
						onSubmit: B,
						children: /* @__PURE__ */ Y("div", {
							className: "flex items-center gap-2 px-2 pb-2",
							children: [/* @__PURE__ */ J("div", {
								className: "flex min-w-0 flex-1",
								children: g.data && !_.loading && /* @__PURE__ */ J(Ie, {
									models: g.data.models,
									value: _.model,
									onChange: (t) => {
										e.model(t), je(t);
									}
								})
							}), _.busy ? /* @__PURE__ */ J(j, {
								icon: "stop",
								label: b("Stop"),
								variant: "secondary",
								onClick: _.stop
							}) : /* @__PURE__ */ J(j, {
								icon: "arrow-up",
								label: b("Send"),
								variant: "primary",
								onClick: B,
								disabled: !I || _.loading || v.isPending || E !== null
							})]
						})
					})
				})
			] })]
		})]
	});
}
function Ie({ models: e, value: t, onChange: n }) {
	let r = e.find((e) => e.id === t);
	return r ? /* @__PURE__ */ J(M, {
		side: "top",
		align: "start",
		className: "w-72",
		trigger: /* @__PURE__ */ Y("button", {
			type: "button",
			"aria-label": b("Model: {name}", { name: r.name }),
			className: "flex h-7 min-w-0 items-center gap-1 rounded-md pl-2 pr-1.5 text-xs text-muted outline-offset-[-2px] transition-colors hover:bg-hover hover:text-text data-[popup-open]:bg-hover data-[popup-open]:text-text",
			children: [/* @__PURE__ */ J("span", {
				className: "truncate",
				children: r.name
			}), /* @__PURE__ */ J(A, {
				name: "chevron-down",
				size: 12,
				className: "shrink-0 text-faint"
			})]
		}),
		items: [{
			label: b("Model"),
			heading: !0
		}, ...e.map((e) => ({
			label: e.name,
			description: e.description,
			checked: e.id === r.id,
			onSelect: () => e.id !== r.id && n(e.id)
		}))]
	}) : null;
}
function Le() {
	return T(), /* @__PURE__ */ Y("div", {
		className: "cms-assistant-width flex min-h-full flex-col items-center justify-center py-8 text-center",
		children: [
			/* @__PURE__ */ J("div", {
				className: "mb-4 grid size-10 place-items-center rounded-lg border border-border bg-surface text-muted",
				children: /* @__PURE__ */ J(A, {
					name: "key",
					size: 18
				})
			}),
			/* @__PURE__ */ J("h2", {
				className: "m-0 text-base font-semibold text-ink",
				children: b("Connect Claude")
			}),
			/* @__PURE__ */ J("p", {
				className: "m-0 mt-1 text-sm text-muted",
				children: b("The assistant needs an Anthropic API key. It is stored encrypted on this server.")
			}),
			l("settings.manage") ? /* @__PURE__ */ J(s, {
				to: "/settings/assistant",
				className: "mt-5 no-underline",
				children: /* @__PURE__ */ J(D, {
					variant: "primary",
					children: b("Open Assistant Settings")
				})
			}) : /* @__PURE__ */ J("p", {
				className: "m-0 mt-4 text-sm text-faint",
				children: b("Ask an administrator to add one.")
			}),
			/* @__PURE__ */ Y("p", {
				className: "m-0 pt-8 text-xs text-faint",
				children: [n() && /* @__PURE__ */ Y(q, { children: [b("Chat is out of the top bar."), " "] }), /* @__PURE__ */ J("button", {
					type: "button",
					className: "text-muted underline decoration-border-strong underline-offset-2 hover:text-text",
					onClick: () => {
						let r = !n();
						t(r), r && e.close();
					},
					children: n() ? b("Show Chat") : b("Hide Chat")
				})]
			})
		]
	});
}
function Re() {
	return /* @__PURE__ */ J("div", {
		className: "cms-assistant-welcome cms-assistant-width flex min-h-full flex-col justify-end pb-3 pt-2",
		children: /* @__PURE__ */ J("h2", {
			className: "cms-assistant-greeting m-0 font-semibold tracking-[-0.02em] text-ink",
			children: b("What should we work on?")
		})
	});
}
function ze({ item: e, editing: t, onEditingChange: n, editingDisabled: r, onEdit: i, ...a }) {
	let [o, s] = K(""), c = G(null), l = () => {
		n(!1), requestAnimationFrame(() => c.current?.focus());
	};
	if (e.role === "user") {
		let a = async () => {
			!r && o.trim() && o.trim() !== e.text && await i(e, o, l);
		};
		return /* @__PURE__ */ Y("div", {
			className: "cms-assistant-message flex flex-col items-end gap-1",
			children: [
				e.attached && e.attached.length > 0 && !t && /* @__PURE__ */ J(Be, { items: e.attached }),
				t ? /* @__PURE__ */ Y("form", {
					className: "cms-assistant-message-editor w-full rounded-xl border border-border-strong bg-surface p-3",
					onSubmit: (e) => {
						e.preventDefault(), a();
					},
					children: [/* @__PURE__ */ J(I, {
						autoFocus: !0,
						"aria-label": b("Edit message"),
						value: o,
						onChange: (e) => s(e.target.value),
						maxLength: 2e4,
						disabled: r,
						rows: 2,
						className: "max-h-52 resize-none",
						onKeyDown: (e) => {
							e.nativeEvent.isComposing || (e.key === "Escape" && (e.preventDefault(), l()), e.key === "Enter" && !e.shiftKey && (e.preventDefault(), a()));
						}
					}), /* @__PURE__ */ Y("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ J(D, {
							size: "sm",
							variant: "ghost",
							disabled: r,
							onClick: l,
							children: b("Cancel")
						}), /* @__PURE__ */ J(D, {
							type: "submit",
							size: "sm",
							variant: "primary",
							disabled: r || !o.trim() || o.trim() === e.text,
							children: b("Save & Send")
						})]
					})]
				}) : /* @__PURE__ */ J("div", {
					className: "cms-assistant-bubble max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3.5 py-2 text-sm text-text",
					children: e.text
				}),
				!t && /* @__PURE__ */ Y("div", {
					className: "cms-assistant-message-actions flex items-center gap-0.5",
					children: [/* @__PURE__ */ J(Ve, { text: e.text }), e.messageIndex !== void 0 && /* @__PURE__ */ J(L, {
						content: b("Edit message"),
						children: /* @__PURE__ */ J(j, {
							ref: c,
							icon: "edit",
							label: b("Edit message"),
							title: void 0,
							disabled: r,
							onClick: () => {
								s(e.text), n(!0);
							}
						})
					})]
				})
			]
		});
	}
	return e.role === "notice" ? /* @__PURE__ */ Y("p", {
		className: R("m-0 flex items-center gap-1.5 text-xs", e.tone === "warning" ? "text-warning" : "text-faint"),
		children: [
			/* @__PURE__ */ J(A, {
				name: e.tone === "warning" ? "warning" : "info",
				size: 13
			}),
			" ",
			e.text
		]
	}) : /* @__PURE__ */ Y("div", {
		className: "cms-assistant-message space-y-2",
		children: [e.parts.map((e, t) => /* @__PURE__ */ J(He, {
			part: e,
			...a
		}, e.type === "tool" ? e.id : t)), e.parts.some((e) => e.type === "text" && e.text.trim()) && /* @__PURE__ */ J("div", {
			className: "cms-assistant-message-actions flex items-center",
			children: /* @__PURE__ */ J(Ve, { text: e.parts.filter((e) => e.type === "text").map((e) => e.text).join("\n\n") })
		})]
	});
}
function Be({ items: e }) {
	return /* @__PURE__ */ J("div", {
		className: "flex max-w-[85%] flex-wrap justify-end gap-x-2 gap-y-0.5",
		children: e.map((e, t) => {
			let n = /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(A, {
				name: e.icon ?? "file",
				size: 11,
				className: "shrink-0"
			}), /* @__PURE__ */ J("span", {
				className: "truncate",
				children: e.label
			})] }), r = "flex min-w-0 max-w-full items-center gap-1 rounded-xs text-xs text-faint no-underline";
			return e.to ? /* @__PURE__ */ J(s, {
				to: e.to,
				className: R(r, "hover:text-muted"),
				children: n
			}, t) : /* @__PURE__ */ J("span", {
				className: r,
				children: n
			}, t);
		})
	});
}
function Ve({ text: e }) {
	let [t, n] = K(!1);
	U(() => {
		if (!t) return;
		let e = window.setTimeout(() => n(!1), 2e3);
		return () => window.clearTimeout(e);
	}, [t]);
	let r = b(t ? "Copied" : "Copy message");
	return /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(L, {
		content: r,
		children: /* @__PURE__ */ J(j, {
			icon: t ? "check" : "copy",
			label: r,
			title: void 0,
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(e), n(!0);
				} catch {
					z.error(b("Could not copy the message. Try again."));
				}
			}
		})
	}), /* @__PURE__ */ J("span", {
		role: "status",
		className: "sr-only",
		children: t ? b("Message copied") : ""
	})] });
}
function He({ part: e, disabled: t, onAction: n, surfaces: r }) {
	return e.type === "text" ? /* @__PURE__ */ J(we, { text: e.text }) : e.type === "thinking" ? /* @__PURE__ */ J(Ue, { text: e.text }) : e.surface && e.status === "ok" ? r.get(e.surface.id) === e.id ? /* @__PURE__ */ J(F, {
		document: e.surface,
		disabled: t || e.used,
		onAction: (t) => n(e.id, t)
	}) : null : /* @__PURE__ */ J(Ge, { part: e });
}
function Ue({ text: e }) {
	let [t, n] = K(!1);
	return /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ Y("button", {
		type: "button",
		onClick: () => n(!t),
		className: "flex items-center gap-1 text-xs text-faint hover:text-muted",
		"aria-expanded": t,
		children: [
			/* @__PURE__ */ J(A, {
				name: t ? "chevron-down" : "chevron-right",
				size: 11
			}),
			" ",
			b("Thought Process")
		]
	}), t && /* @__PURE__ */ J("p", {
		className: "m-0 mt-1.5 whitespace-pre-wrap border-l border-border pl-3 text-xs leading-relaxed text-muted",
		children: e
	})] });
}
var We = {
	ok: "check",
	error: "x-circle",
	declined: "minus",
	awaiting: "pause"
};
function Ge({ part: e }) {
	let [t, n] = K(!1), r = Xe(e.input) || Qe(e.input);
	return /* @__PURE__ */ Y("div", {
		className: "rounded-sm border border-border",
		children: [/* @__PURE__ */ Y("button", {
			type: "button",
			onClick: () => n(!t),
			"aria-expanded": t,
			className: "flex h-8 w-full items-center gap-2 px-2.5 text-left text-xs hover:bg-hover",
			children: [
				e.status === "running" ? /* @__PURE__ */ J(P, { size: 12 }) : /* @__PURE__ */ J(A, {
					name: We[e.status],
					size: 13,
					className: R(e.status === "ok" ? "text-success" : e.status === "error" ? "text-danger" : "text-faint")
				}),
				/* @__PURE__ */ J("span", {
					className: R("shrink-0 font-medium", e.status === "declined" ? "text-faint line-through" : "text-text"),
					children: e.label
				}),
				r && /* @__PURE__ */ J("span", {
					className: "min-w-0 flex-1 truncate text-faint",
					children: r
				}),
				/* @__PURE__ */ J(A, {
					name: t ? "chevron-down" : "chevron-right",
					size: 11,
					className: "ml-auto shrink-0 text-faint"
				})
			]
		}), t && /* @__PURE__ */ Y("div", {
			className: "space-y-2 border-t border-border bg-surface px-2.5 py-2",
			children: [e.input !== void 0 && /* @__PURE__ */ J(Ke, {
				label: b("Input"),
				value: JSON.stringify(e.input, null, 2)
			}), e.output && /* @__PURE__ */ J(Ke, {
				label: e.status === "error" ? b("Error") : b("Result"),
				value: $e(e.output)
			})]
		})]
	});
}
function Ke({ label: e, value: t }) {
	return /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("div", {
		className: "cms-label mb-1",
		children: e
	}), /* @__PURE__ */ J("pre", {
		className: "m-0 max-h-56 overflow-auto whitespace-pre-wrap break-all font-mono text-2xs leading-relaxed text-muted",
		children: t
	})] });
}
function qe({ calls: e, onDecide: t }) {
	let n = e.some((e) => e.destructive);
	return /* @__PURE__ */ J("div", {
		className: "cms-assistant-width w-full shrink-0 pb-2",
		children: /* @__PURE__ */ Y("div", {
			className: "flex max-h-[40dvh] flex-col gap-2.5 overflow-y-auto rounded-xl border border-border-strong bg-surface p-3 shadow-sm",
			children: [
				/* @__PURE__ */ Y("p", {
					className: "m-0 flex items-center gap-1.5 text-sm font-medium text-ink",
					children: [
						/* @__PURE__ */ J(A, {
							name: "shield",
							size: 14
						}),
						" ",
						e.length === 1 ? b("Allow this action?") : b("Allow these {count} actions?", { count: e.length })
					]
				}),
				/* @__PURE__ */ J("ul", {
					className: "m-0 flex list-none flex-col gap-2 p-0",
					children: e.map((e) => /* @__PURE__ */ J(Je, { call: e }, e.id))
				}),
				e.some((e) => e.untrusted) && /* @__PURE__ */ J("p", {
					className: "m-0 text-xs text-muted",
					children: b("Asked because this chat has read site content. Allow only what you asked for.")
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex justify-end gap-1.5",
					children: [/* @__PURE__ */ J(D, {
						size: "sm",
						variant: "ghost",
						onClick: () => t([]),
						children: b("Decline")
					}), /* @__PURE__ */ J(D, {
						size: "sm",
						variant: n ? "danger" : "primary",
						onClick: () => t(e.map((e) => e.id)),
						autoFocus: !0,
						children: e.length === 1 ? b("Allow") : b("Allow All")
					})]
				})
			]
		})
	});
}
function Je({ call: e }) {
	let [t, n] = K(!1), r = Xe(e.input), i = Ze(e.input);
	return /* @__PURE__ */ Y("li", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ J(A, {
			name: e.destructive ? "trash" : "edit",
			size: 13,
			className: R("mt-[3px] shrink-0", e.destructive ? "text-danger" : "text-muted")
		}), /* @__PURE__ */ Y("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ J("p", {
					className: "m-0 text-sm text-text",
					children: r || e.label
				}),
				/* @__PURE__ */ Y("button", {
					type: "button",
					onClick: () => n(!t),
					"aria-expanded": t,
					className: "flex items-center gap-1 pt-0.5 text-xs text-faint hover:text-muted",
					children: [r ? e.label : b("Details"), /* @__PURE__ */ J(A, {
						name: t ? "chevron-down" : "chevron-right",
						size: 11
					})]
				}),
				t && /* @__PURE__ */ J("dl", {
					className: "mx-0 mb-0 mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-l border-border pl-2.5 text-xs",
					children: i.map(([e, t]) => /* @__PURE__ */ Y(B, { children: [/* @__PURE__ */ J("dt", {
						className: "font-mono text-2xs leading-5 text-faint",
						children: e
					}), /* @__PURE__ */ J("dd", {
						className: "m-0 line-clamp-3 min-w-0 break-words text-muted",
						children: t
					})] }, e))
				})
			]
		})]
	});
}
function Ye({ items: e }) {
	let t = e[e.length - 1], n = t?.role === "assistant" ? t.parts[t.parts.length - 1] : void 0;
	return n?.type === "text" || n?.type === "tool" && n.status === "running" ? null : /* @__PURE__ */ Y("p", {
		className: "m-0 flex items-center gap-2 text-xs text-faint",
		children: [
			/* @__PURE__ */ J(P, { size: 12 }),
			" ",
			b("Working…")
		]
	});
}
function Xe(e) {
	let t = e && typeof e == "object" ? e.change_summary : void 0;
	return typeof t == "string" ? t.trim() : "";
}
function Ze(e) {
	return !e || typeof e != "object" ? [] : Object.entries(e).filter(([e, t]) => e !== "change_summary" && t != null && t !== "").map(([e, t]) => [e, (typeof t == "string" ? t : JSON.stringify(t)).slice(0, 300)]);
}
function Qe(e) {
	if (!e || typeof e != "object") return "";
	let t = e;
	for (let e of [
		"title",
		"name",
		"query",
		"q",
		"uri",
		"collection",
		"handle",
		"to",
		"id"
	]) if (typeof t[e] == "string" && t[e]) return String(t[e]).slice(0, 80);
	return "";
}
function $e(e) {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}
// admin/src/sources.ts
var et = (e, ...t) => t.some((t) => t?.toLowerCase().includes(e.toLowerCase())), tt = null, nt = null;
g.composer.set("assistant-skills", {
	id: "assistant-skills",
	trigger: "/",
	label: b("Skills"),
	order: 10,
	search: async (e) => (tt ??= _("assistant/skills"), (await tt).filter((t) => et(e, t.name, t.label)).map((e) => ({
		id: `skill:${e.name}`,
		kind: "skill",
		label: e.label,
		detail: e.description,
		icon: e.icon,
		skill: e.name
	})))
}), g.composer.set("assistant-actions", {
	id: "assistant-actions",
	trigger: "/",
	label: b("Chat"),
	order: 90,
	search: (t) => [{
		id: "new",
		label: b("New Chat"),
		icon: "plus",
		perform: () => e.newChat()
	}, {
		id: "chats",
		label: b("All Chats"),
		icon: "history",
		perform: () => e.set({ history: !0 })
	}].filter((e) => et(t, e.label))
}), g.composer.set("assistant-resources", {
	id: "assistant-resources",
	trigger: "@",
	label: b("Site"),
	order: 40,
	search: async (e) => (nt ??= _("assistant/resources"), (await nt).filter((t) => et(e, t.name)).slice(0, 5).map((e) => ({
		id: `resource:${e.uri}`,
		kind: "resource",
		label: e.name,
		icon: "book",
		read: () => _("assistant/resource", { uri: e.uri })
	})))
}), g.panels.set("assistant", {
	id: "assistant",
	slot: "shell.dock",
	component: Pe
}), g.widgets.set("assistant-ask", V(() => import("./chunks/WidgetAsk-B6LXewtS.js"))), g.panels.set("assistant-toggle", {
	id: "assistant-toggle",
	slot: "topbar.end",
	component: X
}), g.routes.set("/chat/:id", {
	path: "/chat/:id",
	component: () => l("assistant.use") ? null : /* @__PURE__ */ J(k, {
		icon: "lock",
		title: b("You do not have access to the assistant."),
		className: "min-h-[50vh]"
	}),
	overlay: !0
}), g.commands.set("assistant", {
	id: "assistant",
	label: b("New Chat"),
	icon: "compose",
	group: b("Assistant"),
	keywords: [
		"ai",
		"assistant",
		"claude",
		"chat",
		"help",
		"write",
		"build"
	],
	shortcut: "mod+j",
	acceptsQuery: !0,
	perform: (t) => e.ask(t)
}), window.addEventListener("keydown", (t) => {
	(t.metaKey || t.ctrlKey) && !t.shiftKey && !t.altKey && t.key.toLowerCase() === "j" && o() && (t.preventDefault(), e.toggle());
});
