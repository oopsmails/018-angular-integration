import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MsgBetweenService } from '../msg-between.service';

@Component({
  selector: 'app-msg-child2',
  template: `
  <p>
  msg-between working, child 2: <b>RECEIVING</b> through <b><i>Subject</i> in Service</b>
  <br>
  Message broadcasting through Service.
  <br>
  Showing message as:
  <br>
    {{ jsonMsg }}
  </p>
  `
})
export class MsgChild2Component implements OnDestroy {
  msgSubscription: Subscription;
  jsonMsg = '';

  constructor(private msgBetweenService: MsgBetweenService) {
    this.msgSubscription = this.msgBetweenService.getMessage()
      .subscribe((passedInData: { [key: string]: any | Array<any> }) => {
        this.jsonMsg = JSON.stringify(passedInData);
        this.onExport(passedInData.msgData);
      });
  }

  onExport(msgData: { [key: string]: any | Array<any> }): void {
    console.log('jsonMsg=', this.jsonMsg);
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }
}
