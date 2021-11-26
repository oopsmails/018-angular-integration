import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileDownloadService, FileFormats } from '@app/sandbox/services/file-download.service';
import { WINDOW } from '@app/shared/services/window-provider.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Component({
  selector: 'file-download',
  templateUrl: './file-download.component.html'
})
export class FileDownloadComponent {
  // private txtUrl = '/backendmock/downloadFile/txt?filename=testTxt.txt'; // with proxy.conf.json
  // private pdfUrl = 'http://localhost:8080/backendmock/downloadFile/pdf?filename=testPdf.pdf';
  // private xlsxUrl = '/backendmock/downloadFile/xlsx?filename=testXlsx.xlsx';
  // private docxUrl = ' http://localhost:8080/backendmock/downloadFile/docx?filename=testDocx.docx';
  // private txtFileName = 'testTxt.txt';
  // private pdfFileName = 'testPdf.pdf';
  // private xlsxFileName = 'testXlsx.xlsx';
  // private docxFileName = 'testDocx.docx';

  exportFrameSrc: SafeResourceUrl;

  fileFormats: Array<string> = ['XLSX', 'PDF', 'DOCX', 'TXT'];

  constructor(
    private sanitizer: DomSanitizer,
    private fileDownloadService: FileDownloadService,
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: any) {
      this.exportFrameSrc = sanitizer.bypassSecurityTrustResourceUrl(this.fileDownloadService.getDownloadFileUrl('XLSX'));
    
      this.fileFormats = Object.keys(FileFormats);
    }

  exportFile() {
    this.getBlob(this.fileDownloadService.getDownloadFileUrl('XLSX')).subscribe(
      blob => {
        saveAs(blob, this.fileDownloadService.getDownloadFileName('XLSX'));
      },
      err => { }
    );
  }

  exportFromRadio(exportData: { [key: string]: any | Array<any> }): void {
    console.log('in exportFromRadio, exportData: ', exportData);
    const fileType = exportData.fileType;
    this.postRespBlob(this.fileDownloadService.getDownloadFileUrl(fileType)).subscribe(
      blob => {
        console.log('blob: ', blob);
        this.saveBlobToFile(blob, this.fileDownloadService.getDownloadFileName(fileType));
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  exportBlob(exportForm) {
    console.log('exportForm: ', exportForm);

    // this.httpClient
    //   .post(this.xlsxUrl, {
    //     responseType: 'blob'
    //   }).subscribe(blob => {
    //   saveAs(blob, this.xlsxFileName);
    // });

    const fileType = 'docx';
    this.postRespBlob(this.fileDownloadService.getDownloadFileUrl(fileType)).subscribe(
      blob => {
        console.log('blob: ', blob);
        this.saveBlobToFile(blob, this.fileDownloadService.getDownloadFileName(fileType));
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  postRespBlob(url: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Host', 'abc.com:4200');
    // headers.append('Access-Control-Allow-Origin', '*');
    return this.httpClient
      .post(url
        , {} // empty POST body
        , {
          responseType: 'blob'
        }
      );
  }

  getBlob(url: string): Observable<Blob> {
    return this.httpClient
      .get(url, {
        responseType: 'blob'
      });
  }

  saveBlobToFile(blob: Blob, fileName: string) {
    if (this.window.navigator && this.window.navigator.msSaveOrOpenBlob) {
      this.window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const a = document.createElement('a');
      a.href = this.window.URL.createObjectURL(blob);
      a.target = '_blank';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    }
  }

  fileFormatSelected(fileFormatSelected: string) {
    this.exportFromRadio({ fileType: fileFormatSelected });
  }

  // private getFileInfo(fileType: string): any {
  //   switch (fileType) {
  //     case 'xlsx': {
  //        return {
  //          fileName: this.xlsxFileName,
  //          fileUrl: this.xlsxUrl
  //        };
  //     }
  //     case 'docx': {
  //       return {
  //         fileName: this.docxFileName,
  //         fileUrl: this.docxUrl
  //       };
  //     }
  //     case 'pdf': {
  //       return {
  //         fileName: this.pdfFileName,
  //         fileUrl: this.pdfUrl
  //       };
  //     }
  //     case 'txt': {
  //       return {
  //         fileName: this.txtFileName,
  //         fileUrl: this.txtUrl
  //       };
  //     }
  //     default: {
  //       return {
  //         fileName: this.xlsxFileName,
  //         fileUrl: this.xlsxUrl
  //       };
  //     }
  //  }
  // }
}
