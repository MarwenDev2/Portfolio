import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('0.8s ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portfolio';
  scrollProgress = 0;
  showBackToTop = false;
  activeSection = 'home';
  private observer: IntersectionObserver | null = null;
  showSections = true;
  private routerSub: any;

  constructor(private router: Router) {
    // show sections for all routes except exact project detail paths (/projects/:id)
    const normalize = (u: string) => (u || '').split('?')[0].split('#')[0];
    const initialUrl = normalize(this.router.url);
    const isProjectDetail = /^\/projects\/[^\/]+$/.test(initialUrl);
    this.showSections = !isProjectDetail;

    // subscribe to route changes to toggle between sections and routed pages
    this.routerSub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = normalize(evt.urlAfterRedirects || evt.url);
        // hide sections only when navigating to an exact project detail URL
        this.showSections = !/^\/projects\/[^\/]+$/.test(url);
      }
    });
  }

  ngOnInit(): void {
    this.initializeIntersectionObserver();
    this.updateScrollProgress();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollProgress();
    this.showBackToTop = window.scrollY > 500;
  }

  private updateScrollProgress(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (scrollTop / docHeight) * 100;
  }

  private initializeIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          this.updateActiveNavLink();
          this.animateSection(entry.target);
        }
      });
    }, options);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      this.observer?.observe(section);
    });
  }

  private updateActiveNavLink(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${this.activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  private animateSection(section: Element): void {
    section.classList.add('visible');
    
    // Animate elements within the section
    const animatedElements = section.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, index * 100);
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
