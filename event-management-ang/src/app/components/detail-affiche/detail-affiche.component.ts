import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../model/interfaces/event.interface';
import { Router } from '@angular/router';
import { MesEventService } from 'src/app/services/mes-event.service';
import { EventStatus } from '../../model/enum/eventStatus.enum';
import { ToastrService } from 'ngx-toastr';
import { SellPoint } from '../../model/interfaces/sellPoint.interface';

@Component({
  selector: 'app-detail-affiche',
  templateUrl: './detail-affiche.component.html',
  styleUrls: ['./detail-affiche.component.css']
})
export class DetailAfficheComponent implements OnInit {
  @Input() event!: Event
  @Input() showStatus = true;
  bgcolor!: string;
  deleted: boolean = false;
  showExpired: boolean = false;

  constructor(
    private router: Router,
    private mesEventsService: MesEventService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    if (this.event.status == EventStatus.CONFIRMED) { this.bgcolor = "green"; }
    else if (this.event.status == EventStatus.PENDING) { this.bgcolor = "orange"; }
    else if (this.event.status == EventStatus.REJECTED) { this.bgcolor = "red"; }

    if (new Date(this.event.eventDate) < new Date()) {
      this.showExpired = true;
    }
  }

  modifier() {
    const link = ['user/modifier', this.event.id];
    this.router.navigate(link);
  }

  delete(id: number): void {
    this.mesEventsService.deleteEvent(id).subscribe(
      (response) => {
        this.toastr.success(`L'évenement a été supprimé avec succès!`);
        this.deleted = true;
      },
      (error) => {
        this.toastr.error(`Erreur de la suppression de l'évenement!`)
      }
    );
  }
}
