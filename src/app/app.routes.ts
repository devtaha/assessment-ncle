import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/course', pathMatch: 'full' },
  { path: 'feed', loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent) },
  { path: 'course', loadComponent: () => import('./pages/course/course.component').then(m => m.CourseComponent) },
  { path: 'exam/:id', loadComponent: () => import('./components/exam-detail/exam-detail').then(m => m.ExamDetailComponent) },
  { path: 'pickup', loadComponent: () => import('./pages/pickup/pickup.component').then(m => m.PickupComponent) },
  { path: 'chat', loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent) },
  { path: 'course-management', loadComponent: () => import('./pages/course-management/course-management.component').then(m => m.CourseManagementComponent) },
  { path: 'vcr', loadComponent: () => import('./pages/vcr/vcr.component').then(m => m.VcrComponent) },
  { path: 'grade-management', loadComponent: () => import('./pages/grade-management/grade-management.component').then(m => m.GradeManagementComponent) }
];