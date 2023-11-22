import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useAppSelector } from "@app/hooks";
import { Error } from "@components/UI/Error/Error";

import "./LoginPage.scss";

export const Login = () => {
  const navigator = useNavigate();
  const { userInfo, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigator("/");
  }, []);

  if (error) {
    return (
      <>
        <Error errorMessage={JSON.stringify((error as any).message || "error")} />
      </>
    );
  }

  return (
    <div className="login-page">
      <div className="login-page-content">
        <div className="caption">The future of Elevator monitoring is here!</div>
        <div className="login-form_wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
