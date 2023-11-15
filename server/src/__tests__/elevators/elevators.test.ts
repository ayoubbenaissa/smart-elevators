import { validateElevatorState } from "../../api/elevators/utils";

describe(`testing "validateElevatorState" logic`, () => {
  it("should return false for invalid entry", () => {
    const invalidElevatorState = "state";
    expect(validateElevatorState(invalidElevatorState)).toBeFalsy();
  });
  it("should return true for all valid entries", () => {
    // OPERATIONAL state
    const operationalElevatorState = "operational";
    expect(validateElevatorState(operationalElevatorState)).toBeTruthy();

    // WARNING state
    const warningElevatorState = "warning";
    expect(validateElevatorState(warningElevatorState)).toBeTruthy();

    // OUT_OF_ORDER state
    const nonOperationalElevatorState = "out-of-order";
    expect(validateElevatorState(nonOperationalElevatorState)).toBeTruthy();
  });
});
