import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../dbservice';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {

  total: number = 0;
  paymentForm!: FormGroup;
  paymentarray: any[] = [];

  savestatus = false;
  showQr = false;

  login_id: any;

  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.login_id = localStorage.getItem('loginid');

    this.initializeForm();
    this.viewdata();
  }

  // -------------------------
  // Initialize Form
  // -------------------------
  initializeForm() {

    this.paymentForm = this.fb.group({

      cardName: ['', Validators.required],

      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{16}$')
        ]
      ],

      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')
        ]
      ],

      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$')
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]

    });

  }

  // -------------------------
  // Load Cart & Calculate Total
  // -------------------------
  viewdata() {

    this.db.cartview({
      login_id: this.login_id
    }).then((data: any) => {

      this.paymentarray = data || [];

      this.total = this.paymentarray.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      this.cdr.detectChanges();

    });

  }

  // -------------------------
  // Place Payment
  // -------------------------
  placepayment() {

    this.savestatus = true;

    if (this.paymentForm.invalid) {
      return;
    }

    this.db.placepayment({
      login_id: this.login_id,
      total: this.total
    }).then((confirmation: any) => {

      if (confirmation.message === 'Success') {

        this.savestatus = false;

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your payment has been completed successfully 💳🎉',
          confirmButtonColor: '#4CAF50'
        }).then(() => {

          this.router.navigate(['studentmaster/studenthome']);

        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#f44336'
        });

      }

    });

  }

  // -------------------------
  // Show QR Payment
  // -------------------------
  showQR() {
    this.showQr = true;
  }

  // -------------------------
  // Close QR
  // -------------------------
  closeQR() {
    this.showQr = false;
  }

}