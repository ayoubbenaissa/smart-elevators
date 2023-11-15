import { LoggedUserWelcome } from "./LoggedUserWelcome";
import { NonLoggedUserWelcome } from "./NonLoggedUserWelcome";
import { useAppSelector } from "../../app/hooks";

import "../../styles/HomePage.scss";

export const Home = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div className="welcome-page">
      <div className="welcome-page_content">{userInfo !== null ? <LoggedUserWelcome user={userInfo} /> : <NonLoggedUserWelcome />}</div>
    </div>
  );
};
