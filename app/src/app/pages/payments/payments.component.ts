import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule }   from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PaymentsService } from 'src/app/core/services/payments.service';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  
})
export class PaymentsComponent {
  payments$ = this.paymentsService.getPayments();
  itemName: string = '';
  foundItem: any = null;
  searchPerformed: boolean = false;

  constructor(
    public paymentsService: PaymentsService,
  ) {}

  moveNextPage() {
    this.paymentsService.goToNextPage();
    this.payments$ = this.paymentsService.getPayments();
  }

  movePreviousPage() {
    this.paymentsService.goToPreviousPage();
    this.payments$ = this.paymentsService.getPayments();
  }
  
  inputValue() {
    console.log('Valor do input:', this.itemName);
    this.paymentsService.searchValue = this.itemName;
    this.payments$ = this.paymentsService.getPayments();
    this.paymentsService.page.value = 1;
  }
}
