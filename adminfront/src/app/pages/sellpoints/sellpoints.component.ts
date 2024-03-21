import { Component, OnInit } from '@angular/core';
import { AdministrationService, SellPoint } from 'src/app/services/administration.service';

@Component({
  selector: 'app-sellpoints',
  templateUrl: './sellpoints.component.html',
  styleUrls: ['./sellpoints.component.scss']
})
export class SellpointsComponent implements OnInit {
  constructor(private administrationService: AdministrationService) { }

  sellpoints: SellPoint[] = []
  loading = true
  error = null

  ngOnInit(): void {
    this.administrationService.getSellpoints()
      .subscribe((sellpoints) => {
        this.sellpoints = sellpoints
        this.loading = false
        this.error = null
      }, (error) => {
        this.error = error.message
        this.loading = false
      })
  }
}

