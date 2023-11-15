import { selectStateTab } from "../../app/features/elevators/elevators.slice";
import { useAppDispatch } from "../../app/hooks";
import { ElevatorStatsItem, ElevatorsStats } from "../../pages/Dashboard/types";

import "../../styles/ElevatorsStatItem.scss";
import { DivClickEvent } from "../Auth/types";

export const ElevatorsStatItem = ({ elevatorStatsItem, icon, elevatorState }: { elevatorStatsItem: ElevatorStatsItem; icon: string; elevatorState: keyof ElevatorsStats }) => {
  const dispatch = useAppDispatch();
  const handleSetSelectedElevatorState = (e: DivClickEvent) => {
    e.stopPropagation();
    dispatch(selectStateTab({ selectedElevatorState: elevatorState }));
  };

  return (
    <div className="elevator-stats-item_wrapper" onClick={handleSetSelectedElevatorState}>
      <img src={icon} alt="icon" className="elevator-stats-item_icon" />
      <div className="elevator-stats-item_nb">{elevatorStatsItem.nb}</div>
      <div className="elevator-stats-item_label">{elevatorStatsItem.label}</div>
    </div>
  );
};
