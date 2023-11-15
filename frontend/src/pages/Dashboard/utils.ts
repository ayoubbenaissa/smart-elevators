import { ElevatorResultItem, ElevatorState, ElevatorStates } from "../../app/features/elevators/elevators.types";
import { UserInfo } from "../../app/features/auth/auth.types";
import { ElevatorsStats } from "./types";

/**
 * contructElevatorsStats takes an "ElevatorsStats" argument and updates it w.r.t elevators data from elevators argument
 * @param elevators: presents elevators that would have been fetched from Backend
 * @param initialStats: presents initial placeholder for elevator stats (i.e each elevator state has "0" occurrence)
 * @returns updated stats (ElevatorsStats)
 */
export const contructElevatorsStats = ({ elevators, initialStats }: { elevators: ElevatorResultItem[]; initialStats: ElevatorsStats }): ElevatorsStats => {
  return elevators.reduce<ElevatorsStats>((accumulatedStats, currentElevatorItem) => {
    if (currentElevatorItem.state === ElevatorState["OPERATIONAL"]) accumulatedStats.OPERATIONAL.nb++;
    if (currentElevatorItem.state === ElevatorState["WARNING"]) accumulatedStats.WARNING.nb++;
    if (currentElevatorItem.state === ElevatorState["OUT_OF_ORDER"]) accumulatedStats.OUT_OF_ORDER.nb++;
    return accumulatedStats;
  }, initialStats);
};

/**
 * getElevatorsWithState takes a set of elevators(ElevatorResultItem[]) and returns ones which have the specified elevatorState
 * @param elevators: presents elevators that would have been fetched from Backend
 * @param elevatorState: the state which would be used to filter elevators
 * @returns filtered elevators (ElevatorResultItem[])
 */
export const getElevatorsWithState = ({ elevators, elevatorState }: { elevators: ElevatorResultItem[]; elevatorState: ElevatorStates }): ElevatorResultItem[] => {
  return elevators.filter((elevatorItem) => elevatorItem.state === ElevatorState[elevatorState]);
};

/**
 * getElevatorReporter prints the reporter in a prettier way (if the reporter is the logged user => this will return "Me")
 * @param elevatorReporter: user which reported an elevator (from Backend)
 * @param currentUserInfo: user info object of current logged user
 * @returns either "Me" if the reporter is the same logged user OR the full name of the reporter
 */
export const getElevatorReporter = ({ elevatorReporter, currentUserInfo }: { elevatorReporter: string; currentUserInfo: UserInfo }): string => {
  const currentUserName = `${currentUserInfo.firstName} ${currentUserInfo.lastName}`;
  return currentUserName === elevatorReporter ? "Me" : elevatorReporter;
};
