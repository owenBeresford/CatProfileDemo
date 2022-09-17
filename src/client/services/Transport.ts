import { Transport } from '../types/Transport';
import { Axios, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export class Transport_b1<T, B> implements Transport<T, B> {
    private ax:Axios;

    constructor() {
        let t:AxiosRequestConfig= {
            timeout: 1000,
            baseURL: window.location.protocol+"//"+window.location.host+"/test/",
            headers: {
                'X-Requested-With':'XMLHttpRequest',
                'Content-encoding':'application/json; encoding=utf8',
                'Accept':           'application/json; encoding=utf8',
            },
            transformResponse: [(data) => {
               return JSON.parse(data);
            }]

        };
        this.ax= new Axios( t);
    }

    // this call exists, as the API has 1 URL
    setUrl(u:string):void {
        this.ax.defaults.baseURL=u;
    }
    // add API point to update default

    public get<T, R = AxiosResponse<T>>(
        ID:string,
        config: AxiosRequestConfig| undefined
    ): Promise<R> {
        console.log("GET", this.ax.defaults.baseURL+"athlete/"+ID);        
        return this.ax.get(this.ax.defaults.baseURL+"athlete/"+ID, config);
    }

    public getAll<T, R = AxiosResponse<T>>(config: AxiosRequestConfig| undefined  ):Promise<R> {
        console.log("getall", this.ax.defaults.baseURL +"athlete/all");        
        return this.ax.get(this.ax.defaults.baseURL +"athlete/all", config);
    }
    
    public post<T, B, R = AxiosResponse<T>>(
        data: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        console.log("POST", this.ax.defaults.baseURL+"athlete/", data );  
        return this.ax.post(this.ax.defaults.baseURL +"athlete/", data, config);
    }

    public patch<T, B, R = AxiosResponse<T>>(
        ID:string,
        data: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        console.log("PATCH", this.ax.defaults.baseURL+"athlete/"+ID, data );  
        return this.ax.patch(this.ax.defaults.baseURL + "athlete/"+ID , data, config);
    }


  // probably not needed  
    public success<T>(response: AxiosResponse<T>):T {
        return response.data;
    }

    public error<T> (error: AxiosError<T>): void {
        throw error;
    }
}

export function UseTransport<T, B>():Transport<T, B> {
    return new Transport_b1();
}
