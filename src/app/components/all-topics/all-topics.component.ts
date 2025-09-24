import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTopicsItemComponent } from './all-topics-item/all-topics-item.component';

export interface AllTopicsItem {
  title: string;
  subtitle: string;
  done: number;
  total: number;
  iconEmoji?: string; // e.g., "▶", "📎", "📝", "🏅"
  iconUrl?: string; // optional PNG/SVG path from assets
}

@Component({
  selector: 'app-all-topics',
  standalone: true,
  imports: [CommonModule, AllTopicsItemComponent],
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTopicsComponent {
  @Input() termLabel: string = 'SPRING SEMESTER 2023-2024';
  @Input() items: AllTopicsItem[] = [];

  trackByTitle(index: number, item: AllTopicsItem): string {
    return item.title;
  }
}


