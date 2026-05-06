import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guesthome',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './guesthome.html',
  styleUrl: './guesthome.scss',
})
export class Guesthome implements OnInit {

  public categoryarray: any[] = [];
  eventArray: any[] = [];

  selectedFood: { [key: number]: number | null } = {};

  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewdata();
    this.loadEvents();
  }

  // CATEGORY VIEW
  viewdata() {
    this.db.categoryview().then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
    });
  }

  // LOAD EVENTS + REMOVE EXPIRED EVENTS
  loadEvents() {
    this.db.eventviewWithFoods().then((data: any) => {

      const today = new Date();
      today.setHours(0,0,0,0);

      // FILTER ONLY ACTIVE EVENTS
      this.eventArray = data.filter((event:any) => {
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0,0,0,0);
        return eventDate >= today;
      });

      this.cdr.detectChanges();
    });
  }

  // SELECT FOOD OPTION
  selectFood(event_id: number, eventfood_id: number) {
    this.selectedFood[event_id] = eventfood_id;
  }

  // GUEST VOTE BLOCK
  vote(event_id: number) {

    Swal.fire({
      title: 'Join UNIBITES 🎉',
      text: 'Please login or register to participate in this poll.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Register',
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#3085d6'
    }).then((result) => {

      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      } 
      else {
        this.router.navigate(['/studentregistration']);
      }

    });
  }

  // CHECK POLL CLOSED
  isPollClosed(eventDate: string) {
    return eventDate < this.today;
  }

  // FIND WINNING FOOD
  getWinningFood(foods: any[]) {

    if (!foods || foods.length === 0) {
      return "No votes";
    }

    let winner = foods[0];

    foods.forEach(food => {
      if (food.count > winner.count) {
        winner = food;
      }
    });

    return winner.food_name;
  }

  // VOTE PERCENTAGE
  getVotePercentage(food: any, foods: any[]) {

    const totalVotes = foods.reduce((sum, f) => sum + f.count, 0);

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round((food.count / totalVotes) * 100);
  }

}