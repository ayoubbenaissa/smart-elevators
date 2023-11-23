import { NextFunction, Response } from "express";
import { CreateElevatorReq, Elevator, ElevatorState, ElevatorType } from "../../api/elevators/types";
import { validateElevator } from "../../middleware/elevatorValidation";

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("testing validation middleware for elevator resource creation", () => {
    const mockNext: NextFunction = jest.fn();
    const mockRes = {} as Response;
    mockRes.json = jest.fn();
    // @ts-ignore
    mockRes.status = jest.fn(() => mockRes);

    // not going to test all of: reporter, reporterName, fabricationNumber, address, floorNumber, deviceIdentificationNumber, manufacturerName, productionYear
    // => will only test two: reporter (string) & floorNumber (number)

    const mockElevatorData = {
        fabricationNumber: "nb",
        floorNumber: 2,
        address: "addrs",
        deviceIdentificationNumber: "dvId",
        manufacturerName: "x company",
        productionYear: 2000,
        elevatorType: "Passenger",
        state: "out-of-order",
        reason: "broken"

    } as Omit<Elevator, 'reporter' | 'reporterName'>;

    it("should fail when reporter is missing", async () => {
        const missingReporterReq = {
            body: {
                reporterName: "reporter",
                elevator: {
                    ...mockElevatorData
                }
            }
        } as CreateElevatorReq;
        await validateElevator(missingReporterReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"reporter\" is required` });
    });

    it("should fail when floorNumber is missing", async () => {
        const { floorNumber, ...rest } = mockElevatorData;
        const missingReporterReq = {
            userId: "userId",
            body: {
                reporterName: "reporter",
                elevator: {
                    ...rest
                }
            }
        } as CreateElevatorReq;
        await validateElevator(missingReporterReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"floorNumber\" is required` });
    });

    describe("testing validation logic for elevatorType field", () => {
        it("should fail when given elevator-type is not valid", async () => {
            const invalidElevatorTypeReq = {
                userId: "userId",
                body: {
                    reporterName: "reporter",
                    elevator: {
                        ...mockElevatorData,
                        elevatorType: "type" as ElevatorType
                    }
                }
            } as CreateElevatorReq;
            await validateElevator(invalidElevatorTypeReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"elevatorType\" must be one of [Passenger, Freight]` });
        });

        it("should fail when given elevator-type is missing", async () => {
            const { elevatorType, ...rest } = mockElevatorData
            const invalidElevatorTypeReq = {
                userId: "userId",
                body: {
                    reporterName: "reporter",
                    elevator: {
                        ...rest
                    }
                }
            } as CreateElevatorReq;
            await validateElevator(invalidElevatorTypeReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"elevatorType\" is required` });
        });
    });

    describe("testing validation logic for state field", () => {
        it("should fail when given elevator-state is not valid", async () => {
            const invalidElevatorStateReq = {
                userId: "userId",
                body: {
                    reporterName: "reporter",
                    elevator: {
                        ...mockElevatorData,
                        state: "state" as ElevatorState
                    }
                }
            } as CreateElevatorReq;
            await validateElevator(invalidElevatorStateReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"state\" must be one of [operational, warning, out-of-order]` });
        });

        it("should fail when given elevator-state is missing", async () => {
            const { state, ...rest } = mockElevatorData
            const invalidReq = {
                userId: "userId",
                body: {
                    reporterName: "reporter",
                    elevator: {
                        ...rest
                    }
                }
            } as CreateElevatorReq;
            await validateElevator(invalidReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"state\" is required` });
        });

        it("should fail when state is warning but warningMessage is missing", async () => {
            const { reason, state, ...rest } = mockElevatorData;
            const invalidReq = {
                userId: "userId",
                body: {
                    reporterName: "reporter",
                    elevator: {
                        ...rest,
                        state: "warning"
                    }
                }
            } as CreateElevatorReq;
            await validateElevator(invalidReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"warningMessage\" is required` });
        });
    });
});
