import { NetworkResponse } from "../Network/interface";

export type Credentials = {
  email: string;
  password: string;
};

export type AuthenticationConstructorArgs = {
  network: Network;
  url?: string;
};

export type CreateAuthentication = (
  ctor: AuthenticationConstructor,
  opts: AuthenticationConstructorArgs
) => AuthenticationService;

export interface AuthenticationConstructor {
  new (opts: AuthenticationConstructorArgs): Authentication;
}

export interface AuthenticationService {
  login(credentials: Credentials): Promise<NetworkResponse<T>>;
}
