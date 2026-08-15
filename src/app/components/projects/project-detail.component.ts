import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PROJECTS, ProjectItem } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectItem | null = null;
  projectIndex: number | null = null;
  sanitizedDemoUrl: any = null;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const index = parseInt(id, 10);
    if (isNaN(index) || index < 0 || index >= PROJECTS.length) return;

    this.projectIndex = index;
    this.project = PROJECTS[index];

    if (this.project?.demoLink) {
      this.sanitizedDemoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.demoLink);
    }
  }
}
