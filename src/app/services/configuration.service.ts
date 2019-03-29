import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@app/model/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private readonly configUrlPath: string = 'assets/data/app-configuration.json';
  private configuration: Configuration;
  private oauthTokenUrl: string;

  constructor(private httpClient: HttpClient) { }

  loadConfigurationData(): Promise<Configuration> {
    const response = this.httpClient.get<Configuration>(`${this.configUrlPath}`)
      .toPromise()
      .then(res => {
        console.log('Response from ConfigurationService: ', res);
        this.configuration = res;
        this.oauthTokenUrl = res['springCloudAllOauthTokenUrl'];
        return res;
      });

    return response;
  }

  get config(): Configuration {
    return this.configuration;
  }
}
