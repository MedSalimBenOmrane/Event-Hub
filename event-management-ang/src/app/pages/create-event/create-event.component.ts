import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MesEventService } from '../../services/mes-event.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  selectedFile: File | null = null;
  imageId!: number;
  spinner: number = 0;
  imageUploaded: boolean = false;

  constructor(
    private toastr: ToastrService,
    private mesEventsService: MesEventService,
    private imageService: ImageService,
  ) { }

  handleFileInput(event: any): void {
    this.spinner = 1;
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.imageService.uploadImage(formData).subscribe(
        response => {
          this.imageId = response.image.id;
          this.spinner = 2;
          this.imageUploaded = true;
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  create(form: NgForm) {
    if ((form.invalid)) {
      return;
    }

    if (!this.imageUploaded) {
      this.toastr.error("Attendez le chargement complet de l'image!");
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
    this.mesEventsService.createEvent(eventDto).subscribe(
      response => {
        this.toastr.success('Evenement crée avec succès !');
      },
      error => {
        this.toastr.error(`Erreur lors de la création de l'evenement`);
      }
    );
  }
}
