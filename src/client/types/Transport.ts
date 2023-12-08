import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * A generic object for remote API,
 * this feels like SOAP
 * @interfacce
 */
export interface Transport<T, B> {
  get<T, R = AxiosResponse<T>>(
    ID: string,
    config: AxiosRequestConfig | undefined
  ): Promise<R>;

  getAll<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig | undefined
  ): Promise<R>;

  post<T, B, R = AxiosResponse<T>>(
    data: B,
    config: AxiosRequestConfig | undefined
  ): Promise<R>;

  patch<T, B, R = AxiosResponse<T>>(
    ID: string,
    data: B,
    config: AxiosRequestConfig | undefined
  ): Promise<R>;

  setUrl(u: string): void;
}

export { AxiosResponse } from "axios";
