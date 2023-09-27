import { Component } from '@angular/core';
import { Payment } from './core/services/payments.service';
import { WebService } from './web.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSortModule} from '@angular/material/sort';
import { PaymentsService } from './core/services/payments.service';
import { BehaviorSubject } from 'rxjs';
import { NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
  payment$ = this.web.getPayments();
  itemName: string = '';
  data: Payment[] = [];
  
  payments$: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]); // Use BehaviorSubject
  columnsToDisplay = ['id', 'merchantId', 'paymentNode', 'cnpjRoot', 'date', 'paymentType', 'cardBrand',
                      'authorizationCode', 'truncatedCardNumber', 'grossAmount', 'netAmount', 'terminal',
                      'administrationFee', 'channelCode', 'channel', 'withdrawAmount', 'minimumMDRAmmount',
                      'mdrTaxAmount', 'mdrFeeAmount', 'status']

  // datinha = new MatTableDataSource<Payment>(this.data);
  constructor(public web: WebService, private ngZone: NgZone){
        this.web.getPayment().subscribe(x =>{
          this.data = x;
          console.log(x);
        })
      }

  loadData() {
    this.web.getPayment().subscribe(
      (data: Payment[]) => {
        this.ngZone.run(() => {
          this.payments$.next(data);
          this.data = data; 
          // this.datinha.data = data; 
        });
      }
    );
  }
  
  moveNextPage() {
    this.web.goToNextPage(); 
    this.loadData();
  }

  movePreviousPage() {
    this.web.goToPreviousPage();
    this.loadData();
  }
  
  inputValue() {
    console.log('Valor do input:', this.itemName);
    this.web.searchValue = this.itemName;
    // this.payments$ = this.web.getPayments();
    this.web.page.value = 1;
  }
  
}
