import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-staffmaster1',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './staffmaster1.html',
  styleUrl: './staffmaster1.scss',
})
export class Staffmaster1 {
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
