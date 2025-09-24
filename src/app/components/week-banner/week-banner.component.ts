import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-banner.component.html',
  styleUrls: ['./week-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekBannerComponent {
  @Input() weekNumber: number = 1;
  @Input() startDate?: Date | string;
  @Input() endDate?: Date | string;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  get dateRangeText(): string {
    const start = this.normalizeDate(this.startDate);
    const end = this.normalizeDate(this.endDate);
    if (!start || !end) {
      return '';
    }
    return `${this.formatDate(start)} - ${this.formatDate(end)}`;
  }

  private normalizeDate(dateLike?: Date | string): Date | null {
    if (dateLike === undefined || dateLike === null || dateLike === '') {
      return null;
    }
    if (dateLike instanceof Date) {
      return dateLike;
    }
    const parsed = new Date(dateLike);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}


