import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ProjectItem, PROJECTS } from '../../data/projects.data';
import { RouterLink } from '@angular/router';

type Project = ProjectItem & { isRepoMenuOpen?: boolean };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('fadeInUp', [
      state('initial', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', animate('500ms cubic-bezier(0.16, 1, 0.3, 1)'))
    ]),
    trigger('slideIn', [
      state('initial', style({ opacity: 0, transform: 'translateX(50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('initial => visible', animate('0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),
    trigger('techIconAnimation', [
      state('initial', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('initial => visible', 
        animate('0.5s {{delay}}s ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
        { params: { delay: 0 } }
      )
    ]),
    trigger('projectCardAnimation', [
      state('initial', style({ opacity: 0, transform: 'translateY(40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('initial => visible', 
        animate('0.6s {{delay}}s ease', style({ opacity: 1, transform: 'translateY(0)' })),
        { params: { delay: 0 } }
      )
    ]),
    trigger('typewriterAnimation', [
      state('initial', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('initial => visible', [
        animate('0.4s', style({ opacity: 1 })),
        animate('1.5s', keyframes([
          style({ width: '0%', borderRight: '3px solid var(--primary)', offset: 0 }),
          style({ width: '100%', borderRight: '3px solid var(--primary)', offset: 0.9 }),
          style({ borderRight: 'transparent', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit, AfterViewChecked {
  animationState = 'initial';
  projects: Project[] = PROJECTS as Project[];

  playingVideoIndex: number | null = null;

  currentSlideIndex: { [key: number]: number } = {};

  ngOnInit(): void {
  setTimeout(() => (this.animationState = 'visible'), 100);

  setInterval(() => {
    this.projects.forEach((project, i) => {
      if (Array.isArray(project.image)) {
        this.currentSlideIndex[i] =
          ((this.currentSlideIndex[i] || 0) + 1) % project.image.length;
      }
    });
  }, 5000);

  document.addEventListener('click', () => {
    this.closeAllRepoMenus();
  });
}

  toggleRepoMenu(project: Project, event: Event): void {
  event.stopPropagation();

  this.projects.forEach(p => {
    if (p !== project) p.isRepoMenuOpen = false;
  });

  project.isRepoMenuOpen = !project.isRepoMenuOpen;
}

closeAllRepoMenus(): void {
  this.projects.forEach(p => p.isRepoMenuOpen = false);
}
  
  ngAfterViewChecked(): void {
    // removed modal playback handling — project detail page handles demo playback
  }
  
  // Modal removed — project details open in their own page
}