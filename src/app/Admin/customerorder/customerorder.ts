import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dbservice } from '../../dbservice';

@Component({
  selector: 'app-customerorder',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './customerorder.html',
  styleUrl: './customerorder.scss',
})
export class Customerorder {
  orders: any[] = [];
  filteredOrders: any[] = [];
  studentorders: any = 0;
  stafforders: any = 0;
  total:any = 0;
  constructor(private db: Dbservice, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.db.getRecentOrders().then((data: any) => {
      this.orders = data;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].role == 'student') {
          this.studentorders = this.studentorders + 1;
          this.cdr.detectChanges();
        }
        else if (this.orders[i].role == 'staff') {
          this.stafforders = this.stafforders + 1;
          this.cdr.detectChanges();
        }
        this.total = this.orders[i].totalamount + this.total;
        this.cdr.detectChanges();
      }
      this.filteredOrders = data;
      this.cdr.detectChanges();
    });

  }


  filterOrders(role: string) {
    if (role === 'all') {
      this.filteredOrders = this.orders;
    }
    else {
      this.filteredOrders = this.orders.filter(o => o.role === role);
    }

  }

}
