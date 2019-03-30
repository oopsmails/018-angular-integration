import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { MsgData } from './../msg-data';

@Component({
  selector: 'app-msg-child3',
  template: `
  <p>
  msg-between working, child 3: <b>RECEIVING</b> through <b>@ViewChild in parent</b>
  <br>
  This is only for directly passing from child to parent, as @ViewChild component can only be used in parent.
  <br>
  Showing message as:
    <br>
    {{ jsonMsg }}
  </p>
  `
})
export class MsgChild3Component {
  msgSubscription: Subscription;
  msgData: MsgData;
  jsonMsg = '';

  onFileFormatSelected(msgData: { [key: string]: any | Array<any> }): void {
    console.log('msgData=', msgData);
    this.msgData = JSON.parse(JSON.stringify(msgData));
    this.jsonMsg = JSON.stringify(msgData);
  }

}
