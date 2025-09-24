import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTopicsItem } from '../all-topics.component';

@Component({
  selector: 'app-all-topics-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-topics-item.component.html',
  styleUrls: ['./all-topics-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTopicsItemComponent {
  @Input() item!: AllTopicsItem;

  get progressPercent(): number {
    if (this.item === undefined || this.item === null || this.item.total <= 0) {
      return 0;
    }
    const percent = (this.item.done / this.item.total) * 100;
    return Math.max(0, Math.min(100, Math.round(percent)));
  }
}


