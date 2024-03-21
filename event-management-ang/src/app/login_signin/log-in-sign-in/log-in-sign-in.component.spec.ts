import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInSignInComponent } from './log-in-sign-in.component';

describe('LogInSignInComponent', () => {
  let component: LogInSignInComponent;
  let fixture: ComponentFixture<LogInSignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInSignInComponent]
    });
    fixture = TestBed.createComponent(LogInSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
