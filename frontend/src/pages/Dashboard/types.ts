import { ElevatorStates } from "../../app/features/elevators/elevators.types";

export type ElevatorStatsItem = {
  nb: number;
  label: string;
};

export type ElevatorsStats = Record<ElevatorStates, ElevatorStatsItem>;
