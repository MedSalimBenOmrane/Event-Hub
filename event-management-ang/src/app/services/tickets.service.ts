import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/interfaces/ticket.interface';

const link = "http://localhost:3000/ticket";

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(link + "/purchaser");
  }

  buyTicket(id: number): Observable<any> {
    return this.http.post(link + "/buy/" + id.toString(), {});
  }

  reserveTicket(id: number): Observable<any> {
    return this.http.post(link + "/reserve/" + id.toString(), {});
  }
}
