import { Component } from '@angular/core';
import { Dbservice } from '../../dbservice';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {

  public Loginarray: any[] = [];
  public loginformgroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: Dbservice,
    private router: Router
  ) {}

  ngOnInit() {

    this.loginformgroup = this.fb.group({
      username: [''],
      password: ['']
    });

  }

  /* ================= LOGIN ================= */

  login() {

    this.db.login(this.loginformgroup.value).then((data: any) => {

      this.Loginarray = data;

      if (data == "") {

        Swal.fire('Error', 'Invalid Username or Password', 'error');
        this.router.navigate(['/login']);
        return;

      } else {

        var role = this.Loginarray[0].role;

        localStorage.setItem('loginid', this.Loginarray[0].login_id);
        localStorage.setItem('username', this.Loginarray[0].username);

        if (role == 'Admin') {
          this.router.navigate(['/adminmaster/adminhome']);
        }

        else if (role == 'staff') {
          this.router.navigate(['/staffmaster/staffhome']);
        }

        else if (role == 'student') {
          this.router.navigate(['/studentmaster/studenthome']);
        }

        else {

          Swal.fire('Info', 'Register First to Login', 'info');
          this.router.navigate(['/studentregistration']);

        }

      }

    });

  }


  /* ================= PAGE EFFECTS ================= */

  ngAfterViewInit(){

    setTimeout(()=>{
      const loader:any = document.getElementById("loader");
      if(loader){
        loader.style.display="none";
      }
    },2000);

    const card:any = document.querySelector(".tilt-card");

    if(card){

      document.addEventListener("mousemove",(e:any)=>{

        const x=(window.innerWidth/2 - e.pageX)/20;
        const y=(window.innerHeight/2 - e.pageY)/20;

        card.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;

      });

    }

  }


  /* ================= FORGOT PASSWORD ================= */
forgotPassword(){

Swal.fire({
title:'Reset Password',
input:'email',
inputLabel:'Enter your registered email',
confirmButtonText:'Send OTP',
showCancelButton:true
}).then((result)=>{

if(result.value){

let email = result.value;

this.db.sendOtp({email:email}).then((res:any)=>{

if(res.status=="success"){

Swal.fire({
title:'Enter OTP',
html:
'<input id="otp" class="swal2-input" placeholder="Enter OTP">'+
'<input id="password" type="password" class="swal2-input" placeholder="New Password">',
confirmButtonText:'Reset Password'
}).then(()=>{

let otp:any=(<HTMLInputElement>document.getElementById("otp")).value;
let password:any=(<HTMLInputElement>document.getElementById("password")).value;

this.db.verifyOtp({
email:email,
otp:otp,
password:password
}).then((res:any)=>{

if(res.status=="success"){
Swal.fire('Success','Password Updated','success')
}else{
Swal.fire('Error','Invalid OTP','error')
}

})

})

}else{

Swal.fire('Error','Email not found','error')

}

})

}

})

}
}