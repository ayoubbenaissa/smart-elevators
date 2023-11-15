import { createHeadersWithAuth } from "../../app/features/elevators/utils";

it("should return header with given token", () => {
  const headerWithToken = createHeadersWithAuth("token");
  expect(headerWithToken).toMatchObject({
    headers: {
      Authorization: "Bearer token",
      "Content-Type": "application/json",
    },
  });
});
