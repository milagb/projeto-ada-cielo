import { Component } from '@angular/core';
import { Payment } from './core/services/payments.service';
import { WebService } from './web.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSortModule} from '@angular/material/sort';
import { PaymentsService } from './core/services/payments.service';
import { BehaviorSubject, throwIfEmpty } from 'rxjs';
import { NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import { Data } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { PaymentsAndQuantity } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  itemName: string = '';
  foundId: string | undefined;
  data: Payment[] = [];
  
  columnsToDisplay = ['id', 'merchantId', 'paymentNode', 'cnpjRoot', 'date', 'paymentType', 'cardBrand',
                      'authorizationCode', 'truncatedCardNumber', 'grossAmount', 'netAmount', 'terminal',
                      'administrationFee', 'channelCode', 'channel', 'withdrawAmount', 'minimumMDRAmmount',
                      'mdrTaxAmount', 'mdrFeeAmount', 'status']

  constructor(public web: WebService, private ngZone: NgZone){
    this.web.getPayment().subscribe(dataApi =>{
      this.data = dataApi.payments;
      this.web.pageQuantity = dataApi.pageQuantity;
    })
  }

  loadData() {
    this.web.getPayment().subscribe(
      (dataApi: PaymentsAndQuantity) => {
        this.ngZone.run(() => {
          this.data= dataApi.payments; 
          this.web.pageQuantity = dataApi.pageQuantity;
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
