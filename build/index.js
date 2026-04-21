
//#region src/index.ts
const plugin = { templateFunctions: [{
	name: "array.value",
	args: [{
		name: "data",
		type: "text",
		label: "Options",
		required: true,
		placeholder: "First Option,Second Option, Third Option",
		description: "Comma separated values"
	}, {
		name: "key",
		type: "select",
		label: "Selected Option",
		required: false,
		options: [],
		description: "The comparison type to use",
		dynamic: async (ctx, payload) => {
			return { options: payload.values.data.split(",").map((value, index) => {
				return {
					label: value.trim(),
					value: value.trim()
				};
			}) };
		}
	}],
	async onRender(ctx, args) {
		let data = String(args.values.data || "").split(","), key = args.values.key ?? 0;
		return data.find((s, i) => s.trim().toLowerCase() === String(key).trim().toLowerCase() || Number(key) === i) || null;
	}
}] };

//#endregion
exports.plugin = plugin;