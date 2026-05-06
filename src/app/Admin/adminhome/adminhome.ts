import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { Dbservice } from '../../dbservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.scss'
})

export class Adminhome implements OnInit, OnDestroy {

  // ================= MAIN DATA =================
  totalOrders:any = 0;
  totalRevenue:any = 0;
  totalUsers:any = 0;
  todayOrders:any = 0;

  // ================= DISPLAY COUNTERS =================
  displayTotalOrders:any = 0;
  displayRevenue:any = 0;
  displayUsers:any = 0;
  displayTodayOrders:any = 0;

  // ================= ARRAYS =================
  topFoods:any[] = [];
  latestOrders:any[] = [];

  // 🆕 EVENT DATA
  eventResults:any[] = [];

  // ================= CHARTS =================
  salesChart:any;
  foodChart:any;
  categoryChart:any;
  monthlyChart:any;
  statusChart:any;

  // 🆕 EVENT CHART
  eventChart:any;

  refreshInterval:any;

  constructor(
    private db:Dbservice,
    private http:HttpClient,
    private cdr:ChangeDetectorRef
  ){}

  // ================= INIT =================
  ngOnInit(){

    this.loadDashboard();
    this.getEventResults();

    // LIVE REFRESH
    this.refreshInterval = setInterval(()=>{
      this.loadDashboard();
      this.getEventResults(); // refresh event data also
    },5000);
  }

  ngOnDestroy(){
    if(this.refreshInterval){
      clearInterval(this.refreshInterval);
    }
  }


  // ================= LOAD DASHBOARD =================
  loadDashboard(){

    this.db.getdashboard()
    .then((data:any)=>{

      this.totalOrders = data.totalOrders || 0;
      this.totalRevenue = data.totalRevenue || 0;
      this.totalUsers = data.totalUsers || 0;
      this.todayOrders = data.todayOrders || 0;

      // COUNTER ANIMATION
      this.animateCounter('orders',this.totalOrders);
      this.animateCounter('revenue',this.totalRevenue);
      this.animateCounter('users',this.totalUsers);
      this.animateCounter('today',this.todayOrders);

      this.topFoods = data.topFoods || [];
      this.latestOrders = data.latestOrders || [];

      setTimeout(()=>{

        this.createSalesChart(data.salesChart || []);
        this.createFoodChart(data.topFoods || []);
        this.createCategoryChart(data.categorySales || []);
        this.createMonthlyChart(data.monthlySales || []);
        this.createStatusChart(data.orderStatus || []);

      },200)

    })
    .catch((err:any)=>{
      console.log("Dashboard Error",err);
    })

    this.cdr.detectChanges();
  }


  // ================= EVENT RESULTS =================
 getEventResults(){

  this.db.getEventResults()
  .then((res:any)=>{

    this.eventResults = res.data || [];

    if(this.eventResults.length > 0){
      this.createEventChart(this.eventResults[0]);
    }

    this.cdr.detectChanges();

  })
  .catch((err:any)=>{
    console.log("Event Error",err);
  });

}


  // ================= EVENT CHART =================
  createEventChart(event:any){

    if(this.eventChart){
      this.eventChart.destroy();
    }

    const labels = event.topFoods.map((x:any)=>x.food_name);
    const data = event.topFoods.map((x:any)=>x.count);

    this.eventChart = new Chart("eventChart",{

      type:'bar',

      data:{
        labels: labels,
        datasets:[{
          label:"Votes",
          data: data,
          backgroundColor:[
            "gold",
            "silver",
            "#cd7f32"
          ]
        }]
      },

      options:{
        responsive:true,
        plugins:{
          legend:{
            position:'bottom'
          }
        }
      }

    });

    this.cdr.detectChanges();
  }


  // ================= COUNTER ANIMATION =================
  animateCounter(type:any,target:any){

    let start = 0;
    let duration = 800;
    let step = target / (duration / 20);

    let counter = setInterval(()=>{

      start += step;

      if(start >= target){
        start = target;
        clearInterval(counter);
      }

      if(type == 'orders') this.displayTotalOrders = Math.floor(start);
      if(type == 'revenue') this.displayRevenue = Math.floor(start);
      if(type == 'users') this.displayUsers = Math.floor(start);
      if(type == 'today') this.displayTodayOrders = Math.floor(start);

      this.cdr.detectChanges();

    },20);

  }


  // ================= SALES CHART =================
  createSalesChart(data:any){

    if(this.salesChart){
      this.salesChart.destroy();
    }

    this.salesChart = new Chart("salesChart",{
      type:'line',
      data:{
        labels: data.map((x:any)=>x.date),
        datasets:[{
          label:"Daily Sales",
          data: data.map((x:any)=>x.total),
          borderColor:"#4CAF50",
          backgroundColor:"rgba(76,175,80,0.2)",
          tension:0.4,
          fill:true
        }]
      },
      options:{
        responsive:true,
        plugins:{
          legend:{ position:'bottom' }
        }
      }
    });

    this.cdr.detectChanges();
  }


  // ================= FOOD CHART =================
  createFoodChart(data:any){

    if(this.foodChart){
      this.foodChart.destroy();
    }

    this.foodChart = new Chart("foodChart",{
      type:'doughnut',
      data:{
        labels: data.map((x:any)=>x.food_name),
        datasets:[{
          data: data.map((x:any)=>x.total_qty),
          backgroundColor:[
            "#FF6384","#36A2EB","#FFCE56","#4CAF50","#9C27B0"
          ]
        }]
      },
      options:{
        responsive:true,
        plugins:{
          legend:{ position:'bottom' }
        }
      }
    });

    this.cdr.detectChanges();
  }


  // ================= CATEGORY =================
  createCategoryChart(data:any){

    if(this.categoryChart){
      this.categoryChart.destroy();
    }

    this.categoryChart = new Chart("categoryChart",{
      type:'pie',
      data:{
        labels:data.map((x:any)=>x.category_name),
        datasets:[{
          data:data.map((x:any)=>x.total),
          backgroundColor:[
            "#ff6384","#36a2eb","#ffce56","#4caf50","#9c27b0"
          ]
        }]
      },
      options:{ responsive:true }
    });

    this.cdr.detectChanges();
  }


  // ================= MONTHLY =================
  createMonthlyChart(data:any){

    if(this.monthlyChart){
      this.monthlyChart.destroy();
    }

    this.monthlyChart = new Chart("monthlyChart",{
      type:'bar',
      data:{
        labels:data.map((x:any)=>x.month),
        datasets:[{
          label:"Revenue",
          data:data.map((x:any)=>x.total),
          backgroundColor:"#2196F3"
        }]
      },
      options:{ responsive:true }
    });

    this.cdr.detectChanges();
  }


  // ================= STATUS =================
  createStatusChart(data:any){

    if(this.statusChart){
      this.statusChart.destroy();
    }

    this.statusChart = new Chart("statusChart",{
      type:'doughnut',
      data:{
        labels:data.map((x:any)=>x.status),
        datasets:[{
          data:data.map((x:any)=>x.total),
          backgroundColor:[
            "#4CAF50","#FF9800","#F44336"
          ]
        }]
      },
      options:{
        responsive:true,
        plugins:{
          legend:{ position:'bottom' }
        }
      }
    });

    this.cdr.detectChanges();
  }

}