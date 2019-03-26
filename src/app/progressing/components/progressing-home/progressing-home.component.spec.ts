import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressingHomeComponent } from './progressing-home.component';

describe('ProgressingHomeComponent', () => {
  let component: ProgressingHomeComponent;
  let fixture: ComponentFixture<ProgressingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
