// model for the configuration data
export class Configuration {
  constructor(
    public webApiBaseUrl: string,
    public headerUrl: string,
    public footerUrl: string
  ) {}
}
