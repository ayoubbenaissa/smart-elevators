import { NextFunction, Response } from "express";
import { SigninReq } from "../../api/users/types";
import { validateSigninMiddleware } from "../../middleware/userValidation";

describe("testing validation middlewares for user creation & login", () => {
    const mockNext: NextFunction = jest.fn();
    const mockRes = {} as Response;
    mockRes.json = jest.fn();
    // @ts-ignore
    mockRes.status = jest.fn(() => mockRes);
    describe(`testing "validateSigninMiddleware" logic`, () => {
        it("should fail when email is missing", async () => {
            const missingEmailReq = {
                body: {
                    password: 'abcABCa1!'
                }
            } as SigninReq;
            await validateSigninMiddleware(missingEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"email\" is required` });
        });
        it("should fail when email is not valid", async () => {
            const invalidEmailReq = {
                body: {
                    password: 'abcABCa1!',
                    email: 'not.valid.email'
                }
            } as SigninReq;
            await validateSigninMiddleware(invalidEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"email\" is not a valid email` });
        });

        it("should fail when password is missing", async () => {
            const missingPasswordReq = {
                body: {
                    email: 'demo.user@mail.com'
                }
            } as SigninReq;
            await validateSigninMiddleware(missingPasswordReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"password\" is required` });
        });

        it("should fail when password is not valid", async () => {
            const invalidEmailReq = {
                body: {
                    password: 'dasdsadasdasd',
                    email: 'demo.user@mail.com'
                }
            } as SigninReq;
            await validateSigninMiddleware(invalidEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"password\" is not a valid password (please enter a valid passord [at least 8 length + at least lower and upper and number and special character])`
                });
        });

        it("should pass to next when email & password are valid", async () => {
            const validSigninReq = {
                body: {
                    password: 'aabcABC1!',
                    email: 'demo.user@mail.com'
                }
            } as SigninReq;
            await validateSigninMiddleware(validSigninReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe(`testing "validateSignupMiddleware" logic`, () => {});
});
