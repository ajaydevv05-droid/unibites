import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Dbservice } from '../../dbservice';

@Component({
  selector: 'app-viewsingle',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './viewsingle.html',
  styleUrl: './viewsingle.scss',
})
export class Viewsingle {
   category_id: any;
  public foodarray: any[] = [];
 
   constructor(private fb: FormBuilder, private db: Dbservice, private cdr: 
ChangeDetectorRef,private router:Router,private route:ActivatedRoute) {
   route.paramMap.subscribe((params: ParamMap) => {
      this.category_id = params.get('category_id')
    });
} 
 ngOnInit(): void { 
    this.viewdata();
  }


  viewdata(){
    this.db.singleview({category_id:this.category_id}).then((data: any) => { 
      this.foodarray = data; 
      console.log(this.foodarray);
      this.cdr.detectChanges(); 
    });
  }
}
