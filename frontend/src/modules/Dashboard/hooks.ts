import { useEffect } from "react";
import { getElevators } from "@app/features/elevators/elevators.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks";

export const useGetElevatorsForUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) dispatch(getElevators(userToken));
    else navigate("/");
  }, []);
};
