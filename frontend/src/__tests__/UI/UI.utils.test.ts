import { dateFormatter } from "../../components/UI/utils";

describe(`testing "dateFormatter"`, () => {
  it("should parse full-date string", () => {
    const DATE = "2023-10-05T00:00:00.000Z";
    expect(dateFormatter(DATE)).toBe("5 Oct");
  });

  it("should parse partial date string", () => {
    const DATE = "2023-09-02";
    expect(dateFormatter(DATE)).toBe("2 Sep");
  });
});
