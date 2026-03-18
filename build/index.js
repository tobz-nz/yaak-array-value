
//#region src/index.ts
const plugin = { templateFunctions: [{
	name: "array.value",
	args: [{
		name: "data",
		type: "text",
		label: "Data",
		required: true,
		placeholder: "first,second,third",
		description: "Comma separated values"
	}, {
		name: "key",
		type: "text",
		label: "Key",
		required: false,
		placeholder: "0",
		description: "The index of the value to get"
	}],
	async onRender(ctx, args) {
		return String(args.values.data || "").split(",")[Number(args.values.key || 0)]?.trim() || null;
	}
}] };

//#endregion
exports.plugin = plugin;