import { Axios, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosDefaults } from "axios";

export interface Transport<T, B> {

    get<T, R = AxiosResponse<T>>( ID:string, config: AxiosRequestConfig| undefined ): Promise<R>;

    getAll<T, R = AxiosResponse<T>>(config: AxiosRequestConfig| undefined ):Promise<R>;

    post<T, B, R = AxiosResponse<T>>( data?: B, config?: AxiosRequestConfig): Promise<R>;

    setUrl(u:string):void; 
}

export { AxiosResponse }  from "axios"