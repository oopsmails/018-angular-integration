
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DataProviderService } from '@app/sandbox/services/data-provider.service';

@Component({
  selector: 'live-data2',
  template: `Data(live-date2): {{ dataProvider.data }}`
})
export class LiveData2Component {

  @Input()
  set live(value) {
    if (value) {
      this.ref.reattach();
    } else {
      this.ref.detach();
    }
  }

  constructor(private ref: ChangeDetectorRef, private dataProvider: DataProviderService) { }
}
