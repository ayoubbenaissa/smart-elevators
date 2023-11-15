import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { jwtDecode } from "jwt-decode";
import { authorizeUser } from "../../app/features/auth/auth.slice";
import { decodedGoogleObject } from "./types";
import { useNavigate } from "react-router-dom";
import { Error } from "../Error";

export const GoogleAuth = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo, error } = useAppSelector((state) => state.auth);

  const handleSuccessfulLogin = async (credentialResponse: CredentialResponse) => {
    const googleToken = credentialResponse.credential;

    try {
      if (googleToken) {
        const decodedToken: decodedGoogleObject = jwtDecode(googleToken);
        const { given_name: firstName, family_name: lastName } = decodedToken;
        if (firstName && lastName) {
          dispatch(authorizeUser({ user: { firstName, lastName, id: decodedToken.sub || "" }, token: googleToken }));
          navigator("/");
        }
      }
    } catch (error) {
      console.log(" error Google Auth ", JSON.stringify(error));
      return (
        <>
        <Error errorMessage={'error Google Auth'} />
        </>
      )
    }
  };

  const handleFailingLogin = () => {
    console.log(`handleFailingLogin:`);
  };

  if (error) {
    return (
      <>
      <Error errorMessage={JSON.stringify((error as any).response?.data?.message || "error")} />
      </>
    )
  }

  return <>{!userInfo && <GoogleLogin onSuccess={(credentialResponse) => handleSuccessfulLogin(credentialResponse)} onError={handleFailingLogin} />}</>;
};
