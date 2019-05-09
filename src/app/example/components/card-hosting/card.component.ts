import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Card } from './card-hosting.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="card card-block"
          appCardhover
          [mouseOverColor]="true"
          [elementChanging]="this.elementChanging">
      <h4 class="card-title">{{ card.title }}</h4>
      <p class="card-text"
        [style.display]="'none'">{{ card.text }}</p>
    </div>
  `
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() card: Card;

  private sub: Subscription;
  elementChanging: boolean;

  ngOnInit(): void {
      this.sub = interval(2000)
      .subscribe((val) => {
          // console.log('called');
          this.elementChanging = !this.elementChanging;
      });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
