import { Transport } from '../types/Transport';
import { isShippingAthlete, Athlete, ShippingAthlete  } from '../types/Athlete';
import { Axios, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export class Transport_b1<T, B> implements Transport<T, B> {
    private ax:Axios;

    constructor() {
        let t:AxiosRequestConfig= {
            timeout: 1000,
            baseURL: window.location.protocol+"//"+window.location.host+"/test/",
            headers: {
                'X-Requested-With':'XMLHttpRequest',
          //      'Content-encoding':'application/json; encoding=utf8',
                'Accept':           'application/json; encoding=utf8',
            },
            transformResponse: [(data) => {
              data=JSON.parse(data);
              if(data.dob && isShippingAthlete(data)) { 
					let tt:ShippingAthlete=data as ShippingAthlete;
					return {...tt, dob:new Date(tt.dob) } as Athlete;
              } else if(Array.isArray( data) ) {
				for(let i=0; i<data.length; i++){
					let tt:ShippingAthlete=data[i] as ShippingAthlete;
					data[i]={...tt, dob:new Date(tt.dob) } as Athlete;
				}
              	return data;
              } else {
				throw new Error("Unexpected data format ");
			  }
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
        config: AxiosRequestConfig|undefined
    ): Promise<R> {
        console.log("POST", this.ax.defaults.baseURL+"athlete/", data );  	
		let fd=new URLSearchParams();
		fd.append('data',""+JSON.stringify(data) );

		if(config) {
        	return this.ax.post(this.ax.defaults.baseURL +"athlete/", fd, config.headers);
		} else {
        	return this.ax.post(this.ax.defaults.baseURL +"athlete/", fd, this.ax.defaults.headers.common);
		}
    }

    public patch<T, B, R = AxiosResponse<T>>(
        ID:string,
        data: B,
        config: AxiosRequestConfig|undefined
    ): Promise<R> {
        console.log("PATCH", this.ax.defaults.baseURL+"athlete/"+ID, {'data':data} );  
		let fd=new URLSearchParams();
		fd.append('data',""+JSON.stringify(data) );
		
		if(config) {
        	return this.ax.patch(this.ax.defaults.baseURL +"athlete/"+ID, fd, config.headers);
		} else {
        	return this.ax.patch(this.ax.defaults.baseURL +"athlete/"+ID, fd, this.ax.defaults.headers.common);
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
