import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Dbservice } from '../../dbservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foodregistration',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './foodregistration.html',
  styleUrl: './foodregistration.scss',
})
export class Foodregistration {

  public foodformgroup!: FormGroup;
  public categoryarray: any[] = [];
  selectedFile?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;
  message = '';

  // ✅ As per PDF validation method
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.foodformgroup = this.fb.group({
      foodName: ['', Validators.required],
      foodImage: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      category_id: ['', Validators.required]
    });

    this.dbservice.categoryview().then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }

  Onsubmit() {

    // ✅ trigger validation
    this.savestatus = true;

    if (this.foodformgroup.invalid) {
      return;
    }

    console.log(this.foodformgroup.value);

    if (this.selectedFile) {
      const file: File | null = this.selectedFile.item(0);

      if (file) {
        this.currentFile = file;

        this.dbservice.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });

        this.foodformgroup.value.foodImage = this.currentFile.name;

        this.dbservice.insertfood(this.foodformgroup.value).then((confirmation: any) => {

          if (confirmation.message == "success") {
            alert('Registered Successfully');
            this.router.navigate(['/adminmaster/foodview']);
          } else {
            alert('Data not inserted, please check');
          }

        });
      }
    }
  }
}