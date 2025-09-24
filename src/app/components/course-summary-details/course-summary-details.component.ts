import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-summary-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-details.component.html',
  styleUrls: ['./course-summary-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSummaryDetailsComponent {
  @Input() authors: string[] = [];
  @Input() levelLabel: string = '';
  @Input() classLabel: string = '';

  get authorsText(): string {
    return this.authors.length ? `by ${this.authors.join(', ')}` : '';
  }
}


