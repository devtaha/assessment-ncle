import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-card.component.html',
  styleUrls: ['./course-summary-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSummaryCardComponent {
  @Input() title: string = '';
  @Input() status: 'Completed' | 'In Progress' | 'Not Started' | string = 'Completed';
  @Input() progressPercent: number = 0; // 0-100
  @Input() todoPendingCount: number = 0;
  @Input() todoMissedCount: number = 0;
  @Input() iconUrl: string | null = null;
}


