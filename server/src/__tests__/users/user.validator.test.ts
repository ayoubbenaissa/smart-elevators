import { NextFunction, Response } from "express";
import { SigninReq, SignupReq } from "../../api/users/types";
import { validateSigninMiddleware, validateSignupMiddleware } from "../../middleware/userValidation";

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

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
                    email: "demo.user@mail.com"
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
                    email: "demo.user@mail.com"
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
                    email: "demo.user@mail.com"
                }
            } as SigninReq;
            await validateSigninMiddleware(validSigninReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe(`testing "validateSignupMiddleware" logic`, () => {
        it("should fail when email is missing", async () => {
            const missingEmailReq = {
                body: {
                    firstName: "bar",
                    lastName: "foo",
                    password: 'abcABCa1!'
                }
            } as SignupReq;
            await validateSignupMiddleware(missingEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"email\" is required` });
        });
        it("should fail when email is not valid", async () => {
            const invalidEmailReq = {
                body: {
                    firstName: "bar",
                    lastName: "foo",
                    password: 'abcABCa1!',
                    email: 'not.valid.email'
                }
            } as SignupReq;
            await validateSignupMiddleware(invalidEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"email\" is not a valid email` });
        });

        it("should fail when password is missing", async () => {
            const missingPasswordReq = {
                body: {
                    firstName: "bar",
                    lastName: "foo",
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(missingPasswordReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: `Validation error: \"password\" is required` });
        });

        it("should fail when password is not valid", async () => {
            const invalidEmailReq = {
                body: {
                    firstName: "bar",
                    lastName: "foo",
                    password: 'dasdsadasdasd',
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(invalidEmailReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"password\" is not a valid password (please enter a valid passord [at least 8 length + at least lower and upper and number and special character])`
                });
        });

        it("should fail when firstName is missing", async () => {
            const missingFirstNameReq = {
                body: {
                    lastName: "foo",
                    password: 'abcABCa1!',
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(missingFirstNameReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"firstName\" is required`
                });
        });
        it("should fail when firstName is not valid", async () => {
            const invalidFirstNameReq = {
                body: {
                    firstName: "a",
                    lastName: "foo",
                    password: 'abcABCa1!',
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(invalidFirstNameReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"firstName\" is not a valid name (min 2 chars)`
                });
        });

        it("should fail when lastName is missing", async () => {
            const missingLastNameReq = {
                body: {
                    firstName: "foo",
                    password: 'abcABCa1!',
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(missingLastNameReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"lastName\" is required`
                });
        });
        it("should fail when lastName is not valid", async () => {
            const invalidLastNameReq = {
                body: {
                    firstName: "demo",
                    lastName: "f",
                    password: 'abcABCa1!',
                    email: "demo.user@mail.com"
                }
            } as SignupReq;
            await validateSignupMiddleware(invalidLastNameReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json)
                .toHaveBeenCalledWith({
                    message: `Validation error: \"lastName\" is not a valid name (min 2 chars)`
                });
        });

        it("should pass when input is all valid", async () => {
            const validSignupReq = {
                body: {
                    firstName: "demo",
                    lastName: "user",
                    email: "demo.user@mail.com",
                    password: "aabcABC1!"
                }
            } as SignupReq;

            await validateSignupMiddleware(validSignupReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });
});
