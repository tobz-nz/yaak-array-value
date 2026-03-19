import type { PluginDefinition, Context, CallTemplateFunctionArgs } from "@yaakapp/api";

export const plugin: PluginDefinition = {
    templateFunctions: [
        {
            name: "array.value",
            args: [
                {
                    name: "data",
                    type: "text",
                    label: "Data",
                    required: true,
                    placeholder: "first,second,third",
                    description: "Comma separated values",
                },
                {
                    name: "key",
                    type: "text",
                    label: "Key",
                    required: false,
                    placeholder: "0",
                    description: "The index of the value to get",
                },
            ],
            async onRender(ctx: Context, args: CallTemplateFunctionArgs): Promise<string | null> {
                let data = String(args.values.data || '').split(','),
                    key = args.values.key ?? 0

                return data.find(
                    (s, i) => s.trim().toLowerCase() === String(key).trim().toLowerCase() || Number(key) === i)
                    || null;
            }
        }
    ],
};
