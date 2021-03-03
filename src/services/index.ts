import Axios from "axios";
import createAuthentication from "./Authentication";

const Network = {
  Authentication: createAuthentication({ network: Axios }),
};

export default Network;
