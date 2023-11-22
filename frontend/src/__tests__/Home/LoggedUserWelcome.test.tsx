import { cleanup } from "@testing-library/react";
import { LoggedUserWelcome } from "../../modules/Home/LoggedUserWelcome";
import { MOCK_USER } from "../../__mocks__/Users.mock";

import "@testing-library/jest-dom";
import { renderWithRouter } from "../../test.utils";

// clean-up after each test
afterEach(() => {
  cleanup();
});

it("should check welcome component for logged user", async () => {
  const result = renderWithRouter(<LoggedUserWelcome user={MOCK_USER} />);

  // check user full name:
  const userInfoElement = await result.getByTestId("welcome-logged-intro");
  expect(userInfoElement).toBeInTheDocument();
  expect(userInfoElement).toHaveTextContent("Hi demo user");

  // check action button present:
  const cta = await result.getByRole("button", { name: /check my dashboard/i });
  expect(cta).toBeInTheDocument();
  expect(cta).toBeEnabled();
});
