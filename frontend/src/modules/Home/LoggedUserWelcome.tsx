import { useNavigate } from "react-router-dom";
import { UserInfo } from "@app/features/auth/auth.types";
import { ButtonClickEvent } from "@components/Auth/types";
import { ActionButton } from "@components/UI/Buttons/ActionButton";

import "./LoggedUserWelcome.scss";

export const LoggedUserWelcome = ({ user }: { user: UserInfo }) => {
  const navigate = useNavigate();

  const navigateToDashboard = (e: ButtonClickEvent) => {
    e.stopPropagation();
    navigate("/dashboard");
  };

  return (
    <div className="welcome-logged">
      <div data-testid="welcome-logged-intro" className="welcome-logged-intro">
        Hi&nbsp; <div className="welcome-logged-user-name">{`${user.firstName} ${user.lastName}`}</div>&nbsp;and welcome to: <div className="welcome-logged-app-name">Smart Elevator App</div>
      </div>
      <div className="welcome-logged_actions">
        <ActionButton buttonText="check my dashboard" clickAction={navigateToDashboard} />
      </div>
    </div>
  );
};
