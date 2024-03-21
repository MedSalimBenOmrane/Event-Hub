
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffichehomeComponent } from './affichehome.component';

describe('AffichehomeComponent', () => {
  let component: AffichehomeComponent;
  let fixture: ComponentFixture<AffichehomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffichehomeComponent]
    });
    fixture = TestBed.createComponent(AffichehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
