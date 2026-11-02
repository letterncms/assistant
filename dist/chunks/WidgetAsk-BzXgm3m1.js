import { a as e } from "./store-FxeDWXtm.js";
import { can as t, navigate as n, t as r, useAbility as i } from "@letterncms/sdk";
import { Button as a, Fields as o, Kbd as s, Widget as c } from "@letterncms/ui";
import { useState as l } from "react";
import { jsx as u } from "react/jsx-runtime";
// admin/src/WidgetAsk.tsx
function d() {
	let d = i("assistant/status", {}, { staleTime: 6e4 }), f = d.data?.configured === !0, [p, m] = l("");
	return /* @__PURE__ */ u(c, {
		query: d,
		action: f && /* @__PURE__ */ u(s, { keys: "mod+j" }),
		empty: d.data?.configured === !1 && {
			icon: "key",
			title: r("Connect Claude"),
			description: t("settings.manage") ? r("The assistant needs an Anthropic API key.") : r("Ask an administrator to add an Anthropic API key."),
			action: t("settings.manage") && /* @__PURE__ */ u(a, {
				size: "sm",
				onClick: () => n("/settings/assistant"),
				children: r("Open Settings")
			})
		},
		children: /* @__PURE__ */ u("form", {
			onSubmit: (t) => {
				t.preventDefault();
				let n = p.trim();
				n && (e.ask(n), m(""));
			},
			children: /* @__PURE__ */ u(o, {
				bare: !0,
				fields: [{
					handle: "question",
					type: "text",
					label: r("Ask {brand}"),
					placeholder: r("Ask anything about your site"),
					icon: "sparkle",
					max: 2e3
				}],
				values: { question: p },
				onChange: (e, t) => m(t ?? "")
			})
		})
	});
}
export { d as default };
