
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
		required: true,
		options: [],
		description: "The comparison type to use",
		dynamic: async (ctx, payload) => {
			let data = payload.values.data;
			if (data.startsWith("${")) data = await ctx.templates.render({ data });
			return { options: data.split(",").map((value, index) => {
				return {
					label: value.trim(),
					value: value.trim()
				};
			}) };
		}
	}],
	async onRender(ctx, args) {
		return args.values.key;
	}
}] };

//#endregion
exports.plugin = plugin;