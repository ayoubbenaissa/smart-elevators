import { selectStateTab } from "@app/features/elevators/elevators.slice";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { ElevatorStates } from "@app/features/elevators/elevators.types";
import { DivClickEvent } from "../Auth/types";

import "../../styles/ElevatorStateTab.scss";

export const ElevatorStateTab = ({ label, elevatorState }: { label: string; elevatorState: ElevatorStates }) => {
  const dispatch = useAppDispatch();
  const { selectedElevatorsTab } = useAppSelector((state) => state.elevators);
  const handleSetSelectedElevatorState = (e: DivClickEvent) => {
    e.stopPropagation();
    dispatch(selectStateTab({ selectedElevatorState: elevatorState }));
  };
  return (
    <div className={elevatorState === selectedElevatorsTab ? `elevator-state_tab ${selectedElevatorsTab}` : `elevator-state_tab`} onClick={handleSetSelectedElevatorState}>
      {label}
    </div>
  );
};
