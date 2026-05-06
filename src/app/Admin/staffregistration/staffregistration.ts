import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staffregistration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './staffregistration.html',
  styleUrls: ['./staffregistration.scss'],
})
export class Staffregistration implements OnInit {
  public staffformgroup!: FormGroup;

  selectedFile?: FileList;
  currentFile?: File;
  fileInfos?: Observable<any>;
  message = '';

  // Validation trigger
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.staffformgroup = this.fb.group({
      staffName: ['', [Validators.required, Validators.minLength(3)]],
      staffImage: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // File selection
  selectFile(event: any): void {
    this.selectedFile =event.target.files;
  }

  // Submit form
  Onsubmit(): void {
    this.savestatus = true; // trigger validation messages

    if (this.staffformgroup.invalid) {
      return; // stop if form is invalid
    }

    console.log('Form Values:', this.staffformgroup.value);

    if (this.selectedFile) {
      const file = this.selectedFile.item(0);
      if (file) {
        this.currentFile = file;

        // Upload file
        this.dbservice.upload(this.currentFile).subscribe((event: any) => {
            this.message = event.body?.message || 'File uploaded successfully';
        });

        // Assign file name to form
        // this.staffformgroup.patchValue({ staffImage: this.currentFile.name });
        this.staffformgroup.value.staffImage = this.currentFile.name; 

        // Insert staff
        this.dbservice.insertstaff(this.staffformgroup.value).then((confirmation: any) => {
          if (confirmation?.message === 'success') {
            alert('Registered Successfully');
            this.router.navigate(['/adminmaster/staffview']);
          } else {
            alert('Data not inserted, please check.');
          }
        }).catch((err) => {
          console.error('Insert staff error:', err);
          alert('An error occurred while inserting data.');
        });
      }
    } else {
      alert('Please select a staff photo before submitting.');
    }
  }
}