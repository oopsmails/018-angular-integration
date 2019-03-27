import { Injectable } from '@angular/core';

export enum FileFormats {
  XLSX = 'xlsx',
  PDF = 'pdf',
  DOCX = 'docx',
  TXT = 'txt'
}

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  private txtUrl = '/backendmock/downloadFile/txt?filename=testTxt.txt'; // with proxy.conf.json
  private pdfUrl = '/backendmock/downloadFile/pdf?filename=testPdf.pdf';
  private xlsxUrl = '/backendmock/downloadFile/xlsx?filename=testXlsx.xlsx';
  private docxUrl = ' /backendmock/downloadFile/docx?filename=testDocx.docx';
  private txtFileName = 'testTxt.txt';
  private pdfFileName = 'testPdf.pdf';
  private xlsxFileName = 'testXlsx.xlsx';
  private docxFileName = 'testDocx.docx';

  constructor() { }

  get downloadUrl(): string {
    return 'http://localhost:18080/backendmock/downloadFile/pdf?filename=testPdf.pdf'; // without proxy.conf.json
  }

  get headerXConsumer(): string {
    return 'x-oopsmails-consumer';
  }

  getDownloadFileFormat(exportData: { [key: string]: any | Array<any> }): string {
    console.log('FileDownloadService, getDownloadFileFormat, passed in exportData: ', exportData);
    return exportData.fileFormat !== null && typeof exportData.fileFormat !== 'undefined' ?
      exportData.fileFormat : (FileFormats.XLSX as string);
  }

  getDownloadFileUrl(fileType: string) {
    console.log('fileType: ', fileType);
    return this.getFileInfo(fileType).fileUrl;
  }

  getDownloadFileName(fileType: string) {
    return this.getFileInfo(fileType).fileName;
  }

  private getFileInfo(fileType: string): { [key: string]: any | Array<any> } {
    switch (fileType) {
      case 'XLSX': {
        return {
          fileName: this.xlsxFileName,
          fileUrl: this.xlsxUrl
        };
      }
      case 'DOCX': {
        return {
          fileName: this.docxFileName,
          fileUrl: this.docxUrl
        };
      }
      case 'PDF': {
        return {
          fileName: this.pdfFileName,
          fileUrl: this.pdfUrl
        };
      }
      case 'TXT': {
        return {
          fileName: this.txtFileName,
          fileUrl: this.txtUrl
        };
      }
      default: {
        return {
          fileName: this.xlsxFileName,
          fileUrl: this.xlsxUrl
        };
      }
    }
  }
}
