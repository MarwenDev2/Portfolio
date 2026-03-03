import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('logoAnimation', [
      state('initial', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('0.5s ease-in'))
    ]),
    trigger('navLinksAnimation', [
      state('initial', style({ opacity: 0, transform: 'translateY(-10px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('0.5s 0.3s ease-in'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  menuOpen = false;
  animationState = 'initial';

  ngOnInit(): void {
    // Trigger animations after component is initialized
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
    
    // Check if window has been scrolled on init
    this.scrolled = window.scrollY > 50;
  }
  
  ngOnDestroy(): void {
    // Clean up any resources
    this.closeMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    // If menu is opened on mobile, prevent scrolling of the background
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.closeMenu();
  }

  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
