import { useNavigate } from "react-router-dom";
import { SignupForm } from "./SignupForm";
import { useAppSelector } from "@app/hooks";
import { useEffect } from "react";
import { Error } from "@components/UI/Error/Error";

import "./SignupPage.scss";

export const Signup = () => {
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
    <div className="signup-page">
      <div className="signup-page-content">
        <div className="caption">The future of Elevator monitoring is here!</div>
        <div className="signup-form_wrapper">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};
