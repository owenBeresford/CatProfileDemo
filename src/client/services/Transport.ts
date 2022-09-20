import { Transport } from '../types/Transport';
import { isShippingCat, Cat, ShippingCat  } from '../types/Cat';
import { Axios, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export class Transport_b1<T, B> implements Transport<T, B> {
    private ax:Axios;

    constructor() {
        const config:AxiosRequestConfig= {
            timeout: 1000,
            baseURL: window.location.protocol+"//"+window.location.host+"/test/",
            headers: {
                'X-Requested-With':'XMLHttpRequest',
          //      'Content-encoding':'application/json; encoding=utf8',
                'Accept':           'application/json; encoding=utf8',
            },
            transformResponse: [(data) => {
              data=JSON.parse(data);
              if(data.dob && isShippingCat(data)) { 
					const tt:ShippingCat=data as ShippingCat;
					return {...tt, dob:new Date(tt.dob) } as Cat;
              } else if(Array.isArray( data) ) {
				for(let i=0; i<data.length; i++){
					const tt:ShippingCat=data[i] as ShippingCat;
					data[i]={...tt, dob:new Date(tt.dob) } as Cat;
				}
              	return data;
              } else {
				throw new Error("Unexpected data format ");
			  }
            }]

        };
        this.ax= new Axios( config);
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
        config: AxiosRequestConfig|undefined
    ): Promise<R> {
        console.log("POST", this.ax.defaults.baseURL+"athlete/", data );  	
		const payload=new URLSearchParams();
		payload.append('data',""+JSON.stringify(data) );

		if(config) {
        	return this.ax.post(this.ax.defaults.baseURL +"athlete/", payload, config.headers);
		} else {
        	return this.ax.post(this.ax.defaults.baseURL +"athlete/", payload, this.ax.defaults.headers.common);
		}
    }

    public patch<T, B, R = AxiosResponse<T>>(
        ID:string,
        data: B,
        config: AxiosRequestConfig|undefined
    ): Promise<R> {
        console.log("PATCH", this.ax.defaults.baseURL+"athlete/"+ID, {'data':data} );  
		const payload=new URLSearchParams();
		payload.append('data',""+JSON.stringify(data) );
		
		if(config) {
        	return this.ax.patch(this.ax.defaults.baseURL +"athlete/"+ID, payload, config.headers);
		} else {
        	return this.ax.patch(this.ax.defaults.baseURL +"athlete/"+ID, payload, this.ax.defaults.headers.common);
		}
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
