import { Response } from "express";
import { GetUserAuthInfoRequest } from "../../middleware/types";
import { ElevatorModel } from "./elevators.model";
import { CreateElevatorReq, Elevator } from "./types";

export const getAllElevators = async (req: GetUserAuthInfoRequest, res: Response) => {
  try {
    const allElevators = await ElevatorModel.find({});
    if (allElevators && allElevators.length) {
      return res.status(200).json({ result: allElevators });
    } else {
      // no content:
      return res.status(204).json({});
    }
  } catch (error) {
    console.log(" error ", error);
    return res.status(500).json({ message: "elevators fetching failed..." });
  }
};

export const createElevator = async (req: CreateElevatorReq, res: Response) => {
  try {
    const newElevatorData: Elevator = {
      reporter: req.userId,
      reporterName: req.body.reporterName,
      ...req.body.elevator,
    };
    const newElevator = await ElevatorModel.create(newElevatorData);
    return res.status(201).json({ result: newElevator });
  } catch (error) {
    return res.status(500).json({ message: "creation of elevators failed..." });
  }
};
