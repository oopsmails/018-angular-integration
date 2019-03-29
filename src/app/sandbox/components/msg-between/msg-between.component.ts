import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MsgBetweenService } from './msg-between.service';
import { MsgChild1Component } from './msg-child/msg-child1.component';
import { FileFormats } from '@app/sandbox/services/file-download.service';

@Component({
  selector: 'app-msg-between',
  template: `
  <div *ngFor="let format of downloadFileFormats" class="radio">
    <label>
      <input ngModel type="radio" name="downloadformat" [value]="format" (change)="downFileFormatSelected(format)">
      {{ format }}
    </label>
  </div>
  `
})
export class MsgBetweenComponent {
  fileFormats: Array<string> = ['XLSX', 'PDF', 'DOCX', 'TXT'];
  downloadFileFormats: Array<string> = ['CSV'];

  @ViewChild(MsgChild1Component) msgChildComponent: MsgChild1Component;

  constructor(private msgBetweenService: MsgBetweenService) {
    this.downloadFileFormats = Object.keys(FileFormats);
  }

  fileFormatSelected(fileFormatSelected: string) {
    this.msgChildComponent.onExport({ fileType: fileFormatSelected });
  }

  downFileFormatSelected(fileFormatSelected: string) {
    this.msgBetweenService.raiseMessage({ testNumber: 1, fileFormat: fileFormatSelected });
  }
}
