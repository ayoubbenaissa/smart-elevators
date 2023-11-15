import mongoose from "mongoose";
import { DoorData, Elevator, ElevatorState, IElevatorDocument } from "./types";
import { validateElevatorState } from "./utils";

const doorDataSchema = new mongoose.Schema<DoorData>({
  time: {
    type: Date,
    required: true,
  },
  door_cycles_count: {
    type: Number,
    required: true,
  },
  door_openings_count: {
    type: Number,
    required: true,
  },
  door_closings_count: {
    type: Number,
    required: true,
  },
  door_closed_count: {
    type: Number,
    required: true,
  },
  door_opened_count: {
    type: Number,
    required: true,
  },
});

const chartSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["door_cycle_count_over_time"],
  },
  data: {
    type: [doorDataSchema],
  },
});

const elevatorSchema = new mongoose.Schema<Elevator>({
  reporter: { type: String, required: true}, // not relying on ObjectId since we are not storing Google authenticated users
  reporterName: {
    type: String,
    required: true
  },
  fabricationNumber: {
    type: String,
    required: [true, "Please provide the Fabrication Number"],
  },
  address: {
    type: String,
    required: [true, "Please provide the address"],
  },
  floorNumber: {
    type: Number,
    required: [true, "Please enter the floor number"],
  },
  deviceIdentificationNumber: {
    type: String,
    required: [true, "Please provide the Device Identification Number"],
  },
  manufacturerName: {
    type: String,
    required: [true, "Please provide the Manufacturer Name"],
  },
  productionYear: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: [true, `Please make sure to provide a correct elevator state (${Object.values(ElevatorState)})`],
    enum: Object.values(ElevatorState),
    validate: validateElevatorState,
  },
  warningMessage: {
    type: String,
    required: false,
  },
  reason: {
    type: String,
    required: false,
  },
  chart: {
    type: chartSchema,
    required: false,
  },
});

elevatorSchema.index({ reporter: 1 });

export const ElevatorModel = mongoose.model<IElevatorDocument>("Elevator", elevatorSchema);
