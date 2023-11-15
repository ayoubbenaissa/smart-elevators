// TODO: using same types btw FE & BE (maybe use one source of truth and share it)

export type DoorData = {
  time: string;
  door_cycles_count: number;
  door_openings_count: number;
  door_closings_count: number;
  door_closed_count: number;
  door_opened_count: number;
};

export enum ElevatorType {
  PASSENGER = "Passenger",
  FREIGHT = "Freight",
}

export enum ElevatorState {
  OPERATIONAL = "operational",
  WARNING = "warning",
  OUT_OF_ORDER = "out-of-order",
}

export type ElevatorStates = keyof typeof ElevatorState;

export enum ChartName {
  DOOR_CYCLE_OVER_TIME = "door_cycle_count_over_time",
}

export interface Elevator {
  reporter: string;
  reporterName: string;
  fabricationNumber: string;
  address: string;
  floorNumber: number;
  deviceIdentificationNumber: string;
  manufacturerName: string;
  productionYear: number;
  elevatorType: ElevatorType;
  state: ElevatorState;
  warningMessage?: string; // ElevatorState.WARNING
  reason?: string; // ElevatorState.OUT_OF_ORDER
  chart?: {
    name: ChartName;
    data: DoorData[];
  }; // ElevatorState.OPERATIONAL
}

export interface ElevatorResultItem extends Elevator {
  _id: string;
  reporter: string;
  reporterName: string;
}

export interface ElevatorCallResponse {
  result: ElevatorResultItem[];
}

export type Error = {
  message: string;
};

export type ElevatorSliceState = {
  loading: boolean;
  elevators: ElevatorResultItem[];
  selectedElevator: ElevatorResultItem | null;
  selectedElevatorsTab: ElevatorStates | null;
  success: boolean;
  error: Error | null;
};
