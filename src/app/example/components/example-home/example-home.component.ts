import { Card } from './../card-hosting/card-hosting.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-home',
  templateUrl: './example-home.component.html',
  styleUrls: ['./example-home.component.scss']
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

  cards: Array<Card> = new Array();

  ngOnInit(): void {
    this.pageNumber = 0;
    this.itemCount = 55;
    this.itemsPerPage = 5;
    this.numberOfPageCombine = 1; // multiple pages combined
    this.backgroundType = 'light';
    this.hiddenArrows = false;
    this.disableNavigation = false;

    this.cards = [
      new Card('What did the cheese say when it looked in the mirror?', 'Hello-me (Halloumi)'),
      new Card('What kind of cheese do you use to disguise a small horse?', 'Mask-a-pony (Mascarpone)'),
      new Card('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’'),
    ];
  }

  stepClick(e) {
    console.log('stepClick: ', e);
  }


}
