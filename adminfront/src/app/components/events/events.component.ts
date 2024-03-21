import { Component, OnInit } from '@angular/core';
import {
  AdministrationService,
  Event,
} from 'src/app/services/administration.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(private administrationService: AdministrationService) {}

  events: Event[] = [];
  loading = true;
  error = null;

  actionLoading: boolean = false;

  ngOnInit(): void {
    this.loadEvents();
  }

  // Load events
  loadEvents() {
    this.administrationService.getEvents().subscribe(
      (events) => {
        this.events = events;
        this.loading = false;
        this.error = null;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  // Confirm event
  confirmEvent(id: number) {
    this.actionLoading = true;
    this.administrationService.confirmEvent(id).subscribe(
      (event) => {
        alert('Event confirmed successfully');
        this.loadEvents();
        this.actionLoading = false;
      },
      (error) => {
        alert('Error confirming event: ' + error.message);
        this.actionLoading = false;
      }
    );
  }

  // Cancel event
  rejectEvent(id: number) {
    this.actionLoading = true;
    this.administrationService.rejectEvent(id).subscribe(
      (event) => {
        alert('Event rejected successfully');
        this.loadEvents();
        this.actionLoading = false;
      },
      (error) => {
        alert('Error canceling event: ' + error.message);
        this.actionLoading = false;
      }
    );
  }
}
