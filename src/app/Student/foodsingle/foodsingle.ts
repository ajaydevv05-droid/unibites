import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foodsingle',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './foodsingle.html',
  styleUrl: './foodsingle.scss',
})
export class Foodsingle {

  food_id: any;

  // SINGLE FOOD OBJECT (not array)
  food: any;
 feedback: any[] = [];
  quantity: number = 1;
  totalprice: number = 0;
  stock: number = 0;
  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.food_id = params.get('food_id');
    });
  }

  ngOnInit(): void {
    this.db.foodsingle({ food_id: this.food_id }).then((data: any) => {

      // API returns array → take first item
      this.food = data[0];
      this.totalprice = data[0].amount;
      this.stock = data[0].quantity;
      console.log(this.food);
      this.cdr.detectChanges();
      this.loadfeedback();
    });
  }

  // INCREASE QUANTITY
  increaseQty() {
    if (this.quantity < this.stock) {
      this.quantity++;
      this.totalprice = this.food.amount * this.quantity;
    } else if (this.stock === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This food item is currently out of stock',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Reached',
        text: `Only ${this.stock} items are available for this food item`,
      });
    }
  }

  // DECREASE QUANTITY
  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalprice = this.food.amount * this.quantity;
    }
  }

  // ADD TO CART
  addToCart() {
    if (this.stock == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This food item is currently out of stock',
      });
      return;
    } else {
      this.db.insertcart({ food_id: this.food_id, quantity: this.quantity, totalprice: this.totalprice, loginid: localStorage.getItem('loginid') }).then((confirmation: any) => {
        if (confirmation.message == "Success") {
          alert('Item added to cart Successfully');
          // this.viewcart();
          this.router.navigate(['/studentmaster/cartview']);
        }
        else {
          alert('item not added to cart, please check');
          this.router.navigate(['/studentmaster/foodsingle']);
        }
      });
    }
  }

  loadfeedback() {
    this.db.singlefeedback({ food_id: this.food_id }).then((data: any) => {
      this.feedback = data;
      console.log(this.feedback);
      this.cdr.detectChanges();
    });
}
getStars(rating: number) {
  return Array(rating).fill(0);
}

getEmptyStars(rating: number) {
  return Array(5 - rating).fill(0);
}
}
