import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Dbservice } from '../../dbservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-monthlydetails',
  imports: [DatePipe, RouterLink],
  templateUrl: './monthlydetails.html',
  styleUrl: './monthlydetails.scss',
})
export class Monthlydetails {
  total: any = 0;
  date: any = new Date();
  status: any;
  discount: any = 0;
  full:any=0;
  public cartarray: any[] = [];
  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.viewdata();
  }


  viewdata() {
    this.db.orderview1({ login_id: localStorage.getItem('loginid') }).then((data: any) => {
      this.cartarray = data;
      for (let data of this.cartarray) {
        this.total += data.amount;
        this.date = data.bookingdate;
        this.status = data.status;
      }
      this.discount = Math.round(this.total * 0.20);
      console.log(this.cartarray);
this.full=this.total-this.discount;

      this.cdr.detectChanges();
    });
  }
  // payNow() {
  //   this.db.monthlypayment({ login_id: localStorage.getItem('loginid')}).then((confirmation: any) => {
  //     if (confirmation.message == 'Success') {
  //       alert("Payment successful!");
  //       this.router.navigate(['/staffmaster/category']);
  //     } else {
  //       alert("Payment failed. Please try again.");
  //     }
  //   });
  // }

  giveFeedback(order: any) {
    alert(`Feedback for ${order.food_name}`);
  }
}

