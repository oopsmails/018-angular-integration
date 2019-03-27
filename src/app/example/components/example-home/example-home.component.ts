import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-home',
  templateUrl: './example-home.component.html'
})
export class ExampleHomeComponent implements OnInit {
  title = 'app';
  post = {
    title: 'Title',
    isFavorite: true
  };

  pageNumber: number;
  itemCount: number;
  itemsPerPage: number;
  numberOfPageCombine: number;
  backgroundType: string;
  hiddenArrows: boolean;
  disableNavigation: boolean;

  ngOnInit(): void {
    this.pageNumber = 0;
    this.itemCount = 55;
    this.itemsPerPage = 5;
    this.numberOfPageCombine = 1; // multiple pages combined
    this.backgroundType = 'light';
    this.hiddenArrows = false;
    this.disableNavigation = false;
  }

  stepClick(e) {
    console.log('stepClick: ', e);
  }


}
