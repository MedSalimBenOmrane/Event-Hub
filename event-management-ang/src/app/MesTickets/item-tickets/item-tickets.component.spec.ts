import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTicketsComponent } from './item-tickets.component';

describe('ItemTicketsComponent', () => {
  let component: ItemTicketsComponent;
  let fixture: ComponentFixture<ItemTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemTicketsComponent]
    });
    fixture = TestBed.createComponent(ItemTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
