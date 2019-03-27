import { Component, ViewChild } from '@angular/core';
import { MsgBetweenService } from '../msg-between/msg-between.service';
import { FileFormats, FileDownloadService } from '@app/sandbox/services/file-download.service';
import { MsgChildComponent } from '../msg-between/msg-child/msg-child.component';

@Component({
  selector: 'app-sandbox-home',
  templateUrl: './sandbox-home.component.html'
})
export class SandboxHomeComponent {
  // for data-live component
  live = true;
  live2 = true;


}
