import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  data = 1;

  constructor() {
    setInterval(() => {
      this.data = this.data + 1;
    }, 1000);
  }
}
