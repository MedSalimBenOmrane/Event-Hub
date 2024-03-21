import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEventComponent } from './modif-event.component';

describe('ModifEventComponent', () => {
  let component: ModifEventComponent;
  let fixture: ComponentFixture<ModifEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifEventComponent]
    });
    fixture = TestBed.createComponent(ModifEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
