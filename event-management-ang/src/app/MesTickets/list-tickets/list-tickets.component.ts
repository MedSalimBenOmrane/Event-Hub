import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/interfaces/event.interface';
import { TicketsService } from 'src/app/services/tickets.service';
import { Ticket } from '../../model/interfaces/ticket.interface';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent {
  tickets: Ticket[] = [];
  loading = true;
  error = null;
  
  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe((data) => {
      this.tickets = data;
      this.loading = false;
      this.error = null;
    },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }
}
