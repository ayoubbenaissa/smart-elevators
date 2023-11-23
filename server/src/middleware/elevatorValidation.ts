import Joi from "joi";
import { CreateElevatorReq } from "../api/elevators/types";
import { NextFunction, Response } from "express";

// schema options
const schemaValidationOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
};

const schemaElevatorType = Joi.string().required().valid('Passenger', 'Freight');
const schemaElevatorState = Joi.string().required().valid("operational", "warning", "out-of-order");
const schemaChartName = Joi.string().required().valid("door_cycle_count_over_time");
const schemaDoorData = Joi.object({
    time: Joi.date().required(),
    door_cycles_count: Joi.number().required(),
    door_openings_count: Joi.number().required(),
    door_closings_count: Joi.number().required(),
    door_closed_count: Joi.number().required(),
    door_opened_count: Joi.number().required(),
});
const schemaChart = Joi.object({
    name: schemaChartName,
    data: Joi.array().min(1).required().items(schemaDoorData)
});

const schemaElevator = Joi.object({
    reporter: Joi.string().required(),
    reporterName: Joi.string().required(),
    fabricationNumber: Joi.string().required(),
    address: Joi.string().required(),
    floorNumber: Joi.number().required(),
    deviceIdentificationNumber: Joi.string().required(),
    manufacturerName: Joi.string().required(),
    productionYear: Joi.number().required(),
    elevatorType: schemaElevatorType,
    state: schemaElevatorState,
    warningMessage: Joi.string().when("state", { is: "warning", then: Joi.string().required(), otherwise: Joi.string().optional() }),
    reason: Joi.string().when("state", { is: "out-of-order", then: Joi.string().required(), otherwise: Joi.string().optional() }),
    chart: Joi.object().when("state", { is: "operational", then: schemaChart.required(), otherwise: Joi.any().optional() })
});

export const validateElevator = async (req: CreateElevatorReq, res: Response, next: NextFunction) => {
    const newElevatorData = {
        reporter: req.userId,
        reporterName: req.body.reporterName,
        ...req.body.elevator,
    };
    const { error, value } = schemaElevator.validate(newElevatorData, schemaValidationOptions);
    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details.map((x) => x.message).join(", ")}` });
    }
    if (value) {
        return next();
    }
};
