import { ElevatorsStats } from "../../pages/Dashboard/types";
import { ElevatorsStatItem } from "./ElevatorsStatItem";

import workingElevatorIcon from "../../assets/icon-check.png";
import warningIcon from "../../assets/icon-warning.png";
import brokenIcon from "../../assets/icon-x.png";

const STATUS_CLASS_TO_ICON_MAP: Record<keyof ElevatorsStats, string> = {
    OPERATIONAL: workingElevatorIcon,
    WARNING: warningIcon,
    OUT_OF_ORDER: brokenIcon
};

export const ElevatorsStatsOverview = ({ elevatorsStats }: { elevatorsStats: ElevatorsStats }) => {
  return (
    <div className="elevators-stats-overview">
      {Object.keys(elevatorsStats).map((statKey) => (
        <ElevatorsStatItem elevatorState={statKey as keyof ElevatorsStats} elevatorStatsItem={elevatorsStats[statKey as keyof ElevatorsStats]} icon={STATUS_CLASS_TO_ICON_MAP[statKey as keyof ElevatorsStats]} />
      ))}
    </div>
  );
};
