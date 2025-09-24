import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-empty-state.component.html',
  styleUrls: ['./work-empty-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkEmptyStateComponent {
  @Input() title: string = 'No WorkItem Added';
  @Input() subtitle: string = 'As soon as teacher uploads it will come here';
  @Input() buttonLabel: string = 'Add';
  @Output() action = new EventEmitter<void>();
}


