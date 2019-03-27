import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { LiveDataComponent } from './components/change-detector/live-data/live-data.component';
import { LiveData2Component } from './components/change-detector/live-data/live-data2.component';
import { MsgBetweenComponent } from './components/msg-between/msg-between.component';
import { MsgBetweenService } from './components/msg-between/msg-between.service';
import { SandboxHomeComponent } from './components/sandbox-home/sandbox-home.component';
import { MsgChildComponent } from './components/msg-between/msg-child/msg-child.component';

const routes: Routes = [
  { path: 'sandbox/home', component: SandboxHomeComponent },
  { path: 'sandbox/livedata', component: LiveDataComponent }
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
    MsgBetweenComponent,
    MsgChildComponent
  ],
  providers: [
    MsgBetweenService
  ]
})
export class SandboxModule { }
