import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseManagementComponent {
}