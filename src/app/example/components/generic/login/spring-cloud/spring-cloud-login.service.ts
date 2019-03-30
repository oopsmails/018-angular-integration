import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenService, ClientType } from '@app/shared/services/user-token/user-token.service';
import { Observable, Subscriber } from 'rxjs';
import { OauthToken } from '@app/shared/model/oauthToken';
import { SpringCloudLoginFormData } from '@app/shared/model/spring-cloud-login-form-data';

@Injectable({
  providedIn: 'root'
})
export class SpringCloudLoginService {

  constructor(
    private usertokenService: UserTokenService,
    private http: HttpClient
  ) { }

  // following is working version 0
  // login(loginPayload) {
  //   const headers = {
  //     'Authorization': 'Basic ' + btoa('demops:my_secret'),
  //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  //     // 'Content-type': 'application/json'
  //   }
  //   return this.http.post('/uaa' + '/oauth/token', loginPayload, { headers });
  // }

  // tslint:disable-next-line:max-line-length
  getUserToken(loginPayload: SpringCloudLoginFormData, clientType: ClientType): Observable<OauthToken> { // can also return OauthToken | Observable<OauthToken> and use typeof in invoker
    if (!window.sessionStorage.getItem('token') || !JSON.parse(window.sessionStorage.getItem('token')).access_token) {
      return this.usertokenService.getUserTokenByFormData(loginPayload, ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE);
    }
    const existingToken = JSON.parse(window.sessionStorage.getItem('token'));
    const existingTokenObservable = new Observable<OauthToken>((sub: Subscriber<OauthToken>) => {
      sub.next(existingToken);
      // sub.error({err: 'the token in session storage cannot parsed to OauthToken'}) //TODO: investigate more;
    });
    return existingTokenObservable;
  }
}
