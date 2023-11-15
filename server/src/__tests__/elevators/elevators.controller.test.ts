import { Response } from "express";
import { ALL_ELEVATORS, ELEVATOR, PLAIN_ELEVATOR } from "../../__mocks__/elevators.mock";
import { createElevator, getAllElevators } from "../../api/elevators/elevators.controller";
import * as ElevatorSchemaModel from "../../api/elevators/elevators.model";
import { GetUserAuthInfoRequest } from "../../middleware/types";
import { CreateElevatorReq, Elevator } from "../../api/elevators/types";

jest.mock("../../api/elevators/elevators.model");

describe(`testing "getAllElevators" logic`, () => {

  it("should return elevators", async () => {
    try {
      ElevatorSchemaModel.ElevatorModel.find = jest.fn().mockResolvedValue(ALL_ELEVATORS);

      const mockReq = {} as GetUserAuthInfoRequest;
      const mockRes: Partial<Response> = {};

      mockRes.json = jest.fn();
      // @ts-ignore
      mockRes.status = jest.fn(() => mockRes);
      await getAllElevators(mockReq, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ result: ALL_ELEVATORS });
      expect(ElevatorSchemaModel.ElevatorModel.find).toHaveBeenCalled();
    } catch (error) {
      console.log(" ** test error ** ", error);
    }
  });

  it("should return 204 when no elevator is in DB", async () => {
    try {
      ElevatorSchemaModel.ElevatorModel.find = jest.fn().mockResolvedValue([]);

      const mockReq = {} as GetUserAuthInfoRequest;
      const mockRes: Partial<Response> = {};

      mockRes.json = jest.fn();
      // @ts-ignore
      mockRes.status = jest.fn(() => mockRes);
      await getAllElevators(mockReq, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.json).toHaveBeenCalledWith({});
      expect(ElevatorSchemaModel.ElevatorModel.find).toHaveBeenCalled();
    } catch (error) {
      console.log(" ** test error ** ", error);
    }
  });

  it("should throw error when insertion fails", async () => {
    try {
      ElevatorSchemaModel.ElevatorModel.find = jest.fn().mockRejectedValue(new Error("error message"));

      const mockReq = {} as GetUserAuthInfoRequest;
      const mockRes: Partial<Response> = {};

      mockRes.json = jest.fn();
      // @ts-ignore
      mockRes.status = jest.fn(() => mockRes);
      await getAllElevators(mockReq, mockRes as Response);
    } catch (error) {
      expect(error.message).toBe(`error message`);
    }
  });
});

describe(`testing "createElevator" logic`, () => {
  it("should check create query called correctly", async () => {
    ElevatorSchemaModel.ElevatorModel.create = jest.fn().mockResolvedValue(ELEVATOR);

    const newElevatorData = {
      reporter: "123",
      reporterName: "mock user",
      ...PLAIN_ELEVATOR,
    } as Elevator;
    const req: Partial<CreateElevatorReq> = {
      userId: "123",
      body: {
        reporterName: "mock user",
        elevator: PLAIN_ELEVATOR,
      },
    };
    const mockRes: Partial<Response> = {};

    mockRes.json = jest.fn();
    // @ts-ignore
    mockRes.status = jest.fn(() => mockRes);

    await createElevator(req as CreateElevatorReq, mockRes as Response);

    expect(ElevatorSchemaModel.ElevatorModel.create).toHaveBeenCalled();
    expect(ElevatorSchemaModel.ElevatorModel.create).toHaveBeenCalledWith(newElevatorData);
  });

  it("should create elevator resource", async () => {
    ElevatorSchemaModel.ElevatorModel.create = jest.fn().mockResolvedValue(ELEVATOR);

    const newElevatorData = {
      reporter: "user 001",
      reporterName: "Demo User",
      ...PLAIN_ELEVATOR,
    } as Elevator;
    const req: Partial<CreateElevatorReq> = {
      userId: "user 001",
      body: {
        reporterName: "Demo User",
        elevator: PLAIN_ELEVATOR,
      },
    };
    const mockRes: Partial<Response> = {};

    mockRes.json = jest.fn();
    // @ts-ignore
    mockRes.status = jest.fn(() => mockRes);

    await createElevator(req as CreateElevatorReq, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ result: newElevatorData });
  });

  it("should throw error when insertion fails", async () => {
    try {
      ElevatorSchemaModel.ElevatorModel.create = jest.fn().mockRejectedValue(new Error("error message"));

      const newElevatorData = {
        reporter: "user 001",
        reporterName: "Demo User",
        ...PLAIN_ELEVATOR,
      } as Elevator;
      const req: Partial<CreateElevatorReq> = {
        userId: "user 001",
        body: {
          reporterName: "Demo User",
          elevator: PLAIN_ELEVATOR,
        },
      };
      const mockRes: Partial<Response> = {};
  
      mockRes.json = jest.fn();
      // @ts-ignore
      mockRes.status = jest.fn(() => mockRes);
  
      await createElevator(req as CreateElevatorReq, mockRes as Response);
    } catch (error) {
      expect(error.message).toBe(`error message`);
    }
  });
});
