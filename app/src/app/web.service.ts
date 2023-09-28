import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './core/models/page';
import { AppComponent } from './app.component';
import { MatLabel } from '@angular/material/form-field';

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
  status:string,
  paginator: number;
}

@Injectable({
    providedIn: 'root'
  })
  export class WebService {
    url: string = 'http://localhost:3000/payments';
    page: Page;
    searchValue: string;

    constructor(private http: HttpClient) {
      this.page = new Page(); 
      this.searchValue = '';
     }
    
    getPayment(): Observable<Payment[]> {
      const params = new HttpParams()
        .set('pageSize', this.page.size)
        .set('search', this.searchValue)
        .set('pageNumber', this.page.value);        
        
      return this.http.get<Payment[]>(this.url, {params});
    }

    get isFirstPage(): boolean {
      return this.page.value === 1;
    }
  
    goToNextPage(): void {
      this.page.value++;
    }
  
    goToPreviousPage(): void {
      if(this.page.value > 1) {
        this.page.value--;
      }
    }
  }
