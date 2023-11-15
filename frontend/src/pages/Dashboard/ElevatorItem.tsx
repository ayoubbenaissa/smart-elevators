import { selectElevatorItem } from "../../app/features/elevators/elevators.slice";
import { ElevatorResultItem } from "../../app/features/elevators/elevators.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DivClickEvent } from "../../components/Auth/types";

import "../../styles/ElevatorItem.scss";
import { getElevatorReporter } from "./utils";

export const ElevatorItem = ({ elevatorItem }: { elevatorItem: ElevatorResultItem }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const setSelectedElevator = (e: DivClickEvent) => {
    e.stopPropagation();
    dispatch(selectElevatorItem({ selectedElevator: elevatorItem }));
  };
  return (
    <div className="elevator-item_wrapper" onClick={setSelectedElevator}>
      <div className="elevator-item">
        <div className="elevator-item_label">Device ID:&nbsp;</div>
        <div className="elevator-item_value">{elevatorItem.deviceIdentificationNumber}</div>
      </div>
      <div className="elevator-item">
        <div className="elevator-item_label">Manufacturer Name:&nbsp;</div>
        <div className="elevator-item_value">{elevatorItem.manufacturerName}</div>
      </div>
      <div className="elevator-item">
        <div className="elevator-item_label">Product Year:&nbsp;</div>
        <div className="elevator-item_value">{elevatorItem.productionYear}</div>
      </div>
      <div className="elevator-item_reporter">
        <div className="elevator-item_reporter_label">reported by:&nbsp;</div>
        <div className="elevator-item_reporter_value">{!!userInfo ? getElevatorReporter({ elevatorReporter: elevatorItem.reporterName, currentUserInfo: userInfo }) : elevatorItem.reporterName}</div>
      </div>
    </div>
  );
};
