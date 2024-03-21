import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAfficheComponent } from './detail-affiche.component';

describe('DetailAfficheComponent', () => {
  let component: DetailAfficheComponent;
  let fixture: ComponentFixture<DetailAfficheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAfficheComponent]
    });
    fixture = TestBed.createComponent(DetailAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
