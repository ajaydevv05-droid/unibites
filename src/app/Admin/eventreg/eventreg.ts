import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eventreg',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './eventreg.html',
  styleUrl: './eventreg.scss',
})
export class Eventreg {

  public eventForm!: FormGroup;

  selectedFile?: FileList;
  currentFile?: File;

  fileInfos?: Observable<any>;

  message = '';
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private router: Router
  ) {}

  ngOnInit(): void {

    /* CREATE REACTIVE FORM */
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventPoster: ['', Validators.required]
    });

  }

  /* FILE SELECT */
  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }

  /* SUBMIT FORM */
  Onsubmit() {

    this.savestatus = true;

    if (this.eventForm.invalid) {
      return;
    }

    console.log(this.eventForm.value);

    if (this.selectedFile) {

      const file: File | null = this.selectedFile.item(0);

      if (file) {

        this.currentFile = file;

        /* UPLOAD IMAGE */
        this.dbservice.upload(this.currentFile).subscribe({
          next: (event: any) => {
            this.message = event.body.message;
          },
          error: (err) => {
            console.error(err);
            alert("Image upload failed");
          }
        });

        /* PATCH POSTER NAME */
        this.eventForm.patchValue({
          eventPoster: this.currentFile.name
        });

        /* INSERT EVENT */
        this.dbservice.insertevent(this.eventForm.value).then((data: any) => {

          let event_id = data.event_id;

          console.log('event_id:', event_id);

          if (data.message === "success") {

            alert('Event Registered Successfully');

            this.router.navigate([
              '/adminmaster/eventfoodreg',
              event_id
            ]);

          } else {

            alert('Data not inserted, please check');

            this.router.navigate([
              '/adminmaster/eventreg'
            ]);

          }

        });

      }

    }

  }

}