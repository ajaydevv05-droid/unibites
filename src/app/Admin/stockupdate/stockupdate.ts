import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Dbservice } from '../../dbservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stockupdate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './stockupdate.html',
  styleUrls: ['./stockupdate.scss'],
})
export class Stockupdate implements OnInit {

  categories: any[] = [];
  foods: any[] = [];

  updatestockform!: FormGroup;

  // validation trigger
  savestatus = false;

  constructor(
    private db: Dbservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Load categories
    this.db.categoryview().then((data: any[]) => {
      this.categories = data;
      this.cdr.detectChanges();
    }).catch((err) => {
      console.error("Category load error:", err);
    });

    // Form validation
    this.updatestockform = this.fb.group({
      category_id: ['', Validators.required],
      food_id: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Load foods when category changes
  loadFoods(): void {

    const categoryId = this.updatestockform.value.category_id;

    if (!categoryId) {
      this.foods = [];
      return;
    }

    this.db.singleview({ category_id: categoryId }).then((data: any[]) => {
      this.foods = data;
      this.cdr.detectChanges();
    }).catch((err) => {
      console.error("Food load error:", err);
    });
  }

  // Update stock
  updateStock(): void {

    // trigger validation
    this.savestatus = true;

    if (this.updatestockform.invalid) {
      return;
    }

    console.log("Stock Update Data:", this.updatestockform.value);

    this.db.updateStock(this.updatestockform.value).then((confirmation: any) => {

      if (confirmation?.message === "success") {

        alert("Stock Updated Successfully");

        // Reset form
        this.updatestockform.reset();
        this.foods = [];
        this.savestatus = false;

        this.cdr.detectChanges();

      } else {
        alert("Stock update failed. Please try again.");
      }

    }).catch((err) => {
      console.error("Stock update error:", err);
      alert("Something went wrong while updating stock.");
    });

  }
}