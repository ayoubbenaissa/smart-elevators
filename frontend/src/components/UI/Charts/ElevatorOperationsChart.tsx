import { DoorData } from "@app/features/elevators/elevators.types";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { dateFormatter } from "../utils";
import { useState } from "react";
import { DoorStats, DoorStatsCount } from "../types";
import { ChangeEvent } from "../../Auth/types";

import "./ElevatorOperationsChart.scss";

export const ElevatorOperationsChart = ({ chartData }: { chartData: DoorData[] }) => {
  const valueFormatter = (value: number) => `${value} door(s)`;
  const ALL_DOOR_STATS: DoorStatsCount[] = [
    { dataKey: "door_cycles_count", label: "Cycles count", valueFormatter },
    { dataKey: "door_openings_count", label: "Openings count", valueFormatter },
    { dataKey: "door_closings_count", label: "Closings count", valueFormatter },
  ];
  const [doorStatsToShow, setDoorStatsToShow] = useState<Record<DoorStats, boolean>>({
    door_cycles_count: true,
    door_closings_count: false,
    door_openings_count: false,
  });
  const chartSetting = {
    yAxis: [
      {
        label: "door counts",
      },
    ],
    width: 900,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const handleSelectDoorStats = (e: ChangeEvent, doorStatsItem: DoorStats) => {
    e.stopPropagation();
    setDoorStatsToShow({
      ...doorStatsToShow,
      [doorStatsItem]: !doorStatsToShow[doorStatsItem],
    });
  };

  return (
    <div className="chart-data_container">
      <div className="chart-stats_selector">
        {Object.keys(doorStatsToShow).map((doorStatsItem, index) => (
          <div className="chart-stats_selector_item" key={index}>
            <input
              type="checkbox"
              id={doorStatsItem}
              checked={doorStatsToShow[doorStatsItem as DoorStats]}
              onChange={(e) => {
                handleSelectDoorStats(e, doorStatsItem as DoorStats);
              }}
            />
            <label htmlFor={doorStatsItem}>{doorStatsItem}</label>
          </div>
        ))}
      </div>
      <BarChart dataset={chartData} xAxis={[{ scaleType: "band", dataKey: "time", valueFormatter: dateFormatter }]} series={ALL_DOOR_STATS.filter((doorStat) => doorStatsToShow[doorStat.dataKey])} {...chartSetting} />
    </div>
  );
};
