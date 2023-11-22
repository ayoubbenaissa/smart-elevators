import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginForm } from "./modules/Login/LoginForm";

export const renderWithRouter = (ui: React.ReactElement) => {
  const { rerender, ...result } = render(<BrowserRouter>{ui}</BrowserRouter>);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(<BrowserRouter>{rerenderUi}</BrowserRouter>),
  };
};

export const setupLogin = () => {
  render(
    <Provider store={store}>
      <GoogleOAuthProvider clientId="123">
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};