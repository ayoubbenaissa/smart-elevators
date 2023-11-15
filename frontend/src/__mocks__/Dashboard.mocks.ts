import { UserInfo } from "../app/features/auth/auth.types";
import { ChartName, ElevatorResultItem, ElevatorState, ElevatorType } from "../app/features/elevators/elevators.types";
import { ElevatorsStats } from "../pages/Dashboard/types";

export const MOCK_ELEVATORS: ElevatorResultItem[] = [
  {
    _id: "123",
    reporter: "user 001",
    reporterName: "Demo User",
    fabricationNumber: "FAB123",
    address: "Berlin, Germany",
    floorNumber: 5,
    deviceIdentificationNumber: "DIN456",
    manufacturerName: "Otis",
    productionYear: 2010,
    elevatorType: ElevatorType.PASSENGER,
    state: ElevatorState.OPERATIONAL,
    chart: {
      name: ChartName.DOOR_CYCLE_OVER_TIME,
      data: [
        {
          time: "2023-10-05T00:00:00.000Z",
          door_cycles_count: 845,
          door_openings_count: 845,
          door_closings_count: 872,
          door_closed_count: 845,
          door_opened_count: 845,
        },
        {
          time: "2023-10-06T00:00:00.000Z",
          door_cycles_count: 908,
          door_openings_count: 908,
          door_closings_count: 935,
          door_closed_count: 908,
          door_opened_count: 908,
        },
        {
          time: "2023-10-07T00:00:00.000Z",
          door_cycles_count: 621,
          door_openings_count: 621,
          door_closings_count: 632,
          door_closed_count: 621,
          door_opened_count: 621,
        },
        {
          time: "2023-10-08T00:00:00.000Z",
          door_cycles_count: 535,
          door_openings_count: 535,
          door_closings_count: 542,
          door_closed_count: 535,
          door_opened_count: 535,
        },
        {
          time: "2023-10-09T00:00:00.000Z",
          door_cycles_count: 898,
          door_openings_count: 898,
          door_closings_count: 915,
          door_closed_count: 898,
          door_opened_count: 898,
        },
        {
          time: "2023-10-10T00:00:00.000Z",
          door_cycles_count: 925,
          door_openings_count: 925,
          door_closings_count: 957,
          door_closed_count: 925,
          door_opened_count: 925,
        },
        {
          time: "2023-10-11T00:00:00.000Z",
          door_cycles_count: 961,
          door_openings_count: 961,
          door_closings_count: 995,
          door_closed_count: 961,
          door_opened_count: 961,
        },
        {
          time: "2023-10-12T00:00:00.000Z",
          door_cycles_count: 931,
          door_openings_count: 931,
          door_closings_count: 956,
          door_closed_count: 931,
          door_opened_count: 931,
        },
        {
          time: "2023-10-13T00:00:00.000Z",
          door_cycles_count: 917,
          door_openings_count: 917,
          door_closings_count: 945,
          door_closed_count: 917,
          door_opened_count: 917,
        },
        {
          time: "2023-10-14T00:00:00.000Z",
          door_cycles_count: 648,
          door_openings_count: 648,
          door_closings_count: 662,
          door_closed_count: 648,
          door_opened_count: 648,
        },
        {
          time: "2023-10-15T00:00:00.000Z",
          door_cycles_count: 561,
          door_openings_count: 561,
          door_closings_count: 569,
          door_closed_count: 561,
          door_opened_count: 561,
        },
        {
          time: "2023-10-16T00:00:00.000Z",
          door_cycles_count: 857,
          door_openings_count: 857,
          door_closings_count: 881,
          door_closed_count: 857,
          door_opened_count: 857,
        },
        {
          time: "2023-10-17T00:00:00.000Z",
          door_cycles_count: 938,
          door_openings_count: 938,
          door_closings_count: 958,
          door_closed_count: 938,
          door_opened_count: 938,
        },
        {
          time: "2023-10-18T00:00:00.000Z",
          door_cycles_count: 885,
          door_openings_count: 885,
          door_closings_count: 917,
          door_closed_count: 885,
          door_opened_count: 885,
        },
      ],
    },
  },
  {
    _id: "124",
    reporter: "user 001",
    reporterName: "Demo User",
    fabricationNumber: "FAB124",
    address: "Munich, Germany",
    floorNumber: 3,
    deviceIdentificationNumber: "DIN457",
    manufacturerName: "Schindler",
    productionYear: 2012,
    elevatorType: ElevatorType.FREIGHT,
    state: ElevatorState.WARNING,
    warningMessage: "Maintenance due soon",
  },
  {
    _id: "125",
    reporter: "user 002",
    reporterName: "Demo User2",
    fabricationNumber: "FAB125",
    address: "Hamburg, Germany",
    floorNumber: 10,
    deviceIdentificationNumber: "DIN458",
    manufacturerName: "KONE",
    productionYear: 2015,
    elevatorType: ElevatorType.PASSENGER,
    state: ElevatorState.OUT_OF_ORDER,
    reason: "Mechanical failure",
  },
];

export const INITIAL_STATS: ElevatorsStats = {
  OPERATIONAL: { nb: 0, label: "operational elevators" },
  WARNING: { nb: 0, label: "elevators in warning state" },
  OUT_OF_ORDER: { nb: 0, label: "non operational elevators" },
};

export const UPDATED_INITIAL_STATS: ElevatorsStats = {
  OPERATIONAL: { nb: 1, label: "operational elevators" },
  WARNING: { nb: 1, label: "elevators in warning state" },
  OUT_OF_ORDER: { nb: 1, label: "non operational elevators" },
};

export const INTERMEDIATE_STATS: ElevatorsStats = {
  OPERATIONAL: { nb: 1, label: "operational elevators" },
  WARNING: { nb: 0, label: "elevators in warning state" },
  OUT_OF_ORDER: { nb: 2, label: "non operational elevators" },
};

export const UPDATED_INTERMEDIATE_STATS: ElevatorsStats = {
  OPERATIONAL: { nb: 2, label: "operational elevators" },
  WARNING: { nb: 1, label: "elevators in warning state" },
  OUT_OF_ORDER: { nb: 3, label: "non operational elevators" },
};

export const LOGGED_USER: UserInfo = {
  firstName: "Demo",
  lastName: "User",
  id: "user 001"
};