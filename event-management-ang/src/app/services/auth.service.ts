import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Participant } from '../model/interfaces/participant.interface';

const link = "http://localhost:3000/auth";
interface LoginResponse {
  error?: string;
  message?: string;
  access_token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  authenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated())

  signUp(participantData: Partial<Participant>) {
    return this.http.post<Participant>(link + '/signup', participantData);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(link + '/user/login', { email, password })
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticated.next(false);
  }

  isAuthenticated() {
    console.log("isAuthenticated", !!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
    this.authenticated.next(this.isAuthenticated());
  }
}
