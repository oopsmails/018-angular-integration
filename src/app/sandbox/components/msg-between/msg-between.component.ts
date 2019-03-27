import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MsgBetweenService } from './msg-between.service';
import { MsgChildComponent } from './msg-child/msg-child.component';
import { FileFormats } from '@app/sandbox/services/file-download.service';

@Component({
  selector: 'app-msg-between',
  templateUrl: './msg-between.component.html'
})
export class MsgBetweenComponent {
  fileFormats: Array<string> = ['XLSX', 'PDF', 'DOCX', 'TXT'];
  downloadFileFormats: Array<string> = ['CSV'];

  @ViewChild(MsgChildComponent) msgChildComponent: MsgChildComponent;

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
