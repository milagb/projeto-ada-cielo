import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './core/models/page';
import { AppComponent } from './app.component';

export interface Payment {
  id: string, 
  merchantId:string,
  paymentNode:number,
  cnpjRoot:number,
  date:string,
  paymentType:string,
  cardBrand:string,
  authorizationCode:string,
  truncatedCardNumber:string,
  grossAmount:number,
  netAmount:number,
  terminal:string,
  administrationFee:number,
  channelCode:number,
  channel:string,
  withdrawAmount:string,
  minimumMDRAmmount:number,
  mdrTaxAmount:number,
  mdrFeeAmount:number,
  status:string
}

@Injectable({
    providedIn: 'root'
  })
  export class WebService {
    url: string = 'http://localhost:3000/payments';

    constructor(private http: HttpClient) { }
  
    getPayments(): Observable<Payment[]> {        
      return this.http.get<Payment[]>(this.url);
    }
  }
