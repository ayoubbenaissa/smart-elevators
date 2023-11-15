import { INITIAL_STATS, INTERMEDIATE_STATS, LOGGED_USER, MOCK_ELEVATORS, UPDATED_INITIAL_STATS, UPDATED_INTERMEDIATE_STATS } from "../../__mocks__/Dashboard.mocks";
import { contructElevatorsStats, getElevatorReporter, getElevatorsWithState } from "../../pages/Dashboard/utils";

describe("testing utility functions for Dashboard page", () => {
  describe(`testing "contructElevatorsStats" functionality`, () => {
    it("should contruct elevators stats object correctly for (empty) default stats", () => {
      const updatedElevatorStats = contructElevatorsStats({ elevators: MOCK_ELEVATORS, initialStats: INITIAL_STATS });
      // MOCK_ELEVATORS has the three elevator types/states + INITIAL_STATS has "0" for each state => updatedElevatorStats should have one for each
      expect(updatedElevatorStats).toMatchObject(UPDATED_INITIAL_STATS);
    });

    // this test does not cover a use-case within the app, but it might be important to take into account
    it("should contruct elevators stats object correctly for existing elevator stats", () => {
      const updatedElevatorStats = contructElevatorsStats({ elevators: MOCK_ELEVATORS, initialStats: INTERMEDIATE_STATS });
      expect(updatedElevatorStats).toMatchObject(UPDATED_INTERMEDIATE_STATS);
    });
  });

  describe(`testing "getElevatorsWithState" logic`, () => {
    it("should return ONLY operational elevators", () => {
      const operationalElevators = getElevatorsWithState({ elevators: MOCK_ELEVATORS, elevatorState: "OPERATIONAL" });
      expect(operationalElevators).toMatchObject([MOCK_ELEVATORS[0]]);
    });
    it("should empty array for a state which does not exist on elevators entries", () => {
      const nonOperationalElevators = [MOCK_ELEVATORS[1], MOCK_ELEVATORS[2]];
      const operationalElevators = getElevatorsWithState({ elevators: nonOperationalElevators, elevatorState: "OPERATIONAL" });
      expect(operationalElevators).toMatchObject([]);
    });
  });

  describe(`testing "getElevatorReporter" logic`, () => {
    it("should return 'Me' when reporter is the logged user", () => {
      const elevatorReproterNameForSameUser = getElevatorReporter({ elevatorReporter: "Demo User", currentUserInfo: LOGGED_USER });
      expect(elevatorReproterNameForSameUser).toBe("Me");
    });
    it("should return reporter full name when reporter is NOT the logged user", () => {
        const elevatorReproterNameForSameUser = getElevatorReporter({ elevatorReporter: "Demo User2", currentUserInfo: LOGGED_USER });
        expect(elevatorReproterNameForSameUser).toBe("Demo User2");
      });
  });
});
