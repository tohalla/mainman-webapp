import { formatQuery } from ".";

describe("formatQuery", () => {
  it("should format query strings correctly", () => {
    expect(formatQuery({ a: [1, 2], b: 2 })).toBe("?a=1&a=2&b=2");
  });

  it("should return empty string when no parameters provided", () => {
    expect(formatQuery({})).toBe("");
  });

  it("should ignore undefined values", () => {
    expect(formatQuery({ a: undefined, b: 123 })).toBe("?b=123");
  });

  it("should format boolean values", () => {
    expect(formatQuery({ a: true, b: false })).toBe("?a=true&b=false");
  });
});
