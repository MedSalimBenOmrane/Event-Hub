import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/interfaces/event.interface';

const link = "http://localhost:3000/event";
@Injectable({
  providedIn: 'root'
})

export class MesEventService {

  constructor(private http: HttpClient) {}

  createEvent(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(link, event);
  }

  updateEvent(id:number,event: Partial<Event>): Observable<Event> {
    return this.http.patch<Event>(link+'/'+id.toString(), event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(link + "/myEvents");
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(link +'/'+ id.toString());
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(link +'/'+ id.toString());
  }
}
