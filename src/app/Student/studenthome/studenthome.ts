import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studenthome',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './studenthome.html',
  styleUrl: './studenthome.scss',
})
export class Studenthome {
   
  public categoryarray: any[] = [];
  eventArray: any[] = [];

  // ✅ Selection stored per event
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
    this.loadEvents(); // make sure you load events
  }

  viewdata() {
    this.db.categoryview().then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
    });
  }

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

  selectFood(event_id: number, eventfood_id: number) {
    this.selectedFood[event_id] = eventfood_id;
  }

  vote(event_id: number) {

    const selectedId = this.selectedFood[event_id];

    if (!selectedId) {
      alert("Please select a food option");
      return;
    }

    this.db.voteFood(selectedId).then(() => {

      this.eventArray.forEach(event => {
        if (event.event_id === event_id) {
          event.foods.forEach((food: any) => {
            if (food.eventfood_id === selectedId) {
              food.count++;
            }
          });
        }
      });

      alert("Vote Submitted Successfully!");
      this.selectedFood[event_id] = null;
      this.cdr.detectChanges();
    });
  }

 // CHECK POLL CLOSED
  isPollClosed(eventDate: string) {
    return eventDate < this.today;
  }

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

   getVotePercentage(food: any, foods: any[]) {

    const totalVotes = foods.reduce((sum, f) => sum + f.count, 0);

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round((food.count / totalVotes) * 100);
  }
}