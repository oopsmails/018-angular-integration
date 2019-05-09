import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { DataProviderService } from '@app/sandbox/services/data-provider.service';

@Component({
  selector: 'live-data',
  template: `
  {{ this.dataProvider.data }}
  `
})
export class LiveDataComponent implements OnInit, OnChanges {
  @Input() live: boolean;

  constructor(private ref: ChangeDetectorRef, public dataProvider: DataProviderService) { }

  ngOnInit(): void {
    console.log('ngOnInit: ', this.live);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges: ', changes);
    if (this.live) {
      console.log('ngOnChanges: ', this.live);
      this.ref.reattach();
    } else {
      console.log('ngOnChanges: ', this.live);
      this.ref.detach();
    }
  }

}
