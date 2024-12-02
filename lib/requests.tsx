import { AxiosHeaders } from "axios";
import Client, { type requests } from "./Client";

const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
});

// console.log("Checking if loading env vars properly! ", process.env.BASE_URL+process.env.API_LOCAL_ADMIN);

const requests: requests = new Client({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 0,
    headers: headers
}, null, false, true);

// export type requestInitiator = <T>(token: string, apiClient: requests, callback: T | null) => void | T;

// http://deliuseapis.awaitsoftwares.com/admin/api
export default requests;
