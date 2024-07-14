import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { ConfigService } from "./config.service";

import * as _ from "lodash";

@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  get<T>(
    url: string,
    baseUrl: string = this.configService.getConfiguration().webApiBaseUrl,
    params: HttpParams = new HttpParams()
  ) {
    if (baseUrl == "")
      baseUrl = this.configService.getConfiguration().webApiBaseUrl;

    return this.httpClient.get<T>(`${baseUrl}${url}`, { params: params });
  }

  post<T>(url: string, data: any) {
    return this.httpClient.post<T>(
      `${this.configService.getConfiguration().webApiBaseUrl}${url}`,
      data
    );
  }
}
