import { Document, Schema } from "mongoose";
import { Request } from "express";

export type DoorData = {
  time: Date;
  door_cycles_count: number;
  door_openings_count: number;
  door_closings_count: number;
  door_closed_count: number;
  door_opened_count: number;
};

enum ElevatorType {
  PASSENGER = "Passenger",
  FREIGHT = "Freight",
}

export enum ElevatorState {
  OPERATIONAL = "operational",
  WARNING = "warning",
  OUT_OF_ORDER = "out-of-order",
}

enum ChartName {
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

export interface IElevatorDocument extends Elevator, Document<Schema.Types.ObjectId> {}

export interface TypedAuthorizedRequest<T> extends Request {
  userId: string;
  body: {
    reporterName: string;
    elevator: T;
  }
}

export interface CreateElevatorReq extends TypedAuthorizedRequest<Omit<Elevator, 'reporter' | 'reporterName'>> {}