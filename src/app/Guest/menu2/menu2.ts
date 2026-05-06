import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Dbservice } from '../../dbservice';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-menu2',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './menu2.html',
  styleUrl: './menu2.scss',
})
export class Menu2 {
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
  showAuthMessage(){
  Swal.fire({
    title: 'Account Required',
    text: 'Please register to continue. If you already have an account, login.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Register',
    cancelButtonText: 'Login'
  }).then((result) => {

    if (result.isConfirmed) {
      this.router.navigate(['/studentregistration']);  // registration page
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      this.router.navigate(['/login']);     // login page
    }

  });
  }
}
