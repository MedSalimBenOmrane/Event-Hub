import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  private isLoginActiveSubject = new BehaviorSubject<boolean>(false);
  isLoginActive$ = this.isLoginActiveSubject.asObservable();

  toggleLogin() {
    this.isLoginActiveSubject.next(!this.isLoginActiveSubject.value);
  }
}