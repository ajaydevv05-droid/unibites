import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-salesreport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salesreport.html',
  styleUrl: './salesreport.scss',
})
export class Salesreport {

  fromDate: any;
  toDate: any;
  reportData: any;

  salesChart: any;
  itemChart: any;
  paymentChart: any;

  constructor(private http: HttpClient) {}

  // ==============================
  // GENERATE REPORT
  // ==============================
  generateReport() {

    // REQUIRED VALIDATION
    if (!this.fromDate || !this.toDate) {
      alert("⚠ Please select both From Date and To Date");
      return;
    }

    // DATE ORDER VALIDATION
    if (this.toDate < this.fromDate) {
      alert("⚠ To Date cannot be earlier than From Date");
      return;
    }

    this.http.post<any>('http://localhost:3000/salesreport', {
      from: this.fromDate,
      to: this.toDate
    }).subscribe({

      next: (data) => {

        console.log("Backend Data:", data);

        this.reportData = data;

        // Delay chart creation until canvas loads
        setTimeout(() => {
          this.createSalesChart();
          this.createItemChart();
          this.createPaymentChart();
        }, 200);

      },

      error: (err) => {
        console.error("Server Error:", err);
        alert("❌ Failed to load sales report");
      }

    });
  }

  // ==============================
  // SALES LINE CHART
  // ==============================
  createSalesChart() {

    if (!this.reportData?.dateSales?.length) {
      console.log("No Date Sales Data");
      return;
    }

    if (this.salesChart) {
      this.salesChart.destroy();
    }

    const labels = this.reportData.dateSales.map((x: any) =>
      new Date(x.bookingdate).toLocaleDateString()
    );

    const values = this.reportData.dateSales.map((x: any) =>
      Number(x.daily_sales)
    );

    this.salesChart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Daily Sales',
          data: values,
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33,150,243,0.2)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // ==============================
  // TOP ITEMS BAR CHART
  // ==============================
  createItemChart() {

    if (!this.reportData?.topItems?.length) {
      console.log("No Top Items Data");
      return;
    }

    if (this.itemChart) {
      this.itemChart.destroy();
    }

    this.itemChart = new Chart('itemChart', {
      type: 'bar',
      data: {
        labels: this.reportData.topItems.map((x: any) => x.food_name),
        datasets: [{
          label: 'Top Selling Items',
          data: this.reportData.topItems.map((x: any) => Number(x.total_qty)),
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // ==============================
  // PAYMENT PIE CHART
  // ==============================
  createPaymentChart() {

    if (!this.reportData?.payment?.length) {
      console.log("No Payment Data");
      return;
    }

    if (this.paymentChart) {
      this.paymentChart.destroy();
    }

    this.paymentChart = new Chart('paymentChart', {
      type: 'pie',
      data: {
        labels: this.reportData.payment.map((x: any) => x.type),
        datasets: [{
          data: this.reportData.payment.map((x: any) => Number(x.total)),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4CAF50'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // ==============================
  // PDF DOWNLOAD
  // ==============================
  downloadPDF() {

    if (!this.reportData) {
      alert("⚠ Generate report first");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Admin Sales Report", 20, 20);

    doc.setFontSize(12);
    doc.text("From: " + this.fromDate, 20, 35);
    doc.text("To: " + this.toDate, 20, 45);

    doc.text(
      "Total Revenue: ₹ " + this.reportData.summary.total_revenue,
      20,
      60
    );

    doc.text(
      "Total Orders: " + this.reportData.summary.total_orders,
      20,
      70
    );

    doc.save("Sales_Report.pdf");
  }

  // ==============================
  // EXCEL EXPORT
  // ==============================
  exportExcel() {

    if (!this.reportData) {
      alert("⚠ Generate report first");
      return;
    }

    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(this.reportData.dateSales || []),
      "Date Sales"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(this.reportData.topItems || []),
      "Top Items"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(this.reportData.payment || []),
      "Payment"
    );

    XLSX.writeFile(workbook, "Sales_Report.xlsx");
  }

  // ==============================
  // RESET REPORT
  // ==============================
  resetReport() {

    this.fromDate = null;
    this.toDate = null;
    this.reportData = null;

    if (this.salesChart) {
      this.salesChart.destroy();
      this.salesChart = null;
    }

    if (this.itemChart) {
      this.itemChart.destroy();
      this.itemChart = null;
    }

    if (this.paymentChart) {
      this.paymentChart.destroy();
      this.paymentChart = null;
    }
  }

}