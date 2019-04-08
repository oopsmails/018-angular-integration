import { LoadingSvgComponent } from './components/svg-circle/loading-svg.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveDataComponent } from '@app/sandbox/components/change-detector/live-data/live-data.component';
import { LiveData2Component } from '@app/sandbox/components/change-detector/live-data/live-data2.component';
import {
  MsgBetweenComponent,
  MsgBetweenDemoComponent,
  MsgBetweenService,
  MsgChild1Component,
  MsgChild2Component,
  MsgChild3Component,
  MsgChild4Component,
  MsgChild5Component,
} from '@app/sandbox/components/msg-between';
import { SandboxHomeComponent } from '@app/sandbox/components/sandbox-home/sandbox-home.component';
import { SharedModule } from '@app/shared/shared.module';
import { FileDownloadComponent } from './components/file-download/file-download.component';
import { FileDownloadIframeComponent } from './components/file-download-iframe/file-download-iframe.component';
import { SvgCircleComponent } from './components/svg-circle/svg-circle.component';


const routes: Routes = [
  { path: 'sandbox/home', component: SandboxHomeComponent },
  { path: 'sandbox/livedata', component: LiveDataComponent },
  { path: 'sandbox/svgcircleok', component: SvgCircleComponent },
  { path: 'sandbox/svgcircle', component: LoadingSvgComponent },
  { path: 'sandbox/msgbtw', component: MsgBetweenDemoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SandboxHomeComponent,
    LiveDataComponent,
    LiveData2Component,
    MsgBetweenDemoComponent,
    MsgBetweenComponent,
    MsgChild1Component,
    MsgChild2Component,
    MsgChild3Component,
    MsgChild4Component,
    MsgChild5Component,
    FileDownloadComponent,
    FileDownloadIframeComponent,
    SvgCircleComponent,
    LoadingSvgComponent
  ],
  providers: [
    MsgBetweenService
  ]
})
export class SandboxModule { }
