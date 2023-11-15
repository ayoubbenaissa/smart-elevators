import { validateEmail, validateName, validatePassword } from "../../components/Auth/Form.utils";

describe("testing utility form functions", () => {
  describe(`testing "validateName" logic`, () => {
    it("should return true when field value is not an empty string", () => {
      expect(validateName("name")).toBeTruthy();
    });

    it("should return false when field value is an empty string", () => {
      expect(validateName("")).toBeFalsy();
    });
  });

  describe(`testing "validatePassword" logic`, () => {
    it("should return false when password is missing an Upper case", () => {
      const passwordMissingUpperCase = "asdf1234!";
      expect(validatePassword(passwordMissingUpperCase)).toBeFalsy();
    });

    it("should return false when password is missing a lower case", () => {
      const passwordMissingLowerCase = "ASDF1234!";
      expect(validatePassword(passwordMissingLowerCase)).toBeFalsy();
    });

    it("should return false when password is missing a number", () => {
      const passwordMissingNumber = "ASDFasdf!";
      expect(validatePassword(passwordMissingNumber)).toBeFalsy();
    });

    it("should return false when password is missing a special char", () => {
      const passwordMissingSpecialChart = "ASDFasdf12234";
      expect(validatePassword(passwordMissingSpecialChart)).toBeFalsy();
    });

    it("should return false when password has less than 8 characters", () => {
      const shortPassword = "asAS1!";
      expect(validatePassword(shortPassword)).toBeFalsy();
    });

    it("should return true when password respects all conditions", () => {
      const validPassword = "asdfASDF123!";
      expect(validatePassword(validPassword)).toBeTruthy();
    });
  });

  describe(`testing "validateEmail" logic`, () => {
    it("should return false when email is missing @", () => {
      const emailMissingAlt = "test.email#mail.de";
      expect(validateEmail(emailMissingAlt)).toBeFalsy();
    });

    it("should return false when email suffix is invalid", () => {
      const invalidEmailSuffix = "test.email@mail.abcd";
      expect(validateEmail(invalidEmailSuffix)).toBeFalsy();
    });

    it("should return true when password respects all conditions", () => {
      const validEmail = "test.email@mail.de";
      expect(validateEmail(validEmail)).toBeTruthy();
    });
  });
});
