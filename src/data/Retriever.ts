import { XhrPool } from './xhr';
import '../Env';

export class Retriever 
{
    private xhr: XhrPool;
    //private session: string;

    constructor() {
        this.xhr = new XhrPool();
    }

    public abortAll() {
        this.xhr.abortAll();
    }

    public setSession(session: string) {
        //this.session = session;
    }

    public GetSingle(component: string): JQueryPromise<any> {
        return this.sendGet(process.env.ServerURL + "api/sensors/" + component, []);
    }

    public getData(data: any): JQueryPromise<any> {
        return this.sendGet('api/data', data);
    }

    public logged(): JQueryPromise<any> {
        return this.sendGet('web/logged', null);
    }

    public login(data: any): JQueryPromise<any> {
        return this.sendPost('web/login', data);
    }

    public register(data: any): JQueryPromise<any> {
        return this.sendPost('api/data', data);
    }

    public stateChange(data: IDeviceStateChange): JQueryPromise<any> {
        return this.sendPost('api/action', data);
    }

    public statsRefresh(data: IStatsRefresh): JQueryPromise<any> {
        return this.sendGet('api/stats', data);
    }

    private sendGet(url:string, data:any): JQueryPromise<any> {
        return this.sendRequest("GET", url, 'data=' + JSON.stringify(data));
    }
    
    private sendPost(url: string, data: any): JQueryPromise<any> {
        return this.sendRequest("POST", url, JSON.stringify(data));
    }

    private sendRequest(type: string, url: string, data: any): JQueryPromise<any> {
        return this.xhr.pushXhr($.ajax({
            type: type,
            url: process.env.ServerURL + url,
            data: data,
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        }).done(() => {
        //    console.log('done');
        }).fail(() => {
        //    console.log('fails');
        }).always(() => {
        //    console.log('always');
        }));
    }
}

export interface IDeviceStateChange {
    type?: string;
    sensor: string;
    cmd: number;
    value?: number;
}

export interface IStatsRefresh {
    guid: any;
    stats: any;
    period: number;
}