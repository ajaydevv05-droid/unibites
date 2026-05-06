import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentregistration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './studentregistration.html',
  styleUrl: './studentregistration.scss',
})
export class Studentregistration  implements OnInit {

  registrationgroup!: FormGroup;
  savestatus = false;

  selectedFile?: FileList;
  currentFile?: File;
  fileInfos?: Observable<any>;
  message = '';

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationgroup = this.fb.group(
      {
        studentname: ['', Validators.required],
        studentemail: ['', [Validators.required, Validators.email]],
        studentImage: ['', Validators.required],
        studentcontact: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatch }
    );
  }

  // ✅ Password Match Validator
  passwordMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // ✅ File Selection
  selectFile(event: any): void {
    this.selectedFile = event.target.files;

    if (this.selectedFile && this.selectedFile.length > 0) {
      const file = this.selectedFile.item(0);
      this.currentFile = file!;
      this.registrationgroup.patchValue({
        studentImage: file?.name
      });
    }
  }

  // ✅ Submit
  Onsubmit(): void {
    this.savestatus = true;

    if (this.registrationgroup.invalid) {
      return;
    }

    if (!this.currentFile) {
      alert('Please select a photo');
      return;
    }

    // Upload image
    this.dbservice.upload(this.currentFile).subscribe({
      next: (event: any) => {
        if (event?.body?.message) {
          this.message = event.body.message;
        }
      },
      error: () => {
        // alert('Image upload failed');
      }
    });

    // Insert student data
    this.dbservice.insertstudent(this.registrationgroup.value).then(
      (confirmation: any) => {
        if (confirmation.message === 'success') {
          alert('Registered Successfully');
          this.router.navigate(['/login']);
        } else {
          alert('Data not inserted, please check');
        }
      }
    );
  }
}
