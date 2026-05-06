import { Component } from '@angular/core';
import { Dbservice } from '../dbservice';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment1',
  imports: [ReactiveFormsModule],
  templateUrl: './payment1.html',
  styleUrl: './payment1.scss',
})
export class Payment1 {
    total: any = 0;

  public paymentarray: any[] = [];
  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.viewdata();
  }


  viewdata() {
    this.db.cartview({ login_id:localStorage.getItem('loginid') }).then((data: any) => {
      this.paymentarray = data;
      this.total += data.amount;
      // for(let data of this.paymentarray)
      // {
      // this.total += data.amount;
      // }
      console.log(this.paymentarray);

      this.cdr.detectChanges();
    });
  }
 placepayment() {
  this.db.placepayment({
    login_id: localStorage.getItem('loginid'),
    total: this.total
  }).then((confirmation: any) => {

    // this.paymentarray = data;

    // Check payment status (adjust condition if backend response is different)
    if (confirmation.message == 'Success' ) {

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your payment has been completed successfully 💳🎉',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9'
      }).then(()=>{
        this.router.navigate(['studentmaster/studenthome']);
      });

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#f44336'
      }).then(()=>{
        this.router.navigate(['Student/studentmaster/payment']);
      });
      

    }
  });
}
}
