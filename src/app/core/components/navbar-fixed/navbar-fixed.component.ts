import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-fixed',
  templateUrl: './navbar-fixed.component.html',
  styleUrls: ['./navbar-fixed.component.scss']
})
export class NavbarFixedComponent implements OnInit {

  collapsed = true;
  includeSandbox = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
