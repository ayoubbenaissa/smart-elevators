import { PieChart } from "@mui/x-charts";
import { ElevatorsStats } from "../../pages/Dashboard/types";

export const StatChart = ({ elevatorsStats }: { elevatorsStats: ElevatorsStats }) => {
  const data = [
    { label: "operational", value: elevatorsStats.OPERATIONAL.nb, color: "#7ff173" },
    { label: "warning", value: elevatorsStats.WARNING.nb, color: "#f5b563" },
    { label: "out of service", value: elevatorsStats.OUT_OF_ORDER.nb, color: "#ed3030" },
  ];

  return (
    <div className="stat-chart">
      <PieChart
        series={[
          {
            data,
          },
        ]}
        width={400}
        height={200}
        slotProps={{
          legend: { hidden: true },
        }}
      />
    </div>
  );
};
