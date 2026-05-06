import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-foodview',
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './foodview.html',
  styleUrl: './foodview.scss',
})
export class Foodview {

  public foodarray: any[] = [];
  public categoryArray: any[] = [];
  public viewgroup: any;

  constructor(private fb: FormBuilder, private db: Dbservice, private cdr:
    ChangeDetectorRef, private router: Router) {

    this.viewgroup = this.fb.group({
      categoryFilter: ['']
    });
  }
  ngOnInit(): void {
    this.db.foodview().then((data: any) => {
      this.foodarray = data;
      this.cdr.detectChanges();
    });
    this.db.categoryget().then((data: any) => {
      this.categoryArray = data;
      this.cdr.detectChanges();
    });
  }

  onchange(event: any) {
    const id = this.viewgroup.value.categoryFilter;
    this.db.getcategorybyid({ id }).then((data: any) => {
      this.foodarray = data;
      this.cdr.detectChanges();
    });
  }
  fooddelete(food_id: any) {
    if (confirm("Are you sure you want to delete this food item?")) {
      this.db.fooddelete({ food_id }).then((data: any) => {
        if (data.message === "Success") {
          alert("Food item deleted successfully");
          this.cdr.detectChanges();
          this.router.navigate(['/adminmaster/foodview']);
          
        }
      }).catch((error: any) => {
        alert("Error deleting food item");
      });
    }
  }
}
