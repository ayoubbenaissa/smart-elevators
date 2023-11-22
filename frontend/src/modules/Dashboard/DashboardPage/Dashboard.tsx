import { createPortal } from "react-dom";
import { useAppSelector } from "@app/hooks.ts";
import { StatChart } from "@components/UI/StatChart";
import { ElevatorsStats } from "../types";
import { contructElevatorsStats, getElevatorsWithState } from "../utils";
import { ElevatorsStatsOverview } from "@components/UI/ElevatorsStatsOverview";
import { useGetElevatorsForUser } from "../hooks";
import { ElevatorStateTab } from "@components/UI/ElevatorStateTab";
import { ElevatorsList } from "../EelevatorsList/ElevatorsList";
import { DashboardNav } from "../DashboardNav/DashboardNav";
import { Error } from "@components/UI/Error/Error";
import { InfoSpinner } from "@components/UI/Spinner/InfoSpinner";
import { ElevatorDetails } from "@components/UI/Modals/ElevatorDetails";

import "./DashboardPage.scss";

export const Dashboard = () => {
  const { error, loading } = useAppSelector((state) => state.elevators);
  const { elevators, selectedElevatorsTab, selectedElevator } = useAppSelector((state) => state.elevators);
  useGetElevatorsForUser();

  const initialStats: ElevatorsStats = {
    OPERATIONAL: { nb: 0, label: "operational elevators" },
    WARNING: { nb: 0, label: "elevators in warning state" },
    OUT_OF_ORDER: { nb: 0, label: "non operational elevators" },
  };
  const elevatorsStats = contructElevatorsStats({ elevators, initialStats });

  if (error) {
    return (
      <>
        <Error errorMessage={JSON.stringify((error as any).message || "error")} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <InfoSpinner infoText="fetching elevators from DB..." />
      </>
    );
  }

  if (elevators && !elevators.length) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-element">No elevator found in DB...</div>
      </div>
    );
  }

  return (
    <>
      <DashboardNav />
      <div className="dashboard-page">
        <div className="dashboard-element">
          <div className="stats_container">
            <h2>All elevators Stats</h2>
            <div className="stats-overview_wrapper">
              <StatChart elevatorsStats={elevatorsStats} />
              <ElevatorsStatsOverview elevatorsStats={elevatorsStats} />
            </div>
          </div>
        </div>
        <div className="dashboard-element">
          {Object.keys(elevatorsStats).map((elevatorState) => (
            <ElevatorStateTab label={elevatorsStats[elevatorState as keyof ElevatorsStats].label} elevatorState={elevatorState as keyof ElevatorsStats} />
          ))}
        </div>
        {selectedElevatorsTab === "OPERATIONAL" && <ElevatorsList elevators={getElevatorsWithState({ elevators, elevatorState: "OPERATIONAL" })} listTitle="Operational Elevators List" />}
        {selectedElevatorsTab === "WARNING" && <ElevatorsList elevators={getElevatorsWithState({ elevators, elevatorState: "WARNING" })} listTitle="Elevators in warning Status List" />}
        {selectedElevatorsTab === "OUT_OF_ORDER" && <ElevatorsList elevators={getElevatorsWithState({ elevators, elevatorState: "OUT_OF_ORDER" })} listTitle="Elevators out of order List" />}
      </div>
      {selectedElevator && createPortal(<ElevatorDetails selectedElevatorItem={selectedElevator} />, document.getElementById("app-modal") || document.body)}
    </>
  );
};
