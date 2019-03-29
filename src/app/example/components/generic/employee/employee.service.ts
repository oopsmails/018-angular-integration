import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@app/example/model/employee';
import { OauthToken } from '@app/shared/model/oauthToken';
import { ClientType, UserTokenService } from '@app/shared/services/user-token/user-token.service';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private router: Router,
    private usertokenService: UserTokenService,
    private httpClient: HttpClient) { }

  // tslint:disable-next-line:max-line-length
  getUserToken(clientType: ClientType): Observable<OauthToken> { // can also return OauthToken | Observable<OauthToken> and use typeof in invoker
    if (!window.sessionStorage.getItem('token') || !JSON.parse(window.sessionStorage.getItem('token')).access_token) {
      return this.usertokenService.getUserToken(ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE);
    }
    const existingToken = JSON.parse(window.sessionStorage.getItem('token'));
    const existingTokenObservable = new Observable<OauthToken>((sub: Subscriber<OauthToken>) => {
      sub.next(existingToken);
      // sub.error({err: 'the token in session storage cannot parsed to OauthToken'}) //TODO: investigate more;
    });
    return existingTokenObservable;
  }

  getEmployeeList(resourceUrl): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token
    });
    console.log('getResource(), headers=', headers);
    return this.httpClient.get<Employee[]>(resourceUrl, { headers });
  }

}
