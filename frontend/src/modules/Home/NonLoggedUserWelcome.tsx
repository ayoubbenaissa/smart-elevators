import { Link } from "react-router-dom";

import "./NonLoggedUserWelcome.scss";

export const NonLoggedUserWelcome = () => {
  return (
    <div className="welcome-unlogged">
      <div data-testid="welcome-unlogged-intro" className="welcome-unlogged-intro">
        <div className="welcome">Welcome to &nbsp;</div> <div className="welcome-unlogged-app-name">Smart Elevator App</div>
      </div>
      <div className="welcome-unlogged-info">This app offers displaying dahsboards and stats concerning operational status of you elevator as stored in DB.</div>
      <div className="welcome-unlogged-actions">
        To get started, navigate to:
        <div className="welcome-unlogged-actions_wrapper">
          <div data-testid="welcome-unlogged-login_action" className="welcome-unlogged-list_item">
            <Link to="/login">Login</Link> if you already have an account
          </div>
          <div data-testid="welcome-unlogged-signup" className="welcome-unlogged-list_item">
            <Link to="/signup">Signup</Link> to create an account from scratch
          </div>
        </div>
      </div>
      <div className="welcome-unlogged-closing">enjoy it!</div>
    </div>
  );
};
