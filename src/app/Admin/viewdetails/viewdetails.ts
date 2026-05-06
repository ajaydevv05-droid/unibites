import { ChangeDetectorRef, Component } from '@angular/core';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewdetails',
  imports: [CommonModule,RouterLink],
  templateUrl: './viewdetails.html',
  styleUrl: './viewdetails.scss',
})
export class Viewdetails {
  public vieworder:any = {};        // order header
  public orderItems:any[] = [];     // order items
  public bookingmaster_id:any;
 public customer:any[]=[];
  constructor(
    private db: Dbservice,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router:Router,
  ){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.bookingmaster_id = params.get('bookingmaster_id');
    });
  }

  ngOnInit() {
    this.db.viewdetails({bookingmaster_id: this.bookingmaster_id}).then((data: any) => {
      this.orderItems = data;          // items list
      if(data.length>0){
        this.vieworder = data[0];      // header info
        }
      this.cdr.detectChanges();
    });
    this.db.getcustomer({bookingmaster_id: this.bookingmaster_id}).then((data: any) => {
      this.customer = data;
      this.cdr.detectChanges();
    });
  }
 completed(){
  this.db.completed({bookingmaster_id: this.bookingmaster_id}).then((data: any) => {
    if(data.message === "updated"){
      alert("Order marked as completed");
      this.router.navigate(['/adminmaster/customerorder']);
    }
  }).catch((error: any) => {
    alert("Error marking order as completed");
  });
}
}
