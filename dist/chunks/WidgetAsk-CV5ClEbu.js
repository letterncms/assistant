import { r as e } from "./store-gqoPD8I2.js";
import { can as t, navigate as n, t as r, timeAgo as i, useAbility as a } from "@letterncms/sdk";
import { Button as o, Fields as s, Kbd as c, Widget as l, WidgetRow as u } from "@letterncms/ui";
import { useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
// admin/src/WidgetAsk.tsx
function m() {
	let m = a("assistant/status", {}, { staleTime: 6e4 }), h = m.data?.configured === !0, g = a("assistant/conversations", { limit: 4 }, { enabled: h }), [_, v] = d("");
	return /* @__PURE__ */ p(l, {
		query: m,
		action: h && /* @__PURE__ */ f(c, { keys: "mod+j" }),
		empty: m.data?.configured === !1 && {
			icon: "key",
			title: r("Connect Claude"),
			description: t("settings.manage") ? r("The assistant needs an Anthropic API key.") : r("Ask an administrator to add an Anthropic API key."),
			action: t("settings.manage") && /* @__PURE__ */ f(o, {
				size: "sm",
				onClick: () => n("/settings/assistant"),
				children: r("Open Settings")
			})
		},
		children: [/* @__PURE__ */ f("form", {
			onSubmit: (t) => {
				t.preventDefault();
				let n = _.trim();
				n && (e.ask(n), v(""));
			},
			children: /* @__PURE__ */ f(s, {
				bare: !0,
				fields: [{
					handle: "question",
					type: "text",
					label: r("Ask {brand}"),
					placeholder: r("Ask anything about your site"),
					icon: "sparkle",
					max: 2e3
				}],
				values: { question: _ },
				onChange: (e, t) => v(t ?? "")
			})
		}), g.data && g.data.length > 0 && /* @__PURE__ */ p("div", {
			className: "mt-3",
			children: [/* @__PURE__ */ f("p", {
				className: "m-0 mb-0.5 text-xs text-muted",
				children: r("Recent Chats")
			}), g.data.map((t) => /* @__PURE__ */ f(u, {
				icon: "chat",
				title: t.title,
				meta: i(t.updatedAt),
				onClick: () => e.select(t.id)
			}, t.id))]
		})]
	});
}
export { m as default };
