import { parseCookieHeader } from ".";

describe("custom cookie helpers", () => {
  it("should parse cookie header correctly", () => {
    expect(
      parseCookieHeader(
        "jwt=1; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly, jwt.sig=2; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly, refresh-token=3; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly, refresh-token.sig=4; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly"
      )
    ).toEqual([
      "jwt=1; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly",
      "jwt.sig=2; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly",
      "refresh-token=3; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly",
      "refresh-token.sig=4; path=/; expires=Fri, 13 Mar 2020 17:46:39 GMT; samesite=lax; httponly",
    ]);
  });
});
