import { useState } from "react";
import { RegisterPayload } from "../../app/features/auth/auth.types";
import { ChangeEvent, ButtonClickEvent } from "./types";
import { useAppDispatch } from "../../app/hooks";
import { register } from "../../app/features/auth/auth.slice";

import "../../styles/SignupForm.scss";
import UserIcon from "../../../public/auth-icon.png";
import { InputWithValidation } from "../UI/InputWithValidation";
import { validateEmail, validateName, validatePassword } from "./Form.utils";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { ActionButton } from "../UI/ActionButton";

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialForm: RegisterPayload = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [checkFormData, setCheckFormData] = useState(false);

  const handleFormChange = (e: ChangeEvent, formField: keyof RegisterPayload) => {
    setFormData({
      ...formData,
      [formField]: e.target.value,
    });
    setCheckFormData(false);
  };

  const handleRegister = (e: ButtonClickEvent) => {
    e.preventDefault();
    setCheckFormData(true);
    const isFormValid = validateName(formData.firstName) && validateName(formData.lastName) && validateEmail(formData.email) && validatePassword(formData.password);
    if (isFormValid) {
      dispatch(register(formData));
      navigate("/");
    }
  };

  return (
    <>
      <div className="signup-form">
        <div className="signup-text">Create a new account</div>
        <div className="signup-icon_wrapper">
          <img src={UserIcon} alt="Signup" />
        </div>
        <InputWithValidation
          placeholder="first name"
          value={formData.firstName}
          changeHandler={(e: ChangeEvent) => {
            handleFormChange(e, "firstName");
          }}
          errorText="please enter your name"
          checkFormData={checkFormData}
          validateField={() => validateName(formData.firstName)}
        />

        <InputWithValidation
          placeholder="family name"
          value={formData.lastName}
          changeHandler={(e: ChangeEvent) => {
            handleFormChange(e, "lastName");
          }}
          errorText="please enter your family name"
          checkFormData={checkFormData}
          validateField={() => validateName(formData.lastName)}
        />

        <InputWithValidation
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
          placeholder="password"
          value={formData.password}
          changeHandler={(e: ChangeEvent) => {
            handleFormChange(e, "password");
          }}
          errorText="please enter a valid passord (8 length + at least lower and upper and number character)"
          checkFormData={checkFormData}
          validateField={() => validatePassword(formData.password)}
          type="password"
        />
        <div className="signup-form_actions">
          <ActionButton buttonText="register" clickAction={handleRegister} />
        </div>
        <div className="google-auth_container">
          <GoogleAuth />
        </div>
      </div>
    </>
  );
};
