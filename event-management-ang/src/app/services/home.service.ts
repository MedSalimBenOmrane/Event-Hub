import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/interfaces/event.interface';

const link = "http://localhost:3000/event/";
@Injectable({
  providedIn: 'root'
})

export class HomeService {
  constructor(
    private http: HttpClient
  ) { }

  getConfirmedEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(link + "confirmed");
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(link + id.toString())
  }
}
