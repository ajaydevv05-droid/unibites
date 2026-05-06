import { ChangeDetectorRef, Component } from '@angular/core';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paymentview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paymentview.html',
  styleUrls: ['./paymentview.scss'],
})
export class Paymentview {

  payments: any[] = [];
  allPayments: any[] = [];

  fromDate: any;
  toDate: any;

  selectedType: string = 'all';

  total = 0;
  staffpayment = 0;
  studentpayment = 0;

  dateError: string = '';

  constructor(private db: Dbservice, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPayments();
  }

  // LOAD ALL PAYMENTS
  loadPayments() {

    this.total = 0;
    this.staffpayment = 0;
    this.studentpayment = 0;

    this.db.getPayments().then((res: any) => {

      this.payments = res;
      this.allPayments = res;

      for (let i = 0; i < this.payments.length; i++) {

        if (this.payments[i].role == 'Staff') {
          this.staffpayment += Number(this.payments[i].amount);
        }

        else if (this.payments[i].role == 'Student') {
          this.studentpayment += Number(this.payments[i].amount);
        }

        this.total += Number(this.payments[i].amount);

      }

      this.cdr.detectChanges();

    });

  }


  // DATE FILTER
  filterPayments() {

    this.dateError = '';

    if (!this.fromDate || !this.toDate) {
      this.dateError = "Please select both From Date and To Date";
      return;
    }

    if (this.fromDate > this.toDate) {
      this.dateError = "From Date cannot be greater than To Date";
      return;
    }

    this.db.filterPayments({
      fromdate: this.fromDate,
      todate: this.toDate
    }).then((res: any) => {

      this.payments = res;
      this.allPayments = res;

      this.total = 0;
      this.staffpayment = 0;
      this.studentpayment = 0;

      for (let i = 0; i < this.payments.length; i++) {

        if (this.payments[i].role == 'Staff') {
          this.staffpayment += Number(this.payments[i].amount);
        }

        else if (this.payments[i].role == 'Student') {
          this.studentpayment += Number(this.payments[i].amount);
        }

        this.total += Number(this.payments[i].amount);

      }

      this.cdr.detectChanges();

    });

  }


  // TYPE FILTER
  filterType(type: string) {

    this.selectedType = type;

    if (type == 'all') {
      this.payments = this.allPayments;
    }
    else {
      this.payments = this.allPayments.filter(p => p.role == type);
    }

  }


  // RESET FILTER
  reset() {

    this.fromDate = null;
    this.toDate = null;
    this.dateError = '';
    this.selectedType = 'all';

    this.loadPayments();

  }


  viewPayment(id: any) {
    console.log("view payment", id);
  }

}