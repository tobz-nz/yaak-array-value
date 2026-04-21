import { describe, expect, test } from "vitest";
import { plugin } from "./index";

const arrayValue = plugin.templateFunctions?.find((f) => f.name === "array.value");

describe("array.value template function", () => {
  test("is registered on the plugin and exposes expected args", () => {
    expect(plugin).toBeTypeOf("object");
    expect(plugin.templateFunctions).toBeInstanceOf(Array);
    expect(arrayValue).toBeTruthy();
    expect(arrayValue?.name).toBe("array.value");
    expect(arrayValue?.onRender).toBeTypeOf("function");

    const dataArg = arrayValue?.args?.find((a: any) => a.name === "data");
    const keyArg = arrayValue?.args?.find((a: any) => a.name === "key");

    expect(dataArg).toBeTruthy();
    expect(dataArg?.type).toBe("text");

    expect(keyArg).toBeTruthy();
    expect(keyArg?.type).toBe("select");
    expect(keyArg?.dynamic).toBeTypeOf("function");
  });

  test("dynamic builds options from CSV data and trims values", async () => {
    const keyArg = arrayValue!.args!.find((a: any) => a.name === "key")!;
    const dyn = (keyArg as any).dynamic as any;

    const payload = { values: { data: " first ,  second ,third " } };
    const result = await dyn({}, payload);

    expect(result).toHaveProperty("options");
    expect(Array.isArray(result.options)).toBe(true);
    expect(result.options).toEqual([
      { label: "first", value: "first" },
      { label: "second", value: "second" },
      { label: "third", value: "third" },
    ]);
  });

  test("dynamic uses templates.render when data starts with '${'", async () => {
    const keyArg = arrayValue!.args!.find((a: any) => a.name === "key")!;
    const dyn = (keyArg as any).dynamic as any;

    const mockCtx = {
      templates: {
        render: async ({ data }: any) => {
          // simulate rendering template returning CSV
          return "one,two";
        },
      },
    };

    const payload = { values: { data: "${some.template}" } };
    const result = await dyn(mockCtx as any, payload);

    expect(result.options).toEqual([
      { label: "one", value: "one" },
      { label: "two", value: "two" },
    ]);
  });

  test("onRender returns the selected key value as-is", async () => {
    const res = await arrayValue!.onRender({} as any, { values: { key: "chosen-value" } } as any);
    expect(res).toBe("chosen-value");
  });

  test("onRender returns undefined when key is missing", async () => {
    await expect(arrayValue!.onRender({} as any, { values: {} } as any)).resolves.toBeUndefined();
  });
});