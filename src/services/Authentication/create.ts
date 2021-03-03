import {
  AuthenticationConstructor,
  AuthenticationConstructorArgs,
  CreateAuthentication,
} from "./interface";

const createAuthenticationService: CreateAuthentication = function (
  ctor: AuthenticationConstructor,
  opts: AuthenticationConstructorArgs
) {
  return new ctor(opts);
};

export default createAuthenticationService;
