import { Component, Input, OnInit } from '@angular/core';

import { MsgBetweenService } from './../msg-between.service';

@Component({
  selector: 'app-msg-child5',
  template: `
  msg-between working, child 5: <b>RECEIVING</b> through <b>@Input in parent</b>
  <br>
  This is only for directly passing from one to another, as @Input component can only be used in parent.
  <br>
  <div *ngFor = "let post of listPost;"> 
    <span class="d-block p-2 bg-dark text-white margin10px comment">{{post}}</span> 
  </div>
  <hr>
  <br>
  msg-between working, child 5: <b>RECEIVING</b> through <b>EventEmitter in Service</b>
  <div *ngFor = "let post of postsFromService;"> 
    <span class="d-block p-2 bg-dark text-white margin10px comment">{{post}}</span> 
  </div>
  `
})
export class MsgChild5Component implements OnInit {

  // Receiving through @Input()
  @Input() listPost = [];

  postsFromService = [];

  constructor(private msgBetweenService: MsgBetweenService) {
  }

  ngOnInit() {
    // Receiving EventEmitter in Service
    this.msgBetweenService.chatMessageAdded.subscribe((data) => {
      this.postsFromService.push(data);
    });
  }
}
