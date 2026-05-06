import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staffedit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './staffedit.html',
  styleUrl: './staffedit.scss',
})
export class Staffedit {
   staff_id: any;
  public staffarray: any[] = [];
  staffformgroup!: FormGroup;
  selectedFiles?: FileList;
  message: any;
  currentFile?: any;

  // ✅ Validation trigger
  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private dbservice: Dbservice,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.staff_id = params.get('staff_id');
    });
  }

  ngOnInit(): void {

    this.staffformgroup = this.fb.group({
      staff_id: [this.staff_id],
      staffName: ['', Validators.required],
      staffImage: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    });

    this.dbservice.editstaff({ staff_id: this.staff_id }).then((data: any) => {
      this.staffarray = data;
      this.cdr.detectChanges();

      this.staffformgroup.setValue({
        staff_id: this.staffarray[0].staff_id,
        staffName: this.staffarray[0].staff_name,
        email: this.staffarray[0].staff_email,
        contact: this.staffarray[0].staff_contact,
        staffImage: this.staffarray[0].staff_photo
      });
    });
  }

  selectedFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.imageUpload();
  }

  imageUpload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.dbservice.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });

        this.staffformgroup.value.staffImage = this.currentFile.name;
      }
    }
  }

  onsubmit() {

    this.savestatus = true;

    if (this.staffformgroup.invalid) {
      return;
    }

    if (this.currentFile) {
      this.staffformgroup.value.staffImage = this.currentFile.name;
    }

    this.dbservice.updatestaff(this.staffformgroup.value).then((result: any) => {

      if (result.message == "updated") {
        alert("Staff Updated Successfully");
        this.router.navigate(['/adminmaster/staffview']);
      }
      else {
        alert("Error in Staff Updation");
      }
    });
  }
}