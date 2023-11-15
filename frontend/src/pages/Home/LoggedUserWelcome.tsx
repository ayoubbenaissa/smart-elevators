import { UserInfo } from "../../app/features/auth/auth.types";
import { ButtonClickEvent } from "../../components/Auth/types";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/UI/ActionButton";

export const LoggedUserWelcome = ({ user }: { user: UserInfo }) => {
  const navigate = useNavigate();

  const navigateToDashboard = (e: ButtonClickEvent) => {
    e.stopPropagation();
    navigate("/dashboard");
  };

  return (
    <div className="welcome-logged">
      <div data-testid="welcome-logged-intro" className="welcome-logged-intro">
        Hi <div className="welcome-logged-user-name">{`${user.firstName} ${user.lastName}`}</div>and welcome to: <div className="welcome-logged-app-name">Smart Elevator App</div>
      </div>
      <div className="welcome-logged_actions">
        <ActionButton buttonText="check my dashboard" clickAction={navigateToDashboard} />
      </div>
    </div>
  );
};
