import { ElevatorState } from "./types";

// function checking that given elevator state is valid (belongs to predefined enum)
export const validateElevatorState = (state: string): boolean => {
  const allElevatorStates = Object.values(ElevatorState) as string[];
  return allElevatorStates.indexOf(state) > -1;
};
