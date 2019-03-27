import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class MsgBetweenService {
  private msgSubject: Subject<{ [key: string]: any | Array<any> }> = new Subject();
  constructor() { }

  raiseMessage(msgData: { [key: string]: any | Array<any> }): void {
    this.msgSubject.next(msgData);
  }

  getMessage(): Observable<{ [key: string]: any | Array<any> }> {
    return this.msgSubject.asObservable();
  }

}
