import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartview',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './cartview.html',
  styleUrl: './cartview.scss',
})
export class Cartview {
  total: any = 0;

  public cartarray: any[] = [];
  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.viewdata();
  }


  viewdata() {
    this.db.cartview({ login_id:localStorage.getItem('loginid') }).then((data: any) => {
      this.cartarray = data;
      for(let data of this.cartarray)
      {
      this.total += data.amount;
      }
      console.log(this.cartarray);

      this.cdr.detectChanges();
    });
  }
  // proceedToPayment() {
  //   this.router.navigate(['/payment'], {
  //     queryParams: {
  //         type: 'student', // Pass user type to payment component
  //       amount: this.total
  //     }
  //   });
  // }
  placeorder() {
  this.db.placeorder({
    login_id: localStorage.getItem('loginid'),
    total: this.total
  }).then((data: any) => {

    if (data.message === "Success") {
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: 'Your order has been placed successfully 🎉',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9'
      }).then(() => {
        this.router.navigate(['/studentmaster/categorydetails']);
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Item not added to cart. Please check again.',
        confirmButtonColor: '#f44336'
      }).then(() => {
        this.router.navigate(['/studentmaster/foodsingle']);
      });
    }
  });
}

}
