import { Component } from '@angular/core';
import { Event } from '../../model/interfaces/event.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-achatticket',
  templateUrl: './achatticket.component.html',
  styleUrls: ['./achatticket.component.css']
})
export class AchatticketComponent {
  event!: Event;
  loading = true;
  error = null;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params['id']);
        if (params['id']) {
          this.homeService.getEventById(params['id']).subscribe((event) => {
            this.event = event;
            this.loading = false;
            this.error = null;
          },
            (error) => {
              this.error = error.message;
              this.loading = false;
            }
          );
        } else {
          console.error("ID is undefined");
        }
      }
    );
  }

  achat(id: number) {
    this.ticketService.buyTicket(id).subscribe(
      (response) => {
        this.toastr.success(`Le paiement a été effectué avec succès.`)
      },
      (error) => {
        this.toastr.error(`Erreur lors du paiement!`)
      }
    );

  }

  reserve(id: number) {
    this.ticketService.reserveTicket(id).subscribe(
      (response) => {
        this.toastr.success(`La reservation a été effectué avec succès.`)
      },
      (error) => {
        this.toastr.error(`Erreur lors de la réservation. Veuillez réessayer plutard!`)
      }
    );
  }
}
