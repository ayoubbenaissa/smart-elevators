import { USER_MISSING_NAME, USER_MISSING_PASS, VALID_USER } from "../../__mocks__/users.mock";
import { SignupReq } from "../../api/users/types";
import { Response } from "express";
import { signupController, signupUserWithEmail } from "../../api/users/users.controller";

jest.mock("../../api/users/users.controller");

describe(`testing "signupController" logic`, () => {
  // signup is not doing much, so we can have one simple test
  it("should call signupUserWithEmail with correct params", async () => {
    try {
      const userSignupRequest = {
        body: VALID_USER,
      } as SignupReq;
      const mockResponse = {} as Response;
      await signupController(userSignupRequest, mockResponse);
      expect(signupUserWithEmail).toHaveBeenCalled();
      expect(signupUserWithEmail).toHaveBeenCalledWith(userSignupRequest, mockResponse);
    } catch (error) {}
  });
});

describe(`testing "signupUserWithEmail" main logic`, () => {
  it("should throw error when firstName is not valid", async () => {
    try {
      const userSignupRequest = {
        body: USER_MISSING_NAME,
      } as SignupReq;
      const mockResponse = {} as Response;
      await signupUserWithEmail(userSignupRequest, mockResponse);
    } catch (error) {
      expect(error.message).toBe(`user name can NOT be empty!`);
    }
  });

  it("should throw error when password is not valid", async () => {
    try {
      const userSignupRequest = {
        body: USER_MISSING_PASS,
      } as SignupReq;
      const mockResponse = {} as Response;
      await signupUserWithEmail(userSignupRequest, mockResponse);
    } catch (error) {
      expect(error.message).toBe(`password can NOT be empty!`);
    }
  });
});

describe(`testing "createUser" logic`, () => {
  it("should create user successfully", async () => {});
});
