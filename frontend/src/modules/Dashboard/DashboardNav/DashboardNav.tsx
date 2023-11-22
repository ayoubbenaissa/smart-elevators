import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { DivClickEvent } from "../../../components/Auth/types";
import { logUserOut } from "@app/features/auth/auth.slice";

import "./DashboardNav.scss";

export const DashboardNav = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const handleLogout = (e: DivClickEvent) => {
    dispatch(logUserOut());
    navigator("/");
  };
  return (
    <>
      {userInfo ? (
        <>
          <header className="nav-header">
            <div className="nav-content">
              <div className="nav-hello">
                <div>Hello&nbsp;</div> <div className="user-fullname">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
              </div>
              <div className="nav-logout" onClick={handleLogout}>
                logout
              </div>
            </div>
          </header>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
