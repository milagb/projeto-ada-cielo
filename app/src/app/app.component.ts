import { Component } from '@angular/core';
import { Payment } from './core/services/payments.service';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  data: Payment[] = [];
  columnsToDisplay = ['id', 'merchantId', 'paymentNode', 'cnpjRoot', 'date', 'paymentType', 'cardBrand',
                      'authorizationCode', 'truncatedCardNumber', 'grossAmount', 'netAmount', 'terminal',
                      'administrationFee', 'channelCode', 'channel', 'withdrawAmount', 'minimumMDRAmmount',
                      'mdrTaxAmount', 'mdrFeeAmount', 'status']

  constructor(private web: WebService){
    this.web.getPayments().subscribe(x =>{
      this.data = x;
      console.log(this.data)
    })
  }
  
}
