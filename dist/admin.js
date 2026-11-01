import { i as e, n as t, r as n, t as r } from "./chunks/store-gqoPD8I2.js";
import { Link as i, boot as a, can as o, eventStream as s, events as c, getManifest as l, loadManifest as u, navigate as d, queryClient as f, registry as p, run as m, t as h, timeAgo as g, useAbility as _, useAction as v, useLocation as y, useManifest as b } from "@letterncms/sdk";
import { Button as x, EmptyState as S, Fields as C, Icon as w, IconButton as T, Menu as E, SidebarRow as D, Spinner as O, Surface as k, Textarea as A, Tooltip as j, Topbar as M, cn as N, confirm as P, toast as F } from "@letterncms/ui";
import { lazy as I, useCallback as L, useEffect as R, useLayoutEffect as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import { useInfiniteQuery as G } from "@tanstack/react-query";
// admin/src/fields.tsx
function K({ field: e, value: t, onChange: n, disabled: r }) {
	let i = B(null);
	return R(() => i.current?.focus(), [e.focus]), /* @__PURE__ */ U(A, {
		ref: i,
		value: t ?? "",
		disabled: r,
		onChange: (e) => n(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (e.preventDefault(), e.currentTarget.form?.requestSubmit());
		},
		rows: 2,
		placeholder: e.placeholder,
		className: "max-h-52 min-h-0 resize-none border-0 bg-transparent px-3 pt-2.5 text-sm shadow-none focus:ring-0 focus-visible:outline-none",
		"aria-label": e.label
	});
}
// admin/src/Markdown.tsx
function ee({ text: e }) {
	return /* @__PURE__ */ U("div", {
		className: "cms-md space-y-2.5 text-sm leading-[1.6] text-text",
		children: q(e)
	});
}
function q(e) {
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
			r++, n.push(/* @__PURE__ */ U("pre", {
				className: "overflow-x-auto rounded-sm border border-border bg-sunken px-3 py-2 font-mono text-xs leading-relaxed text-text",
				children: /* @__PURE__ */ U("code", { children: e.join("\n") })
			}, n.length));
			continue;
		}
		let a = e.match(/^(#{1,4})\s+(.*)$/);
		if (a) {
			let e = a[1].length <= 2 ? "text-[15px]" : "text-sm";
			n.push(/* @__PURE__ */ U("p", {
				className: `${e} pt-1 font-semibold tracking-[-0.01em] text-ink`,
				children: J(a[2])
			}, n.length)), r++;
			continue;
		}
		if (/^\s*\|.*\|\s*$/.test(e) && /^\s*\|?\s*:?-{2,}/.test(t[r + 1] ?? "")) {
			let i = (e) => e.trim().replace(/^\||\|$/g, "").split("|").map((e) => e.trim()), a = i(e), o = [];
			for (r += 2; r < t.length && /^\s*\|.*\|\s*$/.test(t[r]);) o.push(i(t[r++]));
			n.push(/* @__PURE__ */ U("div", {
				className: "overflow-x-auto rounded-sm border border-border",
				children: /* @__PURE__ */ W("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ U("thead", {
						className: "bg-surface text-muted",
						children: /* @__PURE__ */ U("tr", { children: a.map((e, t) => /* @__PURE__ */ U("th", {
							className: "px-2.5 py-1.5 font-medium",
							children: J(e)
						}, t)) })
					}), /* @__PURE__ */ U("tbody", { children: o.map((e, t) => /* @__PURE__ */ U("tr", {
						className: "border-t border-border",
						children: e.map((e, t) => /* @__PURE__ */ U("td", {
							className: "px-2.5 py-1.5 align-top",
							children: J(e)
						}, t))
					}, t)) })]
				})
			}, n.length));
			continue;
		}
		if (/^\s*>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s*>/.test(t[r]);) e.push(t[r++].replace(/^\s*>\s?/, ""));
			n.push(/* @__PURE__ */ U("blockquote", {
				className: "border-l-2 border-border-strong pl-3 text-muted",
				children: q(e.join("\n"))
			}, n.length));
			continue;
		}
		let o = /^\s*[-*+]\s+/, s = /^\s*\d+[.)]\s+/;
		if (o.test(e) || s.test(e)) {
			let i = s.test(e), a = i ? s : o, c = [];
			for (; r < t.length && (a.test(t[r]) || /^\s{2,}\S/.test(t[r]) && c.length);) a.test(t[r]) ? c.push(t[r].replace(a, "")) : c[c.length - 1] += `\n${t[r].trim()}`, r++;
			let l = i ? "ol" : "ul";
			n.push(/* @__PURE__ */ U(l, {
				className: `${i ? "list-decimal" : "list-disc"} space-y-1 pl-5 marker:text-faint`,
				children: c.map((e, t) => /* @__PURE__ */ U("li", { children: J(e) }, t))
			}, n.length));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !/^(\s*(```|~~~|>|[-*+]\s|\d+[.)]\s)|#{1,4}\s)/.test(t[r]);) c.push(t[r++]);
		c.length === 0 && c.push(t[r++]), n.push(/* @__PURE__ */ U("p", { children: J(c.join("\n")) }, n.length));
	}
	return n;
}
var te = /(`[^`]+`)|(\*\*[^*]+\*\*|__[^_]+__)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(\[[^\]]+\]\([^)\s]+\))|(\n)/g;
function J(e) {
	let t = [], n = 0;
	for (let r of e.matchAll(te)) {
		r.index > n && t.push(e.slice(n, r.index));
		let [i] = r, a = t.length;
		if (r[1]) t.push(/* @__PURE__ */ U("code", {
			className: "rounded-xs bg-sunken px-1 py-px font-mono text-[0.92em]",
			children: i.slice(1, -1)
		}, a));
		else if (r[2]) t.push(/* @__PURE__ */ U("strong", {
			className: "font-semibold text-ink",
			children: J(i.slice(2, -2))
		}, a));
		else if (r[3]) t.push(/* @__PURE__ */ U("em", { children: J(i.slice(1, -1)) }, a));
		else if (r[4]) {
			let [, e, n] = i.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
			t.push(/* @__PURE__ */ U(ne, {
				href: n,
				children: J(e)
			}, a));
		} else t.push(/* @__PURE__ */ U("br", {}, a));
		n = r.index + i.length;
	}
	return n < e.length && t.push(e.slice(n)), t;
}
function ne({ href: e, children: t }) {
	let n = e.startsWith(`${a.base}/`) || e === a.base;
	return n || /^(https?:\/\/|\/(?!\/)|mailto:)/i.test(e) ? /* @__PURE__ */ U("a", {
		href: e,
		target: n ? void 0 : "_blank",
		rel: n ? void 0 : "noopener noreferrer",
		className: "text-ink underline decoration-border-strong underline-offset-2 hover:decoration-ink",
		onClick: (t) => {
			!n || t.metaKey || t.ctrlKey || (t.preventDefault(), d(e.slice(a.base.length) || "/"));
		},
		children: t
	}) : /* @__PURE__ */ U(H, { children: t });
}
// admin/src/useChat.ts
function re(e, { picked: t, fallback: r, offered: i } = {}) {
	let [a, o] = V([]), [c, l] = V(null), d = t ?? (c && (!i || i.includes(c)) ? c : r), [p, g] = V([]), [_, v] = V(""), [y, b] = V(!1), [x, S] = V(!1), [C, w] = V(null), T = B(null), E = B(e), D = B(d);
	D.current = d, R(() => {
		if (e === E.current && (a.length || y) || (T.current?.abort(), T.current = null, b(!1), S(!1), E.current = e, o([]), v(""), l(null), w(null), g([]), !e)) return;
		let t = !1;
		return S(!0), m("assistant/conversation", { id: e }).then((e) => {
			t || (o(e.items), g(e.awaiting), v(e.title), l(e.model), n.set({ title: e.title }));
		}).catch((e) => {
			t || (e.status === 404 ? n.select(null) : w(e.message));
		}).finally(() => !t && S(!1)), () => {
			t = !0;
		};
	}, [e]), R(() => () => T.current?.abort(), []);
	let O = (e) => o((t) => {
		let n = t[t.length - 1];
		return n?.role === "assistant" ? [...t.slice(0, -1), {
			...n,
			parts: e(n.parts)
		}] : [...t, {
			role: "assistant",
			parts: e([])
		}];
	}), k = (e, t) => o((n) => n.map((n) => n.role === "assistant" ? {
		...n,
		parts: n.parts.map((n) => n.type === "tool" && n.id === e ? {
			...n,
			...t
		} : n)
	} : n)), A = (e, t) => O((n) => {
		let r = n[n.length - 1];
		return r?.type === e ? [...n.slice(0, -1), {
			...r,
			text: r.text + t
		}] : [...n, {
			type: e,
			text: t
		}];
	}), j = L(async (e, t) => {
		T.current?.abort();
		let r = new AbortController();
		T.current = r, b(!0), w(null);
		let i = {
			conversation: E.current,
			title: n.get().title || String(e.message ?? h("New Chat"))
		};
		n.set({ working: i });
		let a = !1, c = !1, d = D.current;
		try {
			await s("assistant/chat", {
				conversation: E.current,
				model: d,
				...e,
				context: { path: n.get().contextPath }
			}, (s, u) => {
				if (!(r.signal.aborted || T.current !== r)) switch (s) {
					case "user_message": {
						c = !0;
						let n = e.edit;
						o((e) => {
							let t = n ? e.findIndex((e) => e.role === "user" && e.messageIndex === n.index) : e.findLastIndex((e) => e.role === "user");
							return t < 0 ? e : [
								...e.slice(0, t),
								{
									role: "user",
									text: u.text,
									messageIndex: u.messageIndex
								},
								...n ? [] : e.slice(t + 1)
							];
						}), n && (g([]), t?.());
						break;
					}
					case "conversation":
						d && l(d), E.current = u.id, i = {
							conversation: u.id,
							title: u.title
						}, n.set({ working: i }), v(u.title), n.created(u.id, u.title), f.invalidateQueries({ queryKey: ["assistant/conversations"] });
						break;
					case "text":
					case "thinking":
						A(s, u.delta);
						break;
					case "tool":
						O((e) => [...e, {
							type: "tool",
							id: u.id,
							name: u.name,
							label: u.label,
							status: "running"
						}]);
						break;
					case "tool_result":
						k(u.id, {
							status: u.declined ? "declined" : u.ok ? "ok" : "error",
							output: u.output,
							input: u.input,
							surface: u.surface ?? void 0
						}), a ||= u.mutated, u.mutated && f.invalidateQueries();
						break;
					case "surface_used":
						k(u.id, { used: !0 });
						break;
					case "approval":
						g(u.calls);
						for (let e of u.calls) k(e.id, {
							status: "awaiting",
							input: e.input
						});
						break;
					case "notice":
						o((e) => [...e, {
							role: "notice",
							text: u.message,
							tone: u.tone
						}]);
						break;
					case "error":
						w(u.message);
						break;
					case "done": v(u.conversation.title), n.set({ title: u.conversation.title });
				}
			}, r.signal);
		} catch (e) {
			r.signal.aborted || w(e instanceof Error ? e.message : h("The assistant failed."));
		} finally {
			if (a) try {
				await u();
			} catch (e) {
				!r.signal.aborted && T.current === r && w(e instanceof Error ? e.message : h("The assistant failed."));
			}
			n.get().working === i && n.set({ working: null }), T.current === r && (T.current = null, b(!1)), a && f.invalidateQueries(), f.invalidateQueries({ queryKey: ["assistant/conversations"] });
		}
		return c;
	}, []), M = L((e, t, n) => T.current || x || !E.current || e.messageIndex === void 0 || !t.trim() ? Promise.resolve(!1) : j({
		message: t.trim(),
		edit: {
			index: e.messageIndex,
			original: e.text
		}
	}, n), [x, j]);
	return {
		items: a,
		awaiting: p,
		title: _,
		model: d,
		busy: y,
		loading: x,
		error: C,
		send: L((e) => {
			let t = e.trim();
			if (t) {
				for (let e of p) k(e.id, { status: "declined" });
				g([]), o((e) => [...e, {
					role: "user",
					text: t
				}]), j({ message: t });
			}
		}, [p, j]),
		edit: M,
		decide: L((e) => {
			for (let t of p) e.includes(t.id) || k(t.id, { status: "declined" });
			for (let t of e) k(t, { status: "running" });
			g([]), j({ approve: e });
		}, [p, j]),
		stop: L(() => {
			T.current?.abort(), T.current = null, b(!1), n.set({ working: null }), o((e) => [...e, {
				role: "notice",
				text: h("Stopped. The step in progress still finishes on the server."),
				tone: "neutral"
			}]);
		}, []),
		interact: L((e, t) => {
			if (T.current || p.length || !E.current || x) return;
			let n = a.flatMap((e) => e.role === "assistant" ? e.parts : []).find((t) => t.type === "tool" && t.id === e);
			n?.type === "tool" && n.surface && !n.used && (o((e) => [...e, {
				role: "user",
				text: h("Selected an action in “{title}”.", { title: n.surface.title })
			}]), j({ action: {
				tool: e,
				...t
			} }));
		}, [
			a,
			p,
			x,
			j
		]),
		dismissError: () => w(null)
	};
}
// admin/src/Panel.tsx
var Y = "assistant.model";
function ie(e) {
	let t = l().user.preferences?.[Y];
	return e.models.some((e) => e.id === t) ? t : e.model;
}
function ae(e) {
	let t = l().user;
	t.preferences = {
		...t.preferences ?? {},
		[Y]: e
	}, m("account/update", { preferences: { [Y]: e } }).catch(() => {});
}
function oe() {
	let { path: e } = y(), r = t(e);
	return z(() => {
		r === void 0 ? n.set({ contextPath: e }) : n.get().conversation !== r && n.set({
			conversation: r,
			prompt: null
		});
	}, [e, r]), o("assistant.use") ? /* @__PURE__ */ U(se, { open: r !== void 0 }) : null;
}
function se({ open: t }) {
	let { conversation: r, prompt: i, drafts: a, models: o, focus: s } = e(), c = _("assistant/status", {}, { staleTime: 6e4 }), l = re(r, {
		picked: o[r ?? "new"] ?? (r || !c.data ? void 0 : ie(c.data)),
		fallback: c.data?.model,
		offered: c.data?.models.map((e) => e.id)
	}), u = v("assistant/conversation-delete", {
		invalidates: ["assistant/conversations"],
		onSuccess: (e, { id: t }) => {
			n.deleted(t), F.success(h("Chat deleted"));
		},
		onError: F.error
	}), d = a[r ?? "new"] ?? "", f = n.draft, [p, m] = V(0), [g, y] = V(null), b = B(null), S = B(!0);
	R(() => {
		t && i && !l.busy && !l.loading && !u.isPending && g === null && c.data?.configured && (n.set({ prompt: null }), l.send(i));
	}, [
		t,
		i,
		l,
		u.isPending,
		g,
		c.data?.configured
	]), R(() => {
		S.current = !0, y(null), t && m((e) => e + 1);
	}, [
		r,
		t,
		s
	]), z(() => {
		let e = b.current;
		t && e && S.current && (e.scrollTop = e.scrollHeight);
	});
	let D = () => {
		!d.trim() || l.busy || l.loading || u.isPending || g !== null || (S.current = !0, l.send(d), f(""));
	}, k = c.data?.configured === !0, A = /* @__PURE__ */ new Map();
	for (let e of l.items) if (e.role === "assistant") for (let t of e.parts) t.type === "tool" && t.surface && t.status === "ok" && A.set(t.surface.id, t.id);
	let j = {
		disabled: l.busy || l.loading || l.awaiting.length > 0 || g !== null,
		onAction: l.interact,
		surfaces: A
	};
	return /* @__PURE__ */ W("main", {
		id: "cms-assistant",
		"data-empty": k && !l.loading && !l.items.length || void 0,
		hidden: !t,
		"aria-label": l.title || h("New Chat"),
		className: "cms-assistant-page",
		children: [
			/* @__PURE__ */ U(M, {
				crumbs: [{ label: /* @__PURE__ */ U("span", {
					role: "heading",
					"aria-level": 1,
					children: l.title || h("New Chat")
				}) }],
				actions: r && /* @__PURE__ */ U(E, {
					trigger: /* @__PURE__ */ U(T, {
						icon: "more",
						label: h("Chat Actions"),
						disabled: u.isPending
					}),
					items: [{
						label: h("Delete Chat"),
						icon: "trash",
						danger: !0,
						disabled: l.busy || l.loading || u.isPending,
						onSelect: async () => {
							!r || l.busy || l.loading || u.isPending || await P({
								title: h("Delete “{title}”?", { title: l.title || h("New Chat") }),
								description: h("This chat and its messages will be permanently deleted."),
								confirm: h("Delete Chat"),
								danger: !0
							}) && u.mutate({ id: r });
						}
					}]
				})
			}),
			/* @__PURE__ */ U("div", {
				ref: b,
				onScroll: (e) => {
					let t = e.currentTarget;
					S.current = t.scrollHeight - t.scrollTop - t.clientHeight < 48;
				},
				className: "cms-assistant-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain",
				children: c.isPending || l.loading ? /* @__PURE__ */ U("div", {
					className: "grid h-full place-items-center text-faint",
					children: /* @__PURE__ */ U(O, {})
				}) : c.isError ? /* @__PURE__ */ W("div", {
					role: "alert",
					className: "cms-assistant-width flex min-h-full flex-col items-center justify-center gap-3 text-sm text-muted",
					children: [/* @__PURE__ */ U("p", { children: h("Could not connect to the assistant.") }), /* @__PURE__ */ U(x, {
						onClick: () => void c.refetch(),
						children: h("Try Again")
					})]
				}) : k ? l.items.length === 0 ? /* @__PURE__ */ U(ue, { onPick: (e, t) => t ? l.send(e) : (f(e), m((e) => e + 1)) }) : /* @__PURE__ */ W("div", {
					className: "cms-assistant-thread cms-assistant-width space-y-6 py-6",
					children: [l.items.map((e, t) => /* @__PURE__ */ U(de, {
						item: e,
						...j,
						editing: g === t,
						onEditingChange: (e) => {
							n.get().conversation === r && y((n) => e ? t : n === t ? null : n);
						},
						editingDisabled: l.busy || l.loading || u.isPending,
						onEdit: l.edit
					}, `${r}:${t}`)), l.busy && /* @__PURE__ */ U(_e, { items: l.items })]
				}) : /* @__PURE__ */ U(le, {})
			}),
			l.error && /* @__PURE__ */ U("div", {
				className: "cms-assistant-width w-full shrink-0 pb-2",
				children: /* @__PURE__ */ W("div", {
					role: "alert",
					className: "flex items-start gap-2 rounded-md border border-danger/30 bg-danger/6 px-3 py-2 text-sm text-text",
					children: [
						/* @__PURE__ */ U(w, {
							name: "warning",
							size: 15,
							className: "mt-0.5 shrink-0 text-danger"
						}),
						/* @__PURE__ */ U("span", {
							className: "flex-1",
							children: l.error
						}),
						/* @__PURE__ */ U(T, {
							icon: "close",
							label: h("Dismiss"),
							size: "xs",
							onClick: l.dismissError
						})
					]
				})
			}),
			l.awaiting.length > 0 && g === null && /* @__PURE__ */ U(ge, {
				calls: l.awaiting,
				onDecide: l.decide
			}),
			k && /* @__PURE__ */ U("div", {
				className: "cms-assistant-footer cms-assistant-width w-full shrink-0",
				children: /* @__PURE__ */ W("form", {
					onSubmit: (e) => {
						e.preventDefault(), D();
					},
					className: "cms-assistant-composer overflow-hidden rounded-lg border border-border bg-surface transition-colors focus-within:border-border-strong",
					children: [/* @__PURE__ */ U(C, {
						bare: !0,
						fields: [{
							handle: "draft",
							type: "textarea",
							component: "assistant-composer",
							label: h("Message {brand}"),
							placeholder: l.awaiting.length ? h("Or tell {brand} what to do instead…") : h("Ask {brand} to build, write or change something…"),
							focus: p
						}],
						values: { draft: d },
						onChange: (e, t) => f(t)
					}), /* @__PURE__ */ W("div", {
						className: "flex items-center gap-2 px-2 pb-2",
						children: [/* @__PURE__ */ U("div", {
							className: "flex min-w-0 flex-1",
							children: c.data && !l.loading && /* @__PURE__ */ U(ce, {
								models: c.data.models,
								value: l.model,
								onChange: (e) => {
									n.model(e), ae(e);
								}
							})
						}), l.busy ? /* @__PURE__ */ U(T, {
							icon: "stop",
							label: h("Stop"),
							variant: "secondary",
							onClick: l.stop
						}) : /* @__PURE__ */ U(T, {
							icon: "arrow-up",
							label: h("Send"),
							variant: "primary",
							onClick: D,
							disabled: !d.trim() || l.loading || u.isPending || g !== null
						})]
					})]
				})
			})
		]
	});
}
function ce({ models: e, value: t, onChange: n }) {
	let r = e.find((e) => e.id === t);
	return r ? /* @__PURE__ */ U(E, {
		side: "top",
		align: "start",
		className: "w-72",
		trigger: /* @__PURE__ */ W("button", {
			type: "button",
			"aria-label": h("Model: {name}", { name: r.name }),
			className: "flex h-7 min-w-0 items-center gap-1 rounded-md pl-2 pr-1.5 text-xs text-muted outline-offset-[-2px] transition-colors hover:bg-hover hover:text-text data-[popup-open]:bg-hover data-[popup-open]:text-text",
			children: [/* @__PURE__ */ U("span", {
				className: "truncate",
				children: r.name
			}), /* @__PURE__ */ U(w, {
				name: "chevron-down",
				size: 12,
				className: "shrink-0 text-faint"
			})]
		}),
		items: [{
			label: h("Model"),
			heading: !0
		}, ...e.map((e) => ({
			label: e.name,
			description: e.description,
			checked: e.id === r.id,
			onSelect: () => e.id !== r.id && n(e.id)
		}))]
	}) : null;
}
function le() {
	let { sidebar: e } = b(), t = !e.hidden.includes("chat");
	return /* @__PURE__ */ W("div", {
		className: "cms-assistant-width flex min-h-full flex-col items-center justify-center py-8 text-center",
		children: [
			/* @__PURE__ */ U("div", {
				className: "mb-4 grid size-10 place-items-center rounded-lg border border-border bg-surface text-muted",
				children: /* @__PURE__ */ U(w, {
					name: "key",
					size: 18
				})
			}),
			/* @__PURE__ */ U("h2", {
				className: "m-0 text-base font-semibold text-ink",
				children: h("Connect Claude")
			}),
			/* @__PURE__ */ U("p", {
				className: "m-0 mt-1 text-sm text-muted",
				children: h("The assistant needs an Anthropic API key. It is stored encrypted on this server.")
			}),
			o("settings.manage") ? /* @__PURE__ */ U(i, {
				to: "/settings/assistant",
				className: "mt-5 no-underline",
				children: /* @__PURE__ */ U(x, {
					variant: "primary",
					children: h("Open Assistant Settings")
				})
			}) : /* @__PURE__ */ U("p", {
				className: "m-0 mt-4 text-sm text-faint",
				children: h("Ask an administrator to add one.")
			}),
			t && /* @__PURE__ */ W("p", {
				className: "m-0 mt-8 text-xs text-faint",
				children: [
					h("Not using AI? {brand} works fully without it."),
					" ",
					/* @__PURE__ */ U("button", {
						type: "button",
						className: "text-muted underline decoration-border-strong underline-offset-2 hover:text-text",
						onClick: () => {
							c.emit("sidebar.pin", {
								id: "chat",
								pinned: !1
							}), d("/");
						},
						children: h("Unpin New Chat")
					})
				]
			})
		]
	});
}
function ue({ onPick: t }) {
	let { contextPath: n } = e(), r = [
		.../^\/content\/[^/]+\/[^/]+$/.test(n) ? [{
			label: h("Tighten This Page"),
			text: h("Proofread this page: fix mistakes, tighten the copy and improve the SEO description. Show me what you changed."),
			send: !0
		}] : [],
		{
			label: h("Build a Landing Page"),
			text: h("Build a landing page for "),
			send: !1
		},
		{
			label: h("Draft a Blog Post"),
			text: h("Draft a blog post about "),
			send: !1
		},
		{
			label: h("Audit SEO"),
			text: h("Check every published page for SEO and accessibility problems and list the most important fixes. Do not change anything yet."),
			send: !0
		},
		{
			label: h("Adjust the Design"),
			text: h("Change the design system so the site feels "),
			send: !1
		}
	];
	return /* @__PURE__ */ W("div", {
		className: "cms-assistant-welcome cms-assistant-width flex min-h-full flex-col justify-center py-8",
		children: [
			/* @__PURE__ */ U("div", {
				className: "mb-5 flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-ink",
				children: /* @__PURE__ */ U(w, {
					name: "sparkle",
					size: 21
				})
			}),
			/* @__PURE__ */ U("h2", {
				className: "cms-assistant-greeting m-0 font-semibold tracking-[-0.025em] text-ink",
				children: h("What should we work on?")
			}),
			/* @__PURE__ */ U("p", {
				className: "m-0 mt-1 text-sm text-muted",
				children: h("{brand} writes, designs and publishes with the same actions you can, and asks before deleting anything.")
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: r.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => t(e.text, e.send),
					className: "min-h-8 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:bg-hover hover:text-text",
					children: e.label
				}, e.label))
			})
		]
	});
}
function de({ item: e, editing: t, onEditingChange: n, editingDisabled: r, onEdit: i, ...a }) {
	let [o, s] = V(""), c = B(null), l = () => {
		n(!1), requestAnimationFrame(() => c.current?.focus());
	};
	if (e.role === "user") {
		let a = async () => {
			!r && o.trim() && o.trim() !== e.text && await i(e, o, l);
		};
		return /* @__PURE__ */ W("div", {
			className: "cms-assistant-message flex flex-col items-end gap-1",
			children: [t ? /* @__PURE__ */ W("form", {
				className: "cms-assistant-message-editor w-full rounded-xl border border-border-strong bg-surface p-3",
				onSubmit: (e) => {
					e.preventDefault(), a();
				},
				children: [/* @__PURE__ */ U(A, {
					autoFocus: !0,
					"aria-label": h("Edit message"),
					value: o,
					onChange: (e) => s(e.target.value),
					maxLength: 2e4,
					disabled: r,
					rows: 2,
					className: "max-h-52 resize-none",
					onKeyDown: (e) => {
						e.nativeEvent.isComposing || (e.key === "Escape" && (e.preventDefault(), l()), e.key === "Enter" && !e.shiftKey && (e.preventDefault(), a()));
					}
				}), /* @__PURE__ */ W("div", {
					className: "mt-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ U(x, {
						size: "sm",
						variant: "ghost",
						disabled: r,
						onClick: l,
						children: h("Cancel")
					}), /* @__PURE__ */ U(x, {
						type: "submit",
						size: "sm",
						variant: "primary",
						disabled: r || !o.trim() || o.trim() === e.text,
						children: h("Save & Send")
					})]
				})]
			}) : /* @__PURE__ */ U("div", {
				className: "max-w-[85%] whitespace-pre-wrap break-words rounded-xl bg-sunken px-4 py-2.5 text-sm text-text",
				children: e.text
			}), !t && /* @__PURE__ */ W("div", {
				className: "cms-assistant-message-actions flex items-center gap-0.5",
				children: [/* @__PURE__ */ U(X, { text: e.text }), e.messageIndex !== void 0 && /* @__PURE__ */ U(j, {
					content: h("Edit message"),
					children: /* @__PURE__ */ U(T, {
						ref: c,
						icon: "edit",
						label: h("Edit message"),
						title: void 0,
						disabled: r,
						onClick: () => {
							s(e.text), n(!0);
						}
					})
				})]
			})]
		});
	}
	return e.role === "notice" ? /* @__PURE__ */ W("p", {
		className: N("m-0 flex items-center gap-1.5 text-xs", e.tone === "warning" ? "text-warning" : "text-faint"),
		children: [
			/* @__PURE__ */ U(w, {
				name: e.tone === "warning" ? "warning" : "info",
				size: 13
			}),
			" ",
			e.text
		]
	}) : /* @__PURE__ */ W("div", {
		className: "cms-assistant-message space-y-2",
		children: [e.parts.map((e, t) => /* @__PURE__ */ U(fe, {
			part: e,
			...a
		}, e.type === "tool" ? e.id : t)), e.parts.some((e) => e.type === "text" && e.text.trim()) && /* @__PURE__ */ U("div", {
			className: "cms-assistant-message-actions flex items-center",
			children: /* @__PURE__ */ U(X, { text: e.parts.filter((e) => e.type === "text").map((e) => e.text).join("\n\n") })
		})]
	});
}
function X({ text: e }) {
	let [t, n] = V(!1);
	R(() => {
		if (!t) return;
		let e = window.setTimeout(() => n(!1), 2e3);
		return () => window.clearTimeout(e);
	}, [t]);
	let r = h(t ? "Copied" : "Copy message");
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(j, {
		content: r,
		children: /* @__PURE__ */ U(T, {
			icon: t ? "check" : "copy",
			label: r,
			title: void 0,
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(e), n(!0);
				} catch {
					F.error(h("Could not copy the message. Try again."));
				}
			}
		})
	}), /* @__PURE__ */ U("span", {
		role: "status",
		className: "sr-only",
		children: t ? h("Message copied") : ""
	})] });
}
function fe({ part: e, disabled: t, onAction: n, surfaces: r }) {
	return e.type === "text" ? /* @__PURE__ */ U(ee, { text: e.text }) : e.type === "thinking" ? /* @__PURE__ */ U(pe, { text: e.text }) : e.surface && e.status === "ok" ? r.get(e.surface.id) === e.id ? /* @__PURE__ */ U(k, {
		document: e.surface,
		disabled: t || e.used,
		onAction: (t) => n(e.id, t)
	}) : null : /* @__PURE__ */ U(he, { part: e });
}
function pe({ text: e }) {
	let [t, n] = V(!1);
	return /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("button", {
		type: "button",
		onClick: () => n(!t),
		className: "flex items-center gap-1 text-xs text-faint hover:text-muted",
		"aria-expanded": t,
		children: [
			/* @__PURE__ */ U(w, {
				name: t ? "chevron-down" : "chevron-right",
				size: 11
			}),
			" ",
			h("Thought Process")
		]
	}), t && /* @__PURE__ */ U("p", {
		className: "m-0 mt-1.5 whitespace-pre-wrap border-l border-border pl-3 text-xs leading-relaxed text-muted",
		children: e
	})] });
}
var me = {
	ok: "check",
	error: "x-circle",
	declined: "minus",
	awaiting: "pause"
};
function he({ part: e }) {
	let [t, n] = V(!1), r = Q(e.input);
	return /* @__PURE__ */ W("div", {
		className: "rounded-sm border border-border",
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => n(!t),
			"aria-expanded": t,
			className: "flex h-8 w-full items-center gap-2 px-2.5 text-left text-xs hover:bg-hover",
			children: [
				e.status === "running" ? /* @__PURE__ */ U(O, { size: 12 }) : /* @__PURE__ */ U(w, {
					name: me[e.status],
					size: 13,
					className: N(e.status === "ok" ? "text-success" : e.status === "error" ? "text-danger" : "text-faint")
				}),
				/* @__PURE__ */ U("span", {
					className: N("shrink-0 font-medium", e.status === "declined" ? "text-faint line-through" : "text-text"),
					children: e.label
				}),
				r && /* @__PURE__ */ U("span", {
					className: "min-w-0 flex-1 truncate text-faint",
					children: r
				}),
				/* @__PURE__ */ U(w, {
					name: t ? "chevron-down" : "chevron-right",
					size: 11,
					className: "ml-auto shrink-0 text-faint"
				})
			]
		}), t && /* @__PURE__ */ W("div", {
			className: "space-y-2 border-t border-border bg-surface px-2.5 py-2",
			children: [e.input !== void 0 && /* @__PURE__ */ U(Z, {
				label: h("Input"),
				value: JSON.stringify(e.input, null, 2)
			}), e.output && /* @__PURE__ */ U(Z, {
				label: e.status === "error" ? h("Error") : h("Result"),
				value: ve(e.output)
			})]
		})]
	});
}
function Z({ label: e, value: t }) {
	return /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
		className: "cms-caps mb-1",
		children: e
	}), /* @__PURE__ */ U("pre", {
		className: "m-0 max-h-56 overflow-auto whitespace-pre-wrap break-all font-mono text-2xs leading-relaxed text-muted",
		children: t
	})] });
}
function ge({ calls: e, onDecide: t }) {
	let n = e.some((e) => e.destructive);
	return /* @__PURE__ */ U("div", {
		className: "cms-assistant-width w-full shrink-0 pb-2",
		children: /* @__PURE__ */ W("div", {
			className: "max-h-[40dvh] overflow-y-auto rounded-xl border border-border-strong bg-surface p-3 shadow-sm",
			children: [
				/* @__PURE__ */ W("p", {
					className: "m-0 flex items-center gap-1.5 text-sm font-medium text-ink",
					children: [
						/* @__PURE__ */ U(w, {
							name: "shield",
							size: 14
						}),
						" ",
						e.length === 1 ? h("Allow this action?") : h("Allow these {count} actions?", { count: e.length })
					]
				}),
				e.some((e) => e.untrusted) && /* @__PURE__ */ U("p", {
					className: "m-0 mt-1 text-xs text-muted",
					children: h("{brand} has read site content in this chat, which others may have written. Allow only what you asked for.")
				}),
				/* @__PURE__ */ U("ul", {
					className: "m-0 mt-2 list-none space-y-1 p-0",
					children: e.map((e) => /* @__PURE__ */ W("li", {
						className: "flex items-baseline gap-1.5 text-sm",
						children: [
							/* @__PURE__ */ U(w, {
								name: e.destructive ? "trash" : "edit",
								size: 12,
								className: e.destructive ? "text-danger" : "text-muted"
							}),
							/* @__PURE__ */ U("span", {
								className: "text-text",
								children: e.label
							}),
							Q(e.input) && /* @__PURE__ */ U("span", {
								className: "min-w-0 truncate text-xs text-faint",
								children: Q(e.input)
							})
						]
					}, e.id))
				}),
				/* @__PURE__ */ W("div", {
					className: "mt-3 flex justify-end gap-1.5",
					children: [/* @__PURE__ */ U(x, {
						size: "sm",
						variant: "ghost",
						onClick: () => t([]),
						children: h("Decline")
					}), /* @__PURE__ */ U(x, {
						size: "sm",
						variant: n ? "danger" : "primary",
						onClick: () => t(e.map((e) => e.id)),
						autoFocus: !0,
						children: e.length === 1 ? h("Allow") : h("Allow All")
					})]
				})
			]
		})
	});
}
function _e({ items: e }) {
	let t = e[e.length - 1], n = t?.role === "assistant" ? t.parts[t.parts.length - 1] : void 0;
	return n?.type === "text" || n?.type === "tool" && n.status === "running" ? null : /* @__PURE__ */ W("p", {
		className: "m-0 flex items-center gap-2 text-xs text-faint",
		children: [
			/* @__PURE__ */ U(O, { size: 12 }),
			" ",
			h("Working…")
		]
	});
}
function Q(e) {
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
function ve(e) {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}
// admin/src/History.tsx
var $ = 20;
function ye({ collapsed: i, onExpand: a, onNavigate: s }) {
	let { path: c } = y(), { drafts: l, conversation: u, title: d, working: f } = e(), p = t(c), [_, b] = V(5), [x, S] = V(() => {
		try {
			return localStorage.getItem("cms.chats.folded") === "true";
		} catch {
			return !1;
		}
	}), C = v("assistant/conversation-delete", {
		invalidates: ["assistant/conversations"],
		onSuccess: (e, { id: t }) => {
			n.deleted(t), F.success(h("Chat deleted"));
		},
		onError: F.error
	}), T = async (e) => {
		f?.conversation === e.id || C.isPending || await P({
			title: h("Delete “{title}”?", { title: e.title || h("New Chat") }),
			description: h("This chat and its messages will be permanently deleted."),
			confirm: h("Delete Chat"),
			danger: !0
		}) && C.mutate({ id: e.id });
	}, E = o("assistant.use"), k = G({
		queryKey: ["assistant/conversations", "sidebar"],
		initialPageParam: 0,
		queryFn: ({ pageParam: e }) => m("assistant/conversations", {
			limit: $,
			offset: e
		}),
		getNextPageParam: (e, t) => e.length === $ ? t.length * $ : void 0,
		enabled: E
	});
	if (!E) return null;
	let A = k.data?.pages.flat() ?? [], M = f?.conversation ? [{
		id: f.conversation,
		title: f.title,
		updatedAt: A.find((e) => e.id === f.conversation)?.updatedAt ?? null
	}, ...A.filter((e) => e.id !== f.conversation)] : A, I = f?.conversation === null, L = M.slice(0, _), R = M.find((e) => e.id === p) ?? (p && p === u && d ? {
		id: p,
		title: d,
		updatedAt: null
	} : void 0);
	R && !L.includes(R) && L.push(R);
	let z = M.length > _ || k.hasNextPage;
	if (!M.length && !I && !l.new?.trim() && !k.isError) return null;
	let B = () => {
		S(!x);
		try {
			localStorage.setItem("cms.chats.folded", String(!x));
		} catch {}
	}, K = async () => {
		_ >= M.length && k.hasNextPage && (await k.fetchNextPage()).isError || b((e) => e + 10);
	};
	return i ? /* @__PURE__ */ U(j, {
		content: h("Chats"),
		side: "right",
		children: /* @__PURE__ */ U("button", {
			type: "button",
			"aria-label": h("Chats"),
			onClick: () => {
				S(!1), a();
			},
			className: N("flex h-8 w-full items-center justify-center rounded-md text-muted hover:bg-hover hover:text-text", p !== void 0 && "bg-active text-ink"),
			children: f ? /* @__PURE__ */ U("span", {
				role: "status",
				"aria-label": h("Working…"),
				children: /* @__PURE__ */ U(O, { size: 16 })
			}) : /* @__PURE__ */ U(w, {
				name: "chat",
				size: 16
			})
		})
	}) : /* @__PURE__ */ W("section", {
		"aria-label": h("Chats"),
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: B,
			"aria-expanded": !x,
			"aria-controls": "cms-chat-history",
			className: "group flex h-7 w-full items-center gap-1.5 rounded-md px-2 text-left text-xs font-medium text-muted hover:text-text",
			children: [/* @__PURE__ */ U("span", { children: h("Chats") }), /* @__PURE__ */ U(w, {
				name: x ? "chevron-right" : "chevron-down",
				size: 11,
				className: "text-faint"
			})]
		}), /* @__PURE__ */ W("div", {
			id: "cms-chat-history",
			hidden: x,
			className: "space-y-px",
			children: [
				(I || l.new?.trim()) && /* @__PURE__ */ U(D, {
					label: (I ? f.title : l.new) || h("New Chat"),
					onClick: () => {
						n.select(null) && s?.();
					},
					active: p === null,
					status: I ? /* @__PURE__ */ U("span", {
						role: "status",
						"aria-label": h("Working…"),
						children: /* @__PURE__ */ U(O, { size: 12 })
					}) : h("Draft"),
					actions: [!I && {
						label: h("Discard Draft"),
						icon: "close",
						quick: !0,
						onSelect: () => n.discard()
					}]
				}),
				L.map((e) => /* @__PURE__ */ U(D, {
					to: r(e.id),
					onClick: () => s?.(),
					label: e.title || h("New Chat"),
					title: `${e.title} · ${g(e.updatedAt)}`,
					active: p === e.id,
					status: f?.conversation === e.id || l[e.id]?.trim() ? /* @__PURE__ */ W(H, { children: [f?.conversation === e.id && /* @__PURE__ */ U("span", {
						role: "status",
						"aria-label": h("Working…"),
						children: /* @__PURE__ */ U(O, { size: 12 })
					}), l[e.id]?.trim() && /* @__PURE__ */ U("span", { children: h("Draft") })] }) : void 0,
					actions: [{
						label: h("Delete Chat"),
						icon: "trash",
						danger: !0,
						quick: !0,
						disabled: f?.conversation === e.id || C.isPending,
						onSelect: () => void T(e)
					}]
				}, e.id)),
				k.isError && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => void k.refetch(),
					className: "px-2 py-1.5 text-left text-xs text-muted hover:text-text",
					children: h("Could not load chats. Try again")
				}),
				z && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => void K(),
					disabled: k.isFetchingNextPage,
					className: "flex h-7 w-full items-center rounded-md px-2 text-xs text-muted hover:bg-hover hover:text-text disabled:opacity-50",
					children: k.isFetchingNextPage ? h("Loading…") : h("Show more")
				}),
				_ > 5 && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => b(5),
					className: "flex h-7 w-full items-center rounded-md px-2 text-xs text-muted hover:bg-hover hover:text-text",
					children: h("Show less")
				})
			]
		})]
	});
}
p.fields.set("assistant-composer", K), p.panels.set("assistant", {
	id: "assistant",
	slot: "shell.aside",
	component: oe
}), p.widgets.set("assistant-ask", I(() => import("./chunks/WidgetAsk-CV5ClEbu.js"))), p.routes.set("/chat/:id", {
	path: "/chat/:id",
	component: () => o("assistant.use") ? null : /* @__PURE__ */ U(S, {
		icon: "lock",
		title: h("You do not have access to the assistant."),
		className: "min-h-[50vh]"
	})
}), p.panels.set("assistant-history", {
	id: "assistant-history",
	slot: "sidebar.history",
	component: ye
}), p.commands.set("assistant", {
	id: "assistant",
	label: h("New Chat"),
	icon: "compose",
	group: h("Assistant"),
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
	perform: (e) => n.ask(e)
}), window.addEventListener("keydown", (e) => {
	(e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "j" && o("assistant.use") && (e.preventDefault(), n.newChat());
});
