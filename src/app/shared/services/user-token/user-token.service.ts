import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OauthToken } from '@app/shared/model/oauthToken';
import { Observable } from 'rxjs';
import { ConfigurationService } from '@app/services/configuration.service';
import { Configuration } from '@app/model/configuration';

export enum ClientType {
  SPRING_CLOUND_EMPLOYEE_SERVICE = 'SPRING_CLOUND_EMPLOYEE_SERVICE',
  SPRING_CLOUND_DEPARTMENT_SERVICE = 'SPRING_CLOUND_DEPARTMENT_SERVICE'
}


@Injectable({
  providedIn: 'root'
})
export class UserTokenService {
  private configuration: Configuration;

  constructor(
    private configurationService: ConfigurationService,
    private httpClient: HttpClient) {
      this.configuration = configurationService.config;
    }

  getUserTokenSpringCloundAll(): Observable<OauthToken> {
    return this.getUserToken(ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE);
  }

  getUserToken(clientType: ClientType): Observable<OauthToken> {
    const headers = this.getAuthHeaders(clientType);
    const params = this.getAuthParams(clientType);

    return this.httpClient.post<OauthToken>(this.getAuthUrl(clientType),
      params.toString(),
      { headers });

    // following is NOT working!
    // const params2 = new URLSearchParams();
    // params2.append('grant_type', 'password');
    // return this.httpClient.post(this.userTokensUrl,
    //   params2.toString(),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       Accept: 'application/json',
    //       Authorization: 'Basic ' + btoa('demops:my_secret'),
    //       grant_type: 'password',
    //       username: 'user',
    //       password: 'password'
    //     }
    //   });
  }

  private getAuthHeaders(clientType: ClientType): HttpHeaders {
    let headers = new HttpHeaders();

    if (ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE === clientType) {
      headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('demops:my_secret')
      });
      return headers;
    }
  }

  private getAuthParams(clientType: ClientType): URLSearchParams {
    const params = new URLSearchParams();

    if (ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE === clientType) {
      params.append('username', 'user');
      params.append('password', 'password');
      params.append('grant_type', 'password');
      params.append('client_id', 'demops');
      return params;
    }
  }

  private getAuthUrl(clientType: ClientType): string {
    if (ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE === clientType) {
      return this.configuration.springCloudAllOauthTokenUrl; // '/uaa/oauth/token';
    }

    return '';
  }
}
