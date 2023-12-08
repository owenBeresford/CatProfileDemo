import { Transport } from "../types/Transport";
import { isShippingCat, Cat, ShippingCat } from "../types/Cat";
import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

interface CatWindow extends Window {
  CAT_TESTING: number;
}
declare let window: CatWindow;

/**
 * Transport_b1<T, B>
 * A class to pull data to the client side, wrapping [Axios](https://www.npmjs.com/package/axios)
 *
 * @implements Transport<T, B>
 * @access public
 */
export class Transport_b1<T, B> implements Transport<T, B> {
  private ax: Axios;

  constructor() {
    let testing = true;
    if (typeof window.CAT_TESTING === "number") {
      testing = !!window.CAT_TESTING;
    }

    const config: AxiosRequestConfig = {
      timeout: 1000,
      baseURL:
        window.location.protocol +
        "//" +
        window.location.host +
        (testing ? "/test/" : "/api/"),
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        //      'Content-encoding':'application/json; encoding=utf8',
        Accept: "application/json; encoding=utf8",
      },
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },

      /**
       * transformResponse array of handlers
       * This does generai parsing of API responses,
       * I intenstionally erase the default handler, so I can look at all the data to emit correct error mesages on failure.
       *   I cant see Axios + typescript notes
       *
       * @param {any} data - I think this is a node http/ServerResponse
       * @param {any} headers - a hash
       * @return parsed data OR throw Exception
       * @throws Error as Promise.reject
       * @internal
       */
      transformResponse: [
        // headers here are complex
        (data, headers) => {
          if (
            data === "" ||
            (Array.isArray(data) && data.length === 0) ||
            Object.keys(data).length === 0
          ) {
            console.log(
              "Assert this is a HTTP204 or possibly a HTTP5*; no data"
            );
            return [];
          }

          if (
            !headers ||
            !("content-type" in headers) ||
            headers["content-type"].indexOf("application/json") === -1
          ) {
            Promise.reject(
              new Error("Unexpected data format (think API failed)")
            );
            return;
          }

          try {
            // I have erased the defauilt parser, so I can add the extra error reporting above here
            if (typeof data === "string") {
              data = JSON.parse(data);
            }
          } catch (e) {
            Promise.reject(new Error("Received bad data."));
          }

          if (data.dob && isShippingCat(data)) {
            const tt: ShippingCat = data as ShippingCat;
            return { ...tt, dob: new Date(tt.dob) } as Cat;
          } else if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
              const tt: ShippingCat = data[i] as ShippingCat;
              data[i] = { ...tt, dob: new Date(tt.dob) } as Cat;
            }
            return data;
          } else {
            Promise.reject(new Error("Unexpected data format "));
          }
        },
      ],
    };
    this.ax = new Axios(config);
  }

  /**
   * setUrl
   * Assign the base URL, used in testing
   *
   * @param {string} u
   * @access public
   * @return void
   */
  setUrl(u: string): void {
    this.ax.defaults.baseURL = u;
  }

  /**
   * get
   * Fixed request to GET a single Cat, method exists for type assertion
   *
   * @param { string}  ID
   * @param {AxiosRequestConfig | undefined} config
   * @access public
   * @return Promise<R>
   */
  public get<T, R = AxiosResponse<T>>(
    ID: string,
    config: AxiosRequestConfig | undefined
  ): Promise<R> {
    console.log("GET", this.ax.defaults.baseURL + "cat/" + ID);
    return this.ax.get(this.ax.defaults.baseURL + "cat/" + ID, config);
  }

  /**
   * getAll
   * Fixed request to GET all the Cats, method exists for type assertion
   *
   * @param {AxiosRequestConfig | undefined} config
   * @access public
   * @return Promise<R>
   */
  public getAll<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig | undefined
  ): Promise<R> {
    console.log("getAll", this.ax.defaults.baseURL + "cat/all");
    return this.ax.get(this.ax.defaults.baseURL + "cat/all", config);
  }

  /**
   * post
   * Fixed request to POST the Cats, method exists for type assertion
   *
   * @param {<B>} data - Type set on Object creation
   * @param {AxiosRequestConfig | undefined} config
   * @access public
   * @return Promise<R>
   */
  public post<T, B, R = AxiosResponse<T>>(
    data: B,
    config: AxiosRequestConfig | undefined
  ): Promise<R> {
    console.log("POST", this.ax.defaults.baseURL + "cat/", data);
    const payload = new URLSearchParams();
    payload.append("data", "" + JSON.stringify(data));

    if (config) {
      return this.ax.post(
        this.ax.defaults.baseURL + "cat/",
        payload,
        config.headers
      );
    } else {
      return this.ax.post(
        this.ax.defaults.baseURL + "cat/",
        payload,
        this.ax.defaults.headers.common
      );
    }
  }

  /**
   * patch
   * Fixed request to PATCH the Cats, method exists for type assertion
   *
   * @param { string}  ID
   * @param {<B>} data - Type set on Object creation
   * @param {AxiosRequestConfig | undefined} config
   * @access public
   * @return Promise<R>
   */
  public patch<T, B, R = AxiosResponse<T>>(
    ID: string,
    data: B,
    config: AxiosRequestConfig | undefined
  ): Promise<R> {
    console.log("PATCH", this.ax.defaults.baseURL + "cat/" + ID, {
      data: data,
    });
    const payload = new URLSearchParams();
    payload.append("data", "" + JSON.stringify(data));

    if (config) {
      return this.ax.patch(
        this.ax.defaults.baseURL + "cat/" + ID,
        payload,
        config.headers
      );
    } else {
      return this.ax.patch(
        this.ax.defaults.baseURL + "cat/" + ID,
        payload,
        this.ax.defaults.headers.common
      );
    }
  }
}

/**
 * Function to access the object, and add casting/ typing
 */
export function UseTransport<T, B>(): Transport<T, B> {
  return new Transport_b1();
}
