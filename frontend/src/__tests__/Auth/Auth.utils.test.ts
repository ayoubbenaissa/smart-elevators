import { extractUserInfo } from "../../app/features/auth/utils";

describe(`testing "extractUserInfo" logic`, () => {
  it("should return a UserInfo object when payload contains necessary user data", () => {
    const userInfo = extractUserInfo({ firstName: "mock", lastName: "user", email: "demo.user@mail.com", _id: "1233" });
    expect(userInfo).toMatchObject({ firstName: "mock", lastName: "user", id: "1233" });
  });
  it("should return NULL when payload does NOT contain necessary user data", () => {
    // @ts-ignore
    const nullUser = extractUserInfo({ firstName: null, lastName: "", email: "demo.user@mail.com", _id: "1233" });
    expect(nullUser).toBeNull();
  });
});
