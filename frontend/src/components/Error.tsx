import "../styles/Error.scss";

import errorIcon from "../assets/icon-error.png";

export const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="error-page">
      <div className="error-page_content">
        <div className="header">
          <img src={errorIcon} alt="error" />
          <div className="error-notification">Sorry! an error occurred</div>
        </div>
        <div data-testid="error-content" className="error-content">
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
