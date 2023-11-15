import { unSelectElevatorItem } from "../../app/features/elevators/elevators.slice";
import { ElevatorResultItem, ElevatorState } from "../../app/features/elevators/elevators.types";
import { useAppDispatch } from "../../app/hooks";
import { DivClickEvent } from "../Auth/types";
import { ElevatorOperationsChart } from "./ElevatorOperationsChart";

import workingElevatorIcon from "../../assets/icon-check.png";
import warningIcon from "../../assets/icon-warning.png";
import brokenIcon from "../../assets/icon-x.png";

import "../../styles/ElevatorDetails.scss";

export const ElevatorDetails = ({ selectedElevatorItem }: { selectedElevatorItem: ElevatorResultItem }) => {
  const dispatch = useAppDispatch();

  const closeModal = (e: DivClickEvent) => {
    e.stopPropagation();
    dispatch(unSelectElevatorItem());
  };

  const STATUS_CLASS_TO_ICON_MAP: Record<ElevatorState, string> = {
    operational: workingElevatorIcon,
    warning: warningIcon,
    "out-of-order": brokenIcon,
  };

  return (
    <div className="elevator-details_container" onClick={closeModal}>
      <div className="elevator-details_modal" onClick={(e) => e.stopPropagation()}>
        <div className="elevator-details_item">
          <img className="elevator-details_item_icon" src={STATUS_CLASS_TO_ICON_MAP[selectedElevatorItem.state]} alt="icon" />
          <div className="elevator-details_item_value">{selectedElevatorItem.state}</div>
        </div>
        {selectedElevatorItem.state === ElevatorState.OUT_OF_ORDER && (
          <>
            <div className="elevator-details_item">
              <div className="elevator-details_item_label">failure reason:&nbsp;</div>
              <div className="elevator-details_item_value">{selectedElevatorItem.reason}</div>
            </div>
          </>
        )}
        {selectedElevatorItem.state === ElevatorState.WARNING && (
          <>
            <div className="elevator-details_item">
              <div className="elevator-details_item_label">warning description:&nbsp;</div>
              <div className="elevator-details_item_value">{selectedElevatorItem.warningMessage}</div>
            </div>
          </>
        )}
        <div className="elevator-details_item">
          <div className="elevator-details_item_label">Device ID:&nbsp;</div>
          <div className="elevator-details_item_value">{selectedElevatorItem.deviceIdentificationNumber}</div>
        </div>
        <div className="elevator-details_item">
          <div className="elevator-details_item_label">Manufacturer Name:&nbsp;</div>
          <div className="elevator-details_item_value">{selectedElevatorItem.manufacturerName}</div>
        </div>
        <div className="elevator-details_item">
          <div className="elevator-details_item_label">Product Year:&nbsp;</div>
          <div className="elevator-details_item_value">{selectedElevatorItem.productionYear}</div>
        </div>
        <div className="elevator-details_item">
          <div className="elevator-details_item_label">reported by:&nbsp;</div>
          <div className="elevator-details_item_value">{selectedElevatorItem.reporterName}</div>
        </div>

        {selectedElevatorItem.state === ElevatorState.OPERATIONAL && selectedElevatorItem.chart && (
          <>
            <div className="elevator-chart_wrapper">
              <ElevatorOperationsChart chartData={selectedElevatorItem.chart.data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
