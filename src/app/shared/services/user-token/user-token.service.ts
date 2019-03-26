import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokens } from '@app/shared/model';
import { Observable } from 'rxjs';
import { OauthToken } from '@app/shared/model/oauthToken';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {
  private userTokensUrl = '/uaa/oauth/token';

  constructor(private httpClient: HttpClient) { }

  getUserToken(): Observable<OauthToken> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa('demops:my_secret')
    });

    const params = new URLSearchParams();
    params.append('username', 'user');
    params.append('password', 'password');
    params.append('grant_type', 'password');
    params.append('client_id', 'demops');

    return this.httpClient.post(this.userTokensUrl,
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
}
