import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { Event } from '../../model/interfaces/event.interface';

@Component({
  selector: 'app-affichehome',
  templateUrl: './affichehome.component.html',
  styleUrls: ['./affichehome.component.css']
})
export class AffichehomeComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error = null;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getConfirmedEvents().subscribe(
      (data) => {
        this.events = data;
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
