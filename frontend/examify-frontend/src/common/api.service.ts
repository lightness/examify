import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";


@Injectable()
export class ApiService {
    public readonly url: string = "/api/v1";

    constructor(private http: HttpClient) {
    }

    public get<T>(path: string, query?: Object): Observable<T> {
        return this.http.get<T>(this.buildUrl(path, query));
    }

    public post<T>(path: string, body?: Object, query?: Object): Observable<T> {
        return this.http.post<T>(this.buildUrl(path, query), body);
    }

    public put<T>(path: string, body?: Object, query?: Object): Observable<T> {
        return this.http.put<T>(this.buildUrl(path, query), body);
    }

    public delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(this.buildUrl(path));
    }

    public buildUrl(path: string, query?: Object): string {
        let url = `${this.url}${path}`;

        if (query != null) {
            url += "?" + this.buildQueryParameter(query);
        }

        return url;
    }

    public buildQueryParameter(obj: Object, prefix?: string): string {
        let params = [];

        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                let k = prefix ? prefix + "[]" : p;
                let v = obj[p];
                params.push(typeof v == "object" ?
                    this.buildQueryParameter(v, k) :
                    `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
            }
        }

        return params.join("&");
    }
}