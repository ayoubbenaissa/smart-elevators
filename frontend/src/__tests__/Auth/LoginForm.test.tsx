import { setupLogin } from "../../test.utils";

import { cleanup, fireEvent, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  // render the LoginForm
  setupLogin();
});

describe(`testing Login Form`, () => {
  describe("password field", () => {
    it("should render error text when password is missing", async () => {
      const passwordInput = screen.getByTestId("password-input");
      fireEvent.change(passwordInput, { target: { value: "" } });

      // mock submit:
      await user.click(screen.getByTestId("action-btn"));

      // error text should be displayed:
      const passwordErrorText = screen.getByTestId("password-input-error-info-container");
      expect(passwordErrorText).toBeInTheDocument();
      expect(passwordErrorText).toHaveTextContent("please enter a valid passord");
    });
    it("should render error text when password is invalid", async () => {
      const passwordInput = screen.getByTestId("password-input");
      fireEvent.change(passwordInput, { target: { value: "invalid pass" } });

      // mock submit:
      await user.click(screen.getByTestId("action-btn"));

      // error text should be displayed:
      const passwordErrorText = screen.getByTestId("password-input-error-info-container");
      expect(passwordErrorText).toBeInTheDocument();
      expect(passwordErrorText).toHaveTextContent("please enter a valid passord");
    });
  });

  describe("email field", () => {
    it("should render error text when email is missing", async () => {
      const emailInput = screen.getByTestId("email-input");
      fireEvent.change(emailInput, { target: { value: "" } });

      // mock submit:
      await user.click(screen.getByTestId("action-btn"));

      // error text should be displayed:
      const emaildErrorText = screen.getByTestId("email-input-error-info-container");
      expect(emaildErrorText).toBeInTheDocument();
      expect(emaildErrorText).toHaveTextContent("please enter a valid email");
    });
    it("should render error text when email is invalid", async () => {
      const emailInput = screen.getByTestId("email-input");
      fireEvent.change(emailInput, { target: { value: "abc#d.dddd" } });

      // mock submit:
      await user.click(screen.getByTestId("action-btn"));

      // error text should be displayed:
      const emaildErrorText = screen.getByTestId("email-input-error-info-container");
      expect(emaildErrorText).toBeInTheDocument();
      expect(emaildErrorText).toHaveTextContent("please enter a valid email");
    });
  });
});
