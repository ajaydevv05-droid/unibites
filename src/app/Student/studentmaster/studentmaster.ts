import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-studentmaster',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './studentmaster.html',
  styleUrl: './studentmaster.scss',
})
export class Studentmaster implements OnInit, OnDestroy {

  menuOpen = false;
  cartCount = 0; // Later bind from API
  lastScrollTop = 0;

  private scrollListener!: () => void;

  constructor(private router: Router) {}

  ngOnInit(): void {

    // 🔐 Login Check
    const login_id = localStorage.getItem('loginid');
    if (!login_id) {
      this.router.navigate(['/login']);
      return;
    }

    // 🎯 Scroll Effects
    this.scrollListener = () => {
      const header = document.querySelector('.header-area');
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (!header) return;

      // 🔻 Hide on scroll down
      if (scrollTop > this.lastScrollTop && scrollTop > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }

      // ✨ Shrink + Shadow
      if (scrollTop > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }

      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  // 🍔 Hamburger Toggle
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // 🚪 Logout
  logout() {
    localStorage.removeItem('loginid');
    alert('Logout successful');
    this.router.navigate(['/login']);
  }

  // 🧹 Clean up event listener (important)
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }
}