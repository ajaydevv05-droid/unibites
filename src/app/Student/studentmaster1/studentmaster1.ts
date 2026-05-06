import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-studentmaster1',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './studentmaster1.html',
  styleUrl: './studentmaster1.scss',
})
export class Studentmaster1 {
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
