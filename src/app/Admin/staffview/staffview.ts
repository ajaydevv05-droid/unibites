import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-staffview',
  imports: [RouterModule],
  templateUrl: './staffview.html',
  styleUrl: './staffview.scss',
})
export class Staffview {

  public staffarray: any[] = [];
   constructor(private fb: FormBuilder, private db: Dbservice, private cdr: 
ChangeDetectorRef,private router:Router) {} 
 ngOnInit(): void { 
    this.viewdata();
  }


  viewdata(){
    this.db.staffview().then((data: any) => { 
      this.staffarray = data; 
      this.cdr.detectChanges(); 
    });
  }
  staffdelete(staff_id:String){
    this.db.deletestaff({staff_id}).then((confirmation:any)=>{ 
      if(confirmation.message == "Success") 
      { 
        alert('Staff Deleted Successfully'); 
          this.viewdata();
      } 
      else 
      {
        alert('Staff not Deleted, please check');
         this.router.navigate(['/adminmaster/staffview']); 
      }
    });
  }
}
