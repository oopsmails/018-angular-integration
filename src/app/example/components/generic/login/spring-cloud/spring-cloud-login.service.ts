import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpringCloudLoginService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('demops:my_secret'),
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      // 'Content-type': 'application/json'
    }
    return this.http.post('/uaa' + '/oauth/token', loginPayload, { headers });
  }
}
