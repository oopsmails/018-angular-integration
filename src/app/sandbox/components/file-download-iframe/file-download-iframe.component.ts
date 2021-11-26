import { ApplicationRef, Component, Inject, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {DOCUMENT} from '@angular/common';

import { FileDownloadService, FileFormats } from './../../services/file-download.service';
import { MsgBetweenService } from './../msg-between/msg-between.service';

@Component({
  selector: 'app-file-download-iframe',
  templateUrl: './file-download-iframe.component.html'
})
export class FileDownloadIframeComponent implements OnDestroy {
  fileDownloadSubscription: Subscription;
  fileDownloadServiceUrl: SafeUrl;
  fileDownloadFormId = 'fileDownloadFormId';

  fileDownloadRequest = '';
  xConsumerName = '';

  fileFormats: Array<string> = ['XLSX', 'PDF', 'DOCX', 'TXT'];
  downloadFileFormats: Array<string> = ['CSV'];

  constructor(private msgBetweenService: MsgBetweenService,
    private fileDownloadService: FileDownloadService,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any,
    private appRef: ApplicationRef) {

    this.fileDownloadSubscription = this.msgBetweenService.getMessage().subscribe((eventData: { [key: string]: any | Array<any> }) => {
      this.onDownload(eventData);
    });
    this.fileDownloadServiceUrl = this.sanitizer.bypassSecurityTrustUrl(this.fileDownloadService.downloadUrl);
    this.xConsumerName = this.fileDownloadService.headerXConsumer;

    this.downloadFileFormats = Object.keys(FileFormats);
  }

  getHeaderXConsumer(fileDownloadData: { [key: string]: any | Array<any> }) { // only for unit test purpose
    return fileDownloadData.xConsumerName !== null && typeof fileDownloadData.xConsumerName !== 'undefined' ?
      fileDownloadData.xConsumerName : 'defaultConsumer';
  }

  onDownload(fileDownloadData: { [key: string]: any | Array<any> }): void {
    const downloadFormat = this.fileDownloadService.getDownloadFileFormat(fileDownloadData);
    const downloadUrl = this.fileDownloadService.getDownloadFileUrl(downloadFormat);
    this.fileDownloadServiceUrl = this.sanitizer.bypassSecurityTrustUrl(downloadUrl);
    this.fileDownloadRequest = JSON.stringify(fileDownloadData.fileDownloadRequest);
    this.appRef.tick();
    const form: HTMLFormElement = <HTMLFormElement>this.document.getElementById(this.fileDownloadFormId);
    form.submit();
  }

  ngOnDestroy(): void {
    this.fileDownloadSubscription.unsubscribe();
  }

  downFileFormatSelected(fileFormatSelected: string) {
    const passingAroundData = { testNumber: 1, fileFormat: fileFormatSelected };
    this.msgBetweenService.raiseMessage(passingAroundData);
  }
}

