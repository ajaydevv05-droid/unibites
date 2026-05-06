import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  public categoryarray: any[] = [];
   constructor(private fb: FormBuilder, private db: Dbservice, private cdr: 
ChangeDetectorRef,private router:Router) {} 
 ngOnInit(): void { 
    this.viewdata();
  }


  viewdata(){
    this.db.categoryview().then((data: any) => { 
      this.categoryarray = data; 
      this.cdr.detectChanges(); 
    });
  }

}
