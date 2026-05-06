import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoryregistration',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './categoryregistration.html',
  styleUrl: './categoryregistration.scss',
})
export class Categoryregistration {
  public categoryformgroup!: FormGroup;
  selectedFile?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;
  message = '';

  // ✅ As per PDF
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryformgroup = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }

  Onsubmit() {

    // ✅ As per PDF
    this.savestatus = true;

    if (this.categoryformgroup.invalid) {
      return;
    }

    console.log(this.categoryformgroup.value);

    if (this.selectedFile) {
      const file: File | null = this.selectedFile.item(0);

      if (file) {
        this.currentFile = file;

        this.dbservice.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });

        this.categoryformgroup.value.categoryImage = this.currentFile.name;

        this.dbservice.insertcategory(this.categoryformgroup.value).then((confirmation: any) => {

          if (confirmation.message == "success") {
            alert('Registered Successfully');
            this.router.navigate(['/adminmaster/categoryview']);
          } else {
            alert('Data not inserted, please check');
          }

        });
      }
    }
  }
}
