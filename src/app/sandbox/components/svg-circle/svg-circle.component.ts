import { Component, OnInit } from '@angular/core';

/**
  <div id="wrapper">
      <div class="profile-main-loader">
          <div class="loader">
            <svg class="circular-loader" viewBox="25 25 50 50" >
              <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
            </svg>
          </div>
      </div>
    </div>
 */

@Component({
  selector: 'app-svg-circle',
  template: `
            <svg class="circular-loader" viewBox="25 25 50 50" >
              <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
            </svg>
  `,
  styleUrls: ['./svg-circle.component.scss']
})
export class SvgCircleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
