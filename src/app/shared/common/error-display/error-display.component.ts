import { Component, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent {

  title = 'Angular-Interceptor';
  // when ng build --prod
  // ERROR in : Can't resolve all parameters for
  // ErrorDisplayComponent in .... /error-display.component.ts: (?).
  // if using: constructor(public data: string) {}

  public data: string;
  // constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
  // constructor(data: string) {
  //   this.data = data;
  // }

  // constructor(public data: string) {}
}
