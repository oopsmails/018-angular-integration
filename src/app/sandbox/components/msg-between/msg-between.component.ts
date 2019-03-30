import { Component, ViewChild } from '@angular/core';
import { MsgChild3Component } from '@app/sandbox/components/msg-between/msg-child/msg-child3.component';
import { FileFormats } from '@app/sandbox/services/file-download.service';

import { MsgBetweenService } from './msg-between.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-msg-between',
  template: `
  <h5>Click radio button below to see message <b>MULTICASTING</b> from MsgBetweenComponent to multiple components.</h5>
  <hr>
  msg-between working, <b>SENDINGS</b> through <b><i>Subject</i> in Service</b>
  <br>
  <br>
  <div *ngFor="let format of downloadFileFormats" class="radio">
    <label>
      <input ngModel type="radio" name="downloadformat" [value]="format" (change)="downFileFormatSelected(format)">
      {{ format }}
    </label>
  </div>

  <hr>
  <br>
  <app-msg-child3></app-msg-child3>
  `
})
export class MsgBetweenComponent {
  fileFormats: Array<string> = ['XLSX', 'PDF', 'DOCX', 'TXT'];
  downloadFileFormats: Array<string> = ['CSV'];

  @ViewChild(MsgChild3Component) msgChild3Component: MsgChild3Component;

  constructor(private msgBetweenService: MsgBetweenService) {
    this.downloadFileFormats = Object.keys(FileFormats);
  }

  downFileFormatSelected(fileFormatSelected: string) {
    const passingAroundData = { testNumber: 1, fileFormat: fileFormatSelected };
    this.msgBetweenService.raiseMessage(passingAroundData);
    this.msgChild3Component.onFileFormatSelected(passingAroundData);
  }
}
