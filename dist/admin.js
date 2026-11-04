import { getManifest as e, registry as t, run as n, t as r, useAbility as i } from "@letterncms/sdk";
import { lazy as a, useEffect as o } from "react";
import { Icon as s, Menu as c } from "@letterncms/ui";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
// admin/src/ModelPicker.tsx
var d = "assistant.model", f = () => e().config?.workspace?.agent?.name === "assistant";
function p(t) {
	let n = e().user.preferences?.[d];
	return t.models.some((e) => e.id === n) ? n : t.model;
}
function m(t) {
	let r = e().user;
	r.preferences = {
		...r.preferences ?? {},
		[d]: t
	}, n("account/update", { preferences: { [d]: t } }).catch(() => {});
}
function h({ thread: e, state: t, options: n, setOption: a, loading: d }) {
	let h = f(), g = i("assistant/status", {}, {
		staleTime: 6e4,
		enabled: h
	}), _ = g.data?.models ?? [], v = (e) => typeof e == "string" && _.some((t) => t.id === e), y = v(n.model) ? n.model : v(t?.model) ? t.model : g.data ? e ? g.data.model : p(g.data) : void 0, b = _.find((e) => e.id === y), x = !e && n.model === void 0 ? b?.id : void 0;
	return o(() => {
		x && a("model", x);
	}, [x, a]), !h || !g.data || d || !b ? null : /* @__PURE__ */ l(c, {
		side: "top",
		align: "start",
		className: "w-72",
		trigger: /* @__PURE__ */ u("button", {
			type: "button",
			"aria-label": r("Model: {name}", { name: b.name }),
			className: "flex h-7 min-w-0 items-center gap-1 rounded-md pl-2 pr-1.5 text-xs text-muted outline-offset-[-2px] transition-colors hover:bg-hover hover:text-text data-[popup-open]:bg-hover data-[popup-open]:text-text",
			children: [/* @__PURE__ */ l("span", {
				className: "truncate",
				children: b.name
			}), /* @__PURE__ */ l(s, {
				name: "chevron-down",
				size: 12,
				className: "shrink-0 text-faint"
			})]
		}),
		items: [{
			label: r("Model"),
			heading: !0
		}, ..._.map((e) => ({
			label: e.name,
			description: e.description,
			checked: e.id === b.id,
			onSelect: () => {
				e.id !== b.id && (a("model", e.id), m(e.id));
			}
		}))]
	});
}
// admin/src/sources.ts
var g = () => e().config?.workspace?.agent?.name === "assistant", _ = (e, ...t) => t.some((t) => t?.toLowerCase().includes(e.toLowerCase())), v = null, y = null;
t.composer.set("assistant-skills", {
	id: "assistant-skills",
	trigger: "/",
	label: r("Skills"),
	order: 10,
	search: async (e) => g() ? (v ??= n("assistant/skills"), (await v).filter((t) => _(e, t.name, t.label)).map((e) => ({
		id: `skill:${e.name}`,
		kind: "skill",
		label: e.label,
		detail: e.description,
		icon: e.icon,
		skill: e.name
	}))) : []
}), t.composer.set("assistant-resources", {
	id: "assistant-resources",
	trigger: "@",
	label: r("Site"),
	order: 40,
	search: async (e) => g() ? (y ??= n("assistant/resources"), (await y).filter((t) => _(e, t.name)).slice(0, 5).map((e) => ({
		id: `resource:${e.uri}`,
		kind: "resource",
		label: e.name,
		icon: "book",
		read: () => n("assistant/resource", { uri: e.uri })
	}))) : []
}), t.panels.set("assistant-model", {
	id: "assistant-model",
	slot: "workspace.composer",
	component: h
}), t.widgets.set("assistant-ask", a(() => import("./chunks/WidgetAsk-CmwckuN5.js")));
