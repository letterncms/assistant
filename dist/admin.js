import { a as e, i as t, n, o as r, r as i, s as a, t as o } from "./chunks/store-FxeDWXtm.js";
import { Link as s, boot as c, can as l, eventStream as u, events as d, getManifest as f, loadManifest as p, navigate as m, queryClient as h, registry as g, run as _, screenContext as v, screenText as y, t as b, timeAgo as x, useAbility as S, useAction as C, useLocation as w, useManifest as T, useScreen as E } from "@letterncms/sdk";
import { Button as D, Dock as O, EmptyState as k, Icon as A, IconButton as j, Menu as M, SidebarRow as N, Spinner as P, Surface as ee, Textarea as F, Tooltip as I, cn as L, confirm as te, toast as R } from "@letterncms/ui";
import { lazy as z, useCallback as B, useEffect as V, useId as ne, useLayoutEffect as re, useRef as H, useState as U, useSyncExternalStore as W } from "react";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
import { useInfiniteQuery as ie } from "@tanstack/react-query";
// admin/src/ChatToggle.tsx
function J() {
	let { mode: t, working: i, awaiting: s } = a(), { chosen: c, required: l } = r();
	T();
	let u = t !== "closed";
	return u && !c && !l || !o() || n() ? null : /* @__PURE__ */ K(I, {
		content: b("Chat"),
		shortcut: "mod+j",
		side: "bottom",
		children: /* @__PURE__ */ q(D, {
			variant: "ghost",
			icon: !u && (i || s) ? void 0 : "comment",
			"aria-expanded": u,
			onClick: () => u ? e.close() : e.open(),
			className: L("mr-1", u ? "bg-active text-ink" : "text-muted hover:text-text"),
			children: [
				!u && s && /* @__PURE__ */ K("span", {
					role: "status",
					"aria-label": b("Waiting for your go-ahead"),
					className: "size-1.5 rounded-full bg-signal ring-1 ring-border-strong"
				}),
				!u && !s && i && /* @__PURE__ */ K("span", {
					role: "status",
					"aria-label": b("Working…"),
					children: /* @__PURE__ */ K(P, { size: 12 })
				}),
				/* @__PURE__ */ K("span", {
					className: "max-sm:sr-only",
					children: b("Chat")
				})
			]
		})
	});
}
// admin/src/context.ts
var Y = 4e4, X = 12e3, ae = 4e3;
function Z(e, t) {
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
		}) : () => y(X)
	}), n.push(...e.items ?? []), t.selectedText) {
		let e = t.selectedText.slice(0, ae);
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
	return [...Z(e, t), ...n.filter((n) => !Z(e, t).some((e) => e.id === n.id))];
}
var se = (e) => {
	if (e != null && e !== "") try {
		return (typeof e == "string" ? e : JSON.stringify(e)).slice(0, Y);
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
	let t = W(g.composer.subscribe, g.composer.version), [n, r] = U([]), [i, a] = U(!1), o = e?.char, s = e?.query;
	return V(() => {
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
	let n = a(), r = E(), i = n.conversation ?? "new", o = oe(r, n), s = n.skills[i], c = new Set(Z(r, n).map((e) => e.id)), l = r.title && !r.private && n.dismissed.includes("page"), u = (t) => {
		t.id === "text" ? e.set({ selectedText: "" }) : c.has(t.id) ? e.set({ dismissed: [...n.dismissed, t.id] }) : e.set({ attached: {
			...n.attached,
			[i]: (n.attached[i] ?? []).filter((e) => e.id !== t.id)
		} });
	};
	return /* @__PURE__ */ q("div", {
		className: "flex flex-wrap items-center gap-1 px-2 pt-2",
		children: [
			/* @__PURE__ */ K(I, {
				content: b("Add Context"),
				shortcut: "@",
				children: /* @__PURE__ */ K("button", {
					type: "button",
					"aria-label": b("Add Context"),
					onClick: t,
					className: "cms-assistant-chip justify-center !px-0 w-[22px] text-muted hover:text-text",
					children: /* @__PURE__ */ K("span", {
						"aria-hidden": "true",
						className: "text-xs leading-none",
						children: "@"
					})
				})
			}),
			s && /* @__PURE__ */ K(he, {
				icon: s.icon ?? "sparkle",
				label: s.label,
				hint: s.detail ?? s.label,
				strong: !0,
				onRemove: () => e.set({ skills: {
					...n.skills,
					[i]: null
				} })
			}),
			o.map((e) => /* @__PURE__ */ K(he, {
				icon: e.icon ?? "file",
				label: e.label,
				hint: (e.kind && de[e.kind]?.()) ?? e.label,
				strong: !c.has(e.id),
				onRemove: () => u(e)
			}, e.id)),
			l && /* @__PURE__ */ q("button", {
				type: "button",
				onClick: () => e.set({ dismissed: n.dismissed.filter((e) => e !== "page") }),
				className: "cms-assistant-chip pr-1.5 text-faint hover:text-text",
				children: [/* @__PURE__ */ K(A, {
					name: "plus",
					size: 11
				}), /* @__PURE__ */ K("span", {
					className: "truncate",
					children: r.title
				})]
			})
		]
	});
}
function he({ icon: e, label: t, hint: n, strong: r, onRemove: i }) {
	return /* @__PURE__ */ q("span", {
		className: L("cms-assistant-chip", r ? "text-text" : "text-muted"),
		children: [/* @__PURE__ */ K(I, {
			content: n,
			children: /* @__PURE__ */ q("span", {
				tabIndex: 0,
				className: "flex min-w-0 items-center gap-1 outline-offset-1",
				children: [/* @__PURE__ */ K(A, {
					name: e,
					size: 11,
					className: "shrink-0"
				}), /* @__PURE__ */ K("span", {
					className: "truncate",
					children: t
				})]
			})
		}), /* @__PURE__ */ K("button", {
			type: "button",
			"aria-label": b("Remove {name}", { name: t }),
			onClick: i,
			className: "grid size-4 shrink-0 place-items-center rounded-xs text-faint hover:bg-hover hover:text-text",
			children: /* @__PURE__ */ K(A, {
				name: "close",
				size: 10
			})
		})]
	});
}
function ge({ id: e, trigger: t, groups: n, loading: r, active: i, onActive: a, onPick: o }) {
	let s = H(null);
	re(() => {
		s.current?.querySelector("[aria-selected=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [i]);
	let c = -1;
	return /* @__PURE__ */ q("div", {
		ref: s,
		id: e,
		role: "listbox",
		"aria-label": t.char === "@" ? b("Add Context") : b("Skills"),
		className: "cms-pop absolute inset-x-0 bottom-full z-10 mb-1.5 max-h-72 overflow-y-auto overscroll-contain p-1",
		children: [n.map(({ source: t, options: n }) => /* @__PURE__ */ q("div", {
			role: "group",
			"aria-label": t.label,
			children: [/* @__PURE__ */ K("div", {
				className: "flex h-6 items-center px-2 text-2xs font-medium text-faint",
				children: t.label
			}), n.map((t) => {
				c++;
				let n = c;
				return /* @__PURE__ */ q("div", {
					id: `${e}-${n}`,
					role: "option",
					"aria-selected": n === i,
					onMouseEnter: () => a(n),
					onMouseDown: (e) => {
						e.preventDefault(), o(t);
					},
					className: L("flex min-h-8 cursor-default items-center gap-2 rounded-sm px-2 py-1 text-sm", n === i ? "bg-hover text-ink" : "text-text"),
					children: [
						/* @__PURE__ */ K(A, {
							name: t.icon ?? "file",
							size: 14,
							className: "shrink-0 text-muted"
						}),
						/* @__PURE__ */ K("span", {
							className: "shrink-0 truncate",
							children: t.label
						}),
						t.detail && /* @__PURE__ */ K("span", {
							className: "min-w-0 flex-1 truncate text-xs text-faint",
							children: t.detail
						})
					]
				}, t.id);
			})]
		}, t.id)), n.length === 0 && /* @__PURE__ */ K("div", {
			className: "flex h-8 items-center gap-2 px-2 text-sm text-muted",
			children: r ? /* @__PURE__ */ q(G, { children: [
				/* @__PURE__ */ K(P, { size: 12 }),
				" ",
				b("Looking…")
			] }) : b("Nothing found")
		})]
	});
}
function _e({ placeholder: t, focus: n, onSubmit: r, children: i }) {
	let { drafts: o, conversation: s } = a(), c = s ?? "new", l = o[c] ?? "", u = H(null), [d, f] = U(0), [p, m] = U(null), [h, g] = U(0), _ = ne(), v = fe(l, d), y = v && v.start !== p ? v : null, { groups: x, loading: S } = pe(y), C = x.flatMap((e) => e.options), w = y !== null;
	V(() => {
		if (!n) return;
		let e = requestAnimationFrame(() => u.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [n]), V(() => g(0), [y?.char, y?.query]), V(() => {
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
	return /* @__PURE__ */ q("div", {
		className: "relative",
		children: [w && /* @__PURE__ */ K(ge, {
			id: _,
			trigger: y,
			groups: x,
			loading: S,
			active: h,
			onActive: g,
			onPick: E
		}), /* @__PURE__ */ q("form", {
			onSubmit: (e) => {
				e.preventDefault(), r();
			},
			className: "cms-assistant-composer overflow-hidden rounded-lg border border-border bg-bg transition-colors focus-within:border-border-strong",
			children: [
				/* @__PURE__ */ K(me, { onAdd: () => {
					let e = u.current?.selectionStart ?? l.length, t = e > 0 && !/\s/.test(l[e - 1]) ? " " : "";
					T(`${l.slice(0, e)}${t}@${l.slice(e)}`, e + t.length + 1);
				} }),
				/* @__PURE__ */ K(F, {
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
	let e = l("assistant.use"), { working: t } = a(), n = ie({
		queryKey: ["assistant/conversations", "list"],
		initialPageParam: 0,
		queryFn: ({ pageParam: e }) => _("assistant/conversations", {
			limit: ve,
			offset: e
		}),
		getNextPageParam: (e, t) => e.length === ve ? t.length * ve : void 0,
		enabled: e
	}), r = n.data?.pages.flat() ?? [];
	return {
		history: n,
		chats: t?.conversation ? [{
			id: t.conversation,
			title: t.title,
			updatedAt: r.find((e) => e.id === t.conversation)?.updatedAt ?? null
		}, ...r.filter((e) => e.id !== t.conversation)] : r
	};
}
function be({ chat: t, remove: n }) {
	let { conversation: r, working: i, drafts: o } = a(), s = i?.conversation === t.id, c = !!o[t.id]?.trim();
	return /* @__PURE__ */ K(N, {
		label: t.title || b("New Chat"),
		title: `${t.title} · ${x(t.updatedAt)}`,
		onClick: () => e.select(t.id),
		active: r === t.id,
		status: s || c ? /* @__PURE__ */ q(G, { children: [s && /* @__PURE__ */ K("span", {
			role: "status",
			"aria-label": b("Working…"),
			children: /* @__PURE__ */ K(P, { size: 12 })
		}), c && /* @__PURE__ */ K("span", { children: b("Draft") })] }) : void 0,
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
			e.deleted(n), R.success(b("Chat deleted"));
		},
		onError: R.error
	});
	return async (e) => {
		t?.conversation === e.id || n.isPending || await te({
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
	})).filter((e) => e.chats.length > 0), f = H(null);
	return V(() => {
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
	]), /* @__PURE__ */ q("nav", {
		"aria-label": b("Chats"),
		className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-4 pt-1",
		children: [
			(c || l && s !== null) && /* @__PURE__ */ K(N, {
				label: (c ? o.title : l) || b("New Chat"),
				onClick: () => e.select(null),
				active: s === null,
				status: c ? /* @__PURE__ */ K("span", {
					role: "status",
					"aria-label": b("Working…"),
					children: /* @__PURE__ */ K(P, { size: 12 })
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
			d.map((e) => /* @__PURE__ */ q("section", {
				"aria-label": e.label,
				className: "mt-2 first:mt-0",
				children: [/* @__PURE__ */ K("h3", {
					className: "m-0 flex h-7 items-center px-2 text-xs font-medium text-faint",
					children: e.label
				}), /* @__PURE__ */ K("div", {
					className: "space-y-px",
					children: e.chats.map((e) => /* @__PURE__ */ K(be, {
						chat: e,
						remove: (e) => void r(e)
					}, e.id))
				})]
			}, e.label)),
			t.isPending && /* @__PURE__ */ K("div", {
				className: "grid h-24 place-items-center text-faint",
				children: /* @__PURE__ */ K(P, {})
			}),
			t.isError && /* @__PURE__ */ K("button", {
				type: "button",
				onClick: () => void t.refetch(),
				className: "px-2 py-1.5 text-left text-xs text-muted hover:text-text",
				children: b("Could not load chats. Try again")
			}),
			t.hasNextPage && /* @__PURE__ */ K("div", {
				ref: f,
				className: "grid h-10 place-items-center text-faint",
				children: t.isFetchingNextPage && /* @__PURE__ */ K(P, { size: 14 })
			})
		]
	});
}
function Ce() {
	return /* @__PURE__ */ K(I, {
		content: b("New Chat"),
		children: /* @__PURE__ */ K(j, {
			icon: "plus",
			label: b("New Chat"),
			title: void 0,
			onClick: () => e.select(null)
		})
	});
}
// admin/src/Markdown.tsx
function we({ text: e }) {
	return /* @__PURE__ */ K("div", {
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
			r++, n.push(/* @__PURE__ */ K("pre", {
				className: "overflow-x-auto rounded-sm border border-border bg-sunken px-3 py-2 font-mono text-xs leading-relaxed text-text",
				children: /* @__PURE__ */ K("code", { children: e.join("\n") })
			}, n.length));
			continue;
		}
		let a = e.match(/^(#{1,4})\s+(.*)$/);
		if (a) {
			let e = a[1].length <= 2 ? "text-[15px]" : "text-sm";
			n.push(/* @__PURE__ */ K("p", {
				className: `${e} pt-1 font-semibold tracking-[-0.01em] text-ink`,
				children: Q(a[2])
			}, n.length)), r++;
			continue;
		}
		if (/^\s*\|.*\|\s*$/.test(e) && /^\s*\|?\s*:?-{2,}/.test(t[r + 1] ?? "")) {
			let i = (e) => e.trim().replace(/^\||\|$/g, "").split("|").map((e) => e.trim()), a = i(e), o = [];
			for (r += 2; r < t.length && /^\s*\|.*\|\s*$/.test(t[r]);) o.push(i(t[r++]));
			n.push(/* @__PURE__ */ K("div", {
				className: "overflow-x-auto rounded-sm border border-border",
				children: /* @__PURE__ */ q("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ K("thead", {
						className: "bg-surface text-muted",
						children: /* @__PURE__ */ K("tr", { children: a.map((e, t) => /* @__PURE__ */ K("th", {
							className: "px-2.5 py-1.5 font-medium",
							children: Q(e)
						}, t)) })
					}), /* @__PURE__ */ K("tbody", { children: o.map((e, t) => /* @__PURE__ */ K("tr", {
						className: "border-t border-border",
						children: e.map((e, t) => /* @__PURE__ */ K("td", {
							className: "px-2.5 py-1.5 align-top",
							children: Q(e)
						}, t))
					}, t)) })]
				})
			}, n.length));
			continue;
		}
		if (/^\s*>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s*>/.test(t[r]);) e.push(t[r++].replace(/^\s*>\s?/, ""));
			n.push(/* @__PURE__ */ K("blockquote", {
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
			n.push(/* @__PURE__ */ K(l, {
				className: `${i ? "list-decimal" : "list-disc"} space-y-1 pl-5 marker:text-faint`,
				children: c.map((e, t) => /* @__PURE__ */ K("li", { children: Q(e) }, t))
			}, n.length));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !/^(\s*(```|~~~|>|[-*+]\s|\d+[.)]\s)|#{1,4}\s)/.test(t[r]);) c.push(t[r++]);
		c.length === 0 && c.push(t[r++]), n.push(/* @__PURE__ */ K("p", { children: Q(c.join("\n")) }, n.length));
	}
	return n;
}
var Ee = /(`[^`]+`)|(\*\*[^*]+\*\*|__[^_]+__)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(\[[^\]]+\]\([^)\s]+\))|(\n)/g;
function Q(e) {
	let t = [], n = 0;
	for (let r of e.matchAll(Ee)) {
		r.index > n && t.push(e.slice(n, r.index));
		let [i] = r, a = t.length;
		if (r[1]) t.push(/* @__PURE__ */ K("code", {
			className: "rounded-xs bg-sunken px-1 py-px font-mono text-[0.92em]",
			children: i.slice(1, -1)
		}, a));
		else if (r[2]) t.push(/* @__PURE__ */ K("strong", {
			className: "font-semibold text-ink",
			children: Q(i.slice(2, -2))
		}, a));
		else if (r[3]) t.push(/* @__PURE__ */ K("em", { children: Q(i.slice(1, -1)) }, a));
		else if (r[4]) {
			let [, e, n] = i.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
			t.push(/* @__PURE__ */ K(De, {
				href: n,
				children: Q(e)
			}, a));
		} else t.push(/* @__PURE__ */ K("br", {}, a));
		n = r.index + i.length;
	}
	return n < e.length && t.push(e.slice(n)), t;
}
function De({ href: e, children: t }) {
	let n = e.startsWith(`${c.base}/`) || e === c.base;
	return n || /^(https?:\/\/|\/(?!\/)|mailto:)/i.test(e) ? /* @__PURE__ */ K("a", {
		href: e,
		target: n ? void 0 : "_blank",
		rel: n ? void 0 : "noopener noreferrer",
		className: "text-ink underline decoration-border-strong underline-offset-2 hover:decoration-ink",
		onClick: (t) => {
			!n || t.metaKey || t.ctrlKey || (t.preventDefault(), m(e.slice(c.base.length) || "/"));
		},
		children: t
	}) : /* @__PURE__ */ K(G, { children: t });
}
// admin/src/useChat.ts
function Oe(t, { picked: n, fallback: r, offered: i } = {}) {
	let [a, o] = U([]), [s, c] = U(null), l = n ?? (s && (!i || i.includes(s)) ? s : r), [f, m] = U([]), [g, v] = U(""), [y, x] = U(!1), [S, C] = U(!1), [w, T] = U(null), E = H(null), D = H(t), O = H(l);
	O.current = l, V(() => {
		if (t === D.current && (a.length || y) || (E.current?.abort(), E.current = null, x(!1), C(!1), D.current = t, o([]), v(""), c(null), T(null), m([]), !t)) return;
		let n = !1;
		return C(!0), _("assistant/conversation", { id: t }).then((t) => {
			n || (o(t.items), m(t.awaiting), v(t.title), c(t.model), e.set({ title: t.title }));
		}).catch((r) => {
			n || (r.status === 404 ? e.deleted(t) : T(r.message));
		}).finally(() => !n && C(!1)), () => {
			n = !0;
		};
	}, [t]), V(() => () => E.current?.abort(), []);
	let k = (e) => o((t) => {
		let n = t[t.length - 1];
		return n?.role === "assistant" ? [...t.slice(0, -1), {
			...n,
			parts: e(n.parts)
		}] : [...t, {
			role: "assistant",
			parts: e([])
		}];
	}), A = (e, t) => o((n) => n.map((n) => n.role === "assistant" ? {
		...n,
		parts: n.parts.map((n) => n.type === "tool" && n.id === e ? {
			...n,
			...t
		} : n)
	} : n)), j = (e, t) => k((n) => {
		let r = n[n.length - 1];
		return r?.type === e ? [...n.slice(0, -1), {
			...r,
			text: r.text + t
		}] : [...n, {
			type: e,
			text: t
		}];
	}), M = B(async (t, n) => {
		E.current?.abort();
		let r = new AbortController();
		E.current = r, x(!0), T(null);
		let i = {
			conversation: D.current,
			title: e.get().title || String(t.message ?? b("New Chat"))
		};
		e.set({ working: i });
		let a = !1, s = !1, l = O.current, f = typeof t.message == "string" && (!D.current || t.edit?.index === 0);
		try {
			t.edit && ue(D.current);
			let f = typeof t.message == "string" ? await le(D.current) : null;
			if (r.signal.aborted) return !1;
			await u("assistant/chat", {
				conversation: D.current,
				model: l,
				...t,
				context: f?.context
			}, (u, p) => {
				if (!(r.signal.aborted || E.current !== r)) switch (u) {
					case "user_message": {
						s = !0;
						let e = t.edit;
						o((t) => {
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
						}), e && (m([]), n?.());
						break;
					}
					case "conversation":
						l && c(l), D.current = p.id, f?.carry(p.id), i = {
							conversation: p.id,
							title: p.title
						}, e.set({ working: i }), v(p.title), e.created(p.id, p.title), h.invalidateQueries({ queryKey: ["assistant/conversations"] });
						break;
					case "text":
					case "thinking":
						j(u, p.delta);
						break;
					case "tool":
						k((e) => [...e, {
							type: "tool",
							id: p.id,
							name: p.name,
							label: p.label,
							status: "running"
						}]);
						break;
					case "tool_result":
						A(p.id, {
							status: p.declined ? "declined" : p.ok ? "ok" : "error",
							output: p.output,
							input: p.input,
							surface: p.surface ?? void 0
						}), a ||= p.mutated, p.mutated && (h.invalidateQueries(), d.emit("content.changed"));
						break;
					case "surface_used":
						A(p.id, { used: !0 });
						break;
					case "approval":
						m(p.calls);
						for (let e of p.calls) A(e.id, {
							status: "awaiting",
							input: e.input
						});
						break;
					case "notice":
						o((e) => [...e, {
							role: "notice",
							text: p.message,
							tone: p.tone
						}]);
						break;
					case "error":
						T(p.message);
						break;
					case "done": v(p.conversation.title), e.set({ title: p.conversation.title });
				}
			}, r.signal);
		} catch (e) {
			r.signal.aborted || T(e instanceof Error ? e.message : b("The assistant failed."));
		} finally {
			if (a) try {
				await p();
			} catch (e) {
				!r.signal.aborted && E.current === r && T(e instanceof Error ? e.message : b("The assistant failed."));
			}
			e.get().working === i && e.set({ working: null }), E.current === r && (E.current = null, x(!1)), a && h.invalidateQueries(), h.invalidateQueries({ queryKey: ["assistant/conversations"] }), f && D.current && N(D.current);
		}
		return s;
	}, []), N = async (t) => {
		try {
			let { title: n } = await _("assistant/conversation-title", { id: t });
			D.current === t && (v(n), e.set({ title: n })), h.invalidateQueries({ queryKey: ["assistant/conversations"] });
		} catch {}
	}, P = B((e, t, n) => E.current || S || !D.current || e.messageIndex === void 0 || !t.trim() ? Promise.resolve(!1) : M({
		message: t.trim(),
		edit: {
			index: e.messageIndex,
			original: e.text
		}
	}, n), [S, M]);
	return {
		items: a,
		awaiting: f,
		title: g,
		model: l,
		busy: y,
		loading: S,
		error: w,
		send: B((e) => {
			let t = e.trim();
			if (t) {
				for (let e of f) A(e.id, { status: "declined" });
				m([]), o((e) => [...e, {
					role: "user",
					text: t
				}]), M({ message: t });
			}
		}, [f, M]),
		edit: P,
		decide: B((e) => {
			for (let t of f) e.includes(t.id) || A(t.id, { status: "declined" });
			for (let t of e) A(t, { status: "running" });
			m([]), M({ approve: e });
		}, [f, M]),
		stop: B(() => {
			E.current?.abort(), E.current = null, x(!1), e.set({ working: null }), o((e) => [...e, {
				role: "notice",
				text: b("Stopped. The step in progress still finishes on the server."),
				tone: "neutral"
			}]);
		}, []),
		interact: B((e, t) => {
			if (E.current || f.length || !D.current || S) return;
			let n = a.flatMap((e) => e.role === "assistant" ? e.parts : []).find((t) => t.type === "tool" && t.id === e);
			n?.type === "tool" && n.surface && !n.used && (o((e) => [...e, {
				role: "user",
				text: b("Selected an action in “{title}”.", { title: n.surface.title })
			}]), M({ action: {
				tool: e,
				...t
			} }));
		}, [
			a,
			f,
			S,
			M
		]),
		dismissError: () => T(null)
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
var $ = window.matchMedia("(min-width: 1024px)"), Me = () => W((e) => ($.addEventListener("change", e), () => $.removeEventListener("change", e)), () => $.matches);
function Ne() {
	let { path: t } = w(), { mode: n, title: s } = a(), c = r(), l = i(t);
	return re(() => {
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
	}, [t, l]), o() ? /* @__PURE__ */ K(O, {
		open: n !== "closed",
		full: n === "full",
		floating: c.chosen || c.required,
		label: s || b("New Chat"),
		children: /* @__PURE__ */ K(Pe, {
			open: n !== "closed",
			full: n === "full"
		})
	}) : null;
}
function Pe({ open: t, full: n }) {
	let { conversation: i, prompt: o, drafts: s, models: c, focus: l, history: u } = a(), d = r(), f = Me(), p = W((e) => {
		let t = window.matchMedia("(min-width: 768px)");
		return t.addEventListener("change", e), () => t.removeEventListener("change", e);
	}, () => window.matchMedia("(min-width: 768px)").matches), m = n && f, h = S("assistant/status", {}, { staleTime: 6e4 }), g = Oe(i, {
		picked: c[i ?? "new"] ?? (i || !h.data ? void 0 : Ae(h.data)),
		fallback: h.data?.model,
		offered: h.data?.models.map((e) => e.id)
	});
	V(() => e.set({ awaiting: g.awaiting.length > 0 }), [g.awaiting.length]);
	let _ = C("assistant/conversation-delete", {
		invalidates: ["assistant/conversations"],
		onSuccess: (t, { id: n }) => {
			e.deleted(n), R.success(b("Chat deleted"));
		},
		onError: R.error
	}), v = s[i ?? "new"] ?? "", y = e.draft, [x, w] = U(0), [T, E] = U(null), O = H(null), k = H(!0);
	V(() => {
		t && o && !g.busy && !g.loading && !_.isPending && T === null && h.data?.configured && (e.set({ prompt: null }), g.send(o));
	}, [
		t,
		o,
		g,
		_.isPending,
		T,
		h.data?.configured
	]), V(() => {
		k.current = !0, E(null), t && w((e) => e + 1);
	}, [
		i,
		t,
		l
	]), re(() => {
		let e = O.current;
		t && e && k.current && (e.scrollTop = e.scrollHeight);
	});
	let N = a().skills[i ?? "new"], ee = !!v.trim() || !!N, F = () => {
		!ee || g.busy || g.loading || _.isPending || T !== null || (k.current = !0, g.send(v.trim() || N.label), y(""));
	}, z = h.data?.configured === !0, B = /* @__PURE__ */ new Map();
	for (let e of g.items) if (e.role === "assistant") for (let t of e.parts) t.type === "tool" && t.surface && t.status === "ok" && B.set(t.surface.id, t.id);
	let ne = {
		disabled: g.busy || g.loading || g.awaiting.length > 0 || T !== null,
		onAction: g.interact,
		surfaces: B
	}, ie = async () => {
		!i || g.busy || g.loading || _.isPending || await te({
			title: b("Delete “{title}”?", { title: g.title || b("New Chat") }),
			description: b("This chat and its messages will be permanently deleted."),
			confirm: b("Delete Chat"),
			danger: !0
		}) && _.mutate({ id: i });
	}, J = z && !g.loading && !g.items.length, Y = g.title || b("New Chat"), X = u && !m;
	return /* @__PURE__ */ q("div", {
		className: "cms-assistant flex h-full min-h-0",
		"data-full": n || void 0,
		onKeyDown: (t) => {
			t.key !== "Escape" || t.defaultPrevented || document.querySelector("[role=\"dialog\"], [role=\"menu\"], [role=\"listbox\"], [data-popup-open]") || (X ? e.set({ history: !1 }) : n ? e.minimize() : e.close());
		},
		children: [m && /* @__PURE__ */ q("div", {
			className: "flex w-[260px] shrink-0 flex-col border-r border-border",
			children: [/* @__PURE__ */ q("div", {
				className: "flex h-12 shrink-0 items-center justify-between pl-[calc(1rem+var(--cms-sidebar-toggle,0px))] pr-2",
				children: [/* @__PURE__ */ K("h2", {
					className: "m-0 text-sm font-semibold text-ink",
					children: b("Chats")
				}), /* @__PURE__ */ K(Ce, {})]
			}), /* @__PURE__ */ K(Se, {})]
		}), /* @__PURE__ */ q("section", {
			"aria-label": Y,
			"data-empty": n && J || void 0,
			className: "cms-assistant-page relative flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ q("header", {
				"data-dock-drag": !0,
				className: L("flex h-12 shrink-0 items-center gap-0.5 border-b border-border pr-2", n && !m ? "pl-[calc(0.75rem+var(--cms-sidebar-toggle,0px))]" : "pl-3"),
				children: [
					X && /* @__PURE__ */ K(I, {
						content: b("Back to Chat"),
						side: "bottom",
						children: /* @__PURE__ */ K(j, {
							icon: "arrow-left",
							label: b("Back to Chat"),
							title: void 0,
							className: "-ml-1 mr-0.5",
							onClick: () => e.set({ history: !1 })
						})
					}),
					/* @__PURE__ */ K("h2", {
						className: "m-0 min-w-0 flex-1 truncate text-sm font-medium text-ink",
						children: X ? b("Chats") : Y
					}),
					!m && /* @__PURE__ */ K(Ce, {}),
					!m && i && !X && /* @__PURE__ */ K(I, {
						content: b("All Chats"),
						side: "bottom",
						children: /* @__PURE__ */ K(j, {
							icon: "history",
							label: b("All Chats"),
							title: void 0,
							onClick: () => e.set({ history: !0 })
						})
					}),
					i && !X && /* @__PURE__ */ K(M, {
						trigger: /* @__PURE__ */ K(j, {
							icon: "more",
							label: b("Chat Actions"),
							disabled: _.isPending
						}),
						items: [{
							label: b("Delete Chat"),
							icon: "trash",
							danger: !0,
							disabled: g.busy || g.loading || _.isPending,
							onSelect: ie
						}]
					}),
					p && !n && !d.required && /* @__PURE__ */ K(I, {
						content: d.chosen ? b("Dock Beside the Page") : b("Detach"),
						side: "bottom",
						children: /* @__PURE__ */ K(j, {
							icon: d.chosen ? "sidebar" : "detach",
							label: d.chosen ? b("Dock Beside the Page") : b("Detach"),
							title: void 0,
							onClick: () => e.set({ detached: !d.chosen })
						})
					}),
					p && /* @__PURE__ */ K(I, {
						content: b(n ? "Back to the Page" : "Full Size"),
						side: "bottom",
						children: /* @__PURE__ */ K(j, {
							icon: n ? "minimize" : "maximize",
							label: b(n ? "Back to the Page" : "Full Size"),
							title: void 0,
							onClick: () => n ? e.minimize() : e.maximize()
						})
					}),
					!n && /* @__PURE__ */ K(I, {
						content: b("Close"),
						shortcut: "mod+j",
						side: "bottom",
						children: /* @__PURE__ */ K(j, {
							icon: "close",
							label: b("Close"),
							title: void 0,
							onClick: () => e.close()
						})
					})
				]
			}), X ? /* @__PURE__ */ K(Se, {}) : /* @__PURE__ */ q(G, { children: [
				z && J && !m && /* @__PURE__ */ K(Se, {}),
				/* @__PURE__ */ K("div", {
					ref: O,
					onScroll: (e) => {
						let t = e.currentTarget;
						k.current = t.scrollHeight - t.scrollTop - t.clientHeight < 48;
					},
					className: L("cms-assistant-scroll min-h-0 overflow-y-auto overscroll-contain", z && J && !m ? "shrink-0" : "flex-1"),
					children: h.isPending || g.loading ? /* @__PURE__ */ K("div", {
						className: "grid h-full place-items-center text-faint",
						children: /* @__PURE__ */ K(P, {})
					}) : h.isError ? /* @__PURE__ */ q("div", {
						role: "alert",
						className: "cms-assistant-width flex min-h-full flex-col items-center justify-center gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ K("p", { children: b("Could not connect to the assistant.") }), /* @__PURE__ */ K(D, {
							onClick: () => void h.refetch(),
							children: b("Try Again")
						})]
					}) : z ? g.items.length === 0 ? /* @__PURE__ */ K(Le, {}) : /* @__PURE__ */ q("div", {
						className: "cms-assistant-thread cms-assistant-width space-y-6 py-5",
						children: [g.items.map((t, n) => /* @__PURE__ */ K(Re, {
							item: t,
							...ne,
							editing: T === n,
							onEditingChange: (t) => {
								e.get().conversation === i && E((e) => t ? n : e === n ? null : e);
							},
							editingDisabled: g.busy || g.loading || _.isPending,
							onEdit: g.edit
						}, `${i}:${n}`)), g.busy && /* @__PURE__ */ K(qe, { items: g.items })]
					}) : /* @__PURE__ */ K(Ie, {})
				}),
				g.error && /* @__PURE__ */ K("div", {
					className: "cms-assistant-width w-full shrink-0 pb-2",
					children: /* @__PURE__ */ q("div", {
						role: "alert",
						className: "flex items-start gap-2 rounded-md border border-danger/30 bg-danger/6 px-3 py-2 text-sm text-text",
						children: [
							/* @__PURE__ */ K(A, {
								name: "warning",
								size: 15,
								className: "mt-0.5 shrink-0 text-danger"
							}),
							/* @__PURE__ */ K("span", {
								className: "flex-1",
								children: g.error
							}),
							/* @__PURE__ */ K(j, {
								icon: "close",
								label: b("Dismiss"),
								size: "xs",
								onClick: g.dismissError
							})
						]
					})
				}),
				g.awaiting.length > 0 && T === null && /* @__PURE__ */ K(Ke, {
					calls: g.awaiting,
					onDecide: g.decide
				}),
				z && /* @__PURE__ */ K("div", {
					className: "cms-assistant-footer cms-assistant-width w-full shrink-0",
					children: /* @__PURE__ */ K(_e, {
						placeholder: g.awaiting.length ? b("Or tell {brand} what to do instead…") : b("Ask anything. @ for context, / for skills"),
						focus: x,
						onSubmit: F,
						children: /* @__PURE__ */ q("div", {
							className: "flex items-center gap-2 px-2 pb-2",
							children: [/* @__PURE__ */ K("div", {
								className: "flex min-w-0 flex-1",
								children: h.data && !g.loading && /* @__PURE__ */ K(Fe, {
									models: h.data.models,
									value: g.model,
									onChange: (t) => {
										e.model(t), je(t);
									}
								})
							}), g.busy ? /* @__PURE__ */ K(j, {
								icon: "stop",
								label: b("Stop"),
								variant: "secondary",
								onClick: g.stop
							}) : /* @__PURE__ */ K(j, {
								icon: "arrow-up",
								label: b("Send"),
								variant: "primary",
								onClick: F,
								disabled: !ee || g.loading || _.isPending || T !== null
							})]
						})
					})
				})
			] })]
		})]
	});
}
function Fe({ models: e, value: t, onChange: n }) {
	let r = e.find((e) => e.id === t);
	return r ? /* @__PURE__ */ K(M, {
		side: "top",
		align: "start",
		className: "w-72",
		trigger: /* @__PURE__ */ q("button", {
			type: "button",
			"aria-label": b("Model: {name}", { name: r.name }),
			className: "flex h-7 min-w-0 items-center gap-1 rounded-md pl-2 pr-1.5 text-xs text-muted outline-offset-[-2px] transition-colors hover:bg-hover hover:text-text data-[popup-open]:bg-hover data-[popup-open]:text-text",
			children: [/* @__PURE__ */ K("span", {
				className: "truncate",
				children: r.name
			}), /* @__PURE__ */ K(A, {
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
function Ie() {
	return T(), /* @__PURE__ */ q("div", {
		className: "cms-assistant-width flex min-h-full flex-col items-center justify-center py-8 text-center",
		children: [
			/* @__PURE__ */ K("div", {
				className: "mb-4 grid size-10 place-items-center rounded-lg border border-border bg-surface text-muted",
				children: /* @__PURE__ */ K(A, {
					name: "key",
					size: 18
				})
			}),
			/* @__PURE__ */ K("h2", {
				className: "m-0 text-base font-semibold text-ink",
				children: b("Connect Claude")
			}),
			/* @__PURE__ */ K("p", {
				className: "m-0 mt-1 text-sm text-muted",
				children: b("The assistant needs an Anthropic API key. It is stored encrypted on this server.")
			}),
			l("settings.manage") ? /* @__PURE__ */ K(s, {
				to: "/settings/assistant",
				className: "mt-5 no-underline",
				children: /* @__PURE__ */ K(D, {
					variant: "primary",
					children: b("Open Assistant Settings")
				})
			}) : /* @__PURE__ */ K("p", {
				className: "m-0 mt-4 text-sm text-faint",
				children: b("Ask an administrator to add one.")
			}),
			/* @__PURE__ */ q("p", {
				className: "m-0 pt-8 text-xs text-faint",
				children: [
					n() ? b("Chat is out of the top bar.") : b("Not using AI? {brand} works fully without it."),
					" ",
					/* @__PURE__ */ K("button", {
						type: "button",
						className: "text-muted underline decoration-border-strong underline-offset-2 hover:text-text",
						onClick: () => {
							let r = !n();
							t(r), r && e.close();
						},
						children: n() ? b("Show Chat") : b("Hide Chat")
					})
				]
			})
		]
	});
}
function Le() {
	return /* @__PURE__ */ K("div", {
		className: "cms-assistant-welcome cms-assistant-width flex min-h-full flex-col justify-end pb-3 pt-2",
		children: /* @__PURE__ */ K("h2", {
			className: "cms-assistant-greeting m-0 font-semibold tracking-[-0.02em] text-ink",
			children: b("What should we work on?")
		})
	});
}
function Re({ item: e, editing: t, onEditingChange: n, editingDisabled: r, onEdit: i, ...a }) {
	let [o, s] = U(""), c = H(null), l = () => {
		n(!1), requestAnimationFrame(() => c.current?.focus());
	};
	if (e.role === "user") {
		let a = async () => {
			!r && o.trim() && o.trim() !== e.text && await i(e, o, l);
		};
		return /* @__PURE__ */ q("div", {
			className: "cms-assistant-message flex flex-col items-end gap-1",
			children: [
				e.attached && e.attached.length > 0 && !t && /* @__PURE__ */ K(ze, { items: e.attached }),
				t ? /* @__PURE__ */ q("form", {
					className: "cms-assistant-message-editor w-full rounded-xl border border-border-strong bg-surface p-3",
					onSubmit: (e) => {
						e.preventDefault(), a();
					},
					children: [/* @__PURE__ */ K(F, {
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
					}), /* @__PURE__ */ q("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ K(D, {
							size: "sm",
							variant: "ghost",
							disabled: r,
							onClick: l,
							children: b("Cancel")
						}), /* @__PURE__ */ K(D, {
							type: "submit",
							size: "sm",
							variant: "primary",
							disabled: r || !o.trim() || o.trim() === e.text,
							children: b("Save & Send")
						})]
					})]
				}) : /* @__PURE__ */ K("div", {
					className: "cms-assistant-bubble max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3.5 py-2 text-sm text-text",
					children: e.text
				}),
				!t && /* @__PURE__ */ q("div", {
					className: "cms-assistant-message-actions flex items-center gap-0.5",
					children: [/* @__PURE__ */ K(Be, { text: e.text }), e.messageIndex !== void 0 && /* @__PURE__ */ K(I, {
						content: b("Edit message"),
						children: /* @__PURE__ */ K(j, {
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
	return e.role === "notice" ? /* @__PURE__ */ q("p", {
		className: L("m-0 flex items-center gap-1.5 text-xs", e.tone === "warning" ? "text-warning" : "text-faint"),
		children: [
			/* @__PURE__ */ K(A, {
				name: e.tone === "warning" ? "warning" : "info",
				size: 13
			}),
			" ",
			e.text
		]
	}) : /* @__PURE__ */ q("div", {
		className: "cms-assistant-message space-y-2",
		children: [e.parts.map((e, t) => /* @__PURE__ */ K(Ve, {
			part: e,
			...a
		}, e.type === "tool" ? e.id : t)), e.parts.some((e) => e.type === "text" && e.text.trim()) && /* @__PURE__ */ K("div", {
			className: "cms-assistant-message-actions flex items-center",
			children: /* @__PURE__ */ K(Be, { text: e.parts.filter((e) => e.type === "text").map((e) => e.text).join("\n\n") })
		})]
	});
}
function ze({ items: e }) {
	return /* @__PURE__ */ K("div", {
		className: "flex max-w-[85%] flex-wrap justify-end gap-x-2 gap-y-0.5",
		children: e.map((e, t) => {
			let n = /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(A, {
				name: e.icon ?? "file",
				size: 11,
				className: "shrink-0"
			}), /* @__PURE__ */ K("span", {
				className: "truncate",
				children: e.label
			})] }), r = "flex min-w-0 max-w-full items-center gap-1 rounded-xs text-xs text-faint no-underline";
			return e.to ? /* @__PURE__ */ K(s, {
				to: e.to,
				className: L(r, "hover:text-muted"),
				children: n
			}, t) : /* @__PURE__ */ K("span", {
				className: r,
				children: n
			}, t);
		})
	});
}
function Be({ text: e }) {
	let [t, n] = U(!1);
	V(() => {
		if (!t) return;
		let e = window.setTimeout(() => n(!1), 2e3);
		return () => window.clearTimeout(e);
	}, [t]);
	let r = b(t ? "Copied" : "Copy message");
	return /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(I, {
		content: r,
		children: /* @__PURE__ */ K(j, {
			icon: t ? "check" : "copy",
			label: r,
			title: void 0,
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(e), n(!0);
				} catch {
					R.error(b("Could not copy the message. Try again."));
				}
			}
		})
	}), /* @__PURE__ */ K("span", {
		role: "status",
		className: "sr-only",
		children: t ? b("Message copied") : ""
	})] });
}
function Ve({ part: e, disabled: t, onAction: n, surfaces: r }) {
	return e.type === "text" ? /* @__PURE__ */ K(we, { text: e.text }) : e.type === "thinking" ? /* @__PURE__ */ K(He, { text: e.text }) : e.surface && e.status === "ok" ? r.get(e.surface.id) === e.id ? /* @__PURE__ */ K(ee, {
		document: e.surface,
		disabled: t || e.used,
		onAction: (t) => n(e.id, t)
	}) : null : /* @__PURE__ */ K(We, { part: e });
}
function He({ text: e }) {
	let [t, n] = U(!1);
	return /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ q("button", {
		type: "button",
		onClick: () => n(!t),
		className: "flex items-center gap-1 text-xs text-faint hover:text-muted",
		"aria-expanded": t,
		children: [
			/* @__PURE__ */ K(A, {
				name: t ? "chevron-down" : "chevron-right",
				size: 11
			}),
			" ",
			b("Thought Process")
		]
	}), t && /* @__PURE__ */ K("p", {
		className: "m-0 mt-1.5 whitespace-pre-wrap border-l border-border pl-3 text-xs leading-relaxed text-muted",
		children: e
	})] });
}
var Ue = {
	ok: "check",
	error: "x-circle",
	declined: "minus",
	awaiting: "pause"
};
function We({ part: e }) {
	let [t, n] = U(!1), r = Je(e.input);
	return /* @__PURE__ */ q("div", {
		className: "rounded-sm border border-border",
		children: [/* @__PURE__ */ q("button", {
			type: "button",
			onClick: () => n(!t),
			"aria-expanded": t,
			className: "flex h-8 w-full items-center gap-2 px-2.5 text-left text-xs hover:bg-hover",
			children: [
				e.status === "running" ? /* @__PURE__ */ K(P, { size: 12 }) : /* @__PURE__ */ K(A, {
					name: Ue[e.status],
					size: 13,
					className: L(e.status === "ok" ? "text-success" : e.status === "error" ? "text-danger" : "text-faint")
				}),
				/* @__PURE__ */ K("span", {
					className: L("shrink-0 font-medium", e.status === "declined" ? "text-faint line-through" : "text-text"),
					children: e.label
				}),
				r && /* @__PURE__ */ K("span", {
					className: "min-w-0 flex-1 truncate text-faint",
					children: r
				}),
				/* @__PURE__ */ K(A, {
					name: t ? "chevron-down" : "chevron-right",
					size: 11,
					className: "ml-auto shrink-0 text-faint"
				})
			]
		}), t && /* @__PURE__ */ q("div", {
			className: "space-y-2 border-t border-border bg-surface px-2.5 py-2",
			children: [e.input !== void 0 && /* @__PURE__ */ K(Ge, {
				label: b("Input"),
				value: JSON.stringify(e.input, null, 2)
			}), e.output && /* @__PURE__ */ K(Ge, {
				label: e.status === "error" ? b("Error") : b("Result"),
				value: Ye(e.output)
			})]
		})]
	});
}
function Ge({ label: e, value: t }) {
	return /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("div", {
		className: "cms-caps mb-1",
		children: e
	}), /* @__PURE__ */ K("pre", {
		className: "m-0 max-h-56 overflow-auto whitespace-pre-wrap break-all font-mono text-2xs leading-relaxed text-muted",
		children: t
	})] });
}
function Ke({ calls: e, onDecide: t }) {
	let n = e.some((e) => e.destructive);
	return /* @__PURE__ */ K("div", {
		className: "cms-assistant-width w-full shrink-0 pb-2",
		children: /* @__PURE__ */ q("div", {
			className: "max-h-[40dvh] overflow-y-auto rounded-xl border border-border-strong bg-surface p-3 shadow-sm",
			children: [
				/* @__PURE__ */ q("p", {
					className: "m-0 flex items-center gap-1.5 text-sm font-medium text-ink",
					children: [
						/* @__PURE__ */ K(A, {
							name: "shield",
							size: 14
						}),
						" ",
						e.length === 1 ? b("Allow this action?") : b("Allow these {count} actions?", { count: e.length })
					]
				}),
				e.some((e) => e.untrusted) && /* @__PURE__ */ K("p", {
					className: "m-0 mt-1 text-xs text-muted",
					children: b("{brand} has read site content in this chat, which others may have written. Allow only what you asked for.")
				}),
				/* @__PURE__ */ K("ul", {
					className: "m-0 mt-2 list-none space-y-1 p-0",
					children: e.map((e) => /* @__PURE__ */ q("li", {
						className: "flex items-baseline gap-1.5 text-sm",
						children: [
							/* @__PURE__ */ K(A, {
								name: e.destructive ? "trash" : "edit",
								size: 12,
								className: e.destructive ? "text-danger" : "text-muted"
							}),
							/* @__PURE__ */ K("span", {
								className: "text-text",
								children: e.label
							}),
							Je(e.input) && /* @__PURE__ */ K("span", {
								className: "min-w-0 truncate text-xs text-faint",
								children: Je(e.input)
							})
						]
					}, e.id))
				}),
				/* @__PURE__ */ q("div", {
					className: "mt-3 flex justify-end gap-1.5",
					children: [/* @__PURE__ */ K(D, {
						size: "sm",
						variant: "ghost",
						onClick: () => t([]),
						children: b("Decline")
					}), /* @__PURE__ */ K(D, {
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
function qe({ items: e }) {
	let t = e[e.length - 1], n = t?.role === "assistant" ? t.parts[t.parts.length - 1] : void 0;
	return n?.type === "text" || n?.type === "tool" && n.status === "running" ? null : /* @__PURE__ */ q("p", {
		className: "m-0 flex items-center gap-2 text-xs text-faint",
		children: [
			/* @__PURE__ */ K(P, { size: 12 }),
			" ",
			b("Working…")
		]
	});
}
function Je(e) {
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
function Ye(e) {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}
// admin/src/sources.ts
var Xe = (e, ...t) => t.some((t) => t?.toLowerCase().includes(e.toLowerCase())), Ze = null, Qe = null;
g.composer.set("assistant-skills", {
	id: "assistant-skills",
	trigger: "/",
	label: b("Skills"),
	order: 10,
	search: async (e) => (Ze ??= _("assistant/skills"), (await Ze).filter((t) => Xe(e, t.name, t.label)).map((e) => ({
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
		perform: () => e.select(null)
	}, {
		id: "chats",
		label: b("All Chats"),
		icon: "history",
		perform: () => e.set({ history: !0 })
	}].filter((e) => Xe(t, e.label))
}), g.composer.set("assistant-resources", {
	id: "assistant-resources",
	trigger: "@",
	label: b("Site"),
	order: 40,
	search: async (e) => (Qe ??= _("assistant/resources"), (await Qe).filter((t) => Xe(e, t.name)).slice(0, 5).map((e) => ({
		id: `resource:${e.uri}`,
		kind: "resource",
		label: e.name,
		icon: "book",
		read: () => _("assistant/resource", { uri: e.uri })
	})))
}), g.panels.set("assistant", {
	id: "assistant",
	slot: "shell.dock",
	component: Ne
}), g.widgets.set("assistant-ask", z(() => import("./chunks/WidgetAsk-BzXgm3m1.js"))), g.panels.set("assistant-toggle", {
	id: "assistant-toggle",
	slot: "topbar.end",
	component: J
}), g.routes.set("/chat/:id", {
	path: "/chat/:id",
	component: () => l("assistant.use") ? null : /* @__PURE__ */ K(k, {
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
