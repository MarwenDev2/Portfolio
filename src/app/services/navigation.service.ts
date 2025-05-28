import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentRouteSubject = new BehaviorSubject<string>('/');
  public currentRoute$: Observable<string> = this.currentRouteSubject.asObservable();

  constructor(private router: Router) {
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRouteSubject.next(event.urlAfterRedirects);
    });
  }

  // Navigate to a route
  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Get current route
  public getCurrentRoute(): string {
    return this.currentRouteSubject.value;
  }
}
