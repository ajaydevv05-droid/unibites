import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { Router, RouterLink } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-categoryview',
  imports: [RouterLink],
  templateUrl: './categoryview.html',
  styleUrl: './categoryview.scss',
})
export class Categoryview {
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

  
categorydelete(category_id:String){
    this.db.deletecategory({category_id}).then((confirmation:any)=>{ 
      if(confirmation.message == "Success") 
      { 
        alert('Category Deleted Successfully'); 
          this.viewdata();
      } 
      else 
      {
        alert('Category not Deleted, please check');
         this.router.navigate(['/adminmaster/categoryview']); 
      }
    });
  }
}
