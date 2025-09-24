import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SidebarItem {
  icon: string;
  iconType: 'emoji' | 'file';
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    { icon: 'assets/icons/feed.png', iconType: 'file', label: 'Feed', route: '/feed' },
    { icon: 'assets/icons/course.png', iconType: 'file', label: 'Course', route: '/course' },
    { icon: 'assets/icons/pickup.png', iconType: 'file', label: 'Pickup', route: '/pickup' },
    { icon: 'assets/icons/chat.png', iconType: 'file', label: 'Chat', route: '/chat' },
    { icon: 'assets/icons/course.png', iconType: 'file', label: 'Course management', route: '/course-management' },
    { icon: 'assets/icons/vcr.png', iconType: 'file', label: 'VCR', route: '/vcr' },
    { icon: 'assets/icons/grade-mgmt.png', iconType: 'file', label: 'Grade Management', route: '/grade-management' }
  ];

  trackByRoute(index: number, item: SidebarItem): string {
    return item.route;
  }
}