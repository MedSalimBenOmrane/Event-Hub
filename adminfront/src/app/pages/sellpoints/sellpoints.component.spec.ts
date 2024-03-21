import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellpointsComponent } from './sellpoints.component';

describe('SellpointsComponent', () => {
  let component: SellpointsComponent;
  let fixture: ComponentFixture<SellpointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellpointsComponent]
    });
    fixture = TestBed.createComponent(SellpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
