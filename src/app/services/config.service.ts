//service that  load the configuration
import { Injectable } from "@angular/core";
import { Configuration } from "./config-model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ConfigService {
  private config: Configuration;
  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise(resolve => {
      this.http.get<Configuration>(url).subscribe(
        config => {
          this.config = config;
          // console.log("this.config" + this.config);
          resolve();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // console.log("Client-side error occured.");
          } else {
            //console.log("Server-side error occured.");
          }
        }
      );
    });
  }
  getConfiguration(): Configuration {
    return this.config;
  }
}
