import { Component, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent {

  title = 'Angular-Interceptor';
  // constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
  constructor(public data: string) {}
}
