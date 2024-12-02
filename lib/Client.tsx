import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders, AxiosResponse, HeadersDefaults, AxiosHeaderValue, RawAxiosResponseHeaders } from "axios";
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

export interface requests extends Client {}

class Client {
    private timeout: number = 10000; //ms
    private instance: AxiosInstance | null | AxiosCacheInstance = null; 
    private controller: AbortController = new AbortController();
    private config: AxiosRequestConfig | null = null;
    private headers: AxiosHeaders | Record<string, any> = new AxiosHeaders();
    private baseUrl: string;
    private delay: number = 500; //ms default throttle delay time
    private limit: number = 15; //number of requests to be allowed concurrently

    constructor(config: AxiosRequestConfig, auth: string | null = null, throttle: boolean = false, cache: boolean = false, baseUrl: string = '' ) {
        // Setting baseUrl with each request as on nginx reverse proxy - not working properly need to fix
        this.baseUrl = baseUrl;
        // https://localhost:3000/ - baseURL -> request url

        this.timeout = config.timeout ? config.timeout : this.timeout; //if provided a timeout value then use the user provided other wise roll back to default
        auth != null ? this.setAuth(auth) : null;

        this.config = {
            ...config, //config provided at the time of initiation
            signal: this.controller.signal,
            timeout: this.timeout,
            headers: auth == null ? {} : this.headers
        }

        this.instance = (this.instance === null) ? (cache ? setupCache(axios.create(this.config)) : axios.create(this.config)) : this.instance; //singleton instance to be used
        if(throttle) {
            this.instance?.interceptors.request.use(this.throttleRequest);
        }
        this.instance.interceptors.request.use((req) => {
            if(this.limit > 0) {
                this.limit -= 1;
                // console.log(`#${15-this.limit} api request initiated`);
                return req;
            }
            this.abort();
            return Promise.reject(req);
        })
        this.instance.interceptors.response.use((res: any) => {
            // unsafe code need to see which type suits best
            this.limit += 1;
            // console.log(this.limit);
            return res;
        })
    }

    public setHeaders(hd: AxiosHeaderValue | AxiosHeaders | Record<any, any> | RawAxiosResponseHeaders): requests {    
        this.headers.set(hd);
        return this;
    }

    protected setAuth(bearer: string) {
        this.headers.setAuthorization(bearer);
        return this;
    }

    public async get<T = any>(endpoint: string, params?: object): Promise<T> {
        try {
            let dt = params !== undefined ?this.urlEncoded(params):null; //need to fix this logic
            // console.log(dt)
            if(dt !== null) {
                const result: AxiosResponse | undefined = await this.instance?.get(this.baseUrl+endpoint, {
                    params: params,
                    headers: this.headers
                });
                return result?.data;
            } 

            const result: AxiosResponse | undefined = await this.instance?.get(this.baseUrl+endpoint, {
                params: dt,
                headers: this.headers,
            });
            return result?.data;
        } catch(er: any) {
            this.handleError(er);
        }
    }

    public async post<T = any>(endpoint: string, data?:any): Promise<T> {
        try {
            const result: AxiosResponse | undefined = await this.instance?.post(this.baseUrl+endpoint, data, {
                headers: this.headers
            });
            return result?.data;
        } catch (er: any) {
            this.handleError(er);
        }
    }

    public async put(endpoint: string, data?: any, params?: object): Promise<any> {
        try {
            const result: AxiosResponse | undefined = await this.instance?.put(this.baseUrl+endpoint, data, {
                params: params,
                headers: this.headers
            });
            return result?.data;
        } catch (er: any) {
            this.handleError(er);
        }
    }

    public async delete(endpoint: string, data?:any): Promise<any> {
        try {
            const result: AxiosResponse | undefined = await this.instance?.delete(this.baseUrl+endpoint, {
                params: data,
                headers: this.headers
            });
            return result?.data;
        } catch (er: any) {
            this.handleError(er);
        }
    }

    public async formData(endpoint: string, formdata: any): Promise<any> {
        try {
            const result: AxiosResponse | undefined = await this.instance?.post(this.baseUrl+endpoint, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...this.headers
                }
            });
            return result?.data;
        } catch (er: any) {
            this.handleError(er);
        }
    }

    public urlEncoded(dt: object): URLSearchParams {
        const params: URLSearchParams = new URLSearchParams();
        for(let [itm, value] of Object.entries(dt)) {
            params.append(itm, value);
        }
        return params;
    }

    public abort(): void {
        this.controller.abort();
    }

    private handleError(error: any): never {
        if(!error.response) {
            throw new Error(error.message);
        } else if(error.response.status === 401) {
            throw new Error(error.response.data);
        } else if(error.response.status === 403) {
            throw new Error(error.response.data);
            // 404 NotFoundError() -> {status: 404, msg: "Entity not found"}
        } else {
            throw error;
        }
    }

    private async throttleRequest(response: any) {
        await this.sleep(this.delay);
        return response;
    }

    private sleep(tm: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, tm);
        });
    }
}

export default Client;
