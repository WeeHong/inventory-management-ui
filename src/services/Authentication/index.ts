import { Network } from "../Network/interface";
import createAuthenticationService from "./create";
import { AuthenticationService, AuthenticationConstructorArgs, Credentials } from "./interface";

class Authentication implements AuthenticationService {
  _network: Network;
  _url: string;

  constructor({ network, url, ...args }: AuthenticationConstructorArgs) {
    this._network = network;
    this._url = url || String(process.env.REACT_APP_API_URL);
  }

  login = (credentials: Credentials) => {
    const headers = {
      "content-type": "application/json",
    };
    const data = {
      grant_type: "password",
      email: credentials.email,
      password: credentials.password,
    };
    return this._network.post(`${this._url}/api/v1/login`, data, { headers });
  };
}

const AuthenticationCall = (opts: AuthenticationConstructorArgs) =>
  createAuthenticationService(Authentication, opts);

export default AuthenticationCall;
