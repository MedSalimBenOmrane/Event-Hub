import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/model/interfaces/event.interface';
import { Ticket } from '../../model/interfaces/ticket.interface';

@Component({
  selector: 'app-item-tickets',
  templateUrl: './item-tickets.component.html',
  styleUrls: ['./item-tickets.component.css']
})
export class ItemTicketsComponent implements OnInit {
  @Input() ticket!: Ticket;
  ngOnInit() {}
}
