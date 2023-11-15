import { FC } from "react";
import { ChangeEvent } from "../Auth/types";

import "../../styles/InputWithValidation.scss";

interface InputWithValidationProps {
  placeholder: string;
  value: string;
  testId: string;
  changeHandler: (e: ChangeEvent) => void;
  validateField: () => boolean;
  checkFormData: boolean;
  errorText: string;
  type?: string;
}

export const InputWithValidation: FC<InputWithValidationProps> = ({ placeholder, value, testId, changeHandler, validateField, errorText, checkFormData, type = "text" }) => {
  return (
    <div className="input-with-validation">
      <input data-testid={testId} className="signup-input-field" required type={type} value={value} placeholder={placeholder} onChange={(e) => changeHandler(e)} />
      {checkFormData && !validateField() && (
        <div data-testid={`${testId}-error-info-container`} className="error-info-container">
          <div className="error-info">{errorText}</div>
        </div>
      )}
    </div>
  );
};
