import * as Axios from "axios";

export type Network = typeof Axios.default;
export type NetworkResponse<T = any> = Axios.AxiosResponse<T>;
export type NetworkError<T = any> = Axios.AxiosError<T>;

interface WithNetwork {
  _network: typeof Network.default;
}
