export interface decodedGoogleObject {
  aud?: string;
  azp?: string;
  email?: string;
  email_verified?: boolean;
  exp: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  locale?: string;
  name?: string;
  nbf?: number;
  picture?: string;
  sub?: string;
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type DivClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
