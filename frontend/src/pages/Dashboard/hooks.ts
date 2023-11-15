import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getElevators } from "../../app/features/elevators/elevators.slice";
import { useNavigate } from "react-router-dom";

export const useGetElevatorsForUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) dispatch(getElevators(userToken));
    else navigate("/");
  }, []);
};
