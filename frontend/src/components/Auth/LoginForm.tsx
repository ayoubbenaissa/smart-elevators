import { login } from "../../app/features/auth/auth.slice";
import { useState } from "react";
import { LoginPayload } from "../../app/features/auth/auth.types";
import { ChangeEvent, ButtonClickEvent } from "./types";
import { useAppDispatch } from "../../app/hooks";
import { InputWithValidation } from "../UI/InputWithValidation";
import { validateEmail, validatePassword } from "./Form.utils";
import { useNavigate } from "react-router-dom";

import UserIcon from "../../../public/auth-icon.png";
import "../../styles/LoginForm.scss";
import { GoogleAuth } from "./GoogleAuth";
import { ActionButton } from "../UI/ActionButton";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialForm: LoginPayload = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [checkFormData, setCheckFormData] = useState(false);

  const handleFormChange = (e: ChangeEvent, formField: keyof LoginPayload) => {
    setFormData({
      ...formData,
      [formField]: e.target.value,
    });
    setCheckFormData(false);
  };

  const handleRegister = (e: ButtonClickEvent) => {
    e.preventDefault();
    setCheckFormData(true);
    const isFormValid = validateEmail(formData.email) && validatePassword(formData.password);
    if (isFormValid) {
      dispatch(login(formData));
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-form">
        <div className="login-text">Login to your account</div>
        <div className="login-icon_wrapper">
          <img src={UserIcon} alt="login" />
        </div>

        <InputWithValidation
          testId="email-input"
          placeholder="email"
          value={formData.email}
          changeHandler={(e: ChangeEvent) => {
            handleFormChange(e, "email");
          }}
          errorText="please enter a valid email"
          checkFormData={checkFormData}
          validateField={() => validateEmail(formData.email)}
          type="email"
        />

        <InputWithValidation
          testId="password-input"
          placeholder="password"
          value={formData.password}
          changeHandler={(e: ChangeEvent) => {
            handleFormChange(e, "password");
          }}
          errorText="please enter a valid passord (at least 8 length + at least lower and upper and number and special character)"
          checkFormData={checkFormData}
          validateField={() => validatePassword(formData.password)}
          type="password"
        />
        <div className="login-form_actions">
          <ActionButton buttonText="login" clickAction={handleRegister} />
        </div>
        <div className="google-auth_container">
          <GoogleAuth />
        </div>
      </div>
    </>
  );
};
