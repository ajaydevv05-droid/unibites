import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paymentreport',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './paymentreport.html',
  styleUrl: './paymentreport.scss'
})

export class Paymentreport implements OnInit {

  @ViewChild('TABLE') TABLE!: ElementRef;

  reportForm!: FormGroup;

  reportData: any[] = [];

  totalAmount: number = 0;
  staffTotal: number = 0;
  studentTotal: number = 0;

  staffCount: number = 0;
  studentCount: number = 0;

  reportGenerated: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.reportForm = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });

  }

  /* ===============================
        GENERATE REPORT
     =============================== */

  onSubmit() {

    if (this.reportForm.invalid) {
      alert("Please select both Start Date and End Date");
      return;
    }

    const formValue = this.reportForm.value;

    const start = new Date(formValue.startdate);
    const end = new Date(formValue.enddate);

    if (start > end) {
      alert("Start date cannot be greater than End date");
      return;
    }

    this.loading = true;

    this.db.paymentreport(formValue).then((data: any) => {

      this.reportData = data || [];
      this.reportGenerated = true;

      this.calculateTotals();

      this.loading = false;

      this.cdr.detectChanges();

    }).catch((error: any) => {

      console.error("Report error:", error);
      alert("Error generating report");

      this.loading = false;

    });

  }

  /* ===============================
        CALCULATE TOTALS
     =============================== */

  calculateTotals() {

    this.totalAmount = 0;
    this.staffTotal = 0;
    this.studentTotal = 0;
    this.staffCount = 0;
    this.studentCount = 0;

    this.reportData.forEach(payment => {

      const amount = Number(payment.amount) || 0;

      this.totalAmount += amount;

      if (payment.customer_type === 'staff') {

        this.staffTotal += amount;
        this.staffCount++;

      } else {

        this.studentTotal += amount;
        this.studentCount++;

      }

    });

  }

  /* ===============================
        EXPORT TO EXCEL
     =============================== */

  exportToExcel() {

    if (!this.TABLE) {
      alert("No data available to export");
      return;
    }

    const ws: XLSX.WorkSheet =
      XLSX.utils.table_to_sheet(this.TABLE.nativeElement);

    const wb: XLSX.WorkBook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Payment Report');

    XLSX.writeFile(wb, 'payment_report.xlsx');

  }

  /* ===============================
        RESET REPORT
     =============================== */

  reset() {

    this.reportForm.reset();

    this.reportData = [];

    this.totalAmount = 0;
    this.staffTotal = 0;
    this.studentTotal = 0;

    this.staffCount = 0;
    this.studentCount = 0;

    this.reportGenerated = false;

  }

}