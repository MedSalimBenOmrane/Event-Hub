import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const link = "http://localhost:3000/image/upload";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(imageData: FormData): Observable<any> {
    return this.http.post(link, imageData);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(link + '/' + id.toString());
  }

}
