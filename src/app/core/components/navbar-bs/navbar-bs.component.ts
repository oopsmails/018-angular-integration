import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-bs',
  templateUrl: './navbar-bs.component.html',
  styleUrls: ['./navbar-bs.component.scss']
})
export class NavbarBsComponent implements OnInit {

  collapsed = true;
  includeSandbox = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
