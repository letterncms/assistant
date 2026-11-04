import { boot as e, can as t, getManifest as n, navigate as r, run as i, setManifest as a, useScreen as o } from "@letterncms/sdk";
import { useSyncExternalStore as s } from "react";
// admin/src/store.ts
var c = "cms.chat.open", l = "cms.chat.detached", u = "cms.chat.current";
function d() {
	try {
		return {
			mode: localStorage.getItem(c) === "true" && window.matchMedia("(min-width: 1024px)").matches ? "docked" : "closed",
			conversation: sessionStorage.getItem(u) || null,
			detached: localStorage.getItem(l) === "true"
		};
	} catch {
		return {
			mode: "closed",
			conversation: null,
			detached: !1
		};
	}
}
var f = /* @__PURE__ */ new Set(), p = {
	...d(),
	thread: 0,
	history: !1,
	title: "",
	prompt: null,
	focus: 0,
	contextPath: "/",
	dismissed: [],
	selectedText: "",
	attached: {},
	skills: {},
	drafts: {},
	models: {},
	working: null,
	awaiting: !1
}, m = null, h = null;
function g(e) {
	return e ? `/chat/${encodeURIComponent(e)}` : "/chat/new";
}
function _(e) {
	let t = /^\/chat\/([^/]+)$/.exec(e);
	return t ? t[1] === "new" ? null : decodeURIComponent(t[1]) : void 0;
}
var v = () => t("assistant.use") && (n().config?.assistant?.configured === !0 || t("settings.manage")), y = "assistant.hidden", b = () => n().user.preferences?.[y] === !0;
function x(e) {
	let t = n();
	a({
		...t,
		user: {
			...t.user,
			preferences: {
				...t.user.preferences ?? {},
				[y]: e
			}
		}
	}), i("account/update", { preferences: { [y]: e } }).catch(() => {});
}
var S = () => window.location.pathname.slice(e.base.length) || "/";
function C(e, t = !1) {
	let n = g(e);
	S() !== n && r(n, {
		replace: t,
		overlay: !0
	});
}
function w() {
	try {
		localStorage.setItem(c, String(p.mode !== "closed")), localStorage.setItem(l, String(p.detached)), p.conversation ? sessionStorage.setItem(u, p.conversation) : sessionStorage.removeItem(u);
	} catch {}
}
var T = {
	get: () => p,
	set(e) {
		let t = p;
		p = {
			...p,
			...e.conversation !== void 0 && e.conversation !== p.conversation ? { title: "" } : {},
			...e
		}, f.forEach((e) => e()), (p.mode !== t.mode || p.conversation !== t.conversation || p.detached !== t.detached) && w();
	},
	open() {
		v() && (p.mode === "closed" ? (h = document.activeElement, T.set({
			mode: "docked",
			focus: p.focus + 1
		})) : T.set({ focus: p.focus + 1 }));
	},
	close() {
		if (p.mode === "closed") return;
		let e = p.mode === "full";
		T.set({ mode: "closed" }), e && r(m ?? "/", { overlay: m !== null }), h instanceof HTMLElement && h.isConnected && h.focus(), h = null;
	},
	toggle() {
		let e = document.activeElement?.closest(".cms-dock");
		p.mode === "closed" || !e ? T.open() : p.mode === "full" ? T.minimize() : T.close();
	},
	maximize() {
		v() && (m = S() + window.location.search, C(p.conversation));
	},
	minimize() {
		p.mode === "full" && r(m ?? "/", { overlay: m !== null });
	},
	select(e) {
		v() && (p.mode === "full" && C(e), p.mode === "closed" && (h = document.activeElement), T.set({
			conversation: e,
			mode: p.mode === "closed" ? "docked" : p.mode,
			history: !1,
			prompt: null,
			focus: p.focus + 1
		}));
	},
	newChat() {
		p.working?.conversation !== null && T.set({ thread: p.thread + 1 }), T.select(null);
	},
	ask(e) {
		p.drafts[p.conversation ?? "new"]?.trim() ? T.select(p.conversation) : T.newChat(), e?.trim() && T.set({ prompt: e.trim() });
	},
	draft(e) {
		T.set({ drafts: {
			...p.drafts,
			[p.conversation ?? "new"]: e
		} });
	},
	model(e) {
		T.set({ models: {
			...p.models,
			[p.conversation ?? "new"]: e
		} });
	},
	deleted(e) {
		let { [e]: t, ...n } = p.drafts, { [e]: r, ...i } = p.models;
		T.set({
			drafts: n,
			models: i
		}), S() === g(e) && C(null, !0), p.conversation === e && T.set({
			conversation: null,
			prompt: null,
			focus: p.focus + 1
		});
	},
	created(e, t) {
		if (p.conversation !== e) {
			let { new: n, ...r } = p.models;
			T.set({
				conversation: e,
				title: t,
				drafts: {
					...p.drafts,
					[e]: p.drafts.new ?? "",
					new: ""
				},
				models: n ? {
					...r,
					[e]: n
				} : r
			});
		} else T.set({ title: t });
		S() === "/chat/new" && C(e, !0);
	},
	subscribe(e) {
		return f.add(e), () => {
			f.delete(e);
		};
	}
};
function E() {
	return s(T.subscribe, T.get);
}
function D() {
	return {
		chosen: E().detached,
		required: o().rightEdge === !0
	};
}
export { T as a, x as i, b as n, D as o, _ as r, E as s, v as t };
