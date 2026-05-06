import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dbservice } from '../../dbservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staffpayment',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './staffpayment.html',
  styleUrl: './staffpayment.scss',
})
export class Staffpayment {
 
  total: number = 0;
  discount: number = 0;
  paymentarray: any[] = [];
  staffForm!: FormGroup;
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewdata();

    this.staffForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern("^[0-9]{16}$")]],
      expiry: ['', [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/[0-9]{2}$")]],
      cvv: ['', [Validators.required, Validators.pattern("^[0-9]{3}$")]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  viewdata() {
    this.db.cartview({ login_id: localStorage.getItem('loginid') })
      .then((data: any) => {
        this.paymentarray = data;
        this.total = 0;

        for (let item of this.paymentarray) {
          this.total += item.amount;
        }

        this.discount = this.total * 0.12;
        this.cdr.detectChanges();
      });
  }

  formatCard() {
    let value = this.staffForm.get('cardNumber')?.value || '';
    value = value.replace(/\D/g, '').substring(0, 16);
    this.staffForm.patchValue({ cardNumber: value }, { emitEvent: false });
  }

  formatExpiry() {
    let value = this.staffForm.get('expiry')?.value || '';
    value = value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    this.staffForm.patchValue({ expiry: value }, { emitEvent: false });
  }

  formatCvv() {
    let value = this.staffForm.get('cvv')?.value || '';
    value = value.replace(/\D/g, '').substring(0, 3);
    this.staffForm.patchValue({ cvv: value }, { emitEvent: false });
  }

  staffpayment() {

    this.savestatus = true;

    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    this.db.staffpayment({
      login_id: localStorage.getItem('loginid'),
      total: this.total,
      discount: this.discount
    }).then((confirmation: any) => {

      if (confirmation.message === 'Success') {

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your payment completed successfully 💳🎉',
          confirmButtonColor: '#4CAF50'
        }).then(() => {
          this.router.navigate(['staffmaster/staffhome']);
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Please try again.',
          confirmButtonColor: '#f44336'
        }).then(() => {
          this.router.navigate(['staffmaster/cartdetails']);
        });
      }
    });
  }
  showQr = false;

showQR(){
  this.showQr = true;
}

closeQR(){
  this.showQr = false;
}
}