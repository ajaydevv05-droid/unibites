import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartdetails',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './cartdetails.html',
  styleUrl: './cartdetails.scss',
})
export class Cartdetails {
  total: any = 0;
  discount: any = 0;

  public cartarray: any[] = [];
  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.viewdata();
  }


  viewdata() {
    this.db.cartview({ login_id: localStorage.getItem('loginid') }).then((data: any) => {
      this.cartarray = data;
      for (let data of this.cartarray) {
        this.total += data.amount;
      }
      this.discount = Math.round(this.total * .20);

      console.log(this.cartarray);

      this.cdr.detectChanges();
    });
  }
  placeorder() {
    this.db.stafforder({
      login_id: localStorage.getItem('loginid'),
      discount: Math.round(this.total * .20),
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
          this.router.navigate(['/staffmaster/category']);
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Item not added to cart. Please check again.',
          confirmButtonColor: '#f44336'
        }).then(() => {
          this.router.navigate(['/staffmaster/viewsingle']);
        });
      }
    });
  }
//   proceedToPayment(){
// this.router.navigate(['/payment'], {
//   queryParams: {
//   type:'staff',
//     amount: this.total - this.discount
//   }
// });
//   }
}
