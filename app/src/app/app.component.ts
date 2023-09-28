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
import { MatSort } from '@angular/material/sort';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  payment$ = this.web.getPayment();
  itemName: string = '';
  filteredData: Payment[] = [];
  foundId: string | undefined;
  data: Payment[] = [];
  datinha = new MatTableDataSource<Payment>(this.data);
  payments$: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]); 
  
  columnsToDisplay = ['id', 'merchantId', 'paymentNode', 'cnpjRoot', 'date', 'paymentType', 'cardBrand',
                      'authorizationCode', 'truncatedCardNumber', 'grossAmount', 'netAmount', 'terminal',
                      'administrationFee', 'channelCode', 'channel', 'withdrawAmount', 'minimumMDRAmmount',
                      'mdrTaxAmount', 'mdrFeeAmount', 'status']

  constructor(public web: WebService, private ngZone: NgZone){
        this.web.getPayment().subscribe(x =>{
          this.data = x;
          this.payments$.next(x);
        })
  }

  loadData() {
    this.web.getPayment().subscribe(
      (data: Payment[]) => {
        this.ngZone.run(() => {
          this.payments$.next(data);
          this.data = data; 
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
    this.web.searchValue = this.itemName;
    this.web.page.value = 1;
    this.loadData();
  }  
}
