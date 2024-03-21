import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/http';

interface LoginResponse {
  error?: string;
  message?: string;
  access_token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  authenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated())

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(BACKEND_URL + '/auth/admin/login', { email, password })
  }

  logout() {
    localStorage.removeItem('token')
    this.authenticated.next(false)
  }

  isAuthenticated() {
    console.log("isAuthenticated", !!localStorage.getItem('token'));
    return !!localStorage.getItem('token')
  }

  updateToken(token: string) {
    localStorage.setItem('token', token)
    this.authenticated.next(this.isAuthenticated())
  }
}
