import { Component, OnInit, Input } from '@angular/core';

export class Card {
  public title: string;
  public text: string;
  public hide: boolean;

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'app-card-hosting',
  template: `
    <app-card *ngFor="let card of cards" [card]="card"></app-card>
  `
})
export class CardHostingComponent implements OnInit {

  @Input() cards: Card[];

  constructor() { }

  ngOnInit() {
  }

}
