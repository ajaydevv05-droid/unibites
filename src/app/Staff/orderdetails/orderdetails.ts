import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orderdetails',
  imports: [DatePipe,CommonModule,ReactiveFormsModule],
  templateUrl: './orderdetails.html',
  styleUrl: './orderdetails.scss',
})
export class Orderdetails {
feedbackForm!: FormGroup;
  total: any = 0;
  date: any = new Date();
  status: any;
  food_id: any;
  feedbackSubmitted: boolean = false;


  public cartarray: any[] = [];
  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.viewdata();
    this.feedbackForm = this.fb.group({
      rating: [''],
      description: [''],
      login_id: [localStorage.getItem('loginid')],
      food_id: ['']
    });

  }


  viewdata() {
    this.db.orderview({ login_id: localStorage.getItem('loginid') }).then((data: any) => {
      this.cartarray = data;
      for (let data of this.cartarray) {
        this.total += data.amount;

        this.date = data.bookingdate;
        this.status = data.status;
      }
      console.log(this.cartarray);

      this.cdr.detectChanges();
    });
  }
  openFeedbackModal(food_id: any) {
    this.food_id = food_id;

    // patch food_id into form
    this.feedbackForm.patchValue({
      food_id: food_id,
      rating: '',
      description: ''
    });
  }
  payNow(order: any) {
    // simulate payment success
    // order.status = 'Paid';

  }

  submitFeedback() {
    this.feedbackSubmitted = true;

    if (this.feedbackForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all required fields'
      });
      return;
    }

    this.db.submitFeedback(this.feedbackForm.value)
      .then((res: any) => {
        if (res.message === 'success') {
          Swal.fire('Success!', 'Feedback submitted!', 'success');
          this.feedbackForm.reset();
        } else {
          Swal.fire('Error!', 'Something went wrong!', 'error');
        }
      })
      .catch(() => {
        Swal.fire('Error!', 'Server error!', 'error');
      });
  }

}
