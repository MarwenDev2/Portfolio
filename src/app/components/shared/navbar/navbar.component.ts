import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationService } from '../../../services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
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
  private routeSubscription: Subscription | null = null;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // Trigger animations after component is initialized
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100);
    
    // Subscribe to route changes to handle active links
    this.routeSubscription = this.navigationService.currentRoute$.subscribe(route => {
      // Close mobile menu on route change
      if (this.menuOpen) {
        this.closeMenu();
      }
    });
    
    // Check if window has been scrolled on init
    this.scrolled = window.scrollY > 50;
  }
  
  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
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
  
  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
    this.closeMenu();
  }

  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
