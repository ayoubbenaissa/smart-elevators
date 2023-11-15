import { cleanup, screen } from "@testing-library/react";
import { NonLoggedUserWelcome } from "../../pages/Home/NonLoggedUserWelcome";
import { renderWithRouter } from "../../test.utils";

import "@testing-library/jest-dom";

// clean-up after each test
afterEach(() => {
  cleanup();
});

it("should check the welcome section for non-logged user", () => {
  renderWithRouter(<NonLoggedUserWelcome />);

  // check welcome section:
  const userInfoElement = screen.getByTestId("welcome-unlogged-intro");
  expect(userInfoElement).toBeInTheDocument();
  expect(userInfoElement).toHaveTextContent("Welcome to Smart Elevator App");

  // check possible actions (login + signup)
  const loginAction = screen.getByTestId("welcome-unlogged-login_action");
  expect(loginAction).toBeInTheDocument();
  expect(loginAction).toHaveTextContent("Login if you already have an account");

  const signupAction = screen.getByTestId("welcome-unlogged-signup");
  expect(signupAction).toBeInTheDocument();
  expect(signupAction).toHaveTextContent("Signup to create an account from scratch");
});
