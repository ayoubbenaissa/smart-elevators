import { ElevatorResultItem } from "@app/features/elevators/elevators.types";
import { ElevatorItem } from "./ElevatorItem";

import "./ElevatorsList.scss";

export const ElevatorsList = ({ elevators, listTitle }: { elevators: ElevatorResultItem[]; listTitle: string }) => {
  return (
    <div className="elevators_list">
      <h2>{listTitle}</h2>
      {elevators.map((elevatorItem, index) => (
        <ElevatorItem key={index} elevatorItem={elevatorItem} />
      ))}
    </div>
  );
};
