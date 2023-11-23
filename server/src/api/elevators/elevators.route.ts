import express from "express";
import { auth } from "../../middleware/auth";
import { createElevator, getAllElevators } from "./elevators.controller";
import { validateElevator } from "../../middleware/elevatorValidation";

const elevatorsRouter = express.Router();

elevatorsRouter.get("/", auth, getAllElevators);
elevatorsRouter.post("/", auth, validateElevator, createElevator);

export { elevatorsRouter };
