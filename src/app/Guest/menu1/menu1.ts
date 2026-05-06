import { ChangeDetectorRef, Component } from '@angular/core';
import { Dbservice } from '../../dbservice';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu1',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './menu1.html',
  styleUrl: './menu1.scss',
})
export class Menu1 {
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
