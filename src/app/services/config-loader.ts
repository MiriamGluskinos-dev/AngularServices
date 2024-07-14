import { ConfigService } from "./config.service";
import { environment } from "../../environments/environment";

export function ConfigLoader(configService: ConfigService) {
  //Note: this factory need to return a function (that return a promise)
  //console.log(environment.configFile);
  return () => configService.load(environment.configFile);
}
