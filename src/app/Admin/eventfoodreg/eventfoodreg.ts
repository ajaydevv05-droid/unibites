import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventfoodreg',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './eventfoodreg.html',
  styleUrl: './eventfoodreg.scss',
})
export class Eventfoodreg {

  foodformgroup!: FormGroup;
  event_id: any;

  selectedFile?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;

  public foodarray: any[] = [];
  message = '';
  savestatus = false;

  constructor(
    private db: Dbservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.event_id = params.get('event_id');
    });
  }

  ngOnInit(): void {

    /* FORM WITH VALIDATION */
    this.foodformgroup = this.fb.group({
      food_name: ['', Validators.required],
      food_image: ['', Validators.required],
      event_id: [this.event_id]
    });

    /* LOAD FOOD ITEMS */
    this.db.geteventfoods({ event_id: this.event_id }).then((data: any) => {
      this.foodarray = data;
      this.cdr.detectChanges();
      console.log(this.foodarray);
    });

  }

  /* FILE SELECT */
  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }

  /* SUBMIT FORM */
  Onsubmit() {

    this.savestatus = true;

    if (this.foodformgroup.invalid) {
      return;
    }

    if (this.selectedFile) {

      const file: File | null = this.selectedFile.item(0);

      if (file) {

        this.currentFile = file;

        /* UPLOAD IMAGE */
        this.db.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });

        this.foodformgroup.value.food_image = this.currentFile.name;

        /* INSERT FOOD DATA */
        this.db.eventfoodreg(this.foodformgroup.value).then((data: any) => {

          alert(
            data.message == "success"
              ? "Food items registered successfully"
              : "Failed to register food items"
          );

          window.location.reload();
          this.cdr.detectChanges();

        });

      }
    }
  }

  /* DELETE FOOD */
  deleteFood(eventfood_id: any) {

    this.db.deleteeventfood(eventfood_id).then((data: any) => {

      alert(
        data.message == "success"
          ? "Food item deleted successfully"
          : "Failed to delete food item"
      );

      window.location.reload();

    });

  }

}