import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellPoint } from '../model/interfaces/sellPoint.interface';
import { Observable } from 'rxjs';

const link = "http://localhost:3000/sell-point";

@Injectable({
  providedIn: 'root'
})
export class SellPointService {

  constructor(
    private http: HttpClient
  ) { }

  create(sellPoint: Partial<SellPoint>): Observable<SellPoint> {
    return this.http.post<SellPoint>(link, { sellPoint });
  }
}
