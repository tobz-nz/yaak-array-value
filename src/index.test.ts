import { describe, expect, test } from "vitest";
import { plugin } from "./index";

const arrayValue = plugin.templateFunctions?.find((f) => f.name === "array.value");

describe("array.value template function", () => {
  test("is registered on the plugin", () => {
    expect(plugin).toBeTypeOf("object");
    expect(plugin.templateFunctions).toBeInstanceOf(Array);
    expect(arrayValue).toBeTruthy();
    expect(arrayValue?.name).toBe("array.value");
    expect(arrayValue?.onRender).toBeTypeOf("function");
  });

  test("defaults to index 0 when key is missing", async () => {
    const res = await arrayValue!.onRender({} as any, { values: { data: "first,second" } } as any);
    expect(res).toBe("first");
  });

  test("returns the value at the specified index", async () => {
    const res = await arrayValue!.onRender(
      {} as any,
      { values: { data: "first,second,third", key: "2" } } as any,
    );
    expect(res).toBe("third");
  });

  test("trims surrounding whitespace from the selected value", async () => {
    const res = await arrayValue!.onRender(
      {} as any,
      { values: { data: " first ,  second  ,third  ", key: "1" } } as any,
    );
    expect(res).toBe("second");
  });

  test("returns null when data is empty or missing", async () => {
    await expect(arrayValue!.onRender({} as any, { values: { data: "" } } as any)).resolves.toBeNull();
    await expect(arrayValue!.onRender({} as any, { values: {} } as any)).resolves.toBeNull();
  });

  test("returns null when index is out of range", async () => {
    const res = await arrayValue!.onRender(
      {} as any,
      { values: { data: "first,second", key: "99" } } as any,
    );
    expect(res).toBeNull();
  });

  test("returns null when key is not a number", async () => {
    const res = await arrayValue!.onRender(
      {} as any,
      { values: { data: "first,second", key: "nope" } } as any,
    );
    expect(res).toBeNull();
  });

  test("returns null when the selected entry is blank after trimming", async () => {
    const res1 = await arrayValue!.onRender(
      {} as any,
      { values: { data: "first,   ,third", key: "1" } } as any,
    );
    expect(res1).toBeNull();

    const res2 = await arrayValue!.onRender(
      {} as any,
      { values: { data: "first,,third", key: "1" } } as any,
    );
    expect(res2).toBeNull();
  });
});
