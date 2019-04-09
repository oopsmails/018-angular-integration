import { Component } from '@angular/core';

@Component({
  selector: 'svg-circle-loading',
  styleUrls: ['./loading-svg.scss'],
  template: `
    <svg class="svg-circle-loading-spinner" viewBox="0 0 52 52">
        <circle class="path" cx="26px" cy="26px" r="20px" fill="none" stroke="#2e2659" stroke-width="5px">
        </circle>
    </svg>
  `
})
export class LoadingSvgComponent {}

/**

stroke="#2e2659"

stroke-dasharray: 89, 200;


*/

