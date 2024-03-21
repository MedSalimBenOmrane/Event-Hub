import { Component, OnInit } from '@angular/core';
import { AdministrationService, Creator } from 'src/app/services/administration.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
  constructor(private administrationService: AdministrationService) { }

  creators: Creator[] = []
  loading = true
  error = null

  ngOnInit(): void {
    this.administrationService.getCreators()
      .subscribe((creators) => {
        this.creators = creators
        this.loading = false
        this.error = null
      }, (error) => {
        this.error = error.message
        this.loading = false
      })
  }
}
