import express from "express";
import { auth } from "../../middleware/auth";
import { createElevator, getAllElevators } from "./elevators.controller";

const elevatorsRouter = express.Router();

elevatorsRouter.get("/", auth, getAllElevators);
elevatorsRouter.post("/", auth, createElevator);

export { elevatorsRouter };
