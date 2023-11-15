import { Elevator } from "../api/elevators/types";

export const PLAIN_ELEVATOR = {
  _id: "124",
  fabricationNumber: "FAB124",
  address: "Munich, Germany",
  floorNumber: 3,
  deviceIdentificationNumber: "DIN457",
  manufacturerName: "Schindler",
  productionYear: 2012,
  elevatorType: "Freight",
  state: "warning",
  warningMessage: "Maintenance due soon",
} as Omit<Elevator, "reporter" | "reporterName">;

export const ELEVATOR = {
  reporter: "user 001",
  reporterName: "Demo User",
  ...PLAIN_ELEVATOR
};

export const ALL_ELEVATORS = [ELEVATOR];
