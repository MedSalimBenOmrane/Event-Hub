import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../model/interfaces/event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affiche2',
  templateUrl: './affiche2.component.html',
  styleUrls: ['./affiche2.component.css']
})
export class Affiche2Component implements OnInit {
  @Input() event!: Event;
  @Input() showDetailsButton: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  details() {
    const link = ['user/achat', this.event.id];
    this.router.navigate(link);
  }
}





