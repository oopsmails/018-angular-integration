import { MsgBetweenService } from './../msg-between/msg-between.service';
import { FileDownloadService } from './../../services/file-download.service';
import { FileDownloadIframeComponent } from './file-download-iframe.component';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';


fdescribe('FileDownloadIframeComponent', () => {
  const downloadUrl = '/backend/download?';
  const fileDownloadRequest = { fileDownloadRequest: 'exportRequest' };
  const eventDataMock: { [key: string]: any | Array<any> } = {
    fileDownloadRequest: fileDownloadRequest,
    fileFormat: 'ABC',
    xConsumerName: 'XYZ'
  };

  let component: FileDownloadIframeComponent;

  beforeAll((): void => {

    // another way to create SpyObj
    // const fileDownloadService: FileDownloadService = jasmine.createSpyObj('FileDownloadService', ['getDownloadFileUrl']);
    // fileDownloadService.getDownloadFileUrl = (fileType: string): string => {
    //   if ('XLSX' === fileType) {
    //     return downloadUrl;
    //   }

    //   if ('DOCX' === fileType) {
    //     return downloadUrl + 'asfd';
    //   }

    //   return '';
    // };

    const fileDownloadService: FileDownloadService = <FileDownloadService>{
      getDownloadFileUrl(fileType: string): string { return downloadUrl; },
      getDownloadFileFormat(exportData: { [key: string]: any | Array<any> }): string { return 'aaa'; }
    };
    const msgBetweenService: MsgBetweenService = <MsgBetweenService>{
      raiseMessage(msgData: { [key: string]: any | Array<any> }): void { },
      getMessage(): Observable<{ [key: string]: any | Array<any> }> {
        const exportEventSubject: Subject<{ [key: string]: any | Array<any> }> = new Subject();
        exportEventSubject.next(eventDataMock);
        return exportEventSubject.asObservable();
      }
    };
    const sanitizer: DomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);
    const appRef: ApplicationRef = jasmine.createSpyObj('ApplicationRef', ['tick']);

    component = new FileDownloadIframeComponent(msgBetweenService, fileDownloadService, sanitizer, document, appRef);
    component.fileDownloadFormId = 'fileDownloadFormId';
  });

  describe('getHeaderXConsumer', (): void => {
    it('should return default if passed in data as empty.', () => {
      const fileFormat: string = component.getHeaderXConsumer({});
      expect(fileFormat).toEqual('defaultConsumer');
    });

    it('should return xconsumer passed in.', () => {
      const fileFormat: string = component.getHeaderXConsumer(eventDataMock);
      expect(fileFormat).toEqual('XYZ');
    });
  });

  describe('onDownload', (): void => {
    let formElement: HTMLFormElement;
    beforeEach((): void => {
      formElement = document.createElement('form');
      document.getElementById = jasmine.createSpy('form element spy').and.returnValue(formElement);
      spyOn(document.getElementById('theform') as HTMLFormElement, 'submit');
    });

    it('should call form.submit and component fields should be set.', () => {
      component.onDownload(eventDataMock);
      expect(document.getElementById).toHaveBeenCalled();
      expect(formElement.submit).toHaveBeenCalled();
      expect(component.fileDownloadRequest).toEqual(JSON.stringify(fileDownloadRequest));
    });
  });
});
