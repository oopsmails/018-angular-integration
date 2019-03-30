import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-msg-between-demo',
  templateUrl: './msg-between-demo.component.html'
})
export class MsgBetweenDemoComponent {
  postDataArr = [];

  onAddPost(postData){
    console.log(postData.length);
    this.postDataArr.push(postData);
  }
}
