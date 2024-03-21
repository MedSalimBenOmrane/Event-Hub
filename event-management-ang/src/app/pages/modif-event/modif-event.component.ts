import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MesEventService } from 'src/app/services/mes-event.service';
import { Event } from '../../model/interfaces/event.interface';
import { NgForm } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modif-event',
  templateUrl: './modif-event.component.html',
  styleUrls: ['./modif-event.component.css']
})
export class ModifEventComponent {
  selectedFile: File | null = null;
  event!: Event;
  loading = true;
  error = null;
  spinner: number = 0;
  imageId!: number;
  sellPointadress!: string | undefined;

  constructor(
    private mesEventService: MesEventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params['id']);
        if (params['id']) {
          this.mesEventService.getEventById(params['id']).subscribe(data => {
            this.event = data;
            this.sellPointadress = this.event.sellPoint?.address;
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

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }


  handleImageInput(event: any, form: NgForm) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.imageService.uploadImage(formData).subscribe(
        response => {
          this.imageId = response.image.id;
          console.log('ressssss', response.image.data);
          this.spinner = 2;
        },
        error => {
          console.error('Error uploading image:', error);

        }
      );
    }
  }
  update(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const eventDto = {
      name: form.value.name,
      type: form.value.type,
      lineUp: form.value.lineUp,
      address: form.value.address,
      capacity: form.value.capacity,
      alcoholRules: form.value.alcoholRules === true,
      ageRules: form.value.ageRules,
      dressCode: form.value.dressCode,
      ticketPrice: form.value.ticketPrice,
      eventDate: form.value.date,
      sellPoint: {
        name: form.value.sellPointName,
        address: form.value.sellPointAddress,
        phoneNumber: form.value.sellPointPhone,
      },
      image: {
        id: this.imageId
      }
    };

    console.log(eventDto.image);

    console.log(eventDto);

    this.mesEventService.updateEvent(this.event.id, eventDto).subscribe(
      response => {
        this.toastr.success('Evenement crée avec succès !');
      },
      error => {
        this.toastr.error(`Erreur lors de la création de l'evenement`);
        console.log('before supp', this.imageId);
        this.imageService.deleteImage(this.imageId);
        console.log('image removed');
      }
    );
  }

}
