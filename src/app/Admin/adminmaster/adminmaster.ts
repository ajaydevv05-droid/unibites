import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminmaster',
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './adminmaster.html',
  styleUrl: './adminmaster.scss',
})
export class Adminmaster {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const login_id = localStorage.getItem('loginid');
    if (!login_id) {
      // If loginid is not present, redirect to the login page
      this.router.navigate(['/login']);
    }
  }
  logout() {
    console.log('Logout button clicked');
    console.log('Before Logout:', localStorage.getItem('loginid'));
    localStorage.removeItem('loginid');
    console.log('After Logout:', localStorage.getItem('loginid'));
    alert('logout successfully');
    this.router.navigate(['login']);
  }
  



}
