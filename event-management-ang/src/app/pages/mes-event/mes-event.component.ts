import { MesEventService } from '../../services/mes-event.service';
import { Event } from '../../model/interfaces/event.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-event',
  templateUrl: './mes-event.component.html',
  styleUrls: ['./mes-event.component.css']
}
)

export class MesEventComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error = null;

  constructor(
    private mesEventService: MesEventService
  ) { }

  ngOnInit(): void {
    this.mesEventService.getEvents().subscribe((data) => {
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
