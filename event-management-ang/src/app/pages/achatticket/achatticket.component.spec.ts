import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatticketComponent } from './achatticket.component';

describe('AchatticketComponent', () => {
  let component: AchatticketComponent;
  let fixture: ComponentFixture<AchatticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AchatticketComponent]
    });
    fixture = TestBed.createComponent(AchatticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
