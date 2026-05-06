import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dbservice } from '../../dbservice';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoryedit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './categoryedit.html',
  styleUrl: './categoryedit.scss',
})
export class Categoryedit implements OnInit {
  savestatus=false;
  category_id: any;
  public categoryarray: any[] = [];
  cateditformgroup!: FormGroup;
  selectedFiles?: FileList;
  message: any;
  currentFile?: any;
  constructor(private fb: FormBuilder, private dbservice: Dbservice, private route: ActivatedRoute, private cdr: ChangeDetectorRef,private router:Router) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.category_id = params.get('category_id')
    });
  }
  selectedFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    this.imageUpload();
  }

  ngOnInit(): void {
    this.cateditformgroup = this.fb.group({
      category_id: this.category_id,
      categoryName: ['',Validators.required],
      categoryImage: ['',Validators.required],
      description: ['',Validators.required]
    }
  
  );
    
    this.dbservice.editcategory({ category_id: this.category_id }).then((data: any) => {
      this.categoryarray = data;
      this.cdr.detectChanges();
      console.log(this.categoryarray);
      this.cateditformgroup.setValue({
        categoryName: this.categoryarray[0].category_name,
        category_id: this.categoryarray[0].category_id,
        description: this.categoryarray[0].description,
        categoryImage: this.categoryarray[0].category_image
      });


    });

  }

  
  onsubmit() {
    // if (!this.cateditformgroup.value.category_image) {
    //   const data = {
    //     catgory_name: this.cateditformgroup.value.category_name,
    //     description: this.cateditformgroup.value.description,
    //     category_image: this.categoryarray[0].category_image
    //   }
    // }
    if(!this.cateditformgroup.valid)
    {
      this.savestatus=true;
      console.log("fill the field")
      return
    }
    else{
    this.cateditformgroup.value.categoryImage = this.currentFile.name;
    this.dbservice.updatecategory(this.cateditformgroup.value).then((result: any) => {
      console.log(result);
      if (result.message = "updated") {
        alert("Category Updated Successfully");
        this.router.navigate(['/adminmaster/categoryview']);
      }
      else {
        alert("Error in Category Updation");
      }
    });
  }
}
  imageUpload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.dbservice.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });
      }
      this.cateditformgroup.value.categoryImage = this.currentFile.name;
    }
  }
}
