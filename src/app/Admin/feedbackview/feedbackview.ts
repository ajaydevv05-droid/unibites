import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedbackview',
  imports: [CommonModule,RouterModule],
  templateUrl: './feedbackview.html',
  styleUrl: './feedbackview.scss',
})
export class Feedbackview {
  total_feedback: number = 0;
  positive_count: number = 0;
  negative_count: number = 0;
  average_rating: number = 0;
public feedbackarray: any[] = [];
   constructor(private fb: FormBuilder, private db: Dbservice, private cdr: 
ChangeDetectorRef,private router:Router) {} 
 ngOnInit(): void { 
    this.viewdata();
  }


  viewdata(){
    this.db.feedbackview().then((data: any) => { 
      this.feedbackarray = data; 
      this.total_feedback = data.length;
      this.positive_count = data.filter((f: any) => f.rating >= 4).length;
      this.negative_count = data.filter((f: any) => f.rating <= 2).length;
      this.average_rating = this.total_feedback > 0 ? (data.reduce((sum: number, f: any) => sum + f.rating, 0) / this.total_feedback) : 0;
      
      this.cdr.detectChanges(); 
    });
  }
}
