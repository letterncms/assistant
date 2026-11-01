import { boot as e, can as t, navigate as n } from "@letterncms/sdk";
import { useSyncExternalStore as r } from "react";
// admin/src/store.ts
var i = /* @__PURE__ */ new Set(), a = {
	conversation: null,
	title: "",
	prompt: null,
	focus: 0,
	contextPath: "/",
	drafts: {},
	models: {},
	working: null
};
function o(e) {
	return e ? `/chat/${encodeURIComponent(e)}` : "/chat/new";
}
function s(e) {
	let t = /^\/chat\/([^/]+)$/.exec(e);
	return t ? t[1] === "new" ? null : decodeURIComponent(t[1]) : void 0;
}
function c(t, r = !1) {
	let i = o(t);
	return window.location.pathname !== e.base + i && n(i, { replace: r }), window.location.pathname === e.base + i;
}
var l = {
	get: () => a,
	set(e) {
		a = {
			...a,
			...e.conversation !== void 0 && e.conversation !== a.conversation ? { title: "" } : {},
			...e
		}, i.forEach((e) => e());
	},
	select(e) {
		return !t("assistant.use") || !c(e) ? !1 : (l.set({
			conversation: e,
			prompt: null,
			focus: a.focus + 1
		}), !0);
	},
	newChat() {
		let e = a.drafts[a.conversation ?? "new"]?.trim() ? a.conversation : null;
		return l.select(e);
	},
	ask(t) {
		l.newChat() && t?.trim() && window.location.pathname === e.base + o(a.conversation) && l.set({ prompt: t.trim() });
	},
	draft(e) {
		l.set({ drafts: {
			...a.drafts,
			[a.conversation ?? "new"]: e
		} });
	},
	discard() {
		l.set({ drafts: {
			...a.drafts,
			new: ""
		} });
	},
	model(e) {
		l.set({ models: {
			...a.models,
			[a.conversation ?? "new"]: e
		} });
	},
	deleted(t) {
		let { [t]: n, ...r } = a.drafts, { [t]: i, ...s } = a.models;
		l.set({
			drafts: r,
			models: s
		}), window.location.pathname === e.base + o(t) && c(null, !0), a.conversation === t && l.set({
			conversation: null,
			prompt: null,
			focus: a.focus + 1
		});
	},
	created(t, n) {
		if (a.conversation !== t) {
			let { new: e, ...r } = a.models;
			l.set({
				conversation: t,
				title: n,
				drafts: {
					...a.drafts,
					[t]: a.drafts.new ?? "",
					new: ""
				},
				models: e ? {
					...r,
					[t]: e
				} : r
			});
		} else l.set({ title: n });
		window.location.pathname === e.base + "/chat/new" && c(t, !0);
	},
	subscribe(e) {
		return i.add(e), () => i.delete(e);
	}
};
function u() {
	return r(l.subscribe, l.get);
}
export { u as i, s as n, l as r, o as t };
